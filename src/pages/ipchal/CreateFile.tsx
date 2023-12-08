import { stepState } from "@/atom";
import Button from "@/components/Button";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { LiaEyeSolid , LiaEyeSlashSolid  } from "react-icons/lia";

export default function CreateFile() {
  const stateNum = useRecoilValue(stepState);
  const [isFileCreated, setIsFileCreated] = useState<boolean>(false);
  const [passwordActive, setPasswordActive] = useState<boolean>(false);

  const handleNextStep = () => {

  }

  return (
    <div className="flex w-full h-screen justify-center bg-mybg relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center top-20 relative">
        <span className="text-[20px] font-extrabold font-nanum not-italic leading-8">
          파일명과 암호를 입력하세요
        </span>
        <div className="flex flex-col gap-5 w-[360px] h-[150px] justify-center items-left bg-white absolute top-[130px] rounded-md border-gray-400">
          <div className="flex flex-col justify-start text-left gap-3">
            <span className="text-black text-[10px] font-extrabold not-italic font-nanum leading-[9px] ml-[5%]">
              파일이름
            </span>
            <input className="w-[90%] h-[30px] border border-gray-300 rounded-md ml-[5%]" />
          </div>
          <div className="flex flex-col justify-start text-left gap-3 relative">
            <span className="text-black text-[10px] font-extrabold not-italic font-nanum leading-[9px] ml-[5%]">
              파일암호
            </span>
            <input 
              type={`${passwordActive ? "text" : "password"}`}
              className="block w-[90%] h-[30px] border border-gray-300 rounded-md ml-[5%]" 
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pt-5 cursor-pointer" onClick={() => setPasswordActive(!passwordActive)}>
              {passwordActive ? <LiaEyeSolid className="cursor-pointer" /> : <LiaEyeSlashSolid  className="cursor-pointer" />}
            </div>
          </div>
        </div>
        <div className="flex w-[293px] h-[35px] bg-mygold border-[1px] border-gray-300 justify-center items-center rounded-md absolute top-[350px]">
          <span className="flex text-white text-center text-[15px] not-italic font-extrabold leading-[15px] font-nanum cursor-pointer">
            파일만들기
          </span>
        </div>
        {!isFileCreated && (
          <div className="flex absolute top-[400px]">
            <span className="text-red-500 text-[10px] font-bold">
              파일을 생성해주세요
            </span>
          </div>
        )}
      </div>
      <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
    </div>
  )
}