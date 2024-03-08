import { stepState } from '@/atom'
import Button from '@/components/shared/Button'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export default function IpchalInfo() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const handleHeight = () => {
    let height = window.innerHeight;
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box');
      if (boxElement) {
        boxElement.style.height = height + 'px';
      }
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])
  return (
    <div id='box' className="flex w-[100%] bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[550px] w-[90%] h-[100%] bg-mybg items-center text-center pt-[50px]">
        <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8 bg-mybg">
          입력이 모두 끝났습니다
        </span>
        <div className="flex flex-col mt-[10px]">
          <span className="md:text-[1rem] text-[0.8rem] text-subTitle font-normal font-['suit'] not-italic leading-8">
            입찰표를 확인한 후 저장하세요
          </span>
          <span className="md:text-[1rem] text-[0.8rem] text-subTitle font-normal font-['suit'] not-italic leading-8">
            입찰표 파일을 저장한 후에는 수정하실 수 없습니다
          </span>
        </div>
        <div className='flex flex-col justify-center items-center w-[100%] h-[400px] gap-[25px]'>
          <img 
            src='/FinLogo.png'
            alt='logo'
            className='w-[300px] h-[300px]'
          />
          <span className="md:text-[1rem] text-[0.8rem] text-subTitle font-normal font-['suit'] not-italic leading-8">
            실수하기 쉬운 입찰표
          </span>
        </div>
      </div>
      <Button 
        nextText='다음으로'
        handleNextStep={() => setStateNum(stateNum + 1)}
        handlePrevStep={() => setStateNum(stateNum - 1)}
      />
    </div>
  )
}
