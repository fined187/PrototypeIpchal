import { bidderInfo, biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function ShareInfo() {
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const [shareWay, setShareWay] = useState<string>('')
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [calc, setCalc] = useState({
    numerator: [0],
    denominator: [0],
  })
  const [goNext, setGoNext] = useState<boolean>(false)

  const [shareList, setShareList] = useState({
    shareList: Array(biddingInfo.bidderNum).fill({
      peopleSeq: 0,
      share: '',
    }),
  })

  const handleShareList = () => {
    const temp = [...shareList.shareList]
    if (shareWay === 'S') {
      for (let i = 0; i < biddingInfo.bidderNum; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          share: '1/' + biddingInfo.bidderNum.toString(),
        }
      }
    } else {
        for (let i = 0; i < biddingInfo.bidderNum; i++) {
          temp[i] = {
            peopleSeq: i + 1,
            share: (calc?.numerator[i]?.toString() +  '/' + calc?.denominator[i]?.toString()),
          }
        }
    }
    setShareList({
      ...shareList,
      shareList: temp,
    })
  }

  useEffect(() => {
    handleShareList()
  }, [calc.numerator, calc.denominator, shareWay])

  const handleClear = () => {
    let temp = document.querySelectorAll('input')
    temp.forEach((item) => {
      item.value = ''
    })
  }

  const handleCalc = () => {
    if (shareWay === 'S') {
      const nameTemp = ['']
      const percentTemp = [0]
      for (let i = 0; i < biddingInfo?.bidderNum; i++) {
        nameTemp.push(biddingInfo?.bidName[i])
        percentTemp.push((1 / biddingInfo?.bidderNum) * 100)
      }
      nameTemp.shift()
      percentTemp.shift()
      setBiddingInfo({
        ...biddingInfo,
        distribute: {
          sharedName: nameTemp,
          sharedPercent: percentTemp,
        },
      })
    } else {
      const nameTemp = ['']
      const percentTemp = [0]
      for (let i = 0; i < biddingInfo?.bidderNum; i++) {
        nameTemp.push(biddingInfo?.bidName[i])
        percentTemp.push((calc.numerator[i] / calc.denominator[i]) * 100)
      }
      nameTemp.shift()
      percentTemp.shift()
      setBiddingInfo({
        ...biddingInfo,
        distribute: {
          sharedName: nameTemp,
          sharedPercent: percentTemp,
        },
      })
    }
  }

  const handleValidate = () => {
    let temp = document.querySelectorAll('input')
    temp.forEach((item) => {
      if (item.value === '') {
        setGoNext(true)
      } else {
        setGoNext(false)
      }
    })
  }

  const handleValidateCalc = () => {
    let temp = [0]
    if (shareWay === 'S') {
      for (let i = 0; i < biddingInfo?.bidderNum; i++) {
        temp.push(1 / biddingInfo?.bidderNum)
      }
    } else {
      for (let i = 0; i < calc.numerator.length; i++) {
        temp.push(calc.numerator[i] / calc.denominator[i])
      }
    }
    temp.reduce((a, b) => a + b, 0) === 1 ? setGoNext(false) : setGoNext(true)
  }

  const handleShare = async () => {
    try {
      const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders/shares`, {
        bidderCount: biddingInfo.bidderNum,
        shareList: shareList.shareList,
      })
      if (response.status === 200) {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCalc()
    handleValidate()
    handleValidateCalc()
  }, [calc.numerator, calc.denominator, shareWay])

  const handleGetBiddingFormUpdate = async () => {
    try {
      const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders`)
      if (response.status === 200) {
        setIsDataIn(response.data.data.bidders)
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetBiddingFormUpdate()
  }, [])

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
          공동입찰자 분의 지분을 입력해주세요
        </span>
        <div className="flex flex-row gap-10 w-[80%] justify-center absolute top-[80px]">
          <div className={`flex flex-row w-[100px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              shareWay === 'S'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setShareWay('S')
              handleCalc()
            }}
          >
            <div className={`${shareWay === 'S' ? 'flex mr-1' : 'hidden'}`}>
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
                shareWay === 'S' ? 'text-white' : 'text-myyellow'
              }`}
            >
              동일배분
            </span>
          </div>
          <div
            className={`flex flex-row w-[100px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              shareWay === 'N'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setShareWay('N')
              handleClear()
              handleCalc()
            }}
          >
            <div className={`${shareWay === 'N' ? 'flex mr-1' : 'hidden'}`}>
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
                shareWay === 'N' ? 'text-white' : 'text-myyellow'
              }`}
            >
              각자배분
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:w-[550px] w-[90%] min-h-[257px] max-h-[600px] h-[300px] bg-white absolute top-[170px] justify-center items-center rounded-lg border-slate-500">
          {(isDataIn && isDataIn.length > 0) && biddingInfo.bidName.map((name, index) => {
            return (
              <div key={index} className="flex justify-between mb-5 w-full">
                <div className="flex w-[40%] ml-5">
                  <span className="text-[15px] text-center font-bold font-NanumGothic">
                    {name}
                  </span>
                </div>
                <div className="flex flex-row gap-[5%] w-[60%] justify-end mr-5">
                  {shareWay === 'S' ? (
                    <>
                      <input
                        id="molecule"
                        type="text"
                        readOnly
                        value="1"
                        className={`border  border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                      />
                      <span>/</span>
                      <input
                        type="text"
                        readOnly
                        value={biddingInfo.bidderNum}
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        id="molecule"
                        type="text"
                        className={`border ${
                          shareWay === 'N' && goNext
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }  focus:outline-2 focus:outline-myyellow rounded-md text-[12px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                        onChange={(e) => {
                          const temp = [...calc.numerator]
                          temp[index] = Number(e.target.value)
                          setCalc({
                            ...calc,
                            numerator: temp,
                          })
                          handleCalc()
                        }}
                      />
                      <span>/</span>
                      <input
                        type="text"
                        className={`border ${
                          shareWay === 'N' && goNext
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }  focus:outline-2 focus:outline-myyellow rounded-md text-[12px] font-NanumGothic not-italic font-extrabold text-center h-[40px] px-2 w-[40%]`}
                        onChange={(e) => {
                          const temp = [...calc.denominator]
                          temp[index] = Number(e.target.value)
                          setCalc({
                            ...calc,
                            denominator: temp,
                          })
                          handleCalc()
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            )
          })}
          {shareWay === 'N' && goNext && (
            <span className="text-[12px] text-red-500 font-bold">
              지분 값을 확인해주세요
            </span>
          )}
        </div>
        <div className="flex flex-row justify-center items-center md:w-[600px] w-[400px] gap-[10px] absolute top-[70%]">
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
              goNext ? alert('지분 값을 확인해주세요.') :
              handleGetBiddingFormUpdate()
              handleShare()
              setStateNum(stateNum + 1)
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
