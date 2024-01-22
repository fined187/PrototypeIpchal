import { biddingInfoState, stepState } from '@/atom'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia'
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { format } from 'date-fns'
import AgentListFormContent from '@/components/PDFContent/AgentListFormContent'
import Spinner from '@/components/Spinner'
import { TotalResultType } from '@/interface/IpchalType'
import CoIpchalFormContent from '@/components/PDFContent/CoIpchalFormContent'
import CoIpchalListContent from '@/components/PDFContent/CoIpchalListContent'

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
        setGetHeight(1195)
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
    if (captureWrap && captureDiv) {
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
        setBiddingInfo({
          ...biddingInfo,
          imageFile: imgData,
        })
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
        // doc.save(`best_${format(date, 'yyyyMMddHHmmss')}.pdf`)
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
  }
  
  const onClickPdf = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    if (password.length < 4 || password === '') {
      alert('파일 암호를 4자리 이상 입력해주세요')
      setLoading(false)
      return
    // } else if (biddingInfo.isFileCreated) {
    //   alert('이미 파일이 생성되었습니다')
    //   setLoading(false)
    //   return
    } 
    else {
      await onCapture()
      setLoading(false)
    }
  }

  console.log(biddingInfo)

  const handleUploadFile = async () => {
    setLoading(true)
    const formData = new FormData()
    if (blobFile) {
      formData.append('file', blobFile)
    }
    formData.append('filePassword', password)
    console.log(formData)
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
        console.log(response)
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
            <div className={`hidden flex-col ${totalResult && totalResult.agentYn === 'Y' ? 'h-[5200px]' : 'h-[3900px]'} w-[50%] justify-center items-center mx-auto`} id="wrap-capture">
              <div className="hidden flex-col h-[100%] w-[100%] justify-center items-center" id="capture">
                <div className="flex flex-col bg-white h-[100%] w-[100%] mx-auto relative justify-center items-center">
                  <div className="min-w-[400px] md:max-w-[850px] overflow-x-scroll absolute top-[130px] h-[600px] bg-white scrollbar-hide">
                    <div className="border border-black text-[1.5rem] md:w-[800px] w-[100%] h-[100%] m-auto bg-white">
                      {/* 첫 번째 박스 */}
                      <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
                        <div className="absolute top-[0px] left-[0px] w-[100%] pl-[5px]">
                          <span className="text-left text-[11pt] leading-[-1px]">
                            (앞면)
                          </span>
                        </div>
                        <div className="justify-center items-center text-center absolute top-[30%] w-[100%]">
                          <span className="text-[15pt] tracking-[20pt] leading-[23px] font-bold font-batang">
                            기일입찰표
                          </span>
                        </div>
                        <div className="flex justify-between w-[100%] absolute bottom-[0px]">
                          <div>
                            <span className="pl-[3px] text-[11pt] leading-[-1px] font-batang">
                              {totalResult && totalResult.reqCourtName + ' 집행관 귀하'}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11pt] leading-[-1px] font-batang pr-[3px]">
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
                      <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
                        <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                          <span className="text-[11pt] font-batang">
                            사건 
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                          <span className="text-[11pt] font-batang">
                            {totalResult &&
                              totalResult.caseYear +
                                ' 타경 ' +
                                totalResult.caseDetail + '호'}
                          </span>
                        </div>
                        <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                          <span className="text-[11pt] font-batang">
                            물건 
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                          <span className={`text-[11pt] font-batang`}
                          >
                            {totalResult && totalResult?.mulNo
                              ? totalResult?.mulNo
                              : '1'}
                          </span>
                          <span className={`text-[11pt] font-batang`}>
                            ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                          </span>
                        </div>
                      </div>
                      {/* 세 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[50%]">
                        <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5.2%]">
                          <span className="text-[11pt] font-batang">
                            입<br />찰<br />자
                          </span>
                        </div>
                        <div className="w-[100%] h-[100%]">
                          <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                            <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                              <span className="text-[11pt] font-batang">본인</span>
                            </div>
                            <div className="flex flex-col w-[100%] h-[100%]">
                              <div className="flex flex-row items-stretc h-[30%]">
                                <div className="flex justify-center items-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                                  <span className="text-[11pt] font-batang">성&nbsp;&nbsp;명</span>
                                </div>
                              </div>
                              <div className="flex flex-row h-[30%]">
                                <div className="flex justify-center text-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                                  <span className="text-[11pt] font-batang">
                                    주민(사업자)
                                    <br />
                                    등록번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center w-[80%]">
                                  <span className="text-[15px] font-batang font-bold text-red-500">
                                    별첨 목록과 같음
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row h-[40%]">
                                <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                                  <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                            <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                              <span className="text-[14px] font-batang">대리인</span>
                            </div>
                            <div className="w-[90%]">
                              <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                                <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                                  <span className="text-[11pt] font-batang text-center">성&nbsp;&nbsp;명</span>
                                </div>
                                <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                                  <div className="flex w-[60%] justify-end">
                                    <span className="text-[11pt] font-batang text-center">
                                      {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName : ''}
                                    </span>
                                  </div>
                                  <div className="flex w-[40%] justify-end mr-1">
                                    <span className="text-[11pt] font-batang text-center">(인)</span>
                                  </div>
                                </div>
                                <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[11pt] font-batang text-center">
                                    본인과의
                                    <br />
                                    관계
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%]">
                                  <span className="text-[11pt] font-batang text-center">
                                    {biddingInfo.bidder === 'agent' && biddingInfo.agentRel ? biddingInfo.agentRel : ''}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                                <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[11pt] font-batang text-center">
                                    주민등록번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                                  <span className="text-[11pt] font-batang text-center">
                                    {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) +
                                      '-' +
                                      biddingInfo.agentIdNum.substring(6, 14) : ''}
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                                  <span className="text-[11pt] font-batang text-center">
                                    전화번호
                                  </span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[30%]">
                                  <span className="text-[11pt] font-batang text-center">
                                    {
                                      totalResult && totalResult?.agent !== null ? 
                                      totalResult?.agent?.phoneNo.length === 10 ?
                                      totalResult?.agent?.phoneNo.substring(0, 2) + '-' + totalResult?.agent?.phoneNo.substring(2, 6) + '-' + totalResult?.agent?.phoneNo.substring(6, 10) 
                                        : totalResult?.agent?.phoneNo.substring(0, 3) + '-' + totalResult?.agent?.phoneNo.substring(3, 7) + '-' + totalResult?.agent?.phoneNo.substring(7, 11) : '-'
                                    }
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-stretch h-[30%]">
                                <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                                  <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                                </div>
                                <div className="flex justify-center items-center text-center w-[80%]">
                                  <span className="text-[11pt] font-batang text-center">
                                    {
                                      totalResult && totalResult?.agent !== null ? 
                                      totalResult?.agent?.address : ''
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 네 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[15%]">
                        <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                          <span className="text-[11pt] font-batang">
                            입찰
                            <br />
                            가격
                          </span>
                        </div>
                        <div className="w-[3%] h-[100%]">
                          <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                            <span className="text-[11pt] font-batang">천억</span>
                          </div>
                          <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">백억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px]  leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">십억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">천만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">백만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">십만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">천</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">백</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">십</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">일</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                        <div className="w-[27px]">
                          <div className="h-[100%] w-[100%] border-black border-r-[2px] leading-[70%] text-center">
                            <div className="h-[50%]">
                              <span className="text-[11pt] font-batang">
                                <br />
                              </span>
                            </div>
                            <div className="text-left mt-[10px]">
                              <span className="text-[15px] font-batang">
                                원
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                          <span className="text-[11pt] font-batang">
                            보증
                            <br />
                            금액
                          </span>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">천억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
                              {totalResult &&
                              totalResult?.bidDeposit?.toString().length === 12
                                ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                                : ''}
                            </span>
                          </div>
                        </div>
                        <div className="w-[3%]">
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">백억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">십억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">억</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">천만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">백만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">십만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">만</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">천</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">백</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">십</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                          <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                            <span className="text-[11pt] font-batang">
                              <br />
                            </span>
                            <span className="text-[11pt] font-batang">일</span>
                          </div>
                          <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                            <span className="text-[11pt] font-batang">
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
                        <div className="w-[27px]">
                          <div className="h-[100%] w-[100%] border-black leading-[70%] text-center">
                            <div className="h-[50%]">
                              <span className="text-[11pt] font-batang">
                                <br />
                              </span>
                            </div>
                            <div className="text-left mt-[10px]">
                              <span className="text-[11pt] font-batang">
                                원
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 다섯 번째 박스 */}
                      <div className="flex flex-row justify-between items-stretch w-[100%] h-[13.5%]">
                        <div className="flex flex-row w-[49.7%] border-black border-r-[2px] h-[100%]">
                          <div className='flex items-center justify-start w-[30%] h-[100%]'>
                            <span className="text-[11pt] text-left font-batang">
                              보증의 
                              <br />
                              제공방법
                            </span>
                          </div>
                          <div className="flex flex-col justify-center w-[70%] h-[100%]">
                            <div className="flex flex-row w-[100%]">
                              <input
                                type="checkbox"
                                checked={biddingInfo.bidWay === 'M' ? true : false}
                                className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                                readOnly
                              />
                              <span className="text-[11pt] mt-1">현금·자기앞수표</span>
                            </div>
                            <div className="flex flex-row w-[100%]">
                              <input
                                type="checkbox"
                                checked={biddingInfo.bidWay === 'W' ? true : false}
                                className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                                readOnly
                              />
                              <span className="text-[11pt] mt-1">
                                보증서
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                          <div className="flex justify-start">
                            <span className="text-[11pt] text-left font-batang ml-[10px]">
                              보증을 반환 받았습니다.
                            </span>
                          </div>
                          <div className='flex justify-center'>
                            <span className="text-[11pt] font-batang mr-[10px]">
                              본인 또는 대리인{' '}
                              {totalResult && totalResult.agent !== null ? totalResult && totalResult?.agent?.name + ' (인)' : totalResult && totalResult.bidders[0].name + ' (인)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[100%] absolute top-[750px] leading-[-1px] justify-center items-center">
                    <div className="flex flex-col md:w-[85%] w-[100%] text-left items-start justify-start">
                      <span className="text-[15pt] font-extrabold font-batang ">
                        주의사항
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        1. 입찰표는 물건마다 별도의 용지를 사용하십시오, 다만, 일괄입찰시에는 1매의 용지를 사용하십시오.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        2. 한 사건에서 입찳물건이 여러개 있고 그 물건들이 개별적으로 입찰에 부쳐진 경우에는 사건번호외에 물건번호를 기재하십시오.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        3. 입찰자가 법인인 경우에는 본인의 성명란에 법인의 명칭과 대표자의 지위 및 성명을, 주민등록란에는 입찰자가 개인인 경우에는 주민등록번호를, 법인인 경우에는 사업자등록번호를 기재하고, 대표자의 자격을 증명하는 서면(법인의 등기부 등, 초본)을 제출하여야 합니다.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        4. 주소는 주민등록상의 주소를, 법인은 등기부상의 본점소재지를 기재하시고, 신분확인상 필요하오니 주민등록증을 꼭 지참하십시오.
                      </span>
                      <span className="text-[14px] font-batang font-extrabold underline">
                        5. 입찰가격은 수정할 수 없으므로, 수정을 요하는 때에는 새 용지를 사용하십시오.
                      </span>
                      <p className="text-[11pt] text-left font-batang">
                        6. 대리인이 입찰하는 때에는 입찰자란에 본인과 대리인의 인적사항 및 본인과의 관계 등을 모두 기재하는 외에 본인의 {" "}
                          <span className=" underline underline-offset-1">
                            위임장(입찰표 뒷면을 사용)
                          </span>
                        과 인감증명을 제출하십시오.
                      </p>
                      <span className="text-[11pt] text-left font-batang">
                        7. 위임장, 인감증명 및 자격증명서는 이 입찰표에 첨부하십시오.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        8. 일단 제출된 입찰표는 취소, 변경이나 교환이 불가능합니다.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        9. 공동으로 입찰하는 경우에는 공동입찰신고서를 입찰표와 함께 제출하되, 입찰표의 본인란에는 "별첨 공동입찰자목록 기재와 같음" 이라고 기재한 다음, 입찰표와 공동입찰신고서 사이에는 공동입찰자 전원이 간인 하십시오.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        10. 입찰자 본인 또는 대리인 누구나 보증을 반환 받을 수 있습니다.
                      </span>
                      <span className="text-[11pt] text-left font-batang">
                        11.	보증의 제공방법(현금·자기앞수표 또는 보증서)중 하나를 선택하여 표를 기재하십시오.
                      </span>
                    </div>
                  </div>
                  <CoIpchalFormContent totalResult={totalResult} />
                  <CoIpchalListContent totalResult={totalResult} />
                  {totalResult && totalResult.agentYn === 'Y' && (
                    <AgentListFormContent totalResult={totalResult} />
                  )}
                </div>
              </div>
            </div>
          </>
      )}
      {totalResult && totalResult.bidders.length === 1 && (
        <>
          <div className={`hidden flex-col bg-white max-h-[2600px] ${totalResult && totalResult.agentYn === 'Y' ? 'h-[2600px]' : 'h-[1300px]'} w-[50%] mx-auto relative justify-center items-center`} id="wrap-capture">
            <div className="hidden flex-col h-[100%] w-[100%] justify-center items-center relative" id="capture">
              <div className="w-[100%] overflow-x-scroll absolute top-[130px] h-[600px] bg-white scrollbar-hide">
                <div className="border border-black text-[1.5rem] w-[80%] h-[100%] m-auto bg-white">
                  {/* 첫 번째 박스 */}
                  <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
                    <div className="absolute top-[0px] left-[0px] w-[100%] pl-[5px]">
                      <span className="text-left text-[11pt] leading-[-1px]">
                        (앞면)
                      </span>
                    </div>
                    <div className="justify-center items-center text-center absolute top-[30%] w-[100%]">
                      <span className="text-[15pt] tracking-[20pt] leading-[23px] font-bold font-batang">
                        기일입찰표
                      </span>
                    </div>
                    <div className="flex justify-between w-[100%] absolute bottom-[0px]">
                      <div>
                        <span className="pl-[3px] text-[11pt] leading-[-1px] font-batang">
                          {totalResult && totalResult.reqCourtName + ' 집행관 귀하'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11pt] leading-[-1px] font-batang pr-[3px]">
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
                  <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
                    <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                      <span className="text-[11pt] font-batang">
                        사건
                        <br />
                        번호
                      </span>
                    </div>
                    <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                      <span className="text-[11pt] font-batang">
                        {totalResult &&
                          totalResult.caseYear +
                            ' 타경 ' +
                            totalResult.caseDetail + '호'}
                      </span>
                    </div>
                    <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                      <span className="text-[11pt] font-batang">
                        물건 
                        <br />
                        번호
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                      <span className={`text-[11pt] font-batang`}>
                        {totalResult && totalResult?.mulNo
                          ? totalResult?.mulNo
                          : '1'}
                      </span>
                      <span className={`text-[9pt] font-batang`}>
                        ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                      </span>
                    </div>
                  </div>
                  {/* 세 번째 박스 */}
                  <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[50%]">
                    <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5.2%]">
                      <span className="text-[11pt] font-batang">
                        입<br />찰<br />자
                      </span>
                    </div>
                    <div className="w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                          <span className="text-[11pt] font-batang">본인</span>
                        </div>
                        <div className="flex flex-col w-[100%] h-[100%]">
                          <div className="flex flex-row items-stretch border-black border-b-[1px] h-[30%]">
                            <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                              <span className="text-[11pt] font-batang">성&nbsp;&nbsp;명</span>
                            </div>
                            <div className="flex items-center justify-center border-black border-r-[1px] w-[30%]">
                              <div className="flex w-[60%] justify-end">
                                <span className="text-[11pt] font-batang">
                                  {totalResult && totalResult?.bidders?.length > 1
                                    ? ''
                                    : totalResult && totalResult?.bidders[0]?.name}
                                </span>
                              </div>
                              <div className="flex w-[40%] justify-end mr-1">
                                <span className="text-[11pt] font-batang text-right">
                                  (인)
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                              <span className="text-[11pt] font-batang">전화번호</span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[30%]">
                              <span className="text-[11pt] font-batang">
                                {
                                  totalResult && totalResult?.bidders[0]?.phoneNo.length === 10 ? totalResult?.bidders[0]?.phoneNo.substring(0, 2) + '-' + totalResult?.bidders[0]?.phoneNo.substring(2, 6) + '-' + totalResult?.bidders[0]?.phoneNo.substring(6, 10) : totalResult && totalResult?.bidders[0]?.phoneNo.substring(0, 3) + '-' + totalResult?.bidders[0]?.phoneNo.substring(3, 7) + '-' + totalResult?.bidders[0]?.phoneNo.substring(7, 11)
                                }
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row border-black border-b-[1px] h-[35%]">
                            <div className="flex justify-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                              <span className="text-[11pt] font-batang text-center">
                                주민(사업자)
                                <br />
                                등록번호
                              </span>
                            </div>
                            <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center leading-[-1px]">
                              <span className="text-[11pt] font-batang">
                                {biddingInfo.bidCorpYn[0] === 'I' ? (
                                  biddingInfo.bidIdNum1[0] + '-' + biddingInfo.bidIdNum2[0]
                                ): (
                                  totalResult && totalResult?.bidders[0].companyNo.substring(0, 3) + '-' + totalResult?.bidders[0].companyNo.substring(3, 5) + '-' + totalResult?.bidders[0].companyNo.substring(5, 10)
                                )}
                              </span>
                            </div>
                            <div className="flex justify-center items-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                              <span className="text-[11pt] font-batang text-center">
                                법인등록
                                <br />
                                번호
                              </span>
                            </div>
                            <div className="flex justify-center items-center w-[30%] text-center leading-[-1px]">
                              <span className="text-[11pt] font-batang text-center">
                                {totalResult && totalResult?.bidders?.length > 1 || totalResult?.bidders[0]?.corporationNo === null
                                  ? ''
                                  : totalResult &&
                                    totalResult?.bidders[0]?.corporationNo}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row h-[35%]">
                            <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                              <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                            </div>
                            <div className="flex justify-center items-center w-[80%] leading-[-1px]">
                              <span className="text-[11pt] font-batang text-center">
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
                          <span className="text-[14px] font-batang">대리인</span>
                        </div>
                        <div className="w-[90%]">
                          <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                            <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                              <span className="text-[11pt] font-batang text-center">성&nbsp;&nbsp;명</span>
                            </div>
                            <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                              <div className="flex w-[60%] justify-end">
                                <span className="text-[11pt] font-batang text-center">
                                  {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName : ''}
                                </span>
                              </div>
                              <div className="flex w-[40%] justify-end mr-1">
                                <span className="text-[11pt] font-batang text-center">(인)</span>
                              </div>
                            </div>
                            <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                              <span className="text-[11pt] font-batang text-center">
                                본인과의
                                <br />
                                관계
                              </span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[30%]">
                              <span className="text-[11pt] font-batang text-center">
                                {biddingInfo.bidder === 'agent' && biddingInfo.agentRel ? biddingInfo.agentRel : ''}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                            <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                              <span className="text-[11pt] font-batang text-center">
                                주민등록번호
                              </span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                              <span className="text-[11pt] font-batang text-center">
                                {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) +
                                  '-' +
                                  biddingInfo.agentIdNum.substring(6, 14) : ''}
                              </span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                              <span className="text-[11pt] font-batang text-center">
                                전화번호
                              </span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[30%]">
                              <span className="text-[11pt] font-batang text-center">
                                {
                                  totalResult && totalResult?.agent !== null ? 
                                  totalResult?.agent?.phoneNo.length === 10 ?
                                  totalResult?.agent?.phoneNo.substring(0, 2) + '-' + totalResult?.agent?.phoneNo.substring(2, 6) + '-' + totalResult?.agent?.phoneNo.substring(6, 10) 
                                    : totalResult?.agent?.phoneNo.substring(0, 3) + '-' + totalResult?.agent?.phoneNo.substring(3, 7) + '-' + totalResult?.agent?.phoneNo.substring(7, 11) : ''
                                }
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between items-stretch h-[30%]">
                            <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                              <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                            </div>
                            <div className="flex justify-center items-center text-center w-[80%]">
                              <span className="text-[11pt] font-batang text-center">
                                {
                                  totalResult && totalResult?.agent !== null ? 
                                  totalResult?.agent?.address : ''
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 네 번째 박스 */}
                  <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[15%]">
                    <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                      <span className="text-[11pt] font-batang">
                        입찰
                        <br />
                        가격
                      </span>
                    </div>
                    <div className="w-[3%] h-[100%]">
                      <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                        <span className="text-[11pt] font-batang">천억</span>
                      </div>
                      <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">백억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] border-black border-r-[1px] border-b-[1px]  leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">십억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">천만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">백만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">십만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">천</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">백</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">십</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">일</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                    <div className="w-[27px]">
                      <div className="h-[100%] w-[100%] border-black border-r-[2px] leading-[70%] text-center">
                        <div className="h-[50%]">
                          <span className="text-[11pt] font-batang">
                            <br />
                          </span>
                        </div>
                        <div className="text-left mt-[10px]">
                          <span className="text-[15px] font-batang">
                            원
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                      <span className="text-[11pt] font-batang">
                        보증
                        <br />
                        금액
                      </span>
                    </div>
                    <div className="w-[3%]">
                      <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">천억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
                          {totalResult &&
                          totalResult?.bidDeposit?.toString().length === 12
                            ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                            : ''}
                        </span>
                      </div>
                    </div>
                    <div className="w-[3%]">
                      <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">백억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">십억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">억</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">천만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">백만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">십만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">만</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">천</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">백</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">십</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                      <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                        <span className="text-[11pt] font-batang">
                          <br />
                        </span>
                        <span className="text-[11pt] font-batang">일</span>
                      </div>
                      <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                        <span className="text-[11pt] font-batang">
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
                    <div className="w-[27px]">
                      <div className="h-[100%] w-[100%] border-black leading-[70%] text-center">
                        <div className="h-[50%]">
                          <span className="text-[11pt] font-batang">
                            <br />
                          </span>
                        </div>
                        <div className="text-left mt-[10px]">
                          <span className="text-[11pt] font-batang">
                            원
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 다섯 번째 박스 */}
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[13.5%]">
                    <div className="flex flex-row w-[49.7%] border-black border-r-[2px] h-[100%]">
                      <div className='flex items-center justify-start w-[30%] h-[100%]'>
                        <span className="text-[11pt] text-left font-batang">
                          보증의 
                          <br />
                          제공방법
                        </span>
                      </div>
                      <div className="flex flex-col justify-center w-[70%] h-[100%]">
                        <div className="flex flex-row w-[100%]">
                          <input
                            type="checkbox"
                            checked={biddingInfo.bidWay === 'M' ? true : false}
                            className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                            readOnly
                          />
                          <span className="text-[11pt] mt-1">현금·자기앞수표</span>
                        </div>
                        <div className="flex flex-row w-[100%]">
                          <input
                            type="checkbox"
                            checked={biddingInfo.bidWay === 'W' ? true : false}
                            className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                            readOnly
                          />
                          <span className="text-[11pt] mt-1">
                            보증서
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                      <div className="flex justify-start">
                        <span className="text-[11pt] text-left font-batang ml-[10px]">
                          보증을 반환 받았습니다.
                        </span>
                      </div>
                      <div className='flex justify-center'>
                        <span className="text-[11pt] font-batang mr-[10px]">
                          본인 또는 대리인{' '}
                          {totalResult && totalResult.agent !== null ? totalResult && totalResult?.agent?.name + ' (인)' : totalResult && totalResult.bidders[0].name + ' (인)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col min-w-[400px] md:w-[80%] leading-[-1px] absolute top-[780px]">
                <span className="text-[15pt] font-extrabold font-batang ">
                  주의사항
                </span>
                <span className="text-[11pt] text-left font-batang">
                  1. 입찰표는 물건마다 별도의 용지를 사용하십시오, 다만, 일괄입찰시에는 1매의 용지를 사용하십시오.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  2. 한 사건에서 입찳물건이 여러개 있고 그 물건들이 개별적으로 입찰에 부쳐진 경우에는 사건번호외에 물건번호를 기재하십시오.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  3. 입찰자가 법인인 경우에는 본인의 성명란에 법인의 명칭과 대표자의 지위 및 성명을, 주민등록란에는 입찰자가 개인인 경우에는 주민등록번호를, 법인인 경우에는 사업자등록번호를 기재하고, 대표자의 자격을 증명하는 서면(법인의 등기부 등, 초본)을 제출하여야 합니다.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  4. 주소는 주민등록상의 주소를, 법인은 등기부상의 본점소재지를 기재하시고, 신분확인상 필요하오니 주민등록증을 꼭 지참하십시오.
                </span>
                <span className="text-[14px] font-batang font-extrabold underline">
                  5. 입찰가격은 수정할 수 없으므로, 수정을 요하는 때에는 새 용지를 사용하십시오.
                </span>
                <p className="text-[11pt] text-left font-batang">
                  6. 대리인이 입찰하는 때에는 입찰자란에 본인과 대리인의 인적사항 및 본인과의 관계 등을 모두 기재하는 외에 본인의 {" "}
                    <span className=" underline underline-offset-1">
                      위임장(입찰표 뒷면을 사용)
                    </span>
                  과 인감증명을 제출하십시오.
                </p>
                <span className="text-[11pt] text-left font-batang">
                  7. 위임장, 인감증명 및 자격증명서는 이 입찰표에 첨부하십시오.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  8. 일단 제출된 입찰표는 취소, 변경이나 교환이 불가능합니다.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  9. 공동으로 입찰하는 경우에는 공동입찰신고서를 입찰표와 함께 제출하되, 입찰표의 본인란에는 "별첨 공동입찰자목록 기재와 같음" 이라고 기재한 다음, 입찰표와 공동입찰신고서 사이에는 공동입찰자 전원이 간인 하십시오.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  10. 입찰자 본인 또는 대리인 누구나 보증을 반환 받을 수 있습니다.
                </span>
                <span className="text-[11pt] text-left font-batang">
                  11.	보증의 제공방법(현금·자기앞수표 또는 보증서)중 하나를 선택하여 표를 기재하십시오.
                </span>
              </div>
              <div className='flex w-[100%] h-[100%]'>
                {totalResult && totalResult.agentYn === 'Y' && (
                  <AgentListFormContent totalResult={totalResult} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
