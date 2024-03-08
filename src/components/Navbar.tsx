import { biddingInfoState, stepState } from '@/atom'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'


export default function Navbar() {
  const [statusBar, setStatusBar] = useState<number>(0)
  const stepStateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  

  const handleProgressBar = () => {
    if (stepStateNum === 0) {
      setStatusBar(0)
    } else if ((stepStateNum >= 1 && stepStateNum <= 2)) {
      setStatusBar(10)
    } else if ((stepStateNum >= 3) && (stepStateNum <= 4)) {
      setStatusBar(15)
    } else if ((stepStateNum >= 5 && stepStateNum <= 7)  || (stepStateNum >= 16 && stepStateNum <= 17)) {
      setStatusBar(30)
    } else if ((stepStateNum >= 8 && stepStateNum <= 10) || stepStateNum === 19) {
      setStatusBar(50)
    } else if ((stepStateNum >= 11 && stepStateNum <= 13)) {
      setStatusBar(70)
    } else if ((stepStateNum >= 14 && stepStateNum <= 15)) {
      setStatusBar(90)
    } else if ((stepStateNum === 19)) {
      setStatusBar(100)
    }
  }

  useEffect(() => {
    handleProgressBar()
  }, [stepStateNum])

  return (
    <div className={`flex justify-center items-center absolute w-[100%] h-[50px] left-[50%] top-0 bg-mybg mx-auto`} style={{
      transform: 'translateX(-50%)',
      zIndex: biddingForm.isModalOpen ? 0 : 10,
    }}>
      {stepStateNum === 0 ? (
        <div className="flex justify-center items-center top-[25px]">
          <div className="flex">
            <img
              src={'/images/TopLogo.png'}
              alt="logo"
              width={80}
              height={80}
            />
          </div>
        </div>
      ) : (
        <div className='flex justify-start md:w-[550px] w-[80%] h-[2.5px] bg-gray-200 absolute top-[25px]'>
          <div className={`flex w-[${statusBar}%] h-[2.5px] bg-myBlue ease-in`}>
          </div>
        </div>
      )}
    </div>
  )
}
