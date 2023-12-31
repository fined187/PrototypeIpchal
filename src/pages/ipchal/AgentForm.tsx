import { biddingInfoState, stepState } from '@/atom'
import SearchAddress from '@/components/SearchAddress'
import { AgentInfoType } from '@/interface/IpchalType'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function AgentForm() {
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const setStateNum = useSetRecoilState(stepState)
  const stateNum = useRecoilValue(stepState)

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

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    setError,
    formState: { errors },
  } = useForm<AgentInfoType>({
    defaultValues: {
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
    },
  })

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

  const handleAgentSave = async () => {
    try {
      const response = await axios.post(
        `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/agents`,
        {
          name: biddingForm.agentName,
          relationship: biddingForm.agentRel,
          phoneNo: biddingForm.agentPhone,
          address: biddingForm.agentAddr + biddingForm.agentAddrDetail,
          job: biddingForm.agentJob,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<any> = async () => {
    await handleAgentSave()
    reset()
  }

  useEffect(() => {
    if (biddingForm.agentAddrDetail === '') return

    if (setError) {
      setError('agentAddr', { type: 'manual', message: '' })
    }
  }, [biddingForm.agentAddrDetail, setError])

  return (
    <div className="flex w-screen h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <div className="flex flex-row py-6">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            대리인 정보를 입력해주세요
          </span>
        </div>
        {/* 입력정보 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-[320px] h-[100%] gap-2">
            <div className="flex flex-row w-[100%] gap-[5%]">
              <div className="flex flex-col w-[47.5%] gap-1">
                <label
                  htmlFor="agentName"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left"
                >
                  성명
                </label>
                <input
                  {...register('agentName', {
                    required: '대리인 이름을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '이름은 2자 이상 입력해주세요',
                    },
                  })}
                  value={
                    biddingForm.agentName === '' ? '' : biddingForm.agentName
                  }
                  id="agentName"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="성명을 입력해주세요"
                  onChange={(e) => {
                    setAgentInfo((prev: any) => {
                      return { ...prev, agentName: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentName: e.target.value }
                    })
                  }}
                />
                {(errors.agentName?.type === 'required' ||
                  errors.agentName?.type === 'minLength') && (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.agentName?.message}
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-[47.5%] gap-1">
                <label
                  htmlFor="agentRel"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left"
                >
                  입찰자와의 관계
                </label>
                <input
                  {...register('agentRel', {
                    required: '입찰자와의 관계를 입력해주세요',
                  })}
                  value={
                    biddingForm.agentRel === '' ? '' : biddingForm.agentRel
                  }
                  id="agentRel"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="관계를 입력해주세요"
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentRel: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentRel: e.target.value }
                    })
                  }}
                />
                {errors.agentRel?.type === 'required' && (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="agentRel"
                      className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.agentRel?.message}
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[100%] gap-1">
              <label
                htmlFor="agentPhone"
                className="text-[10px] font-nanum not-italic font-extrabold text-left"
              >
                전화번호
              </label>
              <div className="flex flex-row gap-[5%]">
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.agentPhone1 === ''
                      ? ''
                      : biddingForm.agentPhone1
                  }
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentPhone1: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone1: e.target.value }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">
                  -
                </span>
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.agentPhone2 === ''
                      ? ''
                      : biddingForm.agentPhone2
                  }
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentPhone2: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone2: e.target.value }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">
                  -
                </span>
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={
                    biddingForm.agentPhone3 === ''
                      ? ''
                      : biddingForm.agentPhone3
                  }
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
                          agentInfo?.agentPhone1 +
                          agentInfo?.agentPhone2 +
                          e.target.value,
                      }
                    })
                    handlePhoneFocusMove(e.target)
                  }}
                />
              </div>
            </div>
            {(errors.agentPhone1?.type === 'required' ||
              errors.agentPhone2?.type === 'required' ||
              errors.agentPhone3?.type === 'required') && (
              <div className="flex w-[100%] justify-start">
                <label
                  htmlFor="agentPhone"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                >
                  전화번호를 입력해주세요
                </label>
              </div>
            )}
            <div className="flex flex-col w-[100%] gap-1">
              <label
                htmlFor="agentIdNum"
                className="text-[10px] font-nanum not-italic font-extrabold text-left"
              >
                주민등록번호
              </label>
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
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                  value={
                    biddingForm.agentIdNum1 === ''
                      ? ''
                      : biddingForm.agentIdNum1
                  }
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentIdNum1: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentIdNum1: e.target.value }
                    })
                    handleIdNumFocusMove(e.target)
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">
                  -
                </span>
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
                  type="text"
                  maxLength={7}
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                  value={
                    biddingForm.agentIdNum2 === ''
                      ? ''
                      : biddingForm.agentIdNum2
                  }
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
                        agentIdNum: agentInfo?.agentIdNum1 + e.target.value,
                      }
                    })
                  }}
                />
              </div>
            </div>
            {errors.agentIdNum1?.type === 'required' &&
              errors.agentIdNum2?.type === 'required' && (
                <div className="flex w-[80%] justify-start h-[15px] mb-1">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                    주민등록번호를 입력해주세요
                  </span>
                </div>
              )}
            <div className={`flex flex-col w-[100%] h-[60px] gap-1 `}>
            <div className="flex flex-col w-[100%] gap-1">
                <label
                  htmlFor="agentJob"
                  className="text-[10px] font-nanum not-italic font-extrabold text-left"
                >
                  직업
                </label>
                <input
                  {...register('agentJob', {
                    required: '직업을 입력해주세요',
                  })}
                  value={
                    biddingForm.agentJob === '' ? '' : biddingForm.agentJob
                  }
                  id="agentJob"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="직업을 입력해주세요"
                  onChange={(e) => {
                    setAgentInfo((prev: any) => {
                      return { ...prev, agentJob: e.target.value }
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentJob: e.target.value }
                    })
                  }}
                />
                {errors.agentJob?.type === 'required' && (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="agentJob"
                      className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.agentJob?.message}
                    </label>
                  </div>
                )}
              </div>
              <SearchAddress
                agentInfo={agentInfo}
                setAgentInfo={setAgentInfo}
                agentRegister={register}
                agentErrors={errors}
                agentSetError={setError}
              />
            </div>
            <div className="flex flex-row gap-2 absolute top-[630px]">
              <button
                type="button"
                className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  {
                    setStateNum(stateNum - 1)
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
