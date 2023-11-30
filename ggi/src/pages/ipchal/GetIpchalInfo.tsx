import { stepState } from "@/atom";
import Button from "@/components/Button";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil"

interface GetIpchalInfoProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
}

export default function GetIpchalInfo({ formData, setFormData }: GetIpchalInfoProps) {
  const stateValue = useRecoilValue(stepState);

  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex flex-col w-full h-screen bg-mybg items-center text-center-500">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic leading-8	">사건 번호와 입찰일자를 확인해주세요</span>
          </div>
          <div className="flex w-[327px] h-[257px] bg-white absolute top-[107px] justify-center rounded-lg border-slate-500">
            <div className="flex flex-row absolute top-8 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">사건번호: </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">2022 타경 4016[1]</span>
            </div>
            <div className="flex flex-row absolute top-24 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">입찰기일: </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">2023년 11월 06일</span>
            </div>
            <div className="flex flex-row absolute top-40 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">주소: </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">경기도 시흥시 도창동48</span>
            </div>
          </div>
        </div>
        <Button prevStepNum={stateValue - 1} nextStepNum={stateValue + 1} />
      </div>
    </>
  )
}