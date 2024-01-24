import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function ShareInfo() {
  const[biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [goNext, setGoNext] = useState<boolean>(false)

  const [shareList, setShareList] = useState({
    shareList: Array(biddingInfo.bidderNum).fill({
      peopleSeq: 0,
      name: '',
      share: '',
    }),
  })

  const handleShareList = () => {
    let numerator = (document && document.getElementById('numerator') as HTMLInputElement)?.value
    let denominator = (document && document.getElementById('denominator') as HTMLInputElement)?.value

    const temp = [...shareList.shareList]
    if (biddingInfo.shareWay === 'S') {
      for (let i = 0; i < biddingInfo.bidderNum; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingInfo.bidName[i],
          share: '1/' + biddingInfo.bidderNum.toString(),
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    } else {
      for (let i = 0; i < biddingInfo.bidderNum; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingInfo.bidName[i],
          share: biddingInfo.numerator[i] + '/' + biddingInfo.denominator[i],
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    }
  }

  const handleClear = () => {
    let temp = document.querySelectorAll('input')
    temp.forEach((item) => {
      item.value = ''
    })
    shareList.shareList.map((item: any, index: number) => {
      item.share = ''
    })
  }

  const handleValidate = () => {
    let valid = 0
    let numerator = (document && document.getElementById('numerator') as HTMLInputElement)?.value
    let denominator = (document && document.getElementById('denominator') as HTMLInputElement)?.value
    if (numerator === '' || denominator === '' || biddingInfo.shareWay === "") {
      alert('지분을 확인해주세요')
      setGoNext(true)
      return
    } else if (biddingInfo.shareWay === 'N') {
      for(let i = 0; i < biddingInfo.bidderNum; i++) {
        valid += parseInt(shareList.shareList[i].share)
      }
      if (valid !== parseInt(denominator)) {
        setGoNext(true)
      } else {
        setGoNext(false)
        handleGetBiddingFormUpdate()
        handlePutShare()
      }
    } else {
      setGoNext(false)
      handleGetBiddingFormUpdate()
      handlePutShare()
    }
  }

  const handlePutShare = async () => {
    try {
      const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders/shares`, {
        bidderCount: biddingInfo.bidderNum,
        shareList: shareList.shareList,
      })
      if (response.status === 200) {
        console.log(response)
        setBiddingInfo({
          ...biddingInfo,
          numerator: shareList.shareList.map((item: any) => item.share?.split('/')[0]),
          denominator: shareList.shareList.map((item: any) => item.share?.split('/')[1]),
        })
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetBiddingFormUpdate = async () => {
    try {
      const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders`)
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          bidName: response.data.data.bidders.map((item: any) => item.name),
          bidAddr: response.data.data.bidders.map((item: any) => item.address),
          bidPhone: response.data.data.bidders.map((item: any) => item.phoneNo),
          bidCorpYn: response.data.data.bidders.map((item: any) => item.bidderType),
          bidCorpNum: response.data.data.bidders.map((item: any) => item.companyNo),
          bidJob: response.data.data.bidders.map((item: any) => item.job),
          bidCorpRegiNum: response.data.data.bidders.map((item: any) => item.corporationNo),
        })
        setShareList({
          ...shareList,
          shareList: response.data.data.bidders.map((item: any) => {
            return {
              peopleSeq: item.peopleSeq,
              name: item.name,
              share: item.share,
            }
          }),
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleShareList()
  }, [biddingInfo.shareWay])

  useEffect(() => {
    const handleSyncBiddingForm = async () => {
      try {
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}`)
        if (response.status === 200) {
          setIsDataIn(response.data.data.bidders)
          setBiddingInfo({
            ...biddingInfo,
            bidName: response.data.data?.bidders?.map((item: any) => item.name),
            bidAddr: response.data.data?.bidders?.map((item: any) => item.address),
            bidAddrDetail: response.data.data?.bidders?.length < biddingInfo.bidAddrDetail.length ? biddingInfo.bidAddrDetail.splice(response.data.data?.bidders?.length - 1, biddingInfo.bidAddrDetail.length - response.data.data?.bidders?.length) : biddingInfo.bidAddrDetail,
            bidPhone: response.data.data?.bidders?.map((item: any) => item.phoneNo),
            bidPhone1: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(0, 3) : item.phoneNo?.slice(0, 2)),
            bidPhone2: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(3, 7) : item.phoneNo?.slice(2, 6)),
            bidPhone3: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(7, 11) : item.phoneNo?.slice(6, 10)),
            bidCorpYn: response.data.data?.bidders?.map((item: any) => item.bidderType),
            bidCorpNum: response.data.data?.bidders?.map((item: any) => item.companyNo),
            bidCorpNum1: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(0, 3) ?? null),
            bidCorpNum2: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(3, 5) ?? null),
            bidCorpNum3: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(5, 10) ?? null),
            bidJob: response.data.data?.bidders?.map((item: any) => item.job),
            bidCorpRegiNum: response.data.data?.bidders?.map((item: any) => item.corporationNo),
            bidCorpRegiNum1: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(0, 6) ?? null),
            bidCorpRegiNum2: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(6, 13) ?? null),
            denominator: biddingInfo.shareWay === 'S' ? Array(biddingInfo.bidderNum).fill(biddingInfo.bidderNum.toString()) : response.data.data?.bidders?.map((item: any) => item.share?.split('/')[1]),
            numerator: biddingInfo.shareWay === 'S' ? Array(biddingInfo.bidderNum).fill('1') : response.data.data?.bidders?.map((item: any) => item.share?.split('/')[0]),
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleSyncBiddingForm()
    handleShareList()
  }, [])

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative ">
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
          공동입찰자 분의 지분을 입력해주세요
        </span>
        <div className="flex flex-row gap-10 w-[80%] justify-center absolute top-[80px]">
          <div className={`flex flex-row w-[100px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo.shareWay === 'S'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setBiddingInfo({
                ...biddingInfo,
                shareWay: 'S',
              })
            }}
          >
            <div className={`${biddingInfo.shareWay === 'S' ? 'flex mr-1' : 'hidden'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
              >
                <path
                  d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className={`text-[13px] font-NanumGothic not-italic font-extrabold ${
                biddingInfo.shareWay === 'S' ? 'text-white' : 'text-myyellow'
              }`}
            >
              동일배분
            </span>
          </div>
          <div
            className={`flex flex-row w-[100px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo.shareWay === 'N'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setBiddingInfo({
                ...biddingInfo,
                shareWay: 'N',
              })
              handleClear()
            }}
          >
            <div className={`${biddingInfo.shareWay === 'N' ? 'flex mr-1' : 'hidden'}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
              >
                <path
                  d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className={`text-[13px] font-NanumGothic not-italic font-extrabold ${
                biddingInfo.shareWay === 'N' ? 'text-white' : 'text-myyellow'
              }`}
            >
              각자배분
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:w-[550px] w-[90%] md:h-[350px] pt-[30px] bg-white absolute top-[170px] justify-center items-center rounded-lg border-slate-500 overflow-y-scroll scrollbar-hide">
          {(isDataIn && isDataIn.length > 0) && biddingInfo.bidName.map((name, index) => {
            return (
              <div key={index} className="flex justify-between mb-5 w-full">
                <div className="flex w-[40%] ml-5">
                  <span className="text-[15px] text-center font-bold font-NanumGothic">
                    {name}
                  </span>
                </div>
                <div className="flex flex-row gap-[5%] w-[60%] justify-end mr-5">
                  {biddingInfo.shareWay === 'S' ? (
                    <>
                      <input
                        id="numerator"
                        type="text"
                        readOnly
                        value={'1'}
                        className={`border  border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                      />
                      <span>/</span>
                      <input
                        id='denominator'
                        type="text"
                        readOnly
                        value={biddingInfo.bidderNum}
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        id="numerator"
                        type="text"
                        value={shareList.shareList[index]?.share?.split('/')[0] || ''}
                        className={`border-2 ${
                          (biddingInfo.shareWay === 'N') && goNext
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }  focus:outline-2 focus:outline-myyellow rounded-md text-[12px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                        onChange={(e) => {
                          let temp = [...shareList.shareList]
                          temp[index] = {
                            ...temp[index],
                            share: e.target.value + '/' + (document && document.getElementById('denominator') as HTMLInputElement)?.value,
                          }
                          setShareList({
                            ...shareList,
                            shareList: temp,
                          })
                        }}
                      />
                      <span>/</span>
                      <input
                        id='denominator'
                        type="text"
                        value={shareList.shareList[index]?.share?.split('/')[1] || ''}
                        className={`border-2 ${
                          (biddingInfo.shareWay === 'N') && goNext
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }  focus:outline-2 focus:outline-myyellow rounded-md text-[12px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                        onChange={(e) => {
                          let temp = [...shareList.shareList]
                          temp[index] = {
                            ...temp[index],
                            share: (document && document.getElementById('numerator') as HTMLInputElement)?.value + '/' + e.target.value,
                          }
                          setShareList({
                            ...shareList,
                            shareList: temp,
                          })
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            )
          })}
          {biddingInfo.shareWay === 'N' && goNext && (
            <span className="text-[15px] text-red-500 font-bold">
              지분 값을 확인해주세요
            </span>
          )}
        </div>
        <div className="flex flex-row justify-center items-center md:w-[600px] w-[400px] gap-[10px] absolute top-[600px]">
          <button
            type="button"
            className="flex w-[30%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(15)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              handleValidate()
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
