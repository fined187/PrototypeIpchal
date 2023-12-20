import { biddingInfoState, stepState } from '@/atom'
import SearchAddress from '@/components/SearchAddress'
import { BidderList, BiddingInfoType } from '@/interface/IpchalType'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BidderForm() {
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const [bidderList, setBidderList] = useState<BidderList[]>([])

  const [biddingInfo, setBiddingInfo] = useState<BiddingInfoType>({
    bidderName: Array(biddingForm.bidderNum).fill(''),
    bidderPhone1: Array(biddingForm.bidderNum).fill(''),
    bidderPhone2: Array(biddingForm.bidderNum).fill(''),
    bidderPhone3: Array(biddingForm.bidderNum).fill(''),
    bidderIdNum1: Array(biddingForm.bidderNum).fill(''),
    bidderIdNum2: Array(biddingForm.bidderNum).fill(''),
    bidderAddr: Array(biddingForm.bidderNum).fill(''),
    bidderAddrDetail: Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum1: Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum2: Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum3: Array(biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum1: Array(biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum2: Array(biddingForm.bidderNum).fill(''),
    bidderCorpYn: Array(biddingForm.bidderNum).fill('I'),
    bidderJob: Array(biddingForm.bidderNum).fill(''),
  })

  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)
  const [stepNum, setStepNum] = useState<number>(1)

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

  const handleBidderFormSave = async () => {
    try {
      if (biddingForm.bidCorpYn[stepNum - 1] === 'I') {
        const response = await axios.post(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`,
          {
            bidderType: biddingForm.bidCorpYn[stepNum - 1],
            name: biddingForm.bidName[stepNum - 1],
            phoneNo: biddingForm.bidPhone[stepNum - 1],
            address:
              biddingForm.bidAddr[stepNum - 1] +
              biddingForm.bidAddrDetail[stepNum - 1],
            job: biddingForm.bidJob[stepNum - 1],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      } else {
        const response = await axios.post(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`,
          {
            bidderType: biddingForm.bidCorpYn[stepNum - 1],
            name: biddingForm.bidName[stepNum - 1],
            phoneNo: biddingForm.bidPhone[stepNum - 1],
            address:
              biddingForm.bidAddr[stepNum - 1] +
              biddingForm.bidAddrDetail[stepNum - 1],
            job: biddingForm.bidJob[stepNum - 1],
            companyNo: biddingForm.bidCorpNum[stepNum - 1],
            corporationNo: biddingForm.bidCorpRegiNum[stepNum - 1],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextStep = (num: number) => {
    if (biddingForm.bidCorpYn[num] === 'I') {
      if (
        biddingForm?.bidName[num] === '' ||
        biddingForm?.bidPhone1[num] === '' ||
        biddingForm?.bidPhone2[num] === '' ||
        biddingForm?.bidPhone3[num] === '' ||
        biddingForm?.bidAddr[num] === '' ||
        biddingForm?.bidAddrDetail[num] === '' ||
        biddingForm?.bidIdNum1[num] === '' ||
        biddingForm?.bidIdNum2[num] === '' ||
        biddingForm?.bidJob[num] === ''
      ) {
        alert('입력하지 않은 정보가 있습니다.')
      } else {
        if (biddingForm.bidderNum === 1) {
          if (biddingForm.bidder === 'self') {
            setStateNum(stateNum + 2)
            reset()
          }
        } else {
          if (stepNum === biddingForm.bidderNum) {
            if (biddingForm.bidder === 'self') {
              //  본인인 경우 + 공동입찰(배분 필요)
              setStateNum(stateNum + 1)
              reset()
            }
          } else {
            setStepNum(stepNum + 1)
          }
        }
      }
    } else if (biddingForm.bidCorpYn[num] === 'C') {
      if (
        biddingForm?.bidPhone1[num] === '' ||
        biddingForm?.bidPhone2[num] === '' ||
        biddingForm?.bidPhone3[num] === '' ||
        biddingForm?.bidAddr[num] === '' ||
        biddingForm?.bidAddrDetail[num] === '' ||
        biddingForm?.bidCorpNum1[num] === '' ||
        biddingForm?.bidCorpNum2[num] === '' ||
        biddingForm?.bidCorpNum3[num] === '' ||
        biddingForm?.bidCorpRegiNum1[num] === '' ||
        biddingForm?.bidCorpRegiNum2[num] === '' ||
        biddingForm?.bidJob[num] === ''
      ) {
        alert('입력하지 않은 정보가 있습니다.')
      } else {
        if (biddingForm.bidderNum === 1) {
          if (biddingForm.bidder === 'self') {
            //  본인인 경우
            setStateNum(stateNum + 2)
          }
        } else {
          if (stepNum === biddingForm.bidderNum) {
            if (biddingForm.bidder === 'self') {
              //  본인인 경우 + 공동입찰(배분 필요)
              setStateNum(stateNum + 1)
              reset()
            }
          } else {
            setStepNum(stepNum + 1)
          }
        }
      }
    }
  }

  useEffect(() => {
    const handleGetBidderForm = async () => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`,
        )
        setBidderList(response.data.data.bidderList)
        if (bidderList.length > 0) {
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].name
            return { ...prev, bidName: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].phoneNo
            return { ...prev, bidPhone: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].address
            return { ...prev, bidAddr: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].job
            return { ...prev, bidJob: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].companyNo
            return { ...prev, bidCorpNum: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidderNum[stepNum - 1]
            temp = bidderList[stepNum - 1].corporationNo
            return { ...prev, bidCorpRegiNum: temp }
          })
          setBiddingForm((prev: any) => {
            let temp = prev.bidCorpYn[stepNum - 1]
            temp = bidderList[stepNum - 1].bidderType
            return { ...prev, bidCorpYn: temp }
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBidderForm()
  }, [])

  useEffect(() => {
    setBiddingForm((prev: any) => {
      const temp = biddingInfo.bidderCorpYn
      return { ...prev, bidCorpYn: temp }
    })
  }, [])

  const onSubmit: SubmitHandler<any> = async () => {
    await handleBidderFormSave()
    handleNextStep(stepNum - 1)
    reset()
  }

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <div className="flex flex-row  py-6 pt-4">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            본인 정보를 입력해주세요
          </span>
          {biddingForm.bidderNum > 1 && (
            <span className="text-lg font-extrabold font-nanum not-italic leading-8 ml-2">
              {`(${stepNum} / ${biddingForm.bidderNum})`}
            </span>
          )}
        </div>
        <div className="flex flex-row gap-10 w-[80%] justify-center">
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo?.bidderCorpYn[stepNum - 1] === 'I'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setBiddingInfo((prev: any) => {
                const temp = prev.bidderCorpYn
                temp[stepNum - 1] = 'I'
                return { ...prev, bidderCorpYn: temp }
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
                biddingInfo?.bidderCorpYn[stepNum - 1] === 'I'
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
              className={`text-[13px] font-nanum not-italic font-extrabold ${
                biddingInfo?.bidderCorpYn[stepNum - 1] === 'I'
                  ? 'text-white'
                  : 'text-myyellow'
              }`}
            >
              개인
            </span>
          </div>
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo?.bidderCorpYn[stepNum - 1] === 'C'
                ? 'text-white bg-myyellow'
                : 'text-myyellow bg-white'
            }`}
            onClick={() => {
              setBiddingInfo((prev: any) => {
                const temp = prev.bidderCorpYn
                temp[stepNum - 1] = 'C'
                return { ...prev, bidderCorpYn: temp }
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
                biddingInfo?.bidderCorpYn[stepNum - 1] === 'C'
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
              className={`text-[13px] font-nanum not-italic font-extrabold ${
                biddingInfo?.bidderCorpYn[stepNum - 1] === 'C'
                  ? 'text-white'
                  : 'text-myyellow'
              }`}
            >
              법인
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-[320px] h-[100%] gap-2">
            <div className="flex flex-col w-[100%] gap-1">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
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
                value={
                  biddingForm.bidName[stepNum - 1] === ''
                    ? ''
                    : biddingForm.bidName[stepNum - 1]
                }
                id="bidderName"
                type="text"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                placeholder="입찰자 성명을 입력해주세요"
                onChange={(e) => {
                  setBiddingInfo((prev: any) => {
                    const temp = prev.bidderName
                    temp[stepNum - 1] = e.target.value
                    return { ...prev, bidderName: temp }
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
                <label
                  htmlFor="bidderName"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                >
                  {errors.bidderName?.message}
                </label>
              </div>
            )}
            <div className="flex flex-col w-[100%] gap-1">
              <label
                htmlFor="bidderPhone"
                className="text-[10px] font-nanum not-italic font-extrabold text-left"
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.bidPhone1[stepNum - 1] === ''
                      ? ''
                      : biddingForm.bidPhone1[stepNum - 1]
                  }
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone1
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidderPhone1: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone1
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone1: temp }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.bidPhone2[stepNum - 1] === ''
                      ? ''
                      : biddingForm.bidPhone2[stepNum - 1]
                  }
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone2
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidderPhone2: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone2
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone2: temp }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.bidPhone3[stepNum - 1] === ''
                      ? ''
                      : biddingForm.bidPhone3[stepNum - 1]
                  }
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone3
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidderPhone3: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone3
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidPhone3: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidPhone
                      temp[stepNum - 1] =
                        biddingInfo?.bidderPhone1[stepNum - 1] +
                        biddingInfo?.bidderPhone2[stepNum - 1] +
                        e.target.value
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
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                  전화번호를 입력해주세요
                </span>
              </div>
            )}
            {biddingInfo?.bidderCorpYn[stepNum - 1] === 'I' ? (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label
                    htmlFor="bidIdNum"
                    className="text-[10px] font-nanum not-italic font-extrabold text-left"
                  >
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
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={
                        biddingForm.bidIdNum1[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidIdNum1[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderIdNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidderIdNum1: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidIdNum1: temp }
                        })
                        handleIdNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
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
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={
                        biddingForm.bidIdNum2[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidIdNum2[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderIdNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidderIdNum2: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidIdNum2: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidIdNum
                          temp[stepNum - 1] =
                            biddingInfo?.bidderIdNum1[stepNum - 1] +
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
                      <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                        주민등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
              </>
            ) : (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label
                    htmlFor="bidCorpNum"
                    className="text-[10px] font-nanum not-italic font-extrabold text-left"
                  >
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
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={
                        biddingForm.bidCorpNum1[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidCorpNum1[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidderCorpNum1: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum1
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum1: temp }
                        })
                        handleCorpNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
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
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={
                        biddingForm.bidCorpNum2[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidCorpNum2[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidderCorpNum2: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum2
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum2: temp }
                        })
                        handleCorpNumFocusMove(e.target)
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
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
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={
                        biddingForm.bidCorpNum3[stepNum - 1] === ''
                          ? ''
                          : biddingForm.bidCorpNum3[stepNum - 1]
                      }
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum3
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidderCorpNum3: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum3
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidCorpNum3: temp }
                        })
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidCorpNum
                          temp[stepNum - 1] =
                            biddingInfo?.bidderCorpNum1[stepNum - 1] +
                            biddingInfo?.bidderCorpNum2[stepNum - 1] +
                            e.target.value
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
                      <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                        사업자등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col w-[100%] gap-1 mt-1">
                    <label
                      htmlFor="bidCorpRegiNum"
                      className="text-[10px] font-nanum not-italic font-extrabold text-left"
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
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={
                          biddingForm.bidCorpRegiNum1[stepNum - 1] === ''
                            ? ''
                            : biddingForm.bidCorpRegiNum1[stepNum - 1]
                        }
                        onChange={(e) => {
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderCorpRegiNum1
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidderCorpRegiNum1: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum1
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidCorpRegiNum1: temp }
                          })
                          handleCorpRegiNumFocusMove(e.target)
                        }}
                      />
                      <span className="flex text-mygray font-nanum font-normal">
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
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={
                          biddingForm.bidCorpRegiNum2[stepNum - 1] === ''
                            ? ''
                            : biddingForm.bidCorpRegiNum2[stepNum - 1]
                        }
                        onChange={(e) => {
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderCorpRegiNum2
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidderCorpRegiNum2: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum2
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidCorpRegiNum2: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidCorpRegiNum
                            temp[stepNum - 1] =
                              biddingInfo?.bidderCorpRegiNum1[stepNum - 1] +
                              e.target.value
                            return { ...prev, bidCorpRegiNum: temp }
                          })
                        }}
                      />
                    </div>
                  </div>
                  {(errors.bidderCorpRegiNum1?.type === 'required' ||
                    errors.bidderCorpRegiNum2?.type === 'required') && (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                        법인 등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className={`flex flex-col w-[100%] h-[60px] gap-1 `}>
              <SearchAddress
                biddingInfo={biddingInfo}
                setBiddingInfo={setBiddingInfo}
                stepNum={stepNum}
                register={register}
                errors={errors}
                setError={setError}
              />
              <div className="flex flex-col w-[100%] gap-1">
                <label
                  htmlFor="bidderJob"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left"
                >
                  직업
                </label>
                <input
                  {...register('bidderJob', {
                    required: '직업을 입력해주세요',
                  })}
                  value={
                    biddingForm.bidJob[stepNum - 1] === ''
                      ? ''
                      : biddingForm.bidJob[stepNum - 1]
                  }
                  id="bidderJob"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="직업을 입력해주세요"
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderJob
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidderJob: temp }
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
                      className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.bidderJob?.message}
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2 absolute top-[578px]">
              <button
                type="button"
                className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  {
                    stepNum === 1
                      ? setStateNum(stateNum - 1)
                      : setStepNum(stepNum - 1)
                  }
                }}
              >
                <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                  이전
                </span>
              </button>
              <button
                type="submit"
                className="flex w-[229px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
              >
                <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                  {stateNum <= 3 ? '확인' : '다음'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
