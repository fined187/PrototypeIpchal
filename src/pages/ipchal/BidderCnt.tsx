import { stepState } from "@/atom";
import Button from "@/components/Button";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface BidderCntProps {
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  formData: IpchalType;
}

export default function BidderCnt({ setFormData, formData }: BidderCntProps) {
  const setStateNum = useSetRecoilState(stepState);
  const stateNum = useRecoilValue(stepState);
  const handleBiddingNum = (e: HTMLInputElement) => {
    const value = e.value;
    if (value === '' || parseInt(value) <= 0) {
      setFormData({
        ...formData,
        bidderNum: 1,
      });
    } else {
      setFormData({
        ...formData,
        bidderNum: Number(value),
      });
    }
  };

  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex flex-col w-full h-screen bg-mybg items-center text-center">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic leading-8">입찰하시는 분이 몇 명 이신가요?</span>
          </div>
          <div className="flex flex-col gap-10 w-[327px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
            <div className="absolute top-[113px]">
              <div className="flex flex-row justify-center items-center">
                <span className="text-[15px] font-semibold mr-5">
                  입찰자 수
                </span>
                <input 
                  className="w-[70px] h-[30px] border-2 border-myyellow focus:border-myyellow rounded-md text-center focus:outline-none focus:border-blue-600"
                  type="text"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      bidderNum: Number(e.target.value),
                    });
                    handleBiddingNum(e.target);
                  }}
                />
                <span className="text-[15px] font-bold font-nanum leading-[30px] ml-2">
                  명
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
      </div>
    </>
  )
}