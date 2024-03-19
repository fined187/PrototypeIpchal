import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function BiddingPayment() {
  const [isWaySelected, setIsWaySelected] = useState<boolean>(false)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)

  const handleBiddingPayment = async (pay: string) => {
    setLoading(true)
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/payments`,
        {
          bidPrice: biddingForm.biddingPrice,
          bidDeposit: biddingForm.depositPrice,
          depositType: pay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false)
          setStateNum(stateNum + 1)
        }, 1000)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

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

  const handleNextStep = () => {
    if (biddingForm.bidWay === '' || !biddingForm.bidWay) {
      setIsWaySelected(true)
      alert('보증금 제공 방법을 선택해주세요')
    } else {
      setIsWaySelected(false)
      handleBiddingPayment(biddingForm.bidWay)
    }
  }

  return (
    <div id='box' className="flex w-[100%] bg-white justify-center relative">
      {loading && (
        <Spinner />
      )}
      <div className="flex flex-col w-[100%] h-[100%] bg-mybg items-center text-center pt-[50px] md:gap-[14px] gap-[5px]">
        <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%]">
          보증금 제공 방법을 선택해주세요
        </span>
        <span className="md:text-[18px] text-[16px] font-semibold leading-[135%] tracking-[-1%] font-['suit'] text-center text-sutTitle">
          한 개 방법만 선택할 수 있습니다
        </span>
        <div className={`flex gap-[10px] md:w-[550px] w-[90%] h-[250px] justify-between items-center rounded-lg border-slate-500 mt-[100px]`}>
          <div className={`flex flex-col md:w-[270px] w-[50%] h-[100%] border border-gray-300 justify-center gap-[10px] ${biddingForm.bidWay === 'M' ? 'bg-mySelect' : 'bg-white'}`} onClick={async () => {
            setBiddingForm({
              ...biddingForm,
              bidWay: 'M',
            })
            await handleBiddingPayment('M')
          }}>
            <div className={`flex justify-center items-center w-[100%] cursor-pointer ${biddingForm.bidWay === 'M' ? 'bg-mySelect' : 'bg-white'}`}>
              <svg width="105" height="115" viewBox="0 0 105 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 70.3761C2 68.0159 3.92983 66.1026 6.31039 66.1026H23.552C25.9325 66.1026 27.8623 68.0159 27.8623 7stroke-linejoin0.3761V108.838C27.8623 111.198 25.9325 113.111 23.552 113.111H6.31039C3.92983 113.111 2 111.198 2 108.838V70.3761Z" fill={`${biddingForm.bidWay === 'M' ? '#F5F5FF' : 'white'}`} />
                <path d="M83.8974 36.188C83.8974 45.6288 76.1781 53.2821 66.6559 53.2821C57.1336 53.2821 49.4143 45.6288 49.4143 36.188C49.4143 26.7473 57.1336 19.094 66.6559 19.094C76.1781 19.094 83.8974 26.7473 83.8974 36.188Z" fill={`${biddingForm.bidWay === 'M' ? '#F5F5FF' : 'white'}`}/>
                <path d="M29.5469 103.14C28.7603 103.4 28.3334 104.248 28.5933 105.035C28.8533 105.821 29.7016 106.248 30.4882 105.988L29.5469 103.14ZM62.3455 106.701L62.2106 105.207L62.3455 106.701ZM81.7422 102.427L82.3955 103.778L81.7422 102.427ZM100.276 85.7115L99.1146 84.7625L100.276 85.7115ZM87.6 75.2522L86.5439 74.187L87.6 75.2522ZM79.0641 83.715L80.1202 84.7803L79.0641 83.715ZM55.8799 85.9701C55.0515 85.9701 54.3799 86.6417 54.3799 87.4701C54.3799 88.2985 55.0515 88.9701 55.8799 88.9701V85.9701ZM100.276 73L99.4491 74.2514L100.276 73ZM36.5779 71.3975L35.9117 70.0536L35.8369 70.0906L35.7668 70.1357L36.5779 71.3975ZM71.7089 82.4603L70.6528 81.3951L71.7089 82.4603ZM65.5998 86.4049C65.0115 86.9882 65.0074 87.9379 65.5907 88.5262C66.1739 89.1145 67.1237 89.1186 67.712 88.5353L65.5998 86.4049ZM68.6673 71.7369L68.6118 73.2358L68.6673 71.7369ZM69.004 71.7902L69.4316 70.3524L69.004 71.7902ZM60.2977 71.427L60.3531 69.928L60.2977 71.427ZM58.7434 71.1447L58.1944 72.5406L58.7434 71.1447ZM30.4882 105.988C31.8145 105.55 33.7257 105.456 36.1753 105.63C38.5944 105.801 41.3617 106.215 44.3343 106.678C50.192 107.591 56.8672 108.702 62.4804 108.195L62.2106 105.207C57.0478 105.673 50.7918 104.648 44.7959 103.714C41.8417 103.254 38.9517 102.818 36.3869 102.637C33.8526 102.458 31.4533 102.51 29.5469 103.14L30.4882 105.988ZM62.4804 108.195C70.9728 107.428 74.3927 107.65 82.3955 103.778L81.089 101.077C73.6643 104.669 70.8138 104.43 62.2106 105.207L62.4804 108.195ZM82.3955 103.778C89.442 100.368 96.7749 92.3686 101.438 86.6604L99.1146 84.7625C94.437 90.4885 87.4719 97.9889 81.089 101.077L82.3955 103.778ZM86.5439 74.187L78.008 82.6498L80.1202 84.7803L88.6561 76.3174L86.5439 74.187ZM69.9204 85.9701H55.8799V88.9701H69.9204V85.9701ZM78.008 82.6498C75.8652 84.7743 72.9563 85.9701 69.9204 85.9701V88.9701C73.7436 88.9701 77.4128 87.4644 80.1202 84.7803L78.008 82.6498ZM101.103 71.7486C98.9447 70.3219 96.0189 70.236 93.4494 70.759C90.8511 71.2878 88.2319 72.5134 86.5439 74.187L88.6561 76.3174C89.8278 75.1557 91.8643 74.1431 94.0478 73.6987C96.2603 73.2483 98.2427 73.454 99.4491 74.2514L101.103 71.7486ZM101.438 86.6604C103.127 84.5926 104.228 81.7582 104.364 79.0398C104.5 76.3188 103.66 73.4387 101.103 71.7486L99.4491 74.2514C100.824 75.1599 101.471 76.8154 101.368 78.8902C101.264 80.9678 100.399 83.1898 99.1146 84.7625L101.438 86.6604ZM6.31039 67.6026H23.552V64.6026H6.31039V67.6026ZM26.3623 70.3761V108.838H29.3623V70.3761H26.3623ZM23.552 111.611H6.31039V114.611H23.552V111.611ZM3.5 108.838V70.3761H0.5V108.838H3.5ZM6.31039 111.611C4.74607 111.611 3.5 110.357 3.5 108.838H0.5C0.5 112.038 3.11359 114.611 6.31039 114.611V111.611ZM26.3623 108.838C26.3623 110.357 25.1163 111.611 23.552 111.611V114.611C26.7488 114.611 29.3623 112.038 29.3623 108.838H26.3623ZM23.552 67.6026C25.1163 67.6026 26.3623 68.8564 26.3623 70.3761H29.3623C29.3623 67.1753 26.7488 64.6026 23.552 64.6026V67.6026ZM6.31039 64.6026C3.11358 64.6026 0.5 67.1753 0.5 70.3761H3.5C3.5 68.8564 4.74608 67.6026 6.31039 67.6026V64.6026ZM28.6735 78.2618L37.389 72.6593L35.7668 70.1357L27.0512 75.7382L28.6735 78.2618ZM50.0715 69.7393H51.8392V66.7393H50.0715V69.7393ZM60.2422 72.926L68.6118 73.2358L68.7228 70.2379L60.3531 69.928L60.2422 72.926ZM70.6528 81.3951L65.5998 86.4049L67.712 88.5353L72.765 83.5255L70.6528 81.3951ZM68.5764 73.228C72.1598 74.2936 73.3018 78.7688 70.6528 81.3951L72.765 83.5255C77.0552 79.272 75.1683 72.0585 69.4316 70.3524L68.5764 73.228ZM51.8392 69.7393C52.6518 69.7393 53.5211 70.078 54.6222 70.6723C55.606 71.2034 56.9333 72.0446 58.1944 72.5406L59.2924 69.7487C58.2506 69.339 57.3351 68.7276 56.0472 68.0324C54.8766 67.4005 53.4452 66.7393 51.8392 66.7393V69.7393ZM37.2441 72.7414C41.2263 70.7674 45.6181 69.7393 50.0715 69.7393V66.7393C45.1566 66.7393 40.3088 67.8738 35.9117 70.0536L37.2441 72.7414ZM82.3974 36.188C82.3974 44.7882 75.3619 51.7821 66.6559 51.7821V54.7821C76.9944 54.7821 85.3974 46.4694 85.3974 36.188H82.3974ZM66.6559 51.7821C57.9499 51.7821 50.9143 44.7882 50.9143 36.188H47.9143C47.9143 46.4694 56.3174 54.7821 66.6559 54.7821V51.7821ZM50.9143 36.188C50.9143 27.5878 57.9499 20.594 66.6559 20.594V17.594C56.3174 17.594 47.9143 25.9067 47.9143 36.188H50.9143ZM66.6559 20.594C75.3619 20.594 82.3974 27.5878 82.3974 36.188H85.3974C85.3974 25.9067 76.9944 17.594 66.6559 17.594V20.594ZM49.4143 34.688C40.7083 34.688 33.6727 27.6942 33.6727 19.094H30.6727C30.6727 29.3753 39.0758 37.688 49.4143 37.688V34.688ZM33.6727 19.094C33.6727 10.4938 40.7083 3.5 49.4143 3.5V0.5C39.0758 0.5 30.6727 8.8127 30.6727 19.094H33.6727ZM49.4143 3.5C58.1203 3.5 65.1559 10.4938 65.1559 19.094H68.1559C68.1559 8.8127 59.7528 0.5 49.4143 0.5V3.5ZM68.6118 73.2358C68.6138 73.2359 68.6121 73.236 68.6068 73.2351C68.6015 73.2343 68.5912 73.2324 68.5764 73.228L69.4316 70.3524C69.1854 70.2793 68.9444 70.2461 68.7228 70.2379L68.6118 73.2358ZM60.3531 69.928C59.904 69.9114 59.5632 69.8552 59.2924 69.7487L58.1944 72.5406C58.9109 72.8223 59.6312 72.9034 60.2422 72.926L60.3531 69.928Z" fill="#8E8EA9"/>
                <path d="M59 42V31.737C59 30.1396 60.7803 29.1869 62.1094 30.0729L65.3514 32.2343C66.0428 32.6952 66.9471 32.6806 67.6233 32.1976L70.3375 30.2589C71.6613 29.3134 73.5 30.2596 73.5 31.8864V42" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round"/>
                <path d="M42 25V14.737C42 13.1396 43.7803 12.1869 45.1094 13.0729L48.3514 15.2343C49.0428 15.6952 49.9471 15.6806 50.6233 15.1976L53.3375 13.2589C54.6613 12.3134 56.5 13.2596 56.5 14.8864V20" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className='flex justify-center items-center w-[100%] cursor-pointer'>
              <span className="font-semibold md:text-[22.5px] text-[16px] font-['suit'] leading-[135%] tracking-[-1%]">
                현금 · 자기앞수표
              </span>
            </div>
          </div>
          <div className={`flex flex-col md:w-[270px] w-[50%] h-[100%] border border-gray-300 justify-center gap-[10px] ${biddingForm.bidWay === 'W' ? 'bg-mySelect' : 'bg-white'}`} onClick={async () => {
            setBiddingForm({
              ...biddingForm,
              bidWay: 'W',
            })
            await handleBiddingPayment('W')
          }}>
            <div className={`flex justify-center items-center w-[100%] cursor-pointer ${biddingForm.bidWay === 'W' ? 'bg-mySelect' : 'bg-white'}`}>
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 110H90C95.523 110 100 105.523 100 100V49.1422C100 46.49 98.9465 43.9465 97.071 42.0711L67.929 12.9289C66.0535 11.0535 63.51 10 60.858 10H30C24.4771 10 20 14.4771 20 20V100C20 105.523 24.4771 110 30 110Z" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 85H75" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 65H75" stroke="#8E8EA9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M63 10V40C63 42.7614 65.2386 45 68 45H92" stroke="#8E8EA9" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className='flex flex-col justify-center items-center w-[100%] cursor-pointer gap-[2px]'>
              <span className="font-semibold md:text-[22.5px] text-[16px] font-['suit'] leading-[135%] tracking-[-1%]">
                보증서 
              </span>
              <span className="font-normal md:text-[20px] text-[13px] font-['suit'] leading-[135%] tracking-[-1%]">
                (경매보증보험)
              </span>
            </div>
          </div>
        </div>
        {isWaySelected && (
          <div className="flex">
            <span className="md:text-[0.9rem] text-[0.8rem] font-bold text-myRed font-['suit']">
              버튼을 선택해주세요.
            </span>
          </div>
        )}
        <Button 
          nextText='다음으로'
          handleNextStep={handleNextStep}
          handlePrevStep={() => setStateNum(stateNum - 1)}
        />
      </div>
    </div>
  )
}
