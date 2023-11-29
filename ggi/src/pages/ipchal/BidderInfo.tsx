'use client';
import { stepState } from "@/atom";
import { IpchalType } from "@/type/IpchalType";
import Link from "next/link";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSetRecoilState } from "recoil";
import { Dispatch, SetStateAction } from "react";

interface BidderInfoProps {
  setIpchalStep?: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  formData: IpchalType | undefined;
}

export default function BidderInfo({ setIpchalStep, formData, setFormData }: BidderInfoProps) {
  const stateNum = useSetRecoilState(stepState);
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center bg-white-500 h-screen relative">
        <div className="relative flex justify-center md:w-[30%] h-[80%] w-full">
          <div className="flex absolute top-0">
            <span className="font-semibold md:text-2xl text-xl">
              입찰자를 선택해주세요.
            </span>
          </div>
          <div 
            className={
              `flex w-[100px] h-[40px] bg-blue-500 rounded-lg text-white text-md font-semibold text-center items-center justify-center absolute top-[150px] hover:bg-blue-400 ${formData?.bidder === 'self' ? 'border-4 border-indigo-600' : ''}`}
            onClick={() => {
              setFormData({
                ...formData!,
                bidder: 'self',
              });
            }}
          >
            본인
          </div>
          <div 
            className={`flex w-[100px] h-[40px] bg-blue-500 rounded-lg text-white text-md text-center font-semibold items-center justify-center absolute top-[200px] hover:bg-blue-400 focus:outline-blue-800 ${formData?.bidder === 'agent' ? 'border-4 border-indigo-600' : ''}`}
            onClick={() => {
              setFormData({
                ...formData!,
                bidder: 'agent',
              });
            }}
          >
            대리인
          </div>
        </div>
        <div className="flex flex-row justify-center w-full gap-[50%] md:gap-[10%] absolute top-[400px] md:top-[500px]">
          <div className="flex rounded-2xl bg-gray-200 w-[80px] h-[35px] justify-center items-center cursor-pointer hover:bg-gray-200" onClick={() => stateNum(1)}>
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