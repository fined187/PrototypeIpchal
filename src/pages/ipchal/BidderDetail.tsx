import { stepState } from "@/atom";
import SearchAddress from "@/components/SearchAddress";
import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface BidderDetailProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  biddingInfo: BiddingInfoType;
  setBiddingInfo: Dispatch<SetStateAction<BiddingInfoType>>;
}

export default function BidderDetail({
  formData,
  setFormData,
  biddingInfo,
  setBiddingInfo,
}: BidderDetailProps) {

  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);
  const [stepNum, setStepNum] = useState<number>(1);

  //  각 입력폼에 대한 유효성 검사
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const [isValidIdNum, setIsValidIdNum] = useState<boolean>(true);
  const [isValidCorpNum, setIsValidCorpNum] = useState<boolean>(true);
  const [isValidAddr, setIsValidAddr] = useState<boolean>(true);
  const [isValidAddrDetail, setIsValidAddrDetail] = useState<boolean>(true);
  const [isValidCorpRegiNum, setIsValidCorpRegiNum] = useState<boolean>(true);


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
      target.id === "bidPhone1" &&
      phoneFocusRef2.current?.value.length === 0
    ) {
      phoneFocusRef2.current?.focus();
    } else if (
      target.value.length === 4 &&
      target.id === "bidPhone2" &&
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

  const handleValidation = (stepNum: number) => {
    if (biddingInfo?.bidderName[stepNum] === '') {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
    if (biddingInfo?.bidderPhone1[stepNum] === '' || biddingInfo?.bidderPhone2[stepNum] === '' || biddingInfo?.bidderPhone3[stepNum] === '') {
      setIsValidPhone(false);
    } else {
      setIsValidPhone(true);
    }
    if (biddingInfo?.bidderCorpYn[stepNum] === 'N') {
      if (biddingInfo?.bidderIdNum1[stepNum] === '' || biddingInfo?.bidderIdNum2[stepNum] === '') {
        setIsValidIdNum(false);
      } else {
        setIsValidIdNum(true);
      }
    } else {
      if (biddingInfo?.bidderCorpNum1[stepNum] === '' || biddingInfo?.bidderCorpNum2[stepNum] === '' || biddingInfo?.bidderCorpNum3[stepNum] === '') {
        setIsValidCorpNum(false);
      } else {
        setIsValidCorpNum(true);
      }
      if (biddingInfo?.bidderCorpRegiNum1[stepNum] === '' || biddingInfo?.bidderCorpRegiNum2[stepNum] === '') {
        setIsValidCorpRegiNum(false);
      } else {
        setIsValidCorpRegiNum(true);
      }
    }
    if (biddingInfo?.bidderAddr[stepNum] === '' || biddingInfo?.bidderAddrDetail[stepNum] === '') {
      setIsValidAddr(false);
      setIsValidAddrDetail(false);
    } else {
      setIsValidAddr(true);
      setIsValidAddrDetail(true);
    }
    
  };
    
  const handleNextStep = (stepNum: number) => {
    if (stepNum + 1 === Number(formData.bidderNum)) {
      if (biddingInfo?.bidderCorpYn[stepNum] === 'N') {
        if (isValidName && isValidPhone && isValidIdNum && isValidAddr && isValidAddrDetail) {
          setStateNum(stateNum + 1);
        }
      } else if (biddingInfo?.bidderCorpYn[stepNum] === 'Y') {
        if (isValidName && isValidPhone && isValidCorpNum && isValidCorpRegiNum && isValidAddr && isValidAddrDetail) {
          setStateNum(stateNum + 1);
        }
      }
    } else {
      if (biddingInfo?.bidderCorpYn[stepNum] === 'N') {
        if (isValidName && isValidPhone && isValidIdNum && isValidAddr && isValidAddrDetail) {
          setStepNum(stepNum + 2);
          handleClear();
        }
      } else if (biddingInfo?.bidderCorpYn[stepNum] === 'Y') {
        if (isValidName && isValidPhone && isValidCorpNum && isValidCorpRegiNum && isValidAddr && isValidAddrDetail) {
          setStepNum(stepNum + 2);
          handleClear();
        }
      } else {
        alert('입력정보를 확인해주세요');
      }
    }
  };

  useEffect(() => {
    handleValidation(stepNum - 1);
  }, [stepNum, biddingInfo]);

  return (
    <div className="flex w-full bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <div className="flex flex-row">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            입찰자 정보를 입력해주세요
          </span>
          {(formData?.bidderNum) > 1 && (
            <span className="text-lg font-extrabold font-nanum not-italic leading-8 ml-2">
              {`(${stepNum} / ${formData?.bidderNum})`}
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
            onClick={() => setBiddingInfo({ ...biddingInfo, bidderCorpYn: {...biddingInfo?.bidderCorpYn, [stepNum - 1]: "N" }})}
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
            onClick={() =>
              setBiddingInfo({ ...biddingInfo, bidderCorpYn: {...biddingInfo?.bidderCorpYn, [stepNum - 1]: "Y" }})
            }
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
        <div className="flex flex-col w-[320px] h-[100%] gap-2">
          <div className="flex flex-col w-[100%] gap-1">
            <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
              성명
            </span>
            <input
              id="bidName"
              type="text"
              className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
              placeholder="입찰자 성명을 입력해주세요"
              value={biddingInfo?.bidderName[stepNum - 1] === '' ? '' : biddingInfo?.bidderName[stepNum - 1]}
              onChange={(e) => setBiddingInfo({ ...biddingInfo, bidderName: {...biddingInfo?.bidderName, [stepNum - 1]: e.target.value }})}
            />
          </div>
          {!isValidName && (
            <div className="flex w-[100%] justify-start">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                성명을 입력해주세요
              </span>
            </div>
          )}
          <div className="flex flex-col w-[100%] gap-1">
            <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
              전화번호
            </span>
            <div className="flex flex-row gap-[5%]">
              <input
                id="bidPhone1"
                type="text"
                ref={phoneFocusRef1}
                maxLength={3}
                placeholder="010"
                value={biddingInfo?.bidderPhone1[stepNum - 1]}
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                onChange={(e) => {
                  setBiddingInfo({ ...biddingInfo, bidderPhone1: {...biddingInfo?.bidderPhone1, [stepNum - 1]: e.target.value }});
                  handlePhoneFocusMove(e.target);
                }}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input
                type="text"
                id="bidPhone2"
                ref={phoneFocusRef2}
                maxLength={4}
                placeholder="1234"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                value={biddingInfo?.bidderPhone2[stepNum - 1]}
                onChange={(e) => {
                  setBiddingInfo({ ...biddingInfo, bidderPhone2: {...biddingInfo?.bidderPhone2, [stepNum - 1]: e.target.value }});
                  handlePhoneFocusMove(e.target);
                }}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input
                type="text"
                id="bidPhone3"
                ref={phoneFocusRef3}
                maxLength={4}
                placeholder="5678"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                value={biddingInfo?.bidderPhone3[stepNum - 1]}
                onChange={(e) => {
                  setBiddingInfo({ ...biddingInfo, bidderPhone3: {...biddingInfo?.bidderPhone3, [stepNum - 1]: e.target.value }});
                  handlePhoneFocusMove(e.target);
                }}
              />
            </div>
          </div>
          {!isValidPhone && (
            <div className="flex w-[100%] justify-start">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                전화번호를 입력해주세요
              </span>
            </div>
          )}
          {biddingInfo?.bidderCorpYn[stepNum - 1] === "N" ? (
            <>
              <div className="flex flex-col w-[100%] gap-1">
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                  주민등록번호
                </span>
                <div className="flex flex-row gap-[5%]">
                  <input
                    id="bidIdNum1"
                    type="text"
                    maxLength={6}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                    value={biddingInfo?.bidderIdNum1[stepNum - 1]}
                    onChange={(e) =>
                      setBiddingInfo({
                        ...biddingInfo,
                        bidderIdNum1: {...biddingInfo?.bidderIdNum1, [stepNum - 1]: e.target.value }
                      })
                    }
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    id="bidIdNum2"
                    type="text"
                    maxLength={7}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                    value={biddingInfo?.bidderIdNum2[stepNum - 1]}
                    onChange={(e) =>
                      setBiddingInfo({
                        ...biddingInfo,
                        bidderIdNum2: {...biddingInfo?.bidderIdNum2, [stepNum - 1]: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
              {!isValidIdNum && (
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
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                  사업자 등록번호
                </span>
                <div className="flex flex-row gap-[5%]">
                  <input
                    type="text"
                    placeholder="123"
                    id="bidCorpNum1"
                    ref={focusRef1}
                    maxLength={3}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={biddingInfo?.bidderCorpNum1[stepNum - 1] && biddingInfo?.bidderCorpNum1[stepNum - 1]}
                    onChange={(e) => {
                      setBiddingInfo({ ...biddingInfo, bidderCorpNum1: {...biddingInfo?.bidderCorpNum1, [stepNum - 1]: e.target.value }});
                      handleFocusMove(e.target);
                    }}
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    placeholder="45"
                    id="bidCorpNum2"
                    ref={focusRef2}
                    maxLength={2}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={biddingInfo?.bidderCorpNum2[stepNum - 1] && biddingInfo?.bidderCorpNum2[stepNum - 1]}
                    onChange={(e) => {
                      setBiddingInfo({ ...biddingInfo, bidderCorpNum2: {...biddingInfo?.bidderCorpNum2, [stepNum - 1]: e.target.value }});
                      handleFocusMove(e.target);
                    }}
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    placeholder="67890"
                    id="bidCorpNum3"
                    ref={focusRef3}
                    maxLength={5}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={biddingInfo?.bidderCorpNum3[stepNum - 1] && biddingInfo?.bidderCorpNum3[stepNum - 1]}
                    onChange={(e) => {
                      setBiddingInfo({ ...biddingInfo, bidderCorpNum3: {...biddingInfo?.bidderCorpNum3, [stepNum - 1]: e.target.value }});
                      handleFocusMove(e.target);
                    }}
                  />
                </div>
                {!isValidCorpNum && (
                  <div className="flex w-[100%] justify-start mb-1">
                    <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                      사업자등록번호를 입력해주세요
                    </span>
                  </div>
                )}
                <div className="flex flex-col w-[100%] gap-1 mt-1">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    법인 등록번호
                  </span>
                  <div className="flex flex-row gap-[5%]">
                    <input
                      type="text"
                      id="bidCorpRegiNum1"
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                      value={biddingInfo?.bidderCorpRegiNum1[stepNum - 1] && biddingInfo?.bidderCorpRegiNum1[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingInfo({ ...biddingInfo, bidderCorpRegiNum1: {...biddingInfo?.bidderCorpRegiNum1, [stepNum - 1]: e.target.value }});
                      }}
                    />
                    <span className="flex text-mygray font-nanum font-normal">
                      -
                    </span>
                    <input
                      type="text"
                      id="bidCorpRegiNum2"
                      className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[50%] text-center"
                      value={biddingInfo?.bidderCorpRegiNum2[stepNum - 1] && biddingInfo?.bidderCorpRegiNum2[stepNum - 1]}
                      onChange={(e) => {
                        setBiddingInfo({ ...biddingInfo, bidderCorpRegiNum2: {...biddingInfo?.bidderCorpRegiNum2, [stepNum - 1]: e.target.value }});
                      }}
                    />
                  </div>
                </div>
                {!isValidCorpRegiNum && (
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
              <SearchAddress formData={formData} setFormData={setFormData} biddingInfo={biddingInfo} setBiddingInfo={setBiddingInfo} stepNum={stepNum} />
              {(!isValidAddr || !isValidAddrDetail) && (
                <div className="flex w-[100%] justify-start">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                    주소 및 상세주소를 입력해주세요
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2 absolute top-[578px]">
              <button
                type="button"
                className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  handleValidation(stepNum - 1);
                  setStateNum(stateNum - 1)
                }}
              >
                <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                  이전
                </span>
              </button>
              <button
                type="button"
                className="flex w-[229px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
                onClick={() => {
                  handleValidation(stepNum - 1);
                  handleNextStep(stepNum - 1);
                }}
              >
                <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                  {stateNum <= 3 ? "확인" : "다음"}
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
