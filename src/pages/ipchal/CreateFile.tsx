import { biddingInfoState, stepState } from '@/atom'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia'
import axios from 'axios'
import { format } from 'date-fns'
import Spinner from '@/components/Spinner'
import { TotalResultType } from '@/interface/IpchalType'
import CoIpchalPDF from '@/components/createPDFContent/CoIpchalPDF'
import SinglePDF from '@/components/createPDFContent/SinglePDF'
import CoverPage from '@/components/createPDFContent/CoverPage'
import Button from '@/components/shared/Button'

export default function CreateFile() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [passwordActive, setPasswordActive] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [totalResult, setTotalResult] = useState<TotalResultType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [blobFile, setBlobFile] = useState<File | null>(null)
  const [getHeight, setGetHeight] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(2)
  
  
  const date = new Date()
  
  const handlePrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + totalResult?.bidPrice
    } else {
      return totalResult?.bidPrice?.toString()
    }
  }

  const handleDepositPrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + totalResult?.bidDeposit
    } else {
      return totalResult?.bidDeposit?.toString() 
    }
  }

  const mandateNumber = totalResult?.bidders.map((item) => item.mandateYn).filter((item) => item === 'Y').length
  
  const handleGetHeight = () => {
    //  1. 입찰자가 1명일 때 + 대리인이 없을 때
    if (biddingInfo.agentName === '' && biddingInfo.bidderNum === 1) {          //  2장
      setGetHeight(580)
      setPageNum(2)
    } else if (biddingInfo.agentName !== '' && biddingInfo.bidderNum === 1) {   //  3장
      //  2. 입찰자가 1명일 때 + 대리인이 있을 때
      setGetHeight(870)
      setPageNum(3)
    } else if (biddingInfo.agentName === '' && biddingInfo.bidderNum > 1) {     //  4장
      //  3. 입찰자가 2명 이상일 때 + 대리인이 없을 때
      setGetHeight(1160)
      setPageNum(4)
    } else if (biddingInfo.agentName !== '' && biddingInfo.bidderNum > 1) {     
      //  4. 입찰자가 2명 이상일 때 + 대리인이 있을 때
      if (mandateNumber && mandateNumber <= 3 && biddingInfo.bidderNum <= 10) {   //  5장
        //  4-1. 대리인이 3명 이하일 때
        setGetHeight(1450)
        setPageNum(5)  
      } else if (biddingInfo.bidderNum > 10 && (mandateNumber && mandateNumber <= 3)) {   //  6장 이상
        //  4-2. 입찰자 10명 이상 + 대리인 3명 이하
        setGetHeight(1160 + (290 * Math.ceil(totalResult?.bidders.length! / 10)))
        setPageNum(4 + Math.ceil(totalResult?.bidders.length! / 10))
      } else if (biddingInfo.bidderNum > 10 && (mandateNumber && mandateNumber > 3)) {
        //  4-3. 입찰자 10명 이상 + 대리인 3명 이상
        setGetHeight(870 + (290 * Math.ceil(totalResult?.bidders.length! / 10)) + (290 * Math.ceil(mandateNumber / 3)))
        setPageNum(3 + Math.ceil(totalResult?.bidders.length! / 10) + Math.ceil(mandateNumber / 3))
      } else if (biddingInfo.bidderNum <= 10 && (mandateNumber && mandateNumber > 3)) {
        //  4-4. 입찰자 10명 이하 + 대리인 3명 이상 
        setGetHeight(1160 + (290 * Math.ceil(mandateNumber / 3)))
        setPageNum(4 + Math.ceil(mandateNumber / 3))
      } else {
        //  4-5. 입찰자 10명 이하 + 대리인 3명 이하
        setGetHeight(1450)
        setPageNum(5)
      }
    }
  }

  const handleGeneratePDF = async () => { 
    if (window) {
      const captureDiv = document && document.getElementById('capture') as HTMLElement
      captureDiv && captureDiv.style.display === 'none' ? captureDiv.style.display = 'block' : captureDiv.style.display = 'none'
      const responese = await axios
      .post( 
        `${process.env.NEXT_PUBLIC_SERVER_URL}download`,
        {
          html: `${htmlElement}`,
          mstSeq: biddingInfo.mstSeq,
          password: password,
          name: fileName.replace(" ", ""),
          pageNum: pageNum,
          userIdYn: biddingInfo.aesUserId ? 'Y' : 'N',
        },
        {
          responseType: "blob", // important
        }
      )
      .then((data) => {
        const file = new Blob([data.data], { type: "application/pdf" });
        setBlobFile(new File([file], `${fileName}.pdf`, { type: "application/pdf" }));
        setBiddingInfo({
          ...biddingInfo,
          isFileCreated: true,
          pdfFile: file,
        });
        handleDownload(file)
      });
      captureDiv && captureDiv.style.display === 'block' ? captureDiv.style.display = 'none' : captureDiv.style.display = 'none'
    }
  }

  const handleDownload = (file: Blob) => {
    if (biddingInfo.pdfFile) {
        const url = window.URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName.replace(" ", "")}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
  }

  const handleDownload2 = (file: Blob) => {
    if (biddingInfo.pdfFile) {
      if (window) {
      const url = window.URL.createObjectURL(file);
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
      }
    }
  }

  useEffect(() => {
    handleGetHeight()
  }, [biddingInfo.bidderNum, biddingInfo.agentName, totalResult?.bidders.length, mandateNumber])

  let htmlElement = ''

  const handleHtml = () => {
    if (document) {
      const captureDiv = document.getElementById('capture') as HTMLElement
      if (captureDiv) {
        htmlElement = captureDiv.innerHTML
      }
    }
  }

  const onCapture = async () => {
    handleHtml()
    await handleGeneratePDF()
  }

  const onClickPdf = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    if (password.length < 4 || password === '') {
      alert('파일 암호를 4자리 이상 입력해주세요')
      setLoading(false)
      return
    } else {
      await onCapture()
      setLoading(false)
    }
  }
  
  const handlePrevStep = () => {
    if (biddingInfo.isFileCreated) {
      alert('파일이 생성되어 이전 단계로 되돌아갈 수 없습니다.')
    } else {
      setStateNum(stateNum - 1)
    }
  }

  useEffect(() => {
    setFileName(`${biddingInfo.sagunNum.replace(" ", "")}_` + format(date, 'yyyyMMddHHmmss'))
    setBiddingInfo({
      ...biddingInfo,
      fileName: `${biddingInfo.sagunNum.replace(" ", "")}_` + format(date, 'yyyyMMddHHmmss'),
    })
    setLoading(true)
    const handleGetResult = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}`,
        )
        if (response.status === 200) {
          setTotalResult(response.data.data)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    handleGetResult()
  }, [])
  
  return (
    <>
      {!loading && (
        <div className="flex w-[100%] md:h-[100vh] h-[100vh] justify-center bg-mybg relative">
          <div className="flex flex-col md:gap-[14px] gap-[5px] w-[100%] h-[100%] bg-mybg items-center text-center relative pt-[50px]">
            <span className="md:text-[32.5px] text-[20px] font-bold leading-[135%] tracking-[-1%] font-['suit'] not-italic">
              입찰표 작성이 끝났습니다
            </span>
            <div className='hidden md:flex w-[100%] justify-center items-center'>
              <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic">
                생성하기 버튼을 눌러 파일을 다운로드 받아주세요
              </span>
            </div>
            <div className='flex flex-col md:hidden w-[100%] justify-center items-center'>
              <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic">
                생성하기 버튼을 눌러
              </span>
              <span className="md:text-[18px] text-[16px] text-sutTitle font-medium font-['suit'] leading-[135%] tracking-[-1%] not-italic">
                파일을 다운로드 받아주세요
              </span>
            </div>
            <div className="flex flex-col gap-5 md:w-[550px] w-[90%] h-[200px] justify-center items-left mt-[30px] rounded-md border-gray-400">
              <div className="flex flex-col justify-start text-left gap-3">
                <span className="text-black md:text-[20px] text-[16px] font-semibold not-italic font-['suit'] ml-[5%] leading-[135%] tracking-[-2%]">
                  파일명
                </span>
                <input
                  aria-label='파일 이름'
                  className="block w-[90%] h-[40px] border border-gray-300 rounded-md ml-[5%] focus:outline-2 focus:outline-myBlue font-['suit'] font-normal leading-[150%] tracking-[-1%] md:text-[20px] text-[15px] p-[10px]"
                  value={fileName.replace(" ", "") || biddingInfo.fileName.replace(" ", "")}
                  onChange={(e) => {
                    setFileName(e.target.value)
                    setBiddingInfo({
                      ...biddingInfo,
                      fileName: e.target.value,
                    })
                  }} 
                />
              </div>
              <div className="flex flex-col justify-start text-left gap-3 relative ">
                <span className="text-black md:text-[20px] text-[16px] font-semibold not-italic font-['suit'] ml-[5%] leading-[135%] tracking-[-2%]">
                  비밀번호
                </span>
                <div className='flex flex-row w-[100%] gap-[1%] ml-[5%]'>
                  <div className='relative w-[64%] h-[40px]'>
                    <input
                      aria-label='비밀번호'
                      type={`${passwordActive ? 'text' : 'password'}`}
                      className="flex w-[100%] h-[40px] border border-gray-300 rounded-md focus:outline-2 focus:outline-myBlue font-['suit'] font-normal md:text-[20px] text-[15px] leading-[150%] tracking-[-1%] p-[10px]"
                      value={password || ''}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setBiddingInfo({
                          ...biddingInfo,
                          pdfPassword: e.target.value,
                        })
                      }}
                    />
                    <div className="flex justify-center items-center w-[10%] h-[40px] cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setPasswordActive(!passwordActive)}
                    >
                      {passwordActive ? (
                        <LiaEyeSolid className="cursor-pointer" />
                      ) : (
                        <LiaEyeSlashSolid className="cursor-pointer" />
                      )}
                    </div>
                  </div>
                  <div
                    className="flex w-[25%] h-[40px] bg-mySelect border-[1px] border-gray-300 justify-center items-center rounded-md"
                    onClick={onClickPdf}
                  >
                    <span className="flex text-black text-center md:text-[18px] text-[15px] leading-[135%] tracking-[-2%] not-italic font-semibold font-['suit'] cursor-pointer">
                      생성하기
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {!biddingInfo.isFileCreated && (
              <div className="flex mt-[30px]">
                <span className="text-red-500 md:text-[18px] text-[15px] font-medium leading-[135%] tracking-[-1%]">
                  파일을 생성해주세요
                </span>
              </div>
            )}
            {biddingInfo.isFileCreated && (
              <div className="flex mt-[30px]">
                <span className="md:text-[18px] text-[15px] font-medium text-myBlue leading-[135%] tracking-[-1%]">
                  입찰표 파일이 다운로드 되었습니다
                </span>
              </div>
            )}
          </div>
          <Button 
            nextText='준비서류를 확인합니다'
            handleNextStep={() => biddingInfo.isFileCreated ? setStateNum(stateNum + 1) : alert('파일을 생성해주세요')}
            handlePrevStep={handlePrevStep}
          />
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center w-[100%] mx-auto bg-mybg h-screen">
          <Spinner />
        </div>
      )}
      <div className='hidden flex-col' id='capture'>
        {totalResult && (
          <CoverPage totalResult={totalResult} />)}
        {totalResult && totalResult.bidders.length > 1 && (
          <CoIpchalPDF totalResult={totalResult} handlePrice={handlePrice} handleDepositPrice={handleDepositPrice} />
        )}
        {totalResult && totalResult.bidders.length === 1 && (
          <SinglePDF totalResult={totalResult} handlePrice={handlePrice} handleDepositPrice={handleDepositPrice} />
        )}
      </div>
    </>
  )
}
