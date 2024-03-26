import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import useInits from '@/components/hooks/useInits'
import Button from '@/components/shared/Button'
import Title from '@/components/shared/Title'
import { MstSeq } from '@/model/MstSeq'
import postChecks from '@/remote/postChecks'
import postInit from '@/remote/postInit'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

interface GetIpchalInfoProps {
  formData: MstSeq
  setFormData: React.Dispatch<React.SetStateAction<MstSeq>>
}

export default function GetIpchalInfo({ formData, setFormData }: GetIpchalInfoProps) {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [loading, setLoading] = useState<boolean>(false)
  const [blockData, setBlockData] = useState({
    aesUserId: formData.aesUserId,
    infoId: formData.infoId,
    caseNo: formData.caseNo,
    mulSeq: formData.mulSeq,
    biddingDate: formData.biddingDate,
    biddingTime: formData.biddingInfos[0].biddingTime,
  })

  const [data, setData] = useState<any>([])
  const router = useRouter()
  const { idcode } = router.query
  const { mutate: init } = useMutation(() => postInit(blockData.aesUserId, blockData.infoId, blockData.caseNo, blockData.mulSeq, blockData.biddingDate, blockData.biddingTime), {
    onSuccess: (data) => {
      setFormData({
        ...formData,
        mstSeq: data.mstSeq,
        state: data.state,
      })
    },
  })

  const { mutate: caseCheck} = useMutation(() => postChecks(formData.infoId, formData.caseNo, formData.mulSeq), {
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const handleConfirm = async () => {
    setLoading(true)
    if (formData.biddingInfos.length > 1) {
      setTimeout(() => {
        setStateNum(stateNum + 1)
        setLoading(false)
      }, 1000)
    } else {
      try {
        await init()
        if (formData.biddingInfos.length > 1) {
          setTimeout(() => {
            setStateNum(stateNum + 1)
            setLoading(false)
          }, 1000)
        } else {
          setTimeout(() => {
            setStateNum(stateNum + 2)
            setLoading(false)
          }, 1000)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }


  const handlePrevStep = () => {
    if (idcode) {
      setStateNum(0)
    } else {
      setStateNum(stateNum - 1)
      setBiddingInfo({
        ...biddingInfo,
        searchResultState: 2,
      })
    }
  }

  const handleNextStep = async () => {
    setLoading(true)
    if (biddingInfo.mstSeq === 0) {
      await handleConfirm()
    } else {
      if (biddingInfo.biddingInfos.length > 1) {
        setTimeout(() => {
          setStateNum(stateNum + 1)
          setLoading(false)
        }, 1000)
      } else {
        setTimeout(() => {
          setStateNum(stateNum + 2)
          setLoading(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    caseCheck()
  }, [])

  return ( 
    <>
      <div className="flex w-[100%] h-[100%] justify-center bg-white relative">
        {loading && (
          <Spinner />
        )}
        <div className="flex flex-col w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
          <Title 
            title='상세 내역을 확인해주세요'
            subTitle1='선택한 경매 사건이 맞는지 체크합니다'
          />
          <div className={`flex flex-col md:w-[500px] h-[500px] w-[90%] overflow-y-auto md:gap-[7.5px] gap-[5px] bg-mybg `}>
            <div className="flex flex-col relative h-[80px] items-start justify-start bg-white mt-[30px] pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
              <span className="font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                법원
              </span>
              <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                {formData.courtFullName}
              </span>
            </div>
            <div className='flex justify-between bg-white pt-[16px] pb-[16px] pl-[35px] pr-[35px] h-[80px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%] gap-[2.5px]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                  사건번호
                </span>
                <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {formData.caseNoString}
                </span>
              </div>
              <div className="flex flex-col relative justify-start items-start w-[20%] gap-[2.5px]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                  물건번호
                </span>
                <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {formData.mulNo}
                </span>
              </div>
            </div>
            <div className='flex justify-between bg-white h-[80px] p-[20px] pt-[16px] pb-[16px] pl-[35px] pr-[35px]'>
              <div className="flex flex-col relative justify-start items-start w-[80%] gap-[2.5px]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                  입찰기일
                </span>
                <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {formData.biddingDateString}
                </span>
              </div>
              <div className="flex flex-col relative justify-center items-start w-[20%] gap-[2.5px]">
                <span className="text-sutTitle font-['suit'] md:text-[0.9rem] text-[0.8rem] font-bold">
                  {" "}
                </span>
                <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%]" style={{
                color: '#181826',
              }}>
                  {formData.dayDay}
                </span>
              </div>
            </div>
            {biddingInfo.usage === ('차량' || '중기') ? (
              <div className="flex flex-col relative h-[80px] items-start justify-start bg-white p-[20px] pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
                <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                  차량정보
                </span>
                <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left" style={{
                color: '#181826',
              }}>
                  {formData.carInfo}
                </span>
              </div>
            ) : (
              null
            )}
            <div className="flex flex-col relative items-start justify-center bg-white pt-[16px] pb-[16px] pl-[35px] pr-[35px] gap-[2.5px]">
              <span className="text-sutTitle font-['suit'] font-medium md:text-[17px] text-[15px] leading-[130%] tracking-[0%]" style={{
                color: "#545492"
              }}>
                물건지 주소
              </span>
              <span className="text-black md:text-[20px] text-[16px] font-normal font-['suit'] leading-[135%] tracking-[-1%] text-left" style={{
                color: '#181826',
              }}>
                {formData.address + (formData.etcAddress !== '' ? '[일괄]' + formData.etcAddress : '')}
              </span>
              <span className="text-myBlue md:text-[18px] text-[16px] text-left font-normal leading-[135%] tracking-[-1%] font-['suit'] ">
                {formData.roadAddress}
              </span>
            </div>
          </div>
        </div>
        <Button nextText='다음으로' handleNextStep={handleNextStep} handlePrevStep={() => handlePrevStep()} />
      </div>
    </>
  )
}
