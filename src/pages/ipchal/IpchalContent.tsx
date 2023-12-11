import { stepState } from "@/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function IpchalContent() {
  const stateNum = useRecoilValue(stepState);
  const setStateNum = useSetRecoilState(stepState);
  const date = new Date();
  const nowDate = date.getDate();
  const nowMonth = date.getMonth() + 1;
  const nowYear = date.getFullYear();

  return (
    <div className="flex w-full h-screen justify-center bg-mybg relative">
      <div className="flex flex-col gap-4 md:w-[520px] w-[100%] h-screen bg-mybg items-center text-center">
        <span className="text-[20px] font-extrabold font-nanum not-italic leading-8">
          입찰표
        </span>
      </div>
      <div className="flex flex-col gap-10 md:w-[500px] w-[400px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500 overflow-scroll md:scrollbar-hide">
        <div className="flex flex-col border border-black w-[395px] h-[252px] relative">
          {/* 최상단 박스 */}
          <div className="flex border-b-[1px] border-black w-full h-[60px] relative">
            <div className="flex absolute top-0 left-0">
              <span className="text-[9px] font-bold">
                (앞면)
              </span>
            </div>
            <div className="flex justify-center items-center text-center mx-auto">
              <span className="font-bold text-[15px]">
                기 일 입 찰 표
              </span>
            </div>
            <div className="flex absolute bottom-0 left-0">
              <span className="text-[9px] font-bold font-nanum">
                집행관 귀하
              </span>
            </div>
            <div className="flex absolute bottom-0 right-0">
              <span className="text-[9px] font-bold font-nanum">
                입찰기일 : {nowYear}년 {nowMonth}월 {nowDate}일
              </span>
            </div>
          </div>
          {/* 그 다음 박스 */}
          <div className="flex border-b-[1px] border-black w-full h-[40px] relative">

          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 absolute top-[578px]">
        <button
          type="button"
          className="flex w-[360px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            setStateNum(stateNum + 1)
          }}
        >
          <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
            확인했습니다
          </span>
        </button>
      </div>
    </div>
  )
}