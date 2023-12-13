import { biddingInfoState, stepState } from "@/atom";
import SearchAddress from "@/components/SearchAddress";
import { AgentInfoType } from "@/interface/IpchalType";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function AgentForm() {
  const biddingForm = useRecoilValue(biddingInfoState);
  const setBiddingForm = useSetRecoilState(biddingInfoState);
  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);

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
    agentCorpNum1: '',
    agentCorpNum2: '',
    agentCorpNum3: '',
    agentCorpRegiNum1: '',
    agentCorpRegiNum2: '',
    agentCorpYn: 'N',
  });

  const { register, handleSubmit, setFocus, reset, setError, formState: { errors }} = useForm<AgentInfoType>({
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
      agentCorpNum1: '',
      agentCorpNum2: '',
      agentCorpNum3: '',
      agentCorpRegiNum1: '',
      agentCorpRegiNum2: '',
      agentCorpYn: '',
    }
  });

  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "agentPhone1"
    ) {
      setFocus("agentPhone2");
    } else if (
      target.value.length === 4 &&
      target.id === "agentPhone2" 
    ) {
      setFocus("agentPhone3");
    }
  };

  const handleCorpNumFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "agentCorpNum1" 
    ) {
      setFocus("agentCorpNum2");
    } else if (
      target.value.length === 2 &&
      target.id === "agentCorpNum2"
    ) {
      setFocus("agentCorpNum3");
    }
  };

  const handleCorpRegiNumFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 6 &&
      target.id === "agentCorpRegiNum1"
    ) {
      setFocus("agentCorpRegiNum2");
    }
  }

  const handleIdNumFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 6 &&
      target.id === "agentIdNum1"
    ) {
      setFocus("agentIdNum2");
    }
  }

  const handleNextStep = () => {
    if (biddingForm.agentCorpYn === 'Y') {
      if (
        biddingForm.agentName !== '' &&
        biddingForm.agentRel !== '' &&
        biddingForm.agentPhone1 !== '' &&
        biddingForm.agentPhone2 !== '' &&
        biddingForm.agentPhone3 !== '' &&
        biddingForm.agentCorpNum1 !== '' &&
        biddingForm.agentCorpNum2 !== '' &&
        biddingForm.agentCorpNum3 !== '' &&
        biddingForm.agentCorpRegiNum1 !== '' &&
        biddingForm.agentCorpRegiNum2 !== '' &&
        biddingForm.agentAddr !== '' &&
        biddingForm.agentAddrDetail !== ''
      ) {
        if (biddingForm.bidderNum === 1) {
          setStateNum(stateNum + 2);
          reset();
        } else {
          setStateNum(stateNum + 1);
          reset();
        }
      } else {
        alert('입력되지 않은 정보가 있습니다');
      }
    } else {
      if (
        biddingForm.agentName !== '' &&
        biddingForm.agentRel !== '' &&
        biddingForm.agentPhone1 !== '' &&
        biddingForm.agentPhone2 !== '' &&
        biddingForm.agentPhone3 !== '' &&
        biddingForm.agentIdNum1 !== '' &&
        biddingForm.agentIdNum2 !== '' &&
        biddingForm.agentAddr !== '' &&
        biddingForm.agentAddrDetail !== ''
      ) {
        if (biddingForm.bidderNum === 1) {
          setStateNum(stateNum + 2);
          reset();
        } else {
          setStateNum(stateNum + 1);
          reset();
        }
      } else {
        alert('입력되지 않은 정보가 있습니다');
      }
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    handleNextStep();
    reset();
  };

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <div className="flex flex-row">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            대리인 정보를 입력해주세요
          </span>
        </div>
        <div className="flex flex-row gap-10 w-[80%] justify-center">
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              agentInfo?.agentCorpYn === "N"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setAgentInfo((prev: any) => {
                return { ...prev, agentCorpYn: "N" };
              })
              setBiddingForm((prev: any) => {
                return { ...prev, agentCorpYn: "N" };
              })
            }}
          >
            <div
              className={`${agentInfo?.agentCorpYn === "N" ? "flex mr-1" : "hidden"}`}
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
                agentInfo?.agentCorpYn === "N" ? "text-white" : "text-myyellow"
              }`}
            >
              개인
            </span>
          </div>
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              agentInfo?.agentCorpYn === "Y"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setAgentInfo((prev: any) => {
                return { ...prev, agentCorpYn: "Y" };
              })
              setBiddingForm((prev: any) => {
                return { ...prev, agentCorpYn: "Y" };
              })
            }}
          >
            <div
              className={`${agentInfo?.agentCorpYn === 'Y' ? "flex mr-1" : "hidden"}`}
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
                agentInfo?.agentCorpYn === 'Y' ? "text-white" : "text-myyellow"
              }`}
            >
              법인
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-[320px] h-[100%] gap-2">
            <div className="flex flex-row w-[100%] gap-[10%]">
              <div className="flex flex-col w-[45%] gap-1">
                <label htmlFor="agentName" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                  성명
                </label>
                <input
                  {...register("agentName", { 
                    required: "대리인 이름을 입력해주세요",
                    minLength: {
                      value: 2,
                      message: "이름은 2자 이상 입력해주세요"
                    }
                  })}
                  value={biddingForm.agentName === '' ? '' : biddingForm.agentName}
                  id="agentName"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="성명을 입력해주세요"
                  onChange={(e) => {
                    setAgentInfo((prev: any) => {
                      return { ...prev, agentName: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentName: e.target.value };
                    })
                  }}
                />
                {(errors.agentName?.type === 'required' || errors.agentName?.type === 'minLength') && (
                  <div className="flex w-[100%] justify-start">
                    <label htmlFor="bidderName" className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                      {errors.agentName?.message}
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-[45%] gap-1">
                <label htmlFor="agentRel" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                  입찰자와의 관계
                </label>
                <input
                  {...register("agentRel", { 
                    required: "입찰자와의 관계를 입력해주세요",
                  })}
                  value={biddingForm.agentRel === '' ? '' : biddingForm.agentRel}
                  id="agentRel"
                  type="text"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                  placeholder="관계를 입력해주세요"
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentRel: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentRel: e.target.value };
                    })
                  }}
                />
                {errors.agentRel?.type === 'required' && (
                  <div className="flex w-[100%] justify-start">
                    <label htmlFor="agentRel" className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                      {errors.agentRel?.message}
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[100%] gap-1">
              <label htmlFor="agentPhone" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                전화번호
              </label>
              <div className="flex flex-row gap-[5%]">
                <input
                  {...register("agentPhone1", { required: true, maxLength: 3 })}
                  id="agentPhone1"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                  }}
                  type="text"
                  maxLength={3}
                  placeholder="010"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={biddingForm.agentPhone1 === '' ? '' : biddingForm.agentPhone1}
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentPhone1: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone1: e.target.value };
                    })
                    handlePhoneFocusMove(e.target);
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">-</span>
                <input
                  {...register("agentPhone2", { required: true, maxLength: 4 })}
                  type="text"
                  id="agentPhone2"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                  }}
                  placeholder="1234"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={biddingForm.agentPhone2 === '' ? '' : biddingForm.agentPhone2}
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentPhone2: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone2: e.target.value };
                    })
                    handlePhoneFocusMove(e.target);
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">-</span>
                <input
                  {...register("agentPhone3", { required: true, maxLength: 4 })}
                  type="text"
                  id="agentPhone3"
                  maxLength={4}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                  }}
                  placeholder="5678"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={biddingForm.agentPhone3 === '' ? '' : biddingForm.agentPhone3}
                  onChange={(e) => {
                    setAgentInfo((prev: AgentInfoType) => {
                      return { ...prev, agentPhone3: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone3: e.target.value };
                    })
                    setBiddingForm((prev: any) => {
                      return { ...prev, agentPhone: agentInfo?.agentPhone1 + agentInfo?.agentPhone2 + e.target.value };
                    })
                    handlePhoneFocusMove(e.target);
                  }}
                />
              </div>
            </div>
            {(errors.agentPhone1?.type === 'required' || errors.agentPhone2?.type === 'required' || errors.agentPhone3?.type === 'required') && (
              <div className="flex w-[100%] justify-start">
                <label htmlFor="agentPhone" className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                  전화번호를 입력해주세요
                </label>
              </div>
            )}
            {agentInfo?.agentCorpYn === "N" ? (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label htmlFor="agentIdNum" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    주민등록번호
                  </label>
                  <div className="flex flex-row gap-[5%]"> 
                    <input
                      {...register("agentIdNum1", { required: true, maxLength: 6 })}
                      id="agentIdNum1"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                      }}
                      type="text"
                      maxLength={6}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={biddingForm.agentIdNum1 === '' ? '' : biddingForm.agentIdNum1}
                      onChange={(e) => {
                        setAgentInfo((prev: AgentInfoType) => {
                          return { ...prev, agentIdNum1: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentIdNum1: e.target.value };
                        })
                        handleIdNumFocusMove(e.target);
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("agentIdNum2", { required: true, maxLength: 7 })}
                      id="agentIdNum2"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                      }}
                      type="text"
                      maxLength={7}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={biddingForm.agentIdNum2 === '' ? '' : biddingForm.agentIdNum2}
                      onChange={(e) =>{
                        setAgentInfo((prev: any) => {
                          return { ...prev, agentIdNum2: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentIdNum2: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentIdNum: agentInfo?.agentIdNum1 + e.target.value };
                        })
                      }}
                    />
                  </div>
                </div>
                {errors.agentIdNum1?.type === 'required' && errors.agentIdNum2?.type === 'required' && (
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
                  <label htmlFor="bidCorpNum" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    사업자 등록번호
                  </label>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      {...register("agentCorpNum1", { required: true, maxLength: 3 })}
                      type="text"
                      placeholder="123"
                      id="agentCorpNum1"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                      }}
                      maxLength={3}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingForm.agentCorpNum1 === '' ? '' : biddingForm.agentCorpNum1}
                      onChange={(e) => {
                        setAgentInfo((prev: AgentInfoType) => {
                          return { ...prev, agentCorpNum1: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentCorpNum1: e.target.value };
                        })
                        handleCorpNumFocusMove(e.target);
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("agentCorpNum2", { required: true, maxLength: 2 })}
                      type="text"
                      placeholder="45"
                      id="agentCorpNum2"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                      }}
                      maxLength={2}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingForm.agentCorpNum2 === '' ? '' : biddingForm.agentCorpNum2}
                      onChange={(e) => {
                        setAgentInfo((prev: AgentInfoType) => {
                          return { ...prev, agentCorpNum2: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentCorpNum2: e.target.value };
                        })
                        handleCorpNumFocusMove(e.target);
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("agentCorpNum3", { required: true, maxLength: 5 })}
                      type="text"
                      placeholder="67890"
                      id="agentCorpNum3"
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                      }}
                      maxLength={5}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingForm.agentCorpNum3 === '' ? '' : biddingForm.agentCorpNum3}
                      onChange={(e) => {
                        setAgentInfo((prev: AgentInfoType) => {
                          return { ...prev, agentCorpNum3: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentCorpNum3: e.target.value };
                        })
                        setBiddingForm((prev: any) => {
                          return { ...prev, agentCorpNum: agentInfo?.agentCorpNum1 + agentInfo?.agentCorpNum2 + e.target.value };
                        })
                        handleCorpNumFocusMove(e.target);
                      }}
                    />
                  </div>
                  {(errors.agentCorpNum1?.type === 'required' || errors.agentCorpNum2?.type === 'required' || errors.agentCorpNum3?.type === 'required') && (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                        사업자등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col w-[100%] gap-1 mt-1">
                    <label htmlFor="agentCorpRegiNum" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                      법인 등록번호
                    </label>
                    <div className="flex flex-row gap-[5%]">
                      <input
                        {...register("agentCorpRegiNum1", { required: true, maxLength: 6 })}
                        type="text"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                        }}
                        maxLength={6}
                        id="agentCorpRegiNum1"
                        placeholder="123456"
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={biddingForm.agentCorpRegiNum1 === '' ? '' : biddingForm.agentCorpRegiNum1}
                        onChange={(e) => {
                          setAgentInfo((prev: AgentInfoType) => {
                            return { ...prev, agentCorpRegiNum1: e.target.value };
                          })
                          setBiddingForm((prev: any) => {
                            return { ...prev, agentCorpRegiNum1: e.target.value };
                          })
                          handleCorpRegiNumFocusMove(e.target);
                        }}
                      />
                      <span className="flex text-mygray font-nanum font-normal">
                        -
                      </span>
                      <input
                        {...register("agentCorpRegiNum2", { required: true, maxLength: 7 })}
                        type="text"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                        }}
                        maxLength={7}
                        id="agentCorpRegiNum2"
                        placeholder="1234567"
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={biddingForm.agentCorpRegiNum2 === '' ? '' : biddingForm.agentCorpRegiNum2}
                        onChange={(e) => {
                          setAgentInfo((prev: AgentInfoType) => {
                            return { ...prev, agentCorpRegiNum2: e.target.value };
                          })
                          setBiddingForm((prev: any) => {
                            return { ...prev, agentCorpRegiNum2: e.target.value };
                          })
                          setBiddingForm((prev: any) => {
                            return { ...prev, agentCorpRegiNum: agentInfo?.agentCorpRegiNum1 + e.target.value };
                          })
                        }}
                      />
                    </div>
                  </div>
                  {(errors.agentCorpRegiNum1?.type === 'required' || errors.agentCorpRegiNum2?.type === 'required') && (
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
                <SearchAddress agentInfo={agentInfo} setAgentInfo={setAgentInfo} agentRegister={register} agentErrors={errors} agentSetError={setError} />
              </div>
              <div className="flex flex-row gap-2 absolute top-[578px]">
                <button
                  type="button"
                  className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                  onClick={() => {
                    {setStateNum(stateNum - 1)}
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
                    {stateNum <= 3 ? "확인" : "다음"}
                  </span>
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}