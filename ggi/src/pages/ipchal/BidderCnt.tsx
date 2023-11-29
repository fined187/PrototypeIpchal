import { stepState } from "@/atom";
import { IpchalType } from "@/type/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSetRecoilState } from "recoil";

interface BidderCntProps {
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  formData: IpchalType;
}

export default function BidderCnt({ setFormData, formData }: BidderCntProps) {
  const stateNum = useSetRecoilState(stepState);
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center bg-white-500 h-screen relative">
        <div className="relative flex justify-center md:w-[30%] h-[80%] w-full">
          <div className="flex absolute top-0">
            <span className="font-semibold md:text-2xl text-xl">
              입찰하시는 분이 몇 분 이신가요?
            </span>
          </div>
          <div className="absolute top-[150px]">
            <div className="flex flex-row justify-center items-center">
              <span className="text-lg font-semibold mr-5">
                입찰자 수
              </span>
              <input 
                className="w-[100px] h-[40px] border-2 border-gray-200 rounded-lg text-center focus:outline-none focus:border-blue-600"
                type="number"
                value={formData.bidderNum <= 0 ? '' : formData.bidderNum}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    bidderNum: Number(e.target.value),
                  });
                }}
              />
              <span className="text-lg font-semibold ml-2">
                명
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full gap-[50%] md:gap-[10%] absolute top-[400px] md:top-[500px]">
          <div className="flex rounded-2xl bg-gray-200 w-[80px] h-[35px] justify-center items-center cursor-pointer hover:bg-gray-200" onClick={() => stateNum(2)}>
            <GrFormPrevious className="text-gray-700" />
            <span className="mr-1 text-gray-700">
              이전
            </span>
          </div>
          <div  className="flex rounded-2xl bg-gray-200 w-[80px] h-[35px] justify-center items-center cursor-pointer hover:bg-gray-200" onClick={() => stateNum(3)}>
            <span className="text-gray-700">
              다음
            </span>
            <GrFormNext className="ml-1 text-gray-700" />
          </div>
        </div>
      </div>
    </>
  )
}