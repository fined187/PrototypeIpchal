import { stepState } from '@/atom'
import Button from '@/components/Button'
import { useRecoilState } from 'recoil'

export default function IpchalInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col gap-4 md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8 bg-mybg">
          입력이 모두 끝났습니다
        </span>
        <div className="flex flex-col mt-5">
          <span className="text-[20px] font-extrabold font-NanumGothic not-italic leading-8">
            입찰표를 확인해주시고
          </span>
          <span className="text-[20px] font-extrabold font-NanumGothic not-italic leading-8">
            입찰표 파일을 생성해주세요
          </span>
        </div>
        <div
          className="flex w-[180px] h-[40px] bg-mygold rounded-md text-center justify-center items-center absolute top-[300px] cursor-pointer"
          onClick={() => setStateNum(stateNum + 1)}
        >
          <span className="font-NanumGothic text-white text-[16px] not-italic font-extrabold leading-[15px]">
            입찰표 확인하기
          </span>
        </div>
      </div>
      <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
    </div>
  )
}
