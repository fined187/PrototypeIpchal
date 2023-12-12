import { biddingInfoState, stepState } from "@/atom";
import SearchAddress from "@/components/SearchAddress";
import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function BidderForm() {
  const biddingForm = useRecoilValue(biddingInfoState);
  const setBiddingForm = useSetRecoilState(biddingInfoState);

  const [biddingInfo, setBiddingInfo] = useState<BiddingInfoType>({
    bidderName: Array(biddingForm.bidderNum).fill(''),
    bidderPhone1: Array(biddingForm.bidderNum).fill(''),
    bidderPhone2: Array(biddingForm.bidderNum).fill(''),
    bidderPhone3: Array(biddingForm.bidderNum).fill(''),
    bidderIdNum1: Array(biddingForm.bidderNum).fill(''),
    bidderIdNum2: Array(biddingForm.bidderNum).fill(''),
    bidderAddr: Array(biddingForm.bidderNum).fill(''),
    bidderAddrDetail:Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum1: Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum2: Array(biddingForm.bidderNum).fill(''),
    bidderCorpNum3: Array(biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum1: Array(biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum2: Array(biddingForm.bidderNum).fill(''),
    bidderCorpYn: Array(biddingForm.bidderNum).fill(''),
  });

  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);
  const [stepNum, setStepNum] = useState<number>(1);

  const { register, handleSubmit, formState: { errors }} = useForm<BiddingInfoType>();
  const onSubmit: SubmitHandler<BiddingInfoType> = (data) => {
    console.log(data);
  };

  //  사업자등록번호 input focus 이동
  const focusRef1 = useRef<HTMLInputElement | null>(null);
  const focusRef2 = useRef<HTMLInputElement | null>(null);
  const focusRef3 = useRef<HTMLInputElement | null>(null);

  //  전화번호 input focus 이동
  const phoneFocusRef1 = useRef<HTMLInputElement | null>(null);
  const phoneFocusRef2 = useRef<HTMLInputElement | null>(null);
  const phoneFocusRef3 = useRef<HTMLInputElement | null>(null);

  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "bidderPhone1" &&
      phoneFocusRef2.current?.value.length === 0
    ) {
      phoneFocusRef2.current?.focus();
    } else if (
      target.value.length === 4 &&
      target.id === "bidderPhone2" &&
      phoneFocusRef3.current?.value.length === 0
    ) {
      phoneFocusRef3.current?.focus();
    }
  };

  const handleFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "bidCorpNum1" &&
      focusRef2.current?.value.length === 0
    ) {
      focusRef2.current?.focus();
    } else if (
      target.value.length === 2 &&
      target.id === "bidCorpNum2" &&
      focusRef3.current?.value.length === 0
    ) {
      focusRef3.current?.focus();
    }
  };

  const handleClear = () => {
    let temp = document.querySelectorAll("input");
    temp.forEach((item) => {
      item.value = '';
    });
  };

  const handleNextStep = (num: number) => {
    if (biddingInfo.bidderCorpYn[num] === 'N') {
      if (biddingInfo?.bidderName[num] === '' || biddingInfo?.bidderPhone1[num] === '' || biddingInfo?.bidderPhone2[num] === '' || biddingInfo?.bidderPhone3[num] === '' || biddingInfo?.bidderAddr[num] === '' || biddingInfo?.bidderAddr[num] === '' || biddingInfo?.bidderAddrDetail[num] === '' || biddingInfo?.bidderIdNum1[num] === '' || biddingInfo?.bidderIdNum2[num] === '') {
        console.log("1번째")
        alert('입찰자 정보를 입력해주세요');
      } else {
        if (biddingForm.bidderNum === 1) {
          setStateNum(stateNum + 2);
        } else {
          if (stepNum === biddingForm.bidderNum) {
            setStateNum(stateNum + 1);
          } else {
            handleClear();
            setStepNum(stepNum + 1);
          }
        }
      }
    } else if (biddingInfo.bidderCorpYn[num] === 'Y') {
      if (biddingInfo?.bidderName[num] === '' || biddingInfo?.bidderPhone1[num] === '' || biddingInfo?.bidderPhone2[num] === '' || biddingInfo?.bidderPhone3[num] === '' || biddingInfo?.bidderAddr[num] === '' || biddingInfo?.bidderAddrDetail[num] === '' || biddingInfo?.bidderCorpNum1[num] === '' || biddingInfo?.bidderCorpNum2[num] === '' || biddingInfo?.bidderCorpNum3[num] === '' || biddingInfo?.bidderCorpRegiNum1[num] === '' || biddingInfo?.bidderCorpRegiNum2[num] === '') {
        console.log("2번째")
        alert('입찰자 정보를 입력해주세요');
      } else {
        if (biddingForm.bidderNum === 1) {
          setStateNum(stateNum + 2);
        } else {
          if (stepNum === biddingForm.bidderNum) {
            setStateNum(stateNum + 1);
          } else {
            handleClear();
            setStepNum(stepNum + 1);
          }
        }
      }
    }
  };

  for(let i = 0; i < biddingForm.bidderNum; i++) {
    let temp = ['']
    temp = biddingInfo.bidderCorpYn;
    
  }

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <div className="flex flex-row">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            입찰자 정보를 입력해주세요
          </span>
          {(biddingForm.bidderNum) > 1 && (
            <span className="text-lg font-extrabold font-nanum not-italic leading-8 ml-2">
              {`(${stepNum} / ${biddingForm.bidderNum})`}
            </span>
          )}
        </div>
        <div className="flex flex-row gap-10 w-[80%] justify-center">
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo?.bidderCorpYn[stepNum - 1] === "N"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setBiddingInfo((prev: any) => {
                const temp = prev.bidderCorpYn;
                temp[stepNum - 1] = "N";
                return { ...prev, bidderCorpYn: temp };
              })
            }}
          >
            <div
              className={`${biddingInfo?.bidderCorpYn[stepNum - 1] === "N" ? "flex mr-1" : "hidden"}`}
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
                biddingInfo?.bidderCorpYn[stepNum - 1] === "N" ? "text-white" : "text-myyellow"
              }`}
            >
              개인
            </span>
          </div>
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingInfo?.bidderCorpYn[stepNum - 1] === "Y"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setBiddingInfo((prev: any) => {
                const temp = prev.bidderCorpYn;
                temp[stepNum - 1] = "Y";
                return { ...prev, bidderCorpYn: temp };
              })
            }}
          >
            <div
              className={`${biddingInfo?.bidderCorpYn[stepNum - 1] === 'Y' ? "flex mr-1" : "hidden"}`}
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
                biddingInfo?.bidderCorpYn[stepNum - 1] === 'Y' ? "text-white" : "text-myyellow"
              }`}
            >
              법인
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <form onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        })}>
          <div className="flex flex-col w-[320px] h-[100%] gap-2">
            <div className="flex flex-col w-[100%] gap-1">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                성명
              </span>
              <input
                {...register("bidderName", { required: true })}
                id="bidderName"
                type="text"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
                placeholder="입찰자 성명을 입력해주세요"
                value={biddingInfo?.bidderName[stepNum - 1] === '' ? '' : biddingInfo?.bidderName[stepNum - 1]}
                onChange={(e) => setBiddingInfo((prev: any) => {
                  const temp = prev.bidderName;
                  temp[stepNum - 1] = e.target.value;
                  return { ...prev, bidderName: temp };
                })}
              />
            </div>
            {errors.bidderName?.type === 'required' && (
              <div className="flex w-[100%] justify-start">
                <label htmlFor="bidderName" className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                  성명을 입력해주세요
                </label>
              </div>
            )}
            <div className="flex flex-col w-[100%] gap-1">
              <label htmlFor="bidderPhone" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                전화번호
              </label>
              <div className="flex flex-row gap-[5%]">
                <input
                  {...register("bidderPhone1", { required: true })}
                  id="bidderPhone1"
                  name="bidderPhone1"
                  type="text"
                  maxLength={3}
                  placeholder="010"
                  value={biddingInfo?.bidderPhone1[stepNum - 1]}
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone1;
                      temp[stepNum - 1] = e.target.value;
                      return { ...prev, bidderPhone1: temp };
                    })
                    handlePhoneFocusMove(e.target);
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">-</span>
                <input
                  {...register("bidderPhone2", { required: true })}
                  type="text"
                  id="bidderPhone2"
                  name="bidderPhone2"
                  maxLength={4}
                  placeholder="1234"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={biddingInfo?.bidderPhone2[stepNum - 1]}
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone2;
                      temp[stepNum - 1] = e.target.value;
                      return { ...prev, bidderPhone2: temp };
                    });
                    handlePhoneFocusMove(e.target);
                  }}
                />
                <span className="flex text-mygray font-nanum font-normal">-</span>
                <input
                  {...register("bidderPhone3", { required: true })}
                  type="text"
                  id="bidderPhone3"
                  name="bidderPhone3"
                  maxLength={4}
                  placeholder="5678"
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                  value={biddingInfo?.bidderPhone3[stepNum - 1]}
                  onChange={(e) => {
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderPhone3;
                      temp[stepNum - 1] = e.target.value;
                      return { ...prev, bidderPhone3: temp };
                    });
                    handlePhoneFocusMove(e.target);
                  }}
                />
              </div>
            </div>
            {(errors.bidderPhone1?.type === 'required' || errors.bidderPhone2?.type === 'required' || errors.bidderPhone3?.type === 'required') && (
              <div className="flex w-[100%] justify-start">
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                  전화번호를 입력해주세요
                </span>
              </div>
            )}
            {biddingInfo?.bidderCorpYn[stepNum - 1] === "N" ? (
              <>
                <div className="flex flex-col w-[100%] gap-1">
                  <label htmlFor="bidIdNum" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    주민등록번호
                  </label>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      {...register("bidderIdNum1", { required: true })}
                      id="bidderIdNum1"
                      type="text"
                      maxLength={6}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={biddingInfo?.bidderIdNum1[stepNum - 1]}
                      onChange={(e) =>
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderIdNum1;
                          temp[stepNum - 1] = e.target.value;
                          return { ...prev, bidderIdNum1: temp };
                        })
                      }
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("bidderIdNum2", { required: true })}
                      id="bidderIdNum2"
                      type="text"
                      maxLength={7}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                      value={biddingInfo?.bidderIdNum2[stepNum - 1]}
                      onChange={(e) =>
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderIdNum2;
                          temp[stepNum - 1] = e.target.value;
                          return { ...prev, bidderIdNum2: temp };
                        })
                      }
                    />
                  </div>
                </div>
                {errors.bidderIdNum1?.type === 'required' && errors.bidderIdNum2?.type === 'required' && (
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
                      {...register("bidderCorpNum1", { required: true })}
                      type="text"
                      placeholder="123"
                      id="bidderCorpNum1"
                      ref={focusRef1}
                      maxLength={3}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingInfo?.bidderCorpNum1[stepNum - 1] && biddingInfo?.bidderCorpNum1[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum1;
                          temp[stepNum - 1] = e.target.value;
                          return { ...prev, bidderCorpNum1: temp };
                        })
                        handleFocusMove(e.target);
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("bidderCorpNum2", { required: true })}
                      type="text"
                      placeholder="45"
                      id="bidderCorpNum2"
                      ref={focusRef2}
                      maxLength={2}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingInfo?.bidderCorpNum2[stepNum - 1] && biddingInfo?.bidderCorpNum2[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum2;
                          temp[stepNum - 1] = e.target.value;
                          return { ...prev, bidderCorpNum2: temp };
                        })
                        handleFocusMove(e.target);
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      {...register("bidderCorpNum3", { required: true })}
                      type="text"
                      placeholder="67890"
                      id="bidderCorpNum3"
                      ref={focusRef3}
                      maxLength={5}
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                      value={biddingInfo?.bidderCorpNum3[stepNum - 1] && biddingInfo?.bidderCorpNum3[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderCorpNum3;
                          temp[stepNum - 1] = e.target.value;
                          return { ...prev, bidderCorpNum3: temp };
                        })
                        handleFocusMove(e.target);
                      }}
                    />
                  </div>
                  {(errors.bidderCorpNum1?.type === 'required' || errors.bidderCorpNum2?.type === 'required' || errors.bidderCorpNum3?.type === 'required') && (
                    <div className="flex w-[100%] justify-start mb-1">
                      <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                        사업자등록번호를 입력해주세요
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col w-[100%] gap-1 mt-1">
                    <label htmlFor="bidCorpRegiNum" className="text-[10px] font-nanum not-italic font-extrabold text-left">
                      법인 등록번호
                    </label>
                    <div className="flex flex-row gap-[5%]">
                      <input
                        {...register("bidderCorpRegiNum1", { required: true })}
                        type="text"
                        id="bidderCorpRegiNum1"
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={biddingInfo?.bidderCorpRegiNum1[stepNum - 1] && biddingInfo?.bidderCorpRegiNum1[stepNum - 1]}
                        onChange={(e) => {
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderCorpRegiNum1;
                            temp[stepNum - 1] = e.target.value;
                            return { ...prev, bidderCorpRegiNum1: temp }
                          })
                        }}
                      />
                      <span className="flex text-mygray font-nanum font-normal">
                        -
                      </span>
                      <input
                        {...register("bidderCorpRegiNum2", { required: true })}
                        type="text"
                        id="bidderCorpRegiNum2"
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                        value={biddingInfo?.bidderCorpRegiNum2[stepNum - 1] && biddingInfo?.bidderCorpRegiNum2[stepNum - 1]}
                        onChange={(e) => {
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderCorpRegiNum2;
                            temp[stepNum - 1] = e.target.value;
                            return { ...prev, bidderCorpRegiNum2: temp }
                          })
                        }}
                      />
                    </div>
                  </div>
                  {(errors.bidderCorpRegiNum1?.type === 'required' || errors.bidderCorpRegiNum2?.type === 'required') && (
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
                <SearchAddress biddingInfo={biddingInfo} setBiddingInfo={setBiddingInfo} stepNum={stepNum} register={register} errors={errors} />
              </div>
              <div className="flex flex-row gap-2 absolute top-[578px]">
                <button
                  type="button"
                  className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                  onClick={() => {
                    {stepNum === 1 ? setStateNum(stateNum - 1) : setStepNum(stepNum - 1)}
                  }}
                >
                  <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                    이전
                  </span>
                </button>
                <button
                  type="submit"
                  className="flex w-[229px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
                  onClick={() => {handleNextStep(stepNum - 1)}}
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
  );
}
