import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import { handleVerifyCorpNum, handleVerifyCorpReiNum, handleVerifyIdNum, handleVerifyPhone } from '@/components/Validation'
import useBidders from '@/components/form/hooks/useBidders'
import BidderFormProps from '@/components/shared/BidderFormProps'
import { BiddingInfoType } from '@/model/IpchalType'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

type BiddersProps = {
  address: string
  bidderType: string
  companyNo: string
  corporationNo: string
  job: string
  name: string
  peopleSeq: number
  phoneNo: string
  share: any
}
interface BidderListProps {
  agentYn: string | null
  bidderCount: number
  mstSeq: number
  number: number
  state: number
  bidders: BiddersProps[]
}

export default function BidderForm() {
  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })
  const [stateNum, setStateNum] = useRecoilState(stepState)                  //  입찰표 작성 단계 set함수
  const [stepNum, setStepNum] = useState<number>(1)                 //  입찰자 정보 단계
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)  //  입찰표 작성 정보
  const [bidderList, setBidderList] = useState<BidderListProps>()    //  입찰자 정보 리스트
  const [loading, setLoading] = useState<boolean>(false)            //  로딩 상태
  const { isOpen, onClose, onOpen } = useDisclosure()                       //  주소검색 모달 상태
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BiddingInfoType>({
    defaultValues: {
      bidderName: [''],
      bidderPhone1: [''],
      bidderPhone2: [''],
      bidderPhone3: [''],
      bidderIdNum1: [''],
      bidderIdNum2: [''],
      bidderAddr: [''],
      bidderAddrDetail: [''],
      bidderCorpNum1: [''],
      bidderCorpNum2: [''],
      bidderCorpNum3: [''],
      bidderCorpRegiNum1: [''],
      bidderCorpRegiNum2: [''],
      bidderJob: [''],
    },
    mode: 'onChange',
  })

  const { data: bidders } = useBidders(biddingForm.mstSeq, biddingForm.bidIdNum)
  console.log(bidders)

  useEffect(() => {
    const handleGetBidders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`)
        if (response.status === 200) {
          setBidderList(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBidders()
  }, [stepNum])

  //  수정 사항 반영
  const handleUpdate = async () => {
    try {
      if (biddingForm?.bidCorpYn[stepNum - 1] === 'I') {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/${stepNum}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          job: biddingForm.bidJob[stepNum - 1] ?? '',
          name: biddingForm?.bidName[stepNum - 1],
          phoneNo: biddingForm?.bidPhone[stepNum - 1],
        })
        if (response.status === 200) {
          return
        }
      } else if (biddingForm?.bidCorpYn[stepNum - 1] === 'C') {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/${stepNum}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          companyNo: biddingForm?.bidCorpNum[stepNum - 1],
          corporationNo: biddingForm?.bidCorpRegiNum[stepNum - 1],
          job: biddingForm.bidJob[stepNum - 1] ?? '',
          name: biddingForm?.bidName[stepNum - 1],
          phoneNo: biddingForm?.bidPhone[stepNum - 1],
        })
        if (response.status === 200) {
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 입찰자 정보 저장
  const handleBidderFormSave = async () => {
    handleUpdateIdNum(stepNum - 1)
    setLoading(true)
    try {
      if (biddingForm.bidCorpYn[stepNum - 1] === 'I') {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`,
          {
            bidderType: biddingForm.bidCorpYn[stepNum - 1],
            name: biddingForm.bidName[stepNum - 1],
            phoneNo: biddingForm.bidPhone[stepNum - 1],
            address: biddingForm.bidAddr[stepNum - 1],
            job: biddingForm.bidJob[stepNum - 1] ?? '',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.status === 200) {
          setLoading(false)
          return
        }
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`,
          {
            bidderType: biddingForm.bidCorpYn[stepNum - 1],
            name: biddingForm.bidName[stepNum - 1],
            phoneNo: biddingForm.bidPhone[stepNum - 1],
            address: biddingForm.bidAddr[stepNum - 1],
            job: biddingForm.bidJob[stepNum - 1] ?? '',
            companyNo: biddingForm.bidCorpNum[stepNum - 1],
            corporationNo: biddingForm.bidCorpRegiNum[stepNum - 1],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.status === 200) {
          setLoading(false)
          return
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  //  다음 스텝 넘어가기
  const handleNextStepNew = async (num: number) => {
    if (biddingForm.bidderNum === 1) {
      await handleBidderFormSave()
      setStateNum(stateNum + 2)
    } else if (biddingForm.bidderNum > 1) {
      if (stepNum === biddingForm.bidderNum && biddingForm.agentYn === 'N') {
        await handleBidderFormSave()
        setStateNum(stateNum + 1)
      } else if (stepNum === biddingForm.bidderNum && biddingForm.agentYn === 'Y') {
        await handleBidderFormSave()
        setStateNum(19)
      } else if (biddingForm.bidName[stepNum] === '') {
        await handleBidderFormSave()
        setStepNum(num + 1)
      } else {
        if (bidderList && bidderList?.bidders?.length > 0 && bidderList?.bidders[stepNum - 1]?.peopleSeq === stepNum) {
          await handleUpdate()
          setStepNum(num + 1)
          reset()
        } else {
          await handleBidderFormSave()
          setStepNum(num + 1)
          reset()
        }
      }
    }
  }

  //  입찰자 정보 가져오기(컴포넌트 마운트시)
  useEffect(() => {
    const handleGetBidderForm = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`,
        )
        if (response.status === 200) {
          setBidderList(response.data.data.bidders)
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBidderForm()
  }, [])


  const handleUpdateIdNum = (index: number) => {
    setBiddingForm((prev: any) => {
      const newBidIdNum = [...prev.bidIdNum]
      const newBidderType = [...prev.bidCorpYn]
      if (newBidderType[index] === 'I') {
        const isIdNum = newBidIdNum[index]?.length === 13
        if (!isIdNum) {
          newBidIdNum.splice(index, 1, '')
        }
      } else if (newBidderType[index] === 'C' && newBidIdNum[index]?.length !== '') {
        newBidIdNum.splice(index, 1, '')
      }
      return { ...prev, bidIdNum: newBidIdNum }
    })
  }

  const onSubmit: SubmitHandler<any> = async (stepNum: number) => {
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'I' && handleVerifyIdNum(biddingForm.bidIdNum1[stepNum - 1] + biddingForm.bidIdNum2[stepNum - 1]) === false) {
    //   alert('주민등록번호를 확인해주세요')
    //   return
    // }
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'C' && await handleVerifyCorpNum(biddingForm.bidCorpNum1[stepNum - 1] + biddingForm.bidCorpNum2[stepNum - 1] + biddingForm.bidCorpNum3[stepNum - 1]) === false) {
    //   alert('사업자등록번호를 확인해주세요')
    //   return
    // }
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'C' && handleVerifyCorpReiNum(biddingForm.bidCorpRegiNum1[stepNum - 1] + biddingForm.bidCorpRegiNum2[stepNum - 1]) === false) {
    //   alert('법인등록번호를 확인해주세요')
    //   return
    // }
    // if (handleVerifyPhone(biddingForm.bidPhone1[stepNum - 1] + biddingForm.bidPhone2[stepNum - 1] + biddingForm.bidPhone3[stepNum - 1]) === false) {
    //   alert('전화번호를 확인해주세요')
    //   return
    // }
    if (isOpen === false) {
      try {
        await handleNextStepNew(stepNum)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setValue(name, value, { shouldValidate: true })
  }
  return (
    <div className={`flex w-[100%] h-[100vh] bg-mybg justify-center relative overflow-y-auto`}>
      {loading && (
        <Spinner />
      )}
      <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
        <div className='flex flex-col justify-center items-center md:w-[550px] w-[100%]'>
          <div className="flex flex-col flex-wrap justify-center items-center pt-[50px] md:gap-[14px] gap-[5px]">
            <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%]">
              {stepNum === 1 ? "입찰자(본인)" : "본인 외 "} 정보를 입력해주세요
            </span>
            {biddingForm.bidderNum > 1 && (
              <span className="md:text-[20px] text-[15px] font-light font-['suit'] not-italic leading-[140%] tracking-[-1%] text-sutTitle">
                {`(${stepNum} / ${biddingForm.bidderNum})`}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row md:w-[550px] w-[90%] justify-center items-center gap-[25px]">
          <div className='flex flex-row gap-[5px]'>
            <input 
              name='bidderType'
              checked={biddingForm.bidCorpYn[stepNum - 1] === 'I'}
              className='cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue'
              type='radio'
              onChange={() => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidCorpYn
                  temp[stepNum - 1] = 'I'
                  return { ...prev, bidCorpYn: temp }
                })
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] ml-1">
                개인
              </span>
            </label>
          </div>
          <div className='flex flex-row gap-[5px]'>
            <input 
              checked={biddingForm.bidCorpYn[stepNum - 1] === 'C'}
              name='bidderType'
              className='cursor-pointer w-[20px] h-[20px] mt-1 accent-myBlue'
              type='radio'
              onChange={() => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidCorpYn
                  temp[stepNum - 1] = 'C'
                  return { ...prev, bidCorpYn: temp }
                })
              }}
            />
            <label>
              <span className="md:text-[20px] text-[16px] font-normal font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] ml-1">
                법인
              </span>
            </label>
          </div>
        </div>

        {/* 입력정보 */}
        <BidderFormProps 
          stepNum={stepNum}
          register={register}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setError={setError}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setFocus={setFocus}
          setStepNum={setStepNum}
          setValue={setValue}
        />
      </div>
    </div>
  )
}
