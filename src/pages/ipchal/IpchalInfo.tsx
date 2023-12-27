import { stepState } from '@/atom'
import Button from '@/components/Button'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function IpchalInfo() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  return (
    <div className="flex w-screen h-screen justify-center bg-white relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen items-center text-center absolute top-20">
        <span className="text-[20px] font-extrabold font-nanum not-italic leading-8">
          입력이 모두 끝났습니다
        </span>
        <div className="flex flex-col mt-5">
          <span className="text-[18px] font-extrabold font-nanum not-italic leading-8">
            입찰표를 확인해주시고
          </span>
          <span className="text-[18px] font-extrabold font-nanum not-italic leading-8">
            입찰표 파일을 생성해주세요
          </span>
        </div>
        <div
          className="flex w-[163px] h-[30px] bg-mygold rounded-md text-center justify-center items-center absolute top-[300px] cursor-pointer"
          onClick={() => setStateNum(stateNum + 1)}
        >
          <span className="font-nanum text-white text-[15px] not-italic font-extrabold leading-[15px]">
            입찰표 확인하기
          </span>
        </div>
      </div>
      <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
    </div>
  )
}
