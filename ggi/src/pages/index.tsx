import { stepState } from "@/atom";
import Image from "next/image";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

export default function Home() {
  return (
    <div className="flex flex-col relative justify-center items-center w-full h-screen">
      <div className="flex absolute top-16 text-center">
        <span className="text-black-800 text-2xl font-semibold">
          입찰표 작성을 시작합니다
        </span>
      </div>
      <div className="flex absolute top-32 text-center tracking-tighter	">
        <span className="text-sm text-gray-400 font-bold">
          질문에 답변해주세요.
        </span>
      </div>
      <div className="flex w-full justify-center absolute md:top-[25%] top-48">
        <Image 
          src={'/MainImg.jpg'}
          alt="main"
          width={270}
          height={250}
        />
      </div>
      <Link href='/ipchal' className="flex justify-center items-center w-[163px] h-[30px] rounded-md bg-mygold cursor-pointer absolute top-[70%]">
        <span className="text-white text-sm font-extrabold not-italic">
          시작하기
        </span>
      </Link>
      <div className="flex justify-center items-center absolute top-[90%]">
        <span className="text-xs text-mygray font-normal absolute bottom-4">
          ※ 입찰표의 주민등록번호는 저장하지 않습니다.
        </span>
        <span className="text-xs text-mygray font-normal">
          다음번 입찰표 작성 시 개인정보를 다시 입력해주셔야 합니다.
        </span>
      </div>
    </div>
  );
}
