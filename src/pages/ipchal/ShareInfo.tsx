import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function ShareInfo() {
  const[biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [goNext, setGoNext] = useState<boolean>(false)
  const [loadding, setLoadding] = useState<boolean>(false)

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
          name: biddingInfo.bidName[i] ?? '',
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
          name: biddingInfo.bidName[i] ?? '',
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
    setLoadding(true)
    try {
      const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders/shares`, {
        bidderCount: biddingInfo.bidderNum,
        shares: shareList.shareList,
      })
      if (response.status === 200) {
        console.log(response)
        setBiddingInfo({
          ...biddingInfo,
          numerator: shareList.shareList.map((item: any) => item.share?.split('/')[0]),
          denominator: shareList.shareList.map((item: any) => item.share?.split('/')[1]),
        })
        setStateNum(stateNum + 1)
        setLoadding(false)
      }
    } catch (error) {
      console.log(error)
      setLoadding(false)
    }
  }

  const handleGetBiddingFormUpdate = async () => {
    setLoadding(true)
    try {
      const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders`)
      if (response.status === 200) {
        console.log(response)
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
        setLoadding(false)
      }
    } catch (error) {
      console.log(error)
      setLoadding(false)
    }
  }

  useEffect(() => {
    handleShareList()
  }, [biddingInfo.shareWay])

  useEffect(() => {
    const handleSyncBiddingForm = async () => {
      setLoadding(true)
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
          setLoadding(false)
        }
      } catch (error) {
        console.log(error)
        setLoadding(false)
      }
    }
    handleSyncBiddingForm()
    handleShareList()
  }, [])

  return (
    <div className="flex w-[100%] md:h-[97.5vh] h-[87vh] bg-white justify-center relative ">
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center mt-[20px] md:pt-[100px] pt-[50px]">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
          입찰자의 지분을 입력해주세요
        </span>
        <div className="flex flex-row gap-10 w-[80%] justify-center mt-[20px]">
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
                denominator: Array(biddingInfo.bidderNum).fill('100'),
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
        <div className="flex flex-col gap-[25px] md:w-[550px] w-[90%] min-h-[250px] md:max-h-[450px] bg-white absolute top-[170px] items-center rounded-lg border-slate-500 md:mt-[80px] mt-[30px] pt-[50px] overflow-y-scroll">
          {loadding && (
            <Spinner />
          )}
          {(isDataIn && isDataIn.length > 0) && biddingInfo.bidName.map((name, index) => {
            return (
              <div key={index} className="flex justify-between mb-5 md:w-[70%] w-[90%] relative">
                <div className="flex w-[40%] mt-[10px]">
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
                        value={shareList.shareList[index]?.share?.split('/')[0] === 'undefined' ? '' : shareList.shareList[index]?.share?.split('/')[0]}
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
                          setBiddingInfo({
                            ...biddingInfo,
                            numerator: temp.map((item: any) => item.share?.split('/')[0]),
                          })
                        }}
                      />
                      <span>/</span>
                      <input
                        readOnly
                        id='denominator'
                        type="text"
                        value={100}
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
          <div className='flex flex-row'>
            {biddingInfo.shareWay === 'N' && goNext && (
              <span className="text-[15px] text-red-500 font-bold">
                지분 값을 확인해주세요
              </span>
            )}
            {biddingInfo.shareWay !== 'S' && (
              <div className='flex flex-row'>
                <span className='text-[11pt] font-semibold'>
                  &nbsp;&nbsp;지분 합 : 
                </span>
                <span className={`text-[11pt] font-semibold ${biddingInfo.numerator.reduce((a: any, b) => parseInt(a) + parseInt(b), 0) === parseInt(biddingInfo.denominator[0]) ? 'text-green-500' : 'text-red-500'}`}>
                  &nbsp;&nbsp;{biddingInfo.numerator.reduce((a: any, b) => parseInt(a) + parseInt(b), 0)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-[10px] fixed md:bottom-[80px] bottom-[10px] md:w-[26%] w-[80%]">
          <button
            type="button"
            className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              biddingInfo.agentYn ==='Y' && biddingInfo.bidName.length > 1 ? setStateNum(18) : setStateNum(15)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex md:w-[60%] w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              handleValidate()
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
              {stateNum <= 3 ? '확인' : stateNum === 10 ? '확인했습니다' : '다음'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
