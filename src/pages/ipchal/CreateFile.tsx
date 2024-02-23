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
import Button from '@/components/shared/ButtonCp'

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
  const captureDiv = document && document.getElementById('capture') as HTMLElement
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
        //  4-2. 입찰자가 3명 이상일 때
        setGetHeight(1160 + (290 * Math.ceil(totalResult?.bidders.length! / 10)))
        setPageNum(6 + Math.ceil(totalResult?.bidders.length! / 10))
      } else if (biddingInfo.bidderNum > 10 && (mandateNumber && mandateNumber > 3)) {
        setGetHeight(870 + (290 * Math.ceil(totalResult?.bidders.length! / 10)) + (295 * Math.ceil(mandateNumber / 3)))
        setPageNum(3 + Math.ceil(totalResult?.bidders.length! / 10) + Math.ceil(mandateNumber / 3))
      } else if (biddingInfo.bidderNum <= 10 && (mandateNumber && mandateNumber > 3)) {
        setGetHeight(1160 + (290 * Math.ceil(mandateNumber / 3)))
        setPageNum(4 + Math.ceil(mandateNumber / 3))
      } else {
        setGetHeight(1450)
        setPageNum(5)
      }
    }
  }

  const handleGeneratePDF = async () => {  
    captureDiv && captureDiv.style.display === 'none' ? captureDiv.style.display = 'block' : captureDiv.style.display = 'none'
    const responese = await axios
    .post( 
      "http://210.16.195.57:4000/download",
      {
        html: `${htmlElement}`,
        mstSeq: biddingInfo.mstSeq,
        password: password,
        name: fileName,
        pageNum: pageNum,
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
    });
    captureDiv && captureDiv.style.display === 'block' ? captureDiv.style.display = 'none' : captureDiv.style.display = 'none'
}

  useEffect(() => {
    handleGetHeight()
  }, [biddingInfo.agentName, biddingInfo.bidderNum])

  let htmlElement = ''

  const handleHtml = () => {
    const captureDiv = document.getElementById('capture') as HTMLElement
    if (captureDiv) {
      htmlElement = captureDiv.innerHTML
    }
  }

  const onCapture = async () => {
    if (captureDiv) {
      handleHtml()
      await handleGeneratePDF()
    }
  }

  const onClickPdf = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    if (password.length < 4 || password === '') {
      alert('파일 암호를 4자리 이상 입력해주세요')
      setLoading(false)
      return
    } else if (biddingInfo.isFileCreated) {
      alert('이미 파일이 생성되었습니다')
      setLoading(false)
      return
    } 
    else {
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
    setFileName(`${'best'}_` + format(date, 'yyyyMMddHHmmss'))
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
        <div className="flex w-[100%] md:h-[100vh] h-[90vh] justify-center bg-white relative">
          <div className="flex flex-col gap-4 md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative md:pt-[100px] pt-[50px]">
            <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
              파일명과 암호를 입력하세요
            </span>
            <div className="flex flex-col gap-5 md:w-[550px] w-[90%] h-[200px] justify-center items-left bg-white mt-[30px] rounded-md border-gray-400">
              <div className="flex flex-col justify-start text-left gap-3">
                <span className="text-black text-[1rem] font-extrabold not-italic font-NanumGothic leading-[9px] ml-[5%]">
                  파일이름
                </span>
                <input
                  aria-label='파일 이름'
                  className="w-[90%] h-[40px] border border-gray-300 rounded-md ml-[5%] focus:outline-2 focus:outline-myyellow"
                  value={`${'best'}_` + format(date, 'yyyyMMddHHmmss')}
                  onChange={(e) => {
                    setFileName(e.target.value)
                  }} 
                />
              </div>
              <div className="flex flex-col justify-start text-left gap-3 relative">
                <span className="text-black text-[1rem] font-extrabold not-italic font-NanumGothic leading-[9px] ml-[5%]">
                  파일암호
                </span>
                <input
                  aria-label='파일 암호'
                  type={`${passwordActive ? 'text' : 'password'}`}
                  className="block w-[90%] h-[40px] border border-gray-300 rounded-md ml-[5%] focus:outline-2 focus:outline-myyellow"
                  value={password || ''}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setBiddingInfo({
                      ...biddingInfo,
                      pdfPassword: e.target.value,
                    })
                  }}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-8 pt-5 cursor-pointer"
                  onClick={() => setPasswordActive(!passwordActive)}
                >
                  {passwordActive ? (
                    <LiaEyeSolid className="cursor-pointer" />
                  ) : (
                    <LiaEyeSlashSolid className="cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
            <div
              className="flex w-[293px] h-[35px] bg-mygold border-[1px] border-gray-300 justify-center items-center rounded-md mt-[30px]"
              onClick={onClickPdf}
            >
              <span className="flex text-white text-center text-[1rem] not-italic font-extrabold leading-[15px] font-NanumGothic cursor-pointer">
                파일만들기
              </span>
            </div>
            {!biddingInfo.isFileCreated && (
              <div className="flex mt-[30px]">
                <span className="text-red-500 md:text-[0.9rem] text-[0.8rem] font-bold">
                  파일을 생성해주세요
                </span>
              </div>
            )}
            {biddingInfo.isFileCreated && (
              <div className="flex mt-[30px]">
                <span className="text-[15px] font-bold text-green-500">
                  파일이 생성되었습니다
                </span>
              </div>
            )}
          </div>
          <Button 
            nextText='다음'
            handleNextStep={() => setStateNum(stateNum + 1)}
            handlePrevStep={handlePrevStep}
          />
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center md:w-[50%] w-[100%] mx-auto bg-mybg h-screen">
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
