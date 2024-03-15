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
      <div className="flex flex-col md:gap-[14px] gap-[5px] md:w-[550px] w-[90%] h-[100%] bg-mybg items-center text-center pt-[50px]">
        <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%] bg-mybg">
          입력이 모두 끝났습니다
        </span>
        <div className="flex flex-col mt-[10px]">
          <span className="md:text-[18px] text-[16px] text-sutTitle font-['suit'] font-medium leading-[135%] tracking-[-1%] not-italic">
            입찰표를 확인한 후 저장하세요
          </span>
          <span className="md:text-[18px] text-[16px] text-sutTitle font-['suit'] font-medium leading-[135%] tracking-[-1%] not-italic">
            입찰표 파일을 저장한 후에는 수정하실 수 없습니다
          </span>
        </div>
        <div className='flex flex-col justify-center items-center w-[100%] h-[400px] gap-[25px]'>
          <img 
            src='/FinLogo.png'
            alt='logo'
            style={{
              width: 'auto',
              height: 'auto'
            }}
          />
          <span className="text-[16px] leading-[135%] tracking-[-2%] text-sutTitle md:font-extralight font-normal font-['suit'] not-italic">
            실수하기 쉬운 입찰무효
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
