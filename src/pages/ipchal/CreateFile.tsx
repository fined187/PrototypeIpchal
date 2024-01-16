import { biddingInfoState, stepState } from '@/atom'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia'
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import IpchalText from '@/components/CoIpchalContent/IpchalText'
import { format } from 'date-fns'
import CoIpchalFormContent from '@/components/PDFContent/CoIpchalFormContent'
import CoIpchalListContent from '@/components/PDFContent/CoIpchalListContent'
import AgentListFormContent from '@/components/PDFContent/AgentListFormContent'
import Spinner from '@/components/Spinner'

export default function CreateFile() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)
  const [passwordActive, setPasswordActive] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [totalResult, setTotalResult] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [blobFile, setBlobFile] = useState<File | null>(null)

  const [getHeight, setGetHeight] = useState<number>(0)

  let file = File && new File([], '')

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

  const handleGetHeight = () => {
    //  1. 입찰자가 1명일 때 + 대리인이 없을 때
    if (biddingInfo.agentName === '' && biddingInfo.bidderNum === 1) {
      setGetHeight(295)
    } else if (biddingInfo.agentName !== '' && biddingInfo.bidderNum === 1) {
      //  2. 입찰자가 1명일 때 + 대리인이 있을 때
      setGetHeight(600)
    } else if (biddingInfo.agentName === '' && biddingInfo.bidderNum > 1) {
      //  3. 입찰자가 2명 이상일 때 + 대리인이 없을 때
      setGetHeight(890)
    } else if (biddingInfo.agentName !== '' && biddingInfo.bidderNum > 1) {
      //  4. 입찰자가 2명 이상일 때 + 대리인이 있을 때
      if (biddingInfo.bidderNum === 2) {
        //  4-1. 입찰자가 2명일 때
        setGetHeight(1200)
      } else {
        //  4-2. 입찰자가 3명 이상일 때
        setGetHeight(1180)
      }
    }
  }

  useEffect(() => {
    handleGetHeight()
  }, [biddingInfo.agentName, biddingInfo.bidderNum])

  const onCapture = async () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      encryption: {
        userPassword: password,
        ownerPassword: password,
        userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
      },
    })
    const captureWrap = document && document.getElementById('wrap-capture') as HTMLElement
    const captureDiv = document && document.getElementById('capture') as HTMLElement
    captureWrap.style.display = 'flex'
    captureDiv.style.display = 'flex'
    await html2canvas(
      document.getElementById('capture') as HTMLElement
    ).then((canvas: any) => {
      let imgData = canvas.toDataURL('image/png')
      let imgWidth = 210
      let pageHeight = 295
      let imgHeight = getHeight
      let heightLeft = imgHeight
      let position = 0

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      while (heightLeft >= 20) {
        position = heightLeft - imgHeight
        doc.addPage()
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      const blob = doc.output('blob')
      //  저장
      doc.save(`best_${format(date, 'yyyyMMddHHmmss')}.pdf`)
      file = new File([blob], `best_${format(date, 'yyyyMMddHHmmss')}.pdf`, {
        type: 'application/pdf',
      })
      setBlobFile(file)
      setBiddingInfo({
        ...biddingInfo,
        pdfFile: file,
        isFileCreated: true,
      })
    })
    captureWrap.style.display = 'none'
    captureDiv.style.display = 'none'
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

  const handleUploadFile = async () => {
    setLoading(true)
    const formData = new FormData()
    if (blobFile) {
      formData.append('file', blobFile)
    }
    formData.append('filePassword', password)
    try {
      const response = await axios.post(
        `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      if (response.status === 200) {
        setLoading(false)
        return
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleNextStep = async () => {
    if (biddingInfo.isFileCreated) {
      await handleUploadFile()
      setStateNum(stateNum + 1)
    } else {
      alert('파일을 생성해주세요')
    }
  }

  useEffect(() => {
    setLoading(true)
    const handleGetResult = async () => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}`,
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
        <div className="flex w-[100%] h-screen justify-center bg-white relative">
          <div className="flex flex-col gap-4 md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative">
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
              파일명과 암호를 입력하세요
            </span>
            <div className="flex flex-col gap-5 md:w-[550px] w-[90%] h-[200px] justify-center items-left bg-white absolute top-[130px] rounded-md border-gray-400">
              <div className="flex flex-col justify-start text-left gap-3">
                <span className="text-black text-[15px] font-extrabold not-italic font-NanumGothic leading-[9px] ml-[5%]">
                  파일이름
                </span>
                <input
                  className="w-[90%] h-[40px] border border-gray-300 rounded-md ml-[5%]"
                  value={'best_' + format(date, 'yyyyMMddHHmmss')}
                  onChange={(e) => {
                    setFileName(e.target.value)
                  }}
                />
              </div>
              <div className="flex flex-col justify-start text-left gap-3 relative">
                <span className="text-black text-[15px] font-extrabold not-italic font-NanumGothic leading-[9px] ml-[5%]">
                  파일암호
                </span>
                <input
                  type={`${passwordActive ? 'text' : 'password'}`}
                  className="block w-[90%] h-[40px] border border-gray-300 rounded-md ml-[5%]"
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
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
              className="flex w-[293px] h-[35px] bg-mygold border-[1px] border-gray-300 justify-center items-center rounded-md absolute top-[400px]"
              onClick={(e) => {
                onClickPdf(e)
              }}
            >
              <span className="flex text-white text-center text-[18px] not-italic font-extrabold leading-[15px] font-NanumGothic cursor-pointer">
                파일만들기
              </span>
            </div>
            {!biddingInfo.isFileCreated && (
              <div className="flex absolute top-[450px]">
                <span className="text-red-500 text-[15px] font-bold">
                  파일을 생성해주세요
                </span>
              </div>
            )}
            {biddingInfo.isFileCreated && (
              <div className="flex absolute top-[450px]">
                <span className="text-[15px] font-bold text-green-500">
                  파일이 생성되었습니다
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center items-center md:w-[550px] w-[90%] gap-[10px] absolute top-[600px]">
            <button
              type="button"
              className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
              onClick={() => {
                biddingInfo.isFileCreated ? alert('파일이 생성되어 이전 단계로 되돌아갈 수 없습니다.') : setStateNum(11)
              }}
            >
              <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                이전
              </span>
            </button>
            <button
              type="button"
              className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
              onClick={handleNextStep}
            >
              <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                다음
              </span>
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center md:w-[50%] w-[100%] mx-auto bg-mybg h-screen">
          <Spinner />
        </div>
      )}
      {totalResult && totalResult.bidders.length > 1 && (
          <>
            <div className={`hidden flex-col ${totalResult && totalResult.agentYn === 'Y' ? 'h-[5200px]' : 'h-[3900px]'} w-[60%] justify-center items-center mx-auto`} id="wrap-capture">
              <div className="flex flex-col h-[100%] w-[100%] justify-center items-center" id="capture">
                <div className="flex flex-col bg-white max-h-[4000px] min-h-[1300px] h-[1300px] w-[100%] mx-auto relative justify-center items-center" >
                  <div className="flex flex-col bg-mybg md:w-[100%] h-[100%] w-[100%] mx-auto relative justify-center items-center">
                    <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
                      입찰표
                    </div>
                    <div className="min-w-[420px] md:max-w-[850px] overflow-x-scroll scrollbar-hide absolute top-[160px] h-[650px] bg-mybg">
                      <div className="border border-black text-[1.5rem] text-center md:w-[800px] w-[420px] h-[100%] m-auto bg-mybg">
                        {/* 첫 번째 박스 */}
                        <div className="p-[1%] pb-0 border-black border-b-[1px] h-[15%]">
                          <div className="text-left text-[14px]">(앞면)</div>
                          <div className="text-[19px] font-semibold">
                            기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                          </div>
                          <div className="flex flex-row justify-between items-stretch">
                            <div>
                              <span className="text-[12px] font-semibold font-NanumGothic">
                                {totalResult && totalResult.reqCourtName + ' 귀하'}
                              </span>
                            </div>
                            <div>
                              <span className="text-[12px] font-semibold font-NanumGothic">
                                입찰기일 :{' '}
                                {totalResult &&
                                  totalResult?.biddingDate?.substring(0, 4)}
                                년 {totalResult?.biddingDate?.substring(4, 6)}월{' '}
                                {totalResult?.biddingDate?.substring(6, 8)}일
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* 두 번째 박스 */}
                        <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[12%]">
                          <div className="border-black border-r-[1px] md:w-[5%] w-[10%] h-[100%] justify-center items-start">
                            <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                              사건 
                              <br />
                              번호
                            </span>
                          </div>
                          <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                            <span className="md:text-[12px] text-[12px] font-NanumGothic font-semibold">
                              {totalResult &&
                                totalResult.caseYear +
                                  ' 타경 ' +
                                  totalResult.caseDetail}
                            </span>
                          </div>
                          <div className="border-black border-r-[1px] md:w-[5%] w-[10%] justify-center items-center text-center h-[100%]">
                            <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                              물건 
                              <br />
                              번호
                            </span>
                          </div>
                          <div className="flex justify-center items-center text-center md:w-[44%] w-[40%]">
                            <span
                              className={
                                totalResult && totalResult?.mulNo
                                  ? 'text-[12px] font-bold font-NanumGothic'
                                  : 'text-[8px] font-bold font-NanumGothic'
                              }
                            >
                              {totalResult && totalResult?.mulNo
                                ? totalResult?.mulNo
                                : ''}
                            </span>
                          </div>
                        </div>
                        {/* 세 번째 박스 */}
                        <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                          <div className="flex justify-center items-center border-black border-r-[1px] w-[5.2%]">
                            <span className="text-[14px] font-bold font-NanumGothic">
                              입<br />찰<br />자
                            </span>
                          </div>
                          <div className="w-[100%] h-[100%]">
                            <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                              <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                                <span className="text-[14px] font-NanumGothic">본인</span>
                              </div>
                              <div className="flex flex-col w-[100%] h-[100%]">
                                <div className="flex flex-row items-stretc h-[30%]">
                                  <div className="flex justify-center items-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                                    <span className="text-[12px]">성명</span>
                                  </div>
                                </div>
                                <div className="flex flex-row">
                                  <div className="flex justify-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                                    <span className="text-[12px] font-NanumGothic">
                                      주민(사업자)
                                      <br />
                                      등록번호
                                    </span>
                                  </div>
                                  <div className="flex justify-center items-center w-[80%]">
                                    <span className="text-[15px] font-bold text-red-500">
                                      별첨 목록과 같음
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-row h-[40%]">
                                  <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                                    <span className="text-[12px] font-NanumGothic">주소</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                              <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                                <span className="text-[14px] font-NanumGothic">대리인</span>
                              </div>
                              <div className="w-[90%]">
                                <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                                  <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                                    <span className="text-[12px]">성명</span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                                    <span className="text-[12px]">
                                      {biddingInfo.bidder === 'agent' ? biddingInfo.agentName : ''}
                                    </span>
                                    <span className="text-[12px] mr-1">(인)</span>
                                  </div>
                                  <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                    <span className="text-[12px]">
                                      본인과의
                                      <br />
                                      관계
                                    </span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[30%]">
                                    <span className="text-[12px]">
                                      {biddingInfo.bidder === 'agent' ? biddingInfo.agentRel : '-'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                                  <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                    <span className="text-[12px] font-NanumGothic">
                                      주민등록번호
                                    </span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                                    <span className="font-NanumGothic text-[12px]">
                                      {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 14) : '-'}
                                    </span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                                    <span className="text-[12px] font-NanumGothic">
                                      전화번호
                                    </span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[30%]">
                                    <span className="text-[12px] font-NanumGothic">
                                      {biddingInfo.bidder === 'agent' ? biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3 : '-'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-row justify-between items-stretch h-[30%]">
                                  <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                                    <span className="text-[12px] font-NanumGothic">주소</span>
                                  </div>
                                  <div className="flex justify-center items-center text-center w-[80%]">
                                    <span className="text-[12px] font-NanumGothic">
                                      {biddingInfo.bidder === 'agent' ? biddingInfo.agentAddr : '-'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 네 번째 박스 */}
                        <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[25%]">
                          <div className="w-[4%] border-black border-r-[1px] h-[100%]">
                            <span className="text-[14px] font-NanumGothic font-bold">
                              입
                              <br />
                              찰
                              <br />
                              가
                              <br />
                              격
                            </span>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">천억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 1) === '0'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(0, 1)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">백억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 2) === '00'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(1, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">십억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 3) === '000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(2, 3)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 4) === '0000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(3, 4)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">천만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 5) === '00000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(4, 5)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">백만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 6) === '000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(5, 6)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">십만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 7) === '0000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(6, 7)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 8) === '00000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(7, 8)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">천</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 9) === '000000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(8, 9)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">백</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 10) === '0000000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(9, 10)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">십</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 11) === '00000000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(10, 11)}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">일</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                handlePrice(
                                  totalResult?.bidPrice?.toString().length,
                                )?.substring(0, 12) === '000000000000'
                                  ? ''
                                  : totalResult &&
                                    handlePrice(
                                      totalResult?.bidPrice?.toString().length,
                                    )?.substring(11, 12)}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                            <span className="text-[15px] font-NanumGothic font-bold">원</span>
                          </div>
                          <div className="w-[4%] border-black border-r-[1px]">
                            <span className="text-[14px] font-NanumGothic font-bold">
                              보
                              <br />
                              증
                              <br />
                              금
                              <br />액
                            </span>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">천억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                totalResult?.bidDeposit?.toString().length === 12
                                  ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">백억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 2) === '00'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(1, 2))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">십억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 3) === '000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(2, 3))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">억</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 4) === '0000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(3, 4))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">천만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 5) === '00000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(4, 5))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">백만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 6) === '000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(5, 6))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic">십만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 7) === '0000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(6, 7))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">만</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 8) === '00000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(7, 8))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">천</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 9) === '000000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(8, 9))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">백</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 10) === '0000000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(9, 10))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">십</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 11) === '00000000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(10, 11))}
                              </span>
                            </div>
                          </div>
                          <div className="w-[3%]">
                            <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                              <span className="text-[12px] font-NanumGothic text-mybg">
                                <br />
                              </span>
                              <span className="text-[12px] font-NanumGothic">일</span>
                            </div>
                            <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                              <span className="text-[12px] font-NanumGothic font-bold">
                                {totalResult &&
                                  (handleDepositPrice(
                                    totalResult?.bidDeposit?.toString().length,
                                  )?.substring(0, 12) === '000000000000'
                                    ? ''
                                    : totalResult &&
                                      handleDepositPrice(
                                        totalResult?.bidDeposit?.toString().length,
                                      )?.substring(11, 12))}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center items-center w-[5%]">
                            <span className="text-[15px] font-NanumGothic font-bold">원</span>
                          </div>
                        </div>
                        {/* 다섯 번째 박스 */}
                        <div className="flex flex-row justify-between items-stretch w-[100%] h-[8%]">
                          <div className="flex flex-row justify-around items-stretch w-[49.9%] py-[10px] border-black border-r-[2px]">
                            <div className='flex justify-start w-[50%] h-[100%] ml-[10px]'>
                              <span className="text-[12px] font-NanumGothic font-bold">
                                보증의 제공방법
                              </span>
                            </div>
                            <div className="flex flex-col justify-end w-[50%] h-[100%]">
                              <div className="flex flex-row w-[100%]">
                                <input
                                  type="checkbox"
                                  checked={biddingInfo.bidWay === 'M' ? true : false}
                                  className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                                  readOnly
                                />
                                <span className="text-[12px] font-bold mt-1">현금</span>
                              </div>
                              <div className="flex flex-row w-[100%]">
                                <input
                                  type="checkbox"
                                  checked={biddingInfo.bidWay === 'W' ? true : false}
                                  className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                                  readOnly
                                />
                                <span className="text-[12px] font-bold mt-1">
                                  보증서
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                            <div className="flex justify-start">
                              <span className="text-[12px] font-NanumGothic font-bold ml-[10px]">
                                보증을 반환 받았습니다.
                              </span>
                            </div>
                            <div className="flex justify-end">
                              <span className="text-[12px] font-NanumGothic font-bold mr-[10px]">
                                본인 또는 대리인{' '}
                                {totalResult && totalResult.agentYn === 'Y' ? totalResult && totalResult.agent.name : totalResult && totalResult.bidders[0].name} (인)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <IpchalText />
                  </div>
                </div>
                <CoIpchalFormContent totalResult={totalResult} />
                <CoIpchalListContent totalResult={totalResult} />
                {totalResult && totalResult.agentYn === 'Y' && (
                  <AgentListFormContent totalResult={totalResult} />
                )}
              </div>
            </div>
          </>
      )}
      {totalResult && totalResult.bidders.length === 1 && (
        <>
          <div className={`hidden flex-col bg-white max-h-[2600px] ${totalResult && totalResult.agentYn === 'Y' ? 'h-[2600px]' : 'h-[1300px]'} w-[60%] mx-auto relative justify-center items-center`} id="wrap-capture">
            <div className="flex flex-col h-[100%] w-[100%] justify-center items-center" id="capture">
              <div className="flex flex-col bg-white max-h-[4000px] min-h-[1300px] h-[1300px] w-[100%] mx-auto relative justify-center items-center" >
                <div className="flex flex-col bg-mybg md:w-[100%] h-[100%] w-[100%] mx-auto relative justify-center items-center">
                  <div className="w-[100%] text-[22px] font-bold py-[30px] absolute top-0 bg-mybg justify-center item-center text-center">
                    입찰표
                  </div>
                  <div className="min-w-[420px] md:max-w-[850px] overflow-x-scroll scrollbar-hide absolute top-[160px] h-[650px] bg-mybg">
                    <div className="border border-black text-[1.5rem] text-center md:w-[800px] w-[420px] h-[100%] m-auto bg-mybg">
                      {/* 첫 번째 박스 */}
                      <div className="p-[1%] pb-0 border-black border-b-[1px] h-[15%]">
                        <div className="text-left text-[14px]">(앞면)</div>
                        <div className="text-[19px] font-semibold">
                          기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                        </div>
                        <div className="flex flex-row justify-between items-stretch">
                          <div>
                            <span className="text-[12px] font-semibold font-NanumGothic">
                              {totalResult && totalResult.reqCourtName + ' 귀하'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[12px] font-semibold font-NanumGothic">
                              입찰기일 :{' '}
                              {totalResult &&
                                totalResult?.biddingDate?.substring(0, 4)}
                              년 {totalResult?.biddingDate?.substring(4, 6)}월{' '}
                              {totalResult?.biddingDate?.substring(6, 8)}일
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* 두 번째 박스 */}
                      <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[12%]">
                        <div className="border-black border-r-[1px] md:w-[5%] w-[10%] h-[100%] justify-center items-start">
                          <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                            사건 
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                          <span className="md:text-[12px] text-[12px] font-NanumGothic font-semibold">
                            {totalResult &&
                              totalResult.caseYear +
                                ' 타경 ' +
                                totalResult.caseDetail}
                          </span>
                        </div>
                        <div className="border-black border-r-[1px] md:w-[5%] w-[10%] justify-center items-center text-center h-[100%]">
                          <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                            물건 
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center md:w-[44%] w-[40%]">
                          <span
                            className={
                              totalResult && totalResult?.mulNo
                                ? 'text-[12px] font-bold font-NanumGothic'
                                : 'text-[8px] font-bold font-NanumGothic'
                            }
                          >
                            {totalResult && totalResult?.mulNo
                              ? totalResult?.mulNo
                              : ''}
                          </span>
                        </div>
                      </div>
                      {/* 세 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[5.2%]">
                          <span className="text-[14px] font-bold font-NanumGothic">
                            입<br />찰<br />자
                          </span>
                        </div>
                        <div className="w-[100%] h-[100%]">
                          <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                            <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                              <span className="text-[14px] font-NanumGothic">본인</span>
                            </div>
                            <div className="flex flex-col w-[100%] h-[100%]">
                              <div className="flex flex-row items-stretch border-black border-b-[1px] h-[30%]">
                                <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[12px]">성명</span>
                                </div>
                                <div className="flex justify-center text-center items-center border-black border-r-[1px] w-[30%]">
                                  <span className="text-[12px] font-NanumGothic">
                                    {totalResult && totalResult?.bidders?.length > 1
                                      ? ''
                                      : totalResult && totalResult?.bidders[0]?.name}
                                  </span>
                                  <span className="mr-1 text-[12px] float-right">
                                    (인)
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[12px]">전화번호</span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%]">
                                  <span className="text-[12px]">
                                    {
                                      totalResult && totalResult?.bidders[0]?.phoneNo.length === 10 ?
                                      (totalResult && (totalResult?.bidders[0]?.phoneNo?.substring(0, 2) + '-' + totalResult?.bidders[0]?.phoneNo?.substring(2, 6) + '-' + totalResult?.bidders[0]?.phoneNo?.substring(6, 10))) : 
                                      (totalResult && (totalResult?.bidders[0]?.phoneNo?.substring(0, 3) + '-' + totalResult?.bidders[0]?.phoneNo?.substring(3, 7) + '-' + totalResult?.bidders[0]?.phoneNo?.substring(7, 11)))
                                    }
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row border-black border-b-[1px]">
                                <div className="flex justify-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[12px] font-NanumGothic">
                                    주민(사업자)
                                    <br />
                                    등록번호
                                  </span>
                                </div>
                                <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center">
                                  <span className="text-[12px] font-NanumGothic">
                                    {biddingInfo.bidCorpYn[0] === 'I' ? (
                                      biddingInfo.bidIdNum1 + '-' + biddingInfo.bidIdNum2
                                    ): (
                                      biddingInfo.bidCorpNum1 + '-' + biddingInfo.bidCorpNum2 + '-' + biddingInfo.bidCorpNum3
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[12px]">
                                    법인등록
                                    <br />
                                    번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center w-[30%] text-center">
                                  <span className="text-[12px] font-NanumGothic">
                                    {totalResult && totalResult?.bidders?.length > 1
                                      ? ''
                                      : totalResult &&
                                        totalResult?.bidders[0]?.corporationNo}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row h-[40%]">
                                <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                                  <span className="text-[12px] font-NanumGothic">주소</span>
                                </div>
                                <div className="flex justify-center items-center w-[80%]">
                                  <span className="text-[12px] font-NanumGothic">
                                    {totalResult && totalResult?.bidders?.length > 1
                                      ? ''
                                      : totalResult &&
                                        totalResult?.bidders[0]?.address}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                            <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                              <span className="text-[14px] font-NanumGothic">대리인</span>
                            </div>
                            <div className="w-[90%]">
                              <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                                <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                                  <span className="text-[12px]">성명</span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                                  <span className="text-[12px]">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentName : ''}
                                  </span>
                                  <span className="text-[12px] mr-1">(인)</span>
                                </div>
                                <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[12px]">
                                    본인과의
                                    <br />
                                    관계
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%]">
                                  <span className="text-[12px]">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentRel : '-'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                                <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[12px] font-NanumGothic">
                                    주민등록번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                                  <span className="font-NanumGothic text-[12px]">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 14) : '-'}
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[12px] font-NanumGothic">
                                    전화번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%]">
                                  <span className="text-[12px] font-NanumGothic">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3 : '-'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-stretch h-[30%]">
                                <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[12px] font-NanumGothic">주소</span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[80%]">
                                  <span className="text-[12px] font-NanumGothic">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentAddr : '-'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 네 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[25%]">
                        <div className="w-[4%] border-black border-r-[1px] h-[100%]">
                          <span className="text-[12px] font-NanumGothic font-bold">
                            입
                            <br />
                            찰
                            <br />
                            가
                            <br />
                            격
                          </span>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">천억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 1) === '0'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(0, 1)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">백억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 2) === '00'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(1, 2)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">십억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 3) === '000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(2, 3)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 4) === '0000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(3, 4)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">천만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 5) === '00000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(4, 5)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">백만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 6) === '000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(5, 6)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">십만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 7) === '0000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(6, 7)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 8) === '00000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(7, 8)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">천</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 9) === '000000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(8, 9)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">백</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 10) === '0000000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(9, 10)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">십</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 11) === '00000000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(10, 11)}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">일</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              handlePrice(
                                totalResult?.bidPrice?.toString().length,
                              )?.substring(0, 12) === '000000000000'
                                ? ''
                                : totalResult &&
                                  handlePrice(
                                    totalResult?.bidPrice?.toString().length,
                                  )?.substring(11, 12)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                          <span className="text-[15px] font-NanumGothic font-bold">원</span>
                        </div>
                        <div className="w-[4%] border-black border-r-[1px]">
                          <span className="text-[14px] font-NanumGothic font-bold">
                            보
                            <br />
                            증
                            <br />
                            금
                            <br />액
                          </span>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">천억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                              totalResult?.bidDeposit?.toString().length === 12
                                ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                                : ''}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">백억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 2) === '00'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(1, 2))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">십억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 3) === '000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(2, 3))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 4) === '0000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(3, 4))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">천만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 5) === '00000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(4, 5))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">백만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 6) === '000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(5, 6))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic">십만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 7) === '0000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(6, 7))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 8) === '00000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(7, 8))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">천</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 9) === '000000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(8, 9))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">백</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 10) === '0000000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(9, 10))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">십</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 11) === '00000000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(10, 11))}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                            <span className="text-[12px] font-NanumGothic text-mybg">
                              <br />
                            </span>
                            <span className="text-[12px] font-NanumGothic">일</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[12px] font-NanumGothic font-bold">
                              {totalResult &&
                                (handleDepositPrice(
                                  totalResult?.bidDeposit?.toString().length,
                                )?.substring(0, 12) === '000000000000'
                                  ? ''
                                  : totalResult &&
                                    handleDepositPrice(
                                      totalResult?.bidDeposit?.toString().length,
                                    )?.substring(11, 12))}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                          <span className="text-[15px] font-NanumGothic font-bold">원</span>
                        </div>
                      </div>
                      {/* 다섯 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch w-[100%] h-[8%]">
                        <div className="flex w-[50%] border-black border-r-[2px] h-[100%]">
                          <div className='flex justify-start w-[50%] h-[100%] ml-[10px]'>
                            <span className="text-[12px] font-NanumGothic font-bold">
                              보증의 제공방법
                            </span>
                          </div>
                          <div className="flex flex-col justify-end w-[50%] h-[100%]">
                            <div className="flex flex-row w-[100%]">
                              <input
                                type="checkbox"
                                checked={biddingInfo.bidWay === 'M' ? true : false}
                                className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-1 indeterminate:bg-white"
                                readOnly
                              />
                              <span className="text-[12px] font-bold">현금</span>
                            </div>
                            <div className="flex flex-row w-[100%]">
                              <input
                                type="checkbox"
                                checked={biddingInfo.bidWay === 'W' ? true : false}
                                className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-1 indeterminate:bg-white"
                                readOnly
                              />
                              <span className="text-[12px] font-bold mt-1">
                                보증서
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                          <div className="flex justify-start">
                            <span className="text-[12px] font-NanumGothic font-bold ml-[10px]">
                              보증을 반환 받았습니다.
                            </span>
                          </div>
                          <div className='flex justify-end'>
                            <span className="text-[12px] font-NanumGothic font-bold mr-[10px]">
                              본인 또는 대리인{' '}
                              {totalResult && totalResult.agentYn === 'Y' ? totalResult.agent.name : totalResult.bidders[0].name} (인)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <IpchalText />
                </div>
              </div>
              {totalResult && totalResult.agentYn === 'Y' && (
                <AgentListFormContent totalResult={totalResult} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
