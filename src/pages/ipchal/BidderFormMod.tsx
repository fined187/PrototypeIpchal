import { biddingInfoState, stepState } from "@/atom"
import SearchAddress from "@/components/SearchAddress"
import { BiddingInfoType } from "@/interface/IpchalType"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil"

type BiddersProps = {
  address: string
  bidderType: string
  companyNo: string
  corporationNo: string
  job: string
  name: string
  peopleSeq: number
  phoneNo: string
  share: any
}

interface BidderListProps {
  agentYn: string | null
  bidderCount: number
  mstSeq: number
  number: number
  state: number
  bidders: BiddersProps[]
}

export default function BidderFormMod() {
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const [stepNum, setStepNum] = useState(1)
  const [bidderList, setBidderList] = useState<BidderListProps>()

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    setError,
    formState: { errors },
  } = useForm<BiddingInfoType>({
    defaultValues: {
      bidderName: [''],
      bidderPhone1: [''],
      bidderPhone2: [''],
      bidderPhone3: [''],
      bidderIdNum1: [''],
      bidderIdNum2: [''],
      bidderAddr: [''],
      bidderAddrDetail: [''],
      bidderCorpNum1: [''],
      bidderCorpNum2: [''],
      bidderCorpNum3: [''],
      bidderCorpRegiNum1: [''],
      bidderCorpRegiNum2: [''],
      bidderJob: [''],
    },
  })
  
  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderPhone1') {
      setFocus('bidderPhone2')
    } else if (target.value.length === 4 && target.id === 'bidderPhone2') {
      setFocus('bidderPhone3')
    }
  }

  const handleCorpNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderCorpNum1') {
      setFocus('bidderCorpNum2')
    } else if (target.value.length === 2 && target.id === 'bidderCorpNum2') {
      setFocus('bidderCorpNum3')
    }
  }

  const handleCorpRegiNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderCorpRegiNum1') {
      setFocus('bidderCorpRegiNum2')
    }
  }

  const handleIdNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderIdNum1') {
      setFocus('bidderIdNum2')
    }
  }

  useEffect(() => {
    const handleGetBidders = async () => {
      try {
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`)
        if (response.status === 200) {
          setBidderList(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBidders()
  }, [])

  console.log(bidderList)

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col gap-4  md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative">
        <div className="flex flex-row py-6 pt-4">
          <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
            본인 정보를 입력해주세요 (수정)
          </span>
          {bidderList && bidderList.bidders.length > 1 && (
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8 ml-2">
              {`(${stepNum} / ${bidderList && bidderList.bidders.length})`}
            </span>
          )}
        </div>
        <div className="flex flex-row gap-10 w-[80%] justify-center">
          <div className={`flex flex-row w-[70px] h-[30px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
            bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'I' ? 'text-white bg-myyellow' : 'text-myyellow bg-white'}`} 
            onClick={() => {
              setBidderList((prev: any) => {
                const temp = prev.bidders
                temp[stepNum - 1].bidderType = 'I'
                return { ...prev, bidders: temp }
              })
              setBiddingForm((prev: any) => {
                const temp = prev.bidCorpYn
                temp[stepNum - 1] = 'I'
                return { ...prev, bidCorpYn: temp }
              })
            }}
          >
            <div
              className={`${
                bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'I'
                  ? 'flex mr-1'
                  : 'hidden'
              }`}
            >
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
                bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'I'
                  ? 'text-white'
                  : 'text-myyellow'
              }`}
            >
              개인
            </span>
          </div>
          <div
            className={`flex flex-row w-[70px] h-[30px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'C'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setBidderList((prev: any) => {
                const temp = prev.bidders
                temp[stepNum - 1].bidderType = 'C'
                return { ...prev, bidders: temp }
              })
              setBiddingForm((prev: any) => {
                const temp = prev.bidCorpYn
                temp[stepNum - 1] = 'C'
                return { ...prev, bidCorpYn: temp }
              })
            }}
          >
            <div
              className={`${
                bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'C'
                  ? 'flex mr-1'
                  : 'hidden'
              }`}
            >
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
                bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'C'
                  ? 'text-white'
                  : 'text-myyellow'
              }`}
            >
              법인
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <form  className='flex flex-col md:w-[50%] w-[80%] h-[100%] justify-center items-center'>
          <div className="flex flex-col w-[100%] h-[100%] gap-2">
            <div className="flex flex-col w-[100%] gap-1">
              <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                성명
              </span>
              <input
                {...register('bidderName', {
                  required: '이름을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '이름은 2자 이상 입력해주세요',
                  },
                })}
                value={bidderList && bidderList.bidders[stepNum - 1]?.name === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.name}
                id="bidderName"
                type="text"
                className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2"
                placeholder="입찰자 성명을 입력해주세요"
                onChange={(e) => {
                  setBidderList((prev: any) => {
                    const temp = prev.bidders
                    temp[stepNum - 1].name = e.target.value
                    return { ...prev, bidders: temp }
                  })
                  setBiddingForm((prev: any) => {
                    const temp = prev.bidName
                    temp[stepNum - 1] = e.target.value
                    return { ...prev, bidName: temp }
                  })
                }}
              />
            </div>
            {(errors.bidderName?.type === 'required' ||
              errors.bidderName?.type === 'minLength') && (
              <div className="flex w-[100%] justify-start">
                <label htmlFor="bidderName" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                  {errors.bidderName?.message}
                </label>
              </div>
            )}
            <div className="flex flex-col w-[100%] gap-1">
              <label
                htmlFor="bidderPhone"
                className="text-[12px] font-NanumGothic not-italic font-extrabold text-left"
              >
                전화번호
              </label>
              <div className="flex flex-row gap-[5%]">
                <input
                  {...register('bidderPhone1', {
                    required: true,
                    maxLength: 3,
                  })}
                  id="bidderPhone1"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  type="text"
                  maxLength={3}
                  placeholder="010"
                  className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                  value={bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(0, 3) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(0, 3)}
                  onChange={(e) => {
                    setBidderList((prev: any) => {
                      const temp = prev.bidders
                      temp[stepNum - 1].phoneNo = e.target.value + temp[stepNum - 1].phoneNo?.substring(3, 11)
                      return { ...prev, bidders: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone1
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone1: temp }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                  -
                </span>
                <input
                  {...register('bidderPhone2', {
                    required: true,
                    maxLength: 4,
                  })}
                  type="text"
                  id="bidderPhone2"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  placeholder="1234"
                  className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                  value={bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(3, 7) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(3, 7)}
                  onChange={(e) => {
                    setBidderList((prev: any) => {
                      const temp = prev.bidders
                      temp[stepNum - 1].phoneNo = temp[stepNum - 1].phoneNo?.substring(0, 3) + e.target.value + temp[stepNum - 1].phoneNo?.substring(7, 11)
                      return { ...prev, bidders: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone2
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone2: temp }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                  -
                </span>
                <input
                  {...register('bidderPhone3', {
                    required: true,
                    maxLength: 4,
                  })}
                  type="text"
                  id="bidderPhone3"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  placeholder="5678"
                  className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                  value={bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(7, 11) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.phoneNo?.substring(7, 11)}
                  onChange={(e) => {
                    setBidderList((prev: any) => {
                      const temp = prev.bidders
                      temp[stepNum - 1].phoneNo = temp[stepNum - 1].phoneNo?.substring(0, 7) + e.target.value
                      return { ...prev, bidders: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone3
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone3: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone
                      temp[stepNum - 1] = biddingForm.bidPhone1[stepNum - 1] + biddingForm.bidPhone2[stepNum - 1] + e.target.value
                      return { ...prev, bidPhone: temp }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
              </div>
            </div>
            {(errors.bidderPhone1?.type === 'required' ||
              errors.bidderPhone2?.type === 'required' ||
              errors.bidderPhone3?.type === 'required') && (
              <div className="flex w-[100%] justify-start">
                <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                  전화번호를 입력해주세요
                </span>
              </div>
            )}
            {bidderList && bidderList.bidders[stepNum - 1]?.bidderType === 'I' ? (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label htmlFor="bidIdNum" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                    주민등록번호
                  </label>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      {...register('bidderIdNum1', {
                        required: true,
                        maxLength: 6,
                      })}
                      id="bidderIdNum1"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      type="text"
                      maxLength={6}
                      className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[45%] text-center"
                      value={biddingForm.bidIdNum1[stepNum - 1] === '' ? '' : biddingForm.bidIdNum1[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidIdNum1: temp }
                        })
                        handleIdNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderIdNum2', {
                        required: true,
                        maxLength: 7,
                      })}
                      id="bidderIdNum2"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      type="text"
                      maxLength={7}
                      className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[45%] text-center"
                      value={
                        biddingForm.bidIdNum2[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidIdNum2[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidIdNum2: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum
                          temp[stepNum - 1] =
                            biddingForm.bidIdNum1[stepNum - 1] +
                            e.target.value
                          return { ...prev, bidIdNum: temp }
                        })
                      }}
                    />
                  </div>
                </div>
                {errors.bidderIdNum1?.type === 'required' &&
                  errors.bidderIdNum2?.type === 'required' && (
                    <div className="flex w-[80%] justify-start h-[15px] mb-1">
                      <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                        주민등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
              </>
            ) : (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label htmlFor="bidCorpNum" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                    사업자 등록번호
                  </label>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      {...register('bidderCorpNum1', {
                        required: true,
                        maxLength: 3,
                      })}
                      type="text"
                      placeholder="123"
                      id="bidderCorpNum1"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={3}
                      className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                      value={bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(0, 3) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(0, 3)}
                      onChange={(e) => {
                        setBidderList((prev: any) => {
                          const temp = prev.bidders
                          temp[stepNum - 1].companyNo = e.target.value + temp[stepNum - 1].companyNo?.substring(3, 10)
                          return { ...prev, bidders: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum1: temp }
                        })
                        handleCorpNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderCorpNum2', {
                        required: true,
                        maxLength: 2,
                      })}
                      type="text"
                      placeholder="45"
                      id="bidderCorpNum2"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={2}
                      className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                      value={bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(3, 5) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(3, 5)}
                      onChange={(e) => {
                        setBidderList((prev: any) => {
                          const temp = prev.bidders
                          temp[stepNum - 1].companyNo = temp[stepNum - 1].companyNo?.substring(0, 3) + e.target.value + temp[stepNum - 1].companyNo?.substring(5, 10)
                          return { ...prev, bidders: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum2: temp }
                        })
                        handleCorpNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                      -
                    </span>
                    <input
                      {...register('bidderCorpNum3', {
                        required: true,
                        maxLength: 5,
                      })}
                      type="text"
                      placeholder="67890"
                      id="bidderCorpNum3"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      maxLength={5}
                      className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                      value={bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(5, 10) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.companyNo?.substring(5, 10)}
                      onChange={(e) => {
                        setBidderList((prev: any) => {
                          const temp = prev.bidders
                          temp[stepNum - 1].companyNo = temp[stepNum - 1].companyNo?.substring(0, 5) + e.target.value
                          return { ...prev, bidders: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum3
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum3: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum
                          temp[stepNum - 1] = biddingForm.bidCorpNum1[stepNum - 1] + biddingForm.bidCorpNum2[stepNum - 1] + e.target.value
                          return { ...prev, bidCorpNum: temp }
                        })
                        handleCorpNumFocusMove(e.target)
                      }}
                    />
                  </div>
                  {(errors.bidderCorpNum1?.type === 'required' ||
                    errors.bidderCorpNum2?.type === 'required' ||
                    errors.bidderCorpNum3?.type === 'required') && (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                        사업자등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col w-[100%] gap-1 mt-1">
                    <label
                      htmlFor="bidCorpRegiNum"
                      className="text-[12px] font-NanumGothic not-italic font-extrabold text-left"
                    >
                      법인 등록번호
                    </label>
                    <div className="flex flex-row gap-[5%]">
                      <input
                        {...register('bidderCorpRegiNum1', {
                          required: true,
                          maxLength: 6,
                        })}
                        type="text"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        maxLength={6}
                        id="bidderCorpRegiNum1"
                        placeholder="123456"
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[50%] text-center"
                        value={bidderList && bidderList.bidders[stepNum - 1]?.corporationNo?.substring(0, 6) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.corporationNo?.substring(0, 6)}
                        onChange={(e) => {
                          setBidderList((prev: any) => {
                            const temp = prev.bidders
                            temp[stepNum - 1].corporationNo = e.target.value + temp[stepNum - 1].corporationNo?.substring(6, 13)
                            return { ...prev, bidders: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum1
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidCorpRegiNum1: temp }
                          })
                          handleCorpRegiNumFocusMove(e.target)
                        }}
                      />
                      <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                        -
                      </span>
                      <input
                        {...register('bidderCorpRegiNum2', {
                          required: true,
                          maxLength: 7,
                        })}
                        type="text"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        maxLength={7}
                        id="bidderCorpRegiNum2"
                        name="bidderCorpRegiNum2"
                        placeholder="1234567"
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[50%] text-center"
                        value={bidderList && bidderList.bidders[stepNum - 1]?.corporationNo?.substring(6, 13) === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.corporationNo?.substring(6, 13)}
                        onChange={(e) => {
                          setBidderList((prev: any) => {
                            const temp = prev.bidders
                            temp[stepNum - 1].corporationNo = temp[stepNum - 1].corporationNo?.substring(0, 6) + e.target.value
                            return { ...prev, bidders: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum2
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidCorpRegiNum2: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum
                            temp[stepNum - 1] = biddingForm.bidCorpRegiNum1[stepNum - 1] + e.target.value
                            return { ...prev, bidCorpRegiNum: temp }
                          })
                        }}
                      />
                    </div>
                  </div>
                  {(errors.bidderCorpRegiNum1?.type === 'required' ||
                    errors.bidderCorpRegiNum2?.type === 'required') && (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                        법인 등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className={`flex flex-col w-[100%] h-[60px] gap-1 `}>
              <div className="flex flex-col w-[100%] gap-1">
                <label htmlFor="bidderJob" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                  직업
                </label>
                <input
                  {...register('bidderJob', {
                    required: '직업을 입력해주세요',
                  })}
                  value={bidderList && bidderList.bidders[stepNum - 1]?.job === '' ? '' : bidderList && bidderList.bidders[stepNum - 1]?.job}
                  id="bidderJob"
                  type="text"
                  className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2"
                  placeholder="직업을 입력해주세요"
                  onChange={(e) => {
                    setBidderList((prev: any) => {
                      const temp = prev.bidders
                      temp[stepNum - 1].job = e.target.value
                      return { ...prev, bidders: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidJob
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidJob: temp }
                    })
                  }}
                />
                {errors.bidderJob?.type === 'required' && (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="agentJob"
                      className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.bidderJob?.message}
                    </label>
                  </div>
                )}
              </div>
              <SearchAddress
                bidderList={bidderList}
                setBidderList={setBidderList}
                stepNum={stepNum}
                register={register}
                errors={errors}
                setError={setError}
              />
            </div>
            <div className={`flex flex-row gap-[10px] absolute ${bidderList && bidderList?.bidders[stepNum - 1].bidderType === 'I' ? 'top-[700px]' : 'top-[770px]'} justify-center items-center md:w-[50%] w-[80%]`}>
              <button
                type="button"
                className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  setStepNum(stepNum - 1)
                }}
              >
                <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                  이전
                </span>
              </button>
              <div
                // type="submit"
                className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  setStepNum(stepNum + 1)
                }}
              >
                <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                  {stateNum <= 3 ? '확인' : '다음'}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}