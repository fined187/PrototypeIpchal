import { biddingInfoState, stepState } from '@/atom'
import Loading from '@/components/Loading'
import SearchAddress from '@/components/SearchAddress'
import { AgentInfoType } from '@/interface/IpchalType'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia'
import { useRecoilState } from 'recoil'

export default function AgentForm() {

  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [agentList, setAgentList] = useState<AgentInfoType[]>([])
  const { isOpen, onClose, onOpen } = useDisclosure() 
  const [agentInfo, setAgentInfo] = useState<AgentInfoType>({
    agentName: '',
    agentRel: '',
    agentPhone1: '',
    agentPhone2: '',
    agentPhone3: '',
    agentIdNum1: '',
    agentIdNum2: '',
    agentAddr: '',
    agentAddrDetail: '',
    agentJob: '',
  })
  const [passwordActive, setPasswordActive] = useState(false)

  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AgentInfoType>()

  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'agentPhone1') {
      setFocus('agentPhone2')
    } else if (target.value.length === 4 && target.id === 'agentPhone2') {
      setFocus('agentPhone3')
    }
  }

  const handleIdNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'agentIdNum1') {
      setFocus('agentIdNum2')
    }
  }

  const handleAgentUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/agents`,
        {
          name: biddingForm.agentName,
          relationship: biddingForm.agentRel,
          phoneNo: biddingForm.agentPhone,
          address: biddingForm.agentAddr,
          job: biddingForm.agentJob,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        setStateNum(6)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  전화번호 검증
  const handleVerifyPhone = (phone: string) => {
    // const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/g
    const telRegex = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/
    const smartPhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/g
    const telCheck = telRegex.test(phone)
    const smartPhoneCheck = smartPhoneRegex.test(phone)
    if (telCheck || smartPhoneCheck) {
      return true
    } else {
      return false
    }
    }

    //  민증 검증
  const handleVerifyIdNum = (idNum: string) => {
    if (idNum.length > 0 && idNum.length < 14) {
      const idNumArr = idNum.split('')
      const idNumArr1 = (idNumArr.length > 0 && idNumArr.map((item) => parseInt(item)))
      const idNumArr2 = idNumArr1 && idNumArr1.map((item, index) => {
        if (index === 0) {
          return item * 2
        } else if (index === 1) {
          return item * 3
        } else if (index === 2) {
          return item * 4
        } else if (index === 3) {
          return item * 5
        } else if (index === 4) {
          return item * 6
        } else if (index === 5) {
          return item * 7
        } else if (index === 6) {
          return item * 8
        } else if (index === 7) {
          return item * 9
        } else if (index === 8) {
          return item * 2
        } else if (index === 9) {
          return item * 3
        } else if (index === 10) {
          return item * 4
        } else if (index === 11) {
          return item * 5
        } else if (index === 12) {
          return item * 1
        }
      })

      const idNumArr3 = (idNumArr2 && idNumArr2.reduce((acc: any, cur: any) => acc + cur)) 
      const idNumArr4 = (idNumArr3 && (idNumArr3 - idNumArr2[12]!) % 11) 
      const idNumArr5 = (idNumArr4 && 11 - idNumArr4) 
      const idNumArr6 = (idNumArr5 && idNumArr5 % 10)
      if (idNumArr6 === (idNumArr1 && idNumArr1[12])) {
        return true
      } else {
        return false
      }
    }
  }

  const handleNextStep = async () => {
    if (biddingForm.agentName !== '' || biddingForm.agentRel !== '' || biddingForm.agentPhone !== '' || biddingForm.agentIdNum !== '' || biddingForm.agentAddr !== '' || biddingForm.agentAddrDetail !== '' || biddingForm.agentJob !== '') {
      await handleAgentUpdate()
    }
  }

  const onSubmit: SubmitHandler<AgentInfoType> = async () => {
    // if (handleVerifyIdNum(biddingForm.agentIdNum1 + biddingForm.agentIdNum2) === false) {
    //   alert('주민등록번호를 다시 확인해주세요')
    //   return
    // }
    // if (handleVerifyPhone(biddingForm.bidPhone1[stepNum - 1] + biddingForm.bidPhone2[stepNum - 1] + biddingForm.bidPhone3[stepNum - 1]) === false) {
    //   alert('전화번호를 확인해주세요')
    //   return
    // }
    if (isOpen === false) {
      try {
        await handleNextStep()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const handleGetAgentForm = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/agents`,
        )
        if (response.status === 200) {
          setAgentList(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetAgentForm()
  }, [])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setValue(name, value, { shouldValidate: true })
  }

  return (
    <div className="flex w-screen h-screen bg-mybg justify-center relative">
      {loading && (
        <Loading />
      )}
      {!loading && (
        <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
          <div className="flex flex-col gap-2 justify-center items-center pt-[50px]">
            <span className="md:text-[32.5px] text-[1.4rem] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
              대리인 정보를 입력해주세요
            </span>
            <span className="md:text-[18px] text-[0.8rem] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
              법인의 대리인인 경우 입찰자와의 관계에 '직원'등으로 적습니다
            </span>
          </div>

          {/* 입력정보 */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:w-[550px] w-[80%] h-[100%] justify-start items-center overflow-x-hidden'>
            <div className="flex flex-col w-[100%] gap-2">
              <div className="flex flex-row w-[100%] gap-[0.5%]">
                <div className="flex flex-col w-[49.5%] gap-1">
                  <div className='flex justify-between w-[100%]'>
                  {
                  (errors.agentName?.type == "required")  ?
                  (<div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                    >
                      {errors.agentName?.message}
                    </label>
                  </div>
                ) : 
                (errors.agentName?.type == "minLength") && (biddingForm.agentName.length < 2) ? (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="bidderName"
                        className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                      >
                        {errors.agentName?.message}
                      </label>
                    </div>
                  ) : 
                (
                  <div className='flex flex-row'>
                    <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                      성명
                    </span>
                    <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                      *
                    </span>
                  </div>
                )}
                  </div>
                  <input
                    {...register('agentName', {
                      required: "이름을 입력해주세요",
                      minLength: {
                        value: 2,
                        message: '이름은 2글자 이상 입력해주세요',
                      },
                    })}
                    value={biddingForm.agentName || ''}
                    id="agentName"
                    type="text"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] text-left h-[40px] px-2"
                    placeholder="성명을 입력해주세요"
                    onChange={(e) => {
                      setAgentInfo((prev: any) => {
                        return { ...prev, agentName: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentName: e.target.value }
                      })
                      handleInputChange(e)
                    }}
                  />
                </div>
                <div className="flex flex-col w-[49.5%] gap-1">
                  <div className='flex flex-row w-[100%]'>
                    {errors.agentRel?.type === 'required' && 
                    (biddingForm.agentRel === '') ?
                    (
                      <div className="flex w-[100%] justify-start">
                        <label
                          htmlFor="agentRel"
                          className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                        >
                          {errors.agentRel?.message}
                        </label>
                      </div>
                    ) : (
                      <div className='flex w-[100%] justify-start'>
                        <label
                          htmlFor="agentRel"
                          className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                        >
                          입찰자와의 관계
                        </label>
                        <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                          *
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    {...register('agentRel', {
                      required: '관계를 입력해주세요',
                    })}
                    value={biddingForm.agentRel || ''}
                    id="agentRel"
                    type="text"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] text-left h-[40px] px-2"
                    placeholder="관계를 입력해주세요"
                    onChange={(e) => {
                      setAgentInfo((prev: AgentInfoType) => {
                        return { ...prev, agentRel: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentRel: e.target.value }
                      })
                      handleInputChange(e)
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                  {(errors.agentPhone1?.type === 'required' ||
                    errors.agentPhone2?.type === 'required' ||
                    errors.agentPhone3?.type === 'required') && 
                    (biddingForm.agentPhone === '') ? 
                    (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="agentPhone"
                        className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                      >
                        전화번호를 입력해주세요
                      </label>
                    </div>
                  ) : (
                    <div className='flex w-[100%] justify-start'>
                      <label
                        htmlFor="agentPhone"
                        className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                      >
                        전화번호
                      </label>
                      <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                        *
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-[0.5%]">
                  <input
                    {...register('agentPhone1', { required: true, maxLength: 3 })}
                    id="agentPhone1"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    type="text"
                    maxLength={3}
                    placeholder="010"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.agentPhone1 || ''}
                    onChange={(e) => {
                      setAgentInfo((prev: AgentInfoType) => {
                        return { ...prev, agentPhone1: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentPhone1: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return {
                          ...prev,
                          agentPhone:
                            e.target.value +
                            prev.agentPhone2 +
                            prev.agentPhone3,
                        }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                  <input
                    {...register('agentPhone2', { required: true, maxLength: 4 })}
                    type="text"
                    id="agentPhone2"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="1234"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.agentPhone2 || ''}
                    onChange={(e) => {
                      setAgentInfo((prev: AgentInfoType) => {
                        return { ...prev, agentPhone2: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentPhone2: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return {
                          ...prev,
                          agentPhone:
                            prev.agentPhone1 +
                            e.target.value +
                            prev.agentPhone3,
                        }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                  <input
                    {...register('agentPhone3', { required: true, maxLength: 4 })}
                    type="text"
                    id="agentPhone3"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="5678"
                    className=" border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] not-italic leading-[150%] tracking-[-1%] h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.agentPhone3 || ''}
                    onChange={(e) => {
                      setAgentInfo((prev: AgentInfoType) => {
                        return { ...prev, agentPhone3: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentPhone3: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return {
                          ...prev,
                          agentPhone:
                            prev.agentPhone1 +
                            prev.agentPhone2 +
                            e.target.value,
                        }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                  {errors.agentIdNum1?.type === 'required' &&
                    errors.agentIdNum2?.type === 'required' && 
                    (biddingForm.agentIdNum === '') ?
                    (
                    <div className="flex w-[100%] justify-start h-[15px] mb-1">
                      <span className="md:text-[15px] text-[0.8rem] font-normal font-['suit'] tracking-[-3%] not-italic text-left text-red-500">
                        주민등록번호를 입력해주세요
                      </span>
                    </div>
                    ) : (
                      <div className='flex flex-row justify-between w-[100%]'>
                      <div className='flex flex-row justify-start'>
                        <label htmlFor="bidIdNum" className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                          주민등록번호
                        </label>
                        <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                          *
                        </span>
                      </div>
                      <div>
                        <span className="md:text-[15px] text-[0.8rem] font-normal font-['suit'] tracking-[-3%] not-italic text-left text-red-500">
                          주민등록번호는 별도로 저장되지 않습니다
                        </span>
                      </div>
                    </div>
                    )}
                </div>
                <div className="flex flex-row gap-[5%]">
                  <input
                    {...register('agentIdNum1', {
                      required: true,
                      maxLength: 6,
                    })}
                    id="agentIdNum1"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    type="text"
                    maxLength={6}
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                    value={biddingForm.agentIdNum1 || ''}
                    onChange={(e) => {
                      setAgentInfo((prev: AgentInfoType) => {
                        return { ...prev, agentIdNum1: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentIdNum1: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return {
                          ...prev,
                          agentIdNum: e.target.value + prev.agentIdNum2,
                        }
                      })
                      handleIdNumFocusMove(e.target)
                    }}
                  />
                  <span className="flex text-mygray font-['suit'] font-bold mt-1">
                    -
                  </span>
                  <div className='relative w-[45%] h-[40px]'>
                    <input
                      {...register('agentIdNum2', {
                        required: true,
                        maxLength: 7,
                      })}
                      id="agentIdNum2"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*)\./g, '$1')
                      }}
                      type={`${passwordActive ? 'text' : 'password'}`}
                      maxLength={7}
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[100%] text-center"
                      value={biddingForm.agentIdNum2 || ''}
                      onChange={(e) => {
                        setAgentInfo((prev: any) => {
                          return { ...prev, agentIdNum2: e.target.value }
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentIdNum2: e.target.value }
                        })
                        setBiddingForm((prev: any) => {
                          return {
                            ...prev,
                            agentIdNum: prev.agentIdNum1 + e.target.value,
                          }
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
              <div className={`flex flex-col w-[100%] h-[60px] gap-1 `}>
                <div className="flex flex-col w-[100%] gap-1">
                  <div className='flex justify-between w-[100%]'>
                    {errors.agentJob?.type === 'required' && 
                    (biddingForm.agentJob === '') ?
                    (
                      <div className="flex w-[100%] justify-start">
                        <label
                          htmlFor="agentJob"
                          className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                        >
                          {errors.agentJob?.message}
                        </label>
                      </div>
                    ) : (
                      <div className='flex w-[100%] justify-start'>
                        <label
                          htmlFor="agentJob"
                          className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                        >
                          직업
                        </label>
                        <span className="text-[20px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                          *
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    {...register('agentJob', {
                      required: '직업을 입력해주세요',
                    })}
                    value={biddingForm.agentJob || ''}
                    id="agentJob"
                    type="text"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[0.8rem] font-semibold font-['suit'] leading-[150%] tracking-[-1%] not-italic text-left h-[40px] px-2"
                    placeholder="직업을 입력해주세요(예: 회사원, 농부)"
                    onChange={(e) => {
                      setAgentInfo((prev: any) => {
                        return { ...prev, agentJob: e.target.value }
                      })
                      setBiddingForm((prev: any) => {
                        return { ...prev, agentJob: e.target.value }
                      })
                      handleInputChange(e)
                    }}
                  />
                </div>
                <SearchAddress
                  agentRegister={register}
                  agentErrors={errors}
                  agentSetError={setError}
                  agentInfo={agentInfo}
                  setAgentInfo={setAgentInfo}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  setValue={setValue}
                />
              </div>
            </div>
            <div className="flex flex-row gap-[10px] fixed md:bottom-[80px] bottom-[10px] md:w-[550px] w-[90%]">
              <button
                type="button"
                className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
                onClick={() => {
                  {
                    setStateNum(4)
                  }
                }}
              >
                <span className="text-sutTitle font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  이전으로
                </span>
              </button>
              <button
                type="submit"
                className="flex w-[60%] md:w-[65%] h-[50px] bg-myBlue rounded-full justify-center items-center cursor-pointer"
              >
                <span className="text-white font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  다음으로
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
