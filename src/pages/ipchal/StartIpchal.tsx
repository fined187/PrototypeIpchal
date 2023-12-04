import { stepState } from "@/atom";
import Image from "next/image";
import { useSetRecoilState } from "recoil";

export default function StartIpchal() {
  const stateNum = useSetRecoilState(stepState);
  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex flex-col md:w-[50%] w-full h-screen bg-white items-center text-center">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic">
              입찰표 작성을 시작합니다
            </span>
          </div>
          <div className="flex absolute top-16">
            <span className="text-xs text-mygray font-bold font-nanum not-italic">
              질문에 답변해 주세요.
            </span>
          </div>
          <div className="flex md:w-[50%] w-[80%] absolute top-32 justify-center">
            <Image
              src={"/MainImg.jpg"}
              alt="MainImg"
              width={300}
              height={300}
            />
          </div>
          <div
            className="flex absolute top-[445px] bg-mygold w-[163px] h-[30px] rounded-lg items-center justify-center cursor-pointer"
            onClick={() => stateNum(1)}
          >
            <span className="text-white text-sm font-nanum font-extrabold not-italic leading-4">
              시작하기
            </span>
          </div>
          <div className="flex flex-col absolute top-[540px] w-[80%] justify-center">
            <span className="text-[10px] text-mygray font-normal">
              ※ 입찰표의 주민등록번호는 저장하지 않습니다
            </span>
            <span className="text-[10px] text-mygray font-normal">
              다음 번 입찰표 작성 시, 개인정보를 다시 입력해주셔야합니다.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
