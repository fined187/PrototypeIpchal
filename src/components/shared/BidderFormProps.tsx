import { biddingInfoState, stepState } from "@/atom"
import { BiddingInfoType } from "@/model/IpchalType"
import { Dispatch, SetStateAction, useState } from "react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetError, UseFormSetFocus, UseFormSetValue } from "react-hook-form"
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia"
import { useRecoilState } from "recoil"
import SearchAddress from "../SearchAddress"
import Button from "./Button"

interface Props {
  handleSubmit: UseFormHandleSubmit<BiddingInfoType>
  onSubmit: (stepNum: number) => void
  errors: FieldErrors<BiddingInfoType>
  stepNum: number
  register: UseFormRegister<BiddingInfoType>
  handleInputChange: (e: any) => void
  setFocus: UseFormSetFocus<BiddingInfoType>
  setStepNum: Dispatch<SetStateAction<number>>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  setError: UseFormSetError<BiddingInfoType>
  setValue: UseFormSetValue<BiddingInfoType>
}

export default function BidderFormProps({ setValue, setError, handleSubmit, onSubmit, errors, stepNum, register, handleInputChange, setFocus, setStepNum, isOpen, onOpen, onClose }: Props) {
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [passwordActive, setPasswordActive] = useState(false)

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
  return (
    <form onSubmit={handleSubmit(async () => {
      await onSubmit(stepNum)
    })} className='flex flex-col md:w-[550px] w-[80%] h-[60%] justify-center items-center overflow-y-auto overflow-x-hidden relative'>
      <div className="flex flex-col w-[100%] gap-2 absolute top-0">
        <div className="flex flex-col w-[100%] gap-1">
          <div className='flex justify-between w-[100%]'>
            {
              (errors.bidderName?.type == "required")  ?
              (<div className="flex w-[100%] justify-start">
                <label
                  htmlFor="bidderName"
                  className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                >
                  {errors.bidderName?.message}
                </label>
              </div>
            ) : 
            (errors.bidderName?.type == "minLength") && (biddingForm.bidName[stepNum - 1].length < 2) ? (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="bidderName"
                    className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                  >
                    {errors.bidderName?.message}
                  </label>
                </div>
              ) : 
              (
              <div className='flex flex-row'>
                {biddingForm.bidCorpYn[stepNum - 1] === 'I' ? (
                  <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                    성명
                  </span>
                ) : (
                  <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                    법인명
                  </span>
                )}
                <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                  *
                </span>
              </div>
              )}
          </div>
          <input
            {...register("bidderName", {
              required: "이름을 입력해주세요",
              minLength: {
                value: 2,
                message: '2글자 이상 입력해주세요',
              }
            })}
            value={biddingForm.bidName[stepNum - 1] || ''}
            id="bidderName"
            type="text"
            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left h-[40px] px-2 leading-[135%] tracking-[-2%]"
            placeholder="입찰자 성명을 입력해주세요"
            onChange={(e) => {
              setBiddingForm((prev: any) => {
                const temp = prev.bidName
                temp[stepNum - 1] = e.target.value
                return { ...prev, bidName: temp }
              })
              handleInputChange(e)
            }}
          />
        </div>
        <div className="flex flex-col w-[100%] gap-1">
          <div className='flex justify-between w-[100%]'>
            {(errors.bidderPhone1?.type === 'required' ||
              errors.bidderPhone2?.type === 'required' ||
              errors.bidderPhone3?.type === 'required') && (biddingForm.bidPhone[stepNum - 1] === '' || biddingForm.bidPhone[stepNum - 1] === undefined) ? (
              <div className="flex w-[100%] justify-start">
                <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                  전화번호를 입력해주세요
                </span>
              </div>
            ) : (
              <div className='flex flex-row justify-start w-[100%]'>
                <label
                  htmlFor="bidderPhone"
                  className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                >
                  전화번호
                </label>
                <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                  *
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-[0.5%]">
            <input
              {...register('bidderPhone1', { required: true })}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              type="text"
              id='bidderPhone1'
              maxLength={3}
              placeholder="010"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] leading-[135%] tracking-[-2%] not-italic h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.bidPhone1[stepNum - 1] || ''}
              onChange={(e) => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone1
                  temp[stepNum - 1] = e.target.value
                  return { ...prev, bidPhone1: temp }
                })
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone
                  temp[stepNum - 1] =
                    e.target.value +
                    biddingForm.bidPhone2[stepNum - 1] +
                    biddingForm.bidPhone3[stepNum - 1]
                  return { ...prev, bidPhone: temp }
                })
                handlePhoneFocusMove(e.target)
                handleInputChange(e)
              }}
            />
            <input
              {...register('bidderPhone2', {
                required: true,
                maxLength: 4,
              })}
              type="text"
              id='bidderPhone2'
              maxLength={4}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              placeholder="1234"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.bidPhone2[stepNum - 1] || ''}
              onChange={(e) => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone2
                  temp[stepNum - 1] = e.target.value
                  return { ...prev, bidPhone2: temp }
                })
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone
                  temp[stepNum - 1] =
                    biddingForm?.bidPhone1[stepNum - 1] +
                    e.target.value +
                    biddingForm?.bidPhone3[stepNum - 1]
                  return { ...prev, bidPhone: temp }
                })
                handlePhoneFocusMove(e.target)
                handleInputChange(e)
              }}
            />
            <input
              {...register('bidderPhone3', {
                required: true,
                maxLength: 4,
              })}
              type="text"
              id='bidderPhone3'
              maxLength={4}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
              }}
              placeholder="5678"
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
              value={biddingForm.bidPhone3[stepNum - 1] || ''}
              onChange={(e) => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone3
                  temp[stepNum - 1] = e.target.value
                  return { ...prev, bidPhone3: temp }
                })
                setBiddingForm((prev: any) => {
                  const temp = prev.bidPhone
                  temp[stepNum - 1] =
                    biddingForm?.bidPhone1[stepNum - 1] +
                    biddingForm?.bidPhone2[stepNum - 1] +
                    e.target.value
                  return { ...prev, bidPhone: temp }
                })
                handlePhoneFocusMove(e.target)
                handleInputChange(e)
              }}
            />
          </div>
        </div>
        {biddingForm.bidCorpYn[stepNum - 1] === 'I' ? (
          <>
            <div className="flex flex-col w-[100%] gap-1">
              <div className='flex justify-between w-[100%]'>
                {errors.bidderIdNum1?.type === 'required' &&
                    errors.bidderIdNum2?.type === 'required' && 
                    (biddingForm.bidIdNum[stepNum - 1] === '' || biddingForm.bidIdNum[stepNum - 1] === undefined) ? (
                    <div className="flex w-[100%] justify-start h-[15px] mb-1">
                      <span className="md:text-[20px] text-[12px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                        주민등록번호를 입력해주세요
                      </span>
                    </div>
                  ) :
                  (
                    <div className='flex flex-row justify-between w-[100%]'>
                      <div className='flex flex-row justify-start'>
                        <label htmlFor="bidIdNum" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                          주민등록번호
                        </label>
                        <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                          *
                        </span>
                      </div>
                      <div>
                        <span className="hidden md:flex md:text-[15px] text-[0.8rem] font-light leading-[135%] tracking-[-3%] font-['suit'] not-italic text-left text-red-500">
                          주민등록번호는 별도로 저장되지 않습니다
                        </span>
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="flex flex-row gap-[5%] relative">
                <input
                  {...register('bidderIdNum1', {
                    required: true,
                    maxLength: 6,
                  })}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  type="text"
                  id='bidderIdNum1'
                  maxLength={6}
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                  value={biddingForm.bidIdNum1[stepNum - 1] || ''}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidIdNum1
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidIdNum1: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidIdNum
                      temp[stepNum - 1] =
                        e.target.value +
                        biddingForm.bidIdNum2[stepNum - 1]
                      return { ...prev, bidIdNum: temp }
                    })
                    handleIdNumFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
                <span className="flex text-mygray font-['suit'] font-bold mt-1">
                  -
                </span>
                <div className='relative w-[45%] h-[40px]'>
                  <input
                    {...register('bidderIdNum2', { required: true, maxLength: 7})}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    id='bidderIdNum2'
                    type={`${!passwordActive ? 'password' : 'text'}`}
                    maxLength={7}
                    className="flex justify-center items-center border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[100%] text-center"
                    value={biddingForm.bidIdNum2[stepNum - 1] ?? ''}
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
                      handleInputChange(e)
                    }}
                  />
                  <div className="flex justify-center items-center w-[10%] h-[40px] cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
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
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col w-[100%] gap-1">
              <div className='flex justify-between w-[100%]'>
                {(errors.bidderCorpNum1?.type === 'required' ||
                  errors.bidderCorpNum2?.type === 'required' ||
                  errors.bidderCorpNum3?.type === 'required') && 
                  (biddingForm.bidCorpNum[stepNum - 1] === '' || biddingForm.bidCorpNum[stepNum - 1] === undefined) ? (
                  <div className="flex w-[100%] justify-start mb-1">
                    <span className="md:text-[20px] text-[12px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                      사업자등록번호를 입력해주세요
                    </span>
                  </div>
                ) : (
                  <div className='flex flex-row justify-start w-[100%]'>
                    <label htmlFor="bidCorpNum" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                      사업자 등록번호
                    </label>
                    <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                      *
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-[5%]">
                <input
                  {...register('bidderCorpNum1', {
                    required: true,
                    maxLength: 3,
                  })}
                  type="text"
                  id='bidderCorpNum1'
                  placeholder="123"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  maxLength={3}
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                  value={biddingForm.bidCorpNum1[stepNum - 1] || ''}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum1
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidCorpNum1: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum
                      temp[stepNum - 1] =
                        e.target.value +
                        biddingForm.bidCorpNum2[stepNum - 1] +
                        biddingForm.bidCorpNum3[stepNum - 1]
                      return { ...prev, bidCorpNum: temp }
                    })
                    handleCorpNumFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
                <span className="flex text-mygray font-['suit'] font-bold mt-1">
                  -
                </span>
                <input
                  {...register('bidderCorpNum2', {
                    required: true,
                    maxLength: 2,
                  })}
                  type="text"
                  id='bidderCorpNum2'
                  placeholder="45"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  maxLength={2}
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                  value={biddingForm.bidCorpNum2[stepNum - 1] || ''}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum2
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidCorpNum2: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum
                      temp[stepNum - 1] =
                        biddingForm.bidCorpNum1[stepNum - 1] +
                        biddingForm.bidCorpNum2[stepNum - 1] +
                        e.target.value
                      return { ...prev, bidCorpNum: temp }
                    })
                    handleCorpNumFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
                <span className="flex text-mygray font-['suit'] font-bold mt-1">
                  -
                </span>
                <input
                  {...register('bidderCorpNum3', {
                    required: true,
                    maxLength: 5,
                  })}
                  type="text"
                  id='bidderCorpNum3'
                  placeholder="67890"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value
                      .replace(/[^0-9.]/g, '')
                      .replace(/(\..*)\./g, '$1')
                  }}
                  maxLength={5}
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                  value={biddingForm.bidCorpNum3[stepNum - 1] || ''}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum3
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidCorpNum3: temp }
                    })
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidCorpNum
                      temp[stepNum - 1] =
                        biddingForm.bidCorpNum1[stepNum - 1] +
                        biddingForm.bidCorpNum2[stepNum - 1] +
                        e.target.value
                      return { ...prev, bidCorpNum: temp }
                    })
                    handleCorpNumFocusMove(e.target)
                    handleInputChange(e)
                  }}
                />
              </div>
              <div className="flex flex-col w-[100%] gap-1 mt-1">
                <div className='flex justify-between w-[100%]'>
                  {(errors.bidderCorpRegiNum1?.type === 'required' ||
                    errors.bidderCorpRegiNum2?.type === 'required') &&
                    (biddingForm.bidCorpRegiNum[stepNum - 1] === '' || biddingForm.bidCorpRegiNum[stepNum - 1] === undefined) ? 
                    (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="md:text-[20px] text-[12px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                        법인 등록번호를 입력해주세요
                      </span>
                    </div>
                  ) : (
                    <div className='flex flex-row justify-start w-[100%]'>
                      <label
                        htmlFor="bidCorpRegiNum"
                        className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                      >
                        법인 등록번호
                      </label>
                      <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                        *
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-[5%]">
                  <input
                    {...register('bidderCorpRegiNum1', {
                      required: true,
                      maxLength: 6,
                    })}
                    type="text"
                    id='bidderCorpRegiNum1'
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    maxLength={6}
                    placeholder="123456"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                    value={biddingForm.bidCorpRegiNum1[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidCorpRegiNum1
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidCorpRegiNum1: temp }
                      })
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidCorpRegiNum
                        temp[stepNum - 1] =
                          e.target.value +
                          biddingForm?.bidCorpRegiNum2[stepNum - 1]
                        return { ...prev, bidCorpRegiNum: temp }
                      })
                      handleCorpRegiNumFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                  <span className="flex text-mygray font-['suit'] font-bold mt-1">
                    -
                  </span>
                  <input
                    {...register('bidderCorpRegiNum2', {
                      required: true,
                      maxLength: 7,
                    })}
                    type="text"
                    id='bidderCorpRegiNum2'
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    maxLength={7}
                    placeholder="1234567"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                    value={biddingForm.bidCorpRegiNum2[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidCorpRegiNum2
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidCorpRegiNum2: temp }
                      })
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidCorpRegiNum
                        temp[stepNum - 1] =
                          biddingForm?.bidCorpRegiNum1[stepNum - 1] +
                          e.target.value
                        return { ...prev, bidCorpRegiNum: temp }
                      })
                      handleInputChange(e)
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className={`flex flex-col w-[100%] h-[100%] bg-mybg gap-1 relative`}>
          {biddingForm.agentYn === 'Y' && (
            <div className="flex flex-col w-[100%] gap-1">
              <div className='flex justify-between w-[100%]'>
                {errors.bidderJob?.type === 'required' && 
                  (biddingForm.bidJob[stepNum - 1] === '' || biddingForm.bidJob[stepNum - 1] === undefined) ?
                  (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="agentJob"
                        className="md:text-[20px] text-[12px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500"
                      >
                        {errors.bidderJob?.message}
                      </label>
                    </div>
                  ) : (errors.bidderJob?.type === "maxLength") ? (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="agentJob"
                        className="md:text-[20px] text-[12px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500"
                      >
                        {errors.bidderJob?.message}
                      </label>
                    </div>
                  ) : (
                    <div className='flex flex-row justify-start w-[100%]'>
                      <label htmlFor="bidderJob" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                        직업
                      </label>
                      <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                        *
                      </span>
                    </div>
                  )}
              </div>
              <input
                {...register('bidderJob', {
                  required: '직업을 입력해주세요',
                  maxLength: {
                    value: 10,
                    message: '10글자 이하로 입력해주세요',
                  }
                })}
                value={biddingForm.bidJob[stepNum - 1] || ''}
                type="text"
                maxLength={10}
                className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left h-[40px] px-2"
                placeholder="직업을 입력해주세요(예: 회사원, 농부)"
                onChange={(e) => {
                  setBiddingForm((prev: any) => {
                    const temp = prev.bidJob
                    temp[stepNum - 1] = e.target.value
                    return { ...prev, bidJob: temp }
                  })
                  handleInputChange(e)
                }}
              />
              
            </div>
          )}
          <SearchAddress 
            stepNum={stepNum}
            register={register}
            errors={errors}
            setError={setError}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            setValue={setValue}
          />
        </div>
      </div>
      <Button 
        nextText="다음으로"
        prevText="이전으로"
        type="submit"
        handlePrevStep={() => {
          stepNum === 1
            ? setStateNum(stateNum - 1)
            : setStepNum(stepNum - 1)
        }}
      />
    </form>
  )
}