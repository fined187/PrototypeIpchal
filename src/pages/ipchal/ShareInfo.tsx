import { biddingInfoState, stepState } from "@/atom";
import Button from "@/components/Button";
import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ShareInfo() {
  const biddingInfo = useRecoilValue(biddingInfoState);
  const setBiddingInfo = useSetRecoilState(biddingInfoState);
  const stateNum = useRecoilValue(stepState);
  const [shareWay, setShareWay] = useState<string>("");
  const [calc, setCalc] = useState({
    numerator: [0],
    denominator: [0],
  });
  const [goNext, setGoNext] = useState<boolean>(false);

  const handleClear = () => {
    let temp = document.querySelectorAll("input");
    temp.forEach((item) => {
      item.value = '';
    });
  };

  console.log(stateNum)

  const handleCalc = () => {
    if (shareWay === "S") {
      const nameTemp = [''];
      const percentTemp = [0];
      for (let i = 0; i < biddingInfo?.bidderNum; i++) {
        nameTemp.push(biddingInfo?.bidName[i]);
        percentTemp.push(( 1 / biddingInfo?.bidderNum) * 100);
      }
      nameTemp.shift();
      percentTemp.shift();
      setBiddingInfo({
        ...biddingInfo,
        distribute: {
          sharedName: nameTemp,
          sharedPercent: percentTemp,
        },
      });
    } else {
      const nameTemp = [''];
      const percentTemp = [0];
      for (let i = 0; i < biddingInfo?.bidderNum; i++) {
        nameTemp.push(biddingInfo?.bidName[i]);
        percentTemp.push((calc.numerator[i] / calc.denominator[i]) * 100);
      }
      nameTemp.shift();
      percentTemp.shift();
      setBiddingInfo({
        ...biddingInfo,
        distribute: {
          sharedName: nameTemp,
          sharedPercent: percentTemp,
        },
      });
    }
  };

  const handleValidate = () => {
    let temp = document.querySelectorAll("input");
    temp.forEach((item) => {
      if (item.value === '') {
        setGoNext(true);
      } else {
        setGoNext(false);
      }
    });
  }

  useEffect(() => {
    handleCalc();
    handleValidate();
  }, [calc, shareWay]);

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <span className="text-lg font-extrabold font-nanum not-italic leading-8">
          공동입찰자 분의 지분을 입력해주세요
        </span>
        <div className="flex flex-row gap-10 w-[80%] justify-center">
          <div
            className={`flex flex-row w-[80px] h-[30px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              shareWay === "S"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setShareWay("S");
              handleCalc();
            }}
          >
            <div
              className={`${shareWay === "S" ? "flex mr-1" : "hidden"}`}
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
                shareWay === "S" ? "text-white" : "text-myyellow"
              }`}
            >
              동일배분
            </span>
          </div>
          <div
            className={`flex flex-row w-[80px] h-[30px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              shareWay === "N"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => {
              setShareWay("N");
              handleClear();
              handleCalc();
            }}
          >
            <div
              className={`${shareWay === "N" ? "flex mr-1" : "hidden"}`}
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
                shareWay === "N" ? "text-white" : "text-myyellow"
              }`}
            >
              각자배분
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[360px] min-h-[257px] max-h-[500px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
          {biddingInfo?.bidName?.map((name, index) => {
            return (
              <div key={index} className="flex justify-between mb-5 w-full">
                <div className="flex w-[40%] ml-5">
                  <span className="text-[12px] text-center font-bold ">
                    {name}
                  </span>
                </div>
                <div className="flex flex-row gap-[5%] w-[60%] justify-end mr-5">
                  {shareWay === "S" ? (
                    <>
                      <input 
                        type="text"
                        readOnly
                        value="1"
                        className={`border  border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-center h-[30px] px-2 w-[40%]`}
                      />
                      <span>
                        /
                      </span>
                      <input 
                        type="text"
                        readOnly
                        value={biddingInfo.bidderNum}
                        className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-center h-[30px] px-2 w-[40%]" 
                      />
                    </>
                  ): (
                    <>
                      <input 
                        type="text"
                        className={`border ${shareWay === 'N' && goNext ? 'border-red-500' : 'border-gray-300'}  focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-center h-[30px] px-2 w-[40%]`}
                        onChange={(e) => {
                          const temp = [...calc.numerator];
                          temp[index] = Number(e.target.value);
                          setCalc({
                            ...calc,
                            numerator: temp,
                          });
                          handleCalc();
                        }}
                      />
                      <span>
                        /
                      </span>
                      <input 
                        type="text"
                        className={`border ${shareWay === 'N' && goNext ? 'border-red-500' : 'border-gray-300'}  focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-center h-[30px] px-2 w-[40%]`}
                        onChange={(e) => {
                          const temp = [...calc.denominator];
                          temp[index] = Number(e.target.value);
                          setCalc({
                            ...calc,
                            denominator: temp,
                          });
                          handleCalc();
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            )
          })}
          {shareWay === "N" && goNext && (
            <span className="text-[10px] text-red-500 font-bold">
              지분 값을 입력해주세요
            </span>
          )}
        </div>
        <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
      </div>
    </div>
  )
}