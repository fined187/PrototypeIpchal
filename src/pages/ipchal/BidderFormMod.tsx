import { biddingInfoState, stepState } from "@/atom"
import SearchAddress from "@/components/SearchAddress"
import Spinner from "@/components/Spinner"
import { BiddingInfoType } from "@/model/IpchalType"
import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia"
import { useRecoilState } from "recoil"

type BiddersProps = {
  address: string
  bidderType: string
  companyNo: string | null
  corporationNo: string | null
  job: string | null
  name: string
  peopleSeq: number
  phoneNo: string
  share: any
}

export default function BidderFormMod2() {
  //  엔터키 입력 시 주소창 오픈 막기
  if (typeof window === 'undefined') return null
  window.document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  })
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [stepNum, setStepNum] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [passwordActive, setPasswordActive] = useState(false)

  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)   //  전역 상태에서 저장하는 값
  const [bidderList, setBidderList] = useState<BiddersProps[] | null>(null)          //  입찰자 정보(서버에서 받아온 값)

   // 초기 컴포넌트 마운트 시 서버에 저장된 입찰자 정보를 불러온다.
  const handleGetBidders = async () => {
    if (biddingForm.bidderNum === 1 && biddingForm.agentYn === 'Y') {
      setBiddingForm((prev: any) => {
        return {
          ...prev,
          mandates: {
            mandateYn: 'Y',
            name: biddingForm.bidName[0],
            peopleSeq: 1
          }
        }
      })
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`)
      console.log(response.data.data.bidders)
      if (response.status === 200) {
        setBidderList(response.data.data.bidders)
        if (biddingForm.bidderNum > response.data.data.bidders.length) {
          //  입찰자 수가 서버에 저장된 입찰자 수보다 많을 경우
          console.log(biddingForm)
          console.log('여기로 들어옴')
          setBiddingForm((prev: any) => {
            const temp1 = prev.bidName
            const temp2 = prev.bidPhone1
            const temp3 = prev.bidPhone2
            const temp4 = prev.bidPhone3
            const temp5 = prev.bidIdNum1
            const temp6 = prev.bidIdNum2
            const temp7 = prev.bidAddr
            const temp8 = prev.bidAddrDetail
            const temp9 = prev.bidCorpNum1
            const temp10 = prev.bidCorpNum2
            const temp11 = prev.bidCorpNum3
            const temp12 = prev.bidCorpRegiNum1
            const temp13 = prev.bidCorpRegiNum2
            const temp14 = prev.bidCorpYn
            const temp15 = prev.bidJob
            for (let i = biddingForm.bidName.length; i < biddingForm.bidderNum; i++) {
              temp1.push('')
              temp2.push('')
              temp3.push('')
              temp4.push('')
              temp5.push('')
              temp6.push('')
              temp7.push('')
              temp8.push('')
              temp9.push('')
              temp10.push('')
              temp11.push('')
              temp12.push('')
              temp13.push('')
              temp14.push('I')
              temp15.push('')
            }
            return {
              ...prev,
              bidName: temp1,
              bidPhone1: temp2,
              bidPhone2: temp3,
              bidPhone3: temp4,
              bidIdNum1: temp5,
              bidIdNum2: temp6,
              bidAddr: temp7,
              bidAddrDetail: temp8,
              bidCorpNum1: temp9,
              bidCorpNum2: temp10,
              bidCorpNum3: temp11,
              bidCorpRegiNum1: temp12,
              bidCorpRegiNum2: temp13,
              bidCorpYn: temp14,
              bidJob: temp15,
            }
          })
        } else if (biddingForm.bidderNum < response.data.data.bidders.length) {
          //  입찰자 수가 서버에 저장된 입찰자 수보다 적을 경우 => 입찰자 수 감소
          setBiddingForm((prev: any) => {
            const temp1 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.name)
            const temp2 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(0, 3) : bidder.phoneNo.slice(0, 2))
            const temp3 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(3, 7) : bidder.phoneNo.slice(2, 6))
            const temp4 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(7, 11) : bidder.phoneNo.slice(6, 10))
            const temp5 = prev.bidIdNum1.slice(0, response.data.data.bidders.length)
            const temp6 = prev.bidIdNum2.slice(0, response.data.data.bidders.length)
            const temp7 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.address)
            const temp8 = prev.bidAddrDetail.slice(0, response.data.data.bidders.length)
            const temp9 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(0, 3) || '')
            const temp10 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(3, 5) || '')
            const temp11 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(5, 10) || '')
            const temp12 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.corporationNo?.slice(0, 6) || '')
            const temp13 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.corporationNo?.slice(6, 13) || '')
            const temp14 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.bidderType)
            const temp15 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.job || '')
            temp1.splice(biddingForm.bidderNum, response.data.data.length)
            temp2.splice(biddingForm.bidderNum, response.data.data.length)
            temp3.splice(biddingForm.bidderNum, response.data.data.length)
            temp4.splice(biddingForm.bidderNum, response.data.data.length)
            temp5.splice(biddingForm.bidderNum, response.data.data.length)
            temp6.splice(biddingForm.bidderNum, response.data.data.length)
            temp7.splice(biddingForm.bidderNum, response.data.data.length)
            temp8.splice(biddingForm.bidderNum, response.data.data.length)
            temp9.splice(biddingForm.bidderNum, response.data.data.length)
            temp10.splice(biddingForm.bidderNum, response.data.data.length)
            temp11.splice(biddingForm.bidderNum, response.data.data.length)
            temp12.splice(biddingForm.bidderNum, response.data.data.length)
            temp13.splice(biddingForm.bidderNum, response.data.data.length)
            temp14.splice(biddingForm.bidderNum, response.data.data.length)
            temp15.splice(biddingForm.bidderNum, response.data.data.length)
            return {
              ...prev,
              bidName: temp1,
              bidPhone1: temp2,
              bidPhone2: temp3,
              bidPhone3: temp4,
              bidIdNum1: temp5,
              bidIdNum2: temp6,
              bidAddr: temp7,
              bidAddrDetail: temp8,
              bidCorpNum1: temp9,
              bidCorpNum2: temp10,
              bidCorpNum3: temp11,
              bidCorpRegiNum1: temp12,
              bidCorpRegiNum2: temp13,
              bidCorpYn: temp14,
              bidJob: temp15,
            }
          })
        } else {
          //  입찰자 수가 서버에 저장된 입찰자 수와 같을 경우
          setBiddingForm((prev: any) => {
            const temp1 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.name) ?? prev.bidName
            const temp2 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(0, 3) : bidder.phoneNo.slice(0, 2)) ?? prev.bidPhone1
            const temp3 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(3, 7) : bidder.phoneNo.slice(2, 6)) ?? prev.bidPhone2
            const temp4 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.phoneNo.length > 10 ? bidder.phoneNo.slice(7, 11) : bidder.phoneNo.slice(6, 10)) ?? prev.bidPhone3
            const temp5 = prev.bidIdNum1 ?? prev.bidIdNum1
            const temp6 = prev.bidIdNum2 ?? prev.bidIdNum2
            const temp7 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.address) ?? prev.bidAddr
            const temp8 = prev.bidAddrDetail ?? ""
            const temp9 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(0, 3) || '') ?? prev.bidCorpNum1
            const temp10 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(3, 5) || '') ?? prev.bidCorpNum2
            const temp11 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.companyNo?.slice(5, 10) || '') ?? prev.bidCorpNum3
            const temp12 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.corporationNo?.slice(0, 6) || '') ?? prev.bidCorpRegiNum1
            const temp13 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.corporationNo?.slice(6, 13) || '') ?? prev.bidCorpRegiNum2
            const temp14 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.bidderType) ?? prev.bidCorpYn
            const temp15 = response.data.data.bidders.map((bidder: BiddersProps) => bidder.job || '') ?? prev.bidJob
            return {
              ...prev,
              bidName: temp1,
              bidPhone1: temp2,
              bidPhone2: temp3,
              bidPhone3: temp4,
              bidIdNum1: temp5,
              bidIdNum2: temp6,
              bidAddr: temp7,
              bidAddrDetail: temp8,
              bidCorpNum1: temp9,
              bidCorpNum2: temp10,
              bidCorpNum3: temp11,
              bidCorpRegiNum1: temp12,
              bidCorpRegiNum2: temp13,
              bidCorpYn: temp14,
              bidJob: temp15,
            }
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetBidders()
  }, [])

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BiddingInfoType>()
  
  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderPhone1') {
      setFocus('bidderPhone2')
    } else if (target.value.length === 4 && target.id === 'bidderPhone2') {
      setFocus('bidderPhone3')
    }
  }

  const handleCorpNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 3 && target.id === 'bidderCorpNum1') {
      setFocus('bidderCorpNum2')
    } else if (target.value.length === 2 && target.id === 'bidderCorpNum2') {
      setFocus('bidderCorpNum3')
    }
  }

  const handleCorpRegiNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderCorpRegiNum1') {
      setFocus('bidderCorpRegiNum2')
    }
  }

  const handleIdNumFocusMove = (target: HTMLInputElement) => {
    if (target.value.length === 6 && target.id === 'bidderIdNum1') {
      setFocus('bidderIdNum2')
    }
  }

  const handleRegisterMandate = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/mandates`, {
        bidderCount: biddingForm.bidderNum,
        mandates: biddingForm.mandates
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 200) {
        
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  수정 사항 반영
  const handleBidderFormUpdate = async () => {
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
  //  새로운 입찰자 추가
  const handleBidderFormSave = async () => {
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

  //  다음 단계로 이동
  const handleNextStep = async () => {
    handleUpdateIdNum(stepNum - 1)
    try {
      if (biddingForm.bidderNum === 1) {
        if (biddingForm.bidderNum > (bidderList?.length!)) {    //  서버에 저장된 입찰자 수보다 많을 경우 => 아직 서버에 저장을 하지 못한 경우
          if (biddingForm.agentYn === 'Y') {
            await handleBidderFormSave()
            await handleRegisterMandate()
            setStateNum(9)
          } else {
            await handleBidderFormSave()
            setStateNum(9)
          }
        } else if (biddingForm.bidderNum < (bidderList?.length!)) {    //  서버에 저장된 입찰자 수보다 적을 경우 => 서버에 저장된 입찰자 수를 줄여야 하는 경우
          if (biddingForm.agentYn === 'Y') {
            await handleBidderFormUpdate()
            await handleRegisterMandate()
            setStateNum(9)
          } else {
            await handleBidderFormUpdate()
            setStateNum(9)
          }
        } else {
          if (biddingForm.agentYn === 'Y') {
            await handleBidderFormUpdate()
            await handleRegisterMandate()
            setStateNum(9)
          } else {
            await handleBidderFormUpdate()
            setStateNum(9)
          }
        }
      } else {
        if (biddingForm.bidderNum > bidderList?.length!) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormSave()
              await handleRegisterMandate()
              setStateNum(19)
            } else {
              if (stepNum > bidderList?.length!) {
                await handleBidderFormSave()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } 
            }
          } else {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormSave()
              setStateNum(8)
            } else {
              if (stepNum > bidderList?.length!) {
                console.log('여기로 들어옴1')
                await handleBidderFormSave()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        } else if (biddingForm.bidderNum < bidderList?.length!) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormUpdate()
              await handleRegisterMandate()
              setStateNum(19)
            } else {
              if (stepNum > biddingForm.bidderNum) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          } else {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormUpdate()
              setStateNum(8)
            } else {
              if (stepNum > biddingForm.bidderNum) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        } else if (biddingForm.bidderNum == bidderList?.length!) {
          if (biddingForm.agentYn === 'Y') {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormUpdate()
              await handleRegisterMandate()
              setStateNum(19)
            } else {
              if (stepNum > biddingForm.bidderNum) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          } else {
            if (stepNum === biddingForm.bidderNum) {
              await handleBidderFormUpdate()
              setStateNum(8)
            } else {
              if (stepNum > biddingForm.bidderNum) {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              } else {
                await handleBidderFormUpdate()
                setStepNum(stepNum + 1)
                reset()
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit: SubmitHandler<BiddingInfoType> = async () => {
    if (isOpen === false) {
      try {
        await handleNextStep()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUpdateIdNum = (index: number) => {
    setBiddingForm((prev: any) => {
      const newBidIdNum = [...prev.bidIdNum]
      const newBidderType = [...prev.bidCorpYn]
      //  현재 스텝의 입찰자가 기업일 경우 + 현재 스텝의 주민등록번호가 빈 값이 아닐 경우 ==> 싱크 안맞으므로 해당 배열의 인덱스의 주민등록번호 초기화
      if (newBidderType[index] === 'C' && newBidIdNum[index] !== '') {
        newBidIdNum.splice(index, 1, '')
      } else if (newBidderType[index + 1] === 'C' && newBidIdNum[index + 1] !== '') {
        //  다음 스텝의 입찰자가 기업일 경우 + 다음 스텝의 주민등록번호가 빈 값이 아닐 경우 ==> 싱크 안맞으므로 해당 배열의 인덱스의 주민등록번호 초기화
        newBidIdNum.splice(index + 1, 1, '')
      } else if (newBidderType[index + 1] === undefined && newBidIdNum[index + 1] !== '') {
        //  다음 스텝이 없을 경우 + 다음 스텝의 주민등록번호가 빈 값이 아닐 경우 ==> 싱크 안맞으므로 해당 배열의 인덱스의 주민등록번호 초기화
        newBidIdNum.splice(index + 1, 1, '')
      }
      return { ...prev, bidIdNum: newBidIdNum }
    })
  }
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setValue(name, value, { shouldValidate: true })
  }

  return (
    <div className={`flex w-[100%] h-[100vh] bg-mybg justify-center relative overflow-y-auto`} style={{
      zIndex: 1
    }}>
      {loading && (
        <Spinner />
      )}
        <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
          <div className='flex flex-col justify-center items-center md:w-[550px] w-[100%]'>
            <div className="flex flex-col flex-wrap justify-center items-center pt-[50px] md:gap-[14px] gap-[5px]">
              <span className="md:text-[32.5px] text-[20px] font-bold font-['suit'] not-italic">
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
                checked={biddingForm.bidCorpYn[stepNum - 1] === 'I' ? true : false}
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
                checked={biddingForm.bidCorpYn[stepNum - 1] === 'C' ? true : false}
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
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:w-[550px] w-[80%] h-[60%] justify-center items-center overflow-y-auto overflow-x-hidden relative'>
            <div className="flex flex-col w-[100%] h-[100%] gap-2">
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                {
                  (errors.bidderName?.type == "required")  ?
                  (<div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="bidderName"
                      className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                    >
                      {errors.bidderName?.message}
                    </label>
                  </div>
                ) : 
                (errors.bidderName?.type == "minLength") && (biddingForm.bidName[stepNum - 1].length < 2) ? (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="bidderName"
                        className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                      >
                        {errors.bidderName?.message}
                      </label>
                    </div>
                  ) : 
                  (errors.bidderName?.type == "maxLength") && (biddingForm.bidName[stepNum - 1].length > 10) ? (
                    <div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="bidderName"
                        className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500"
                      >
                        {errors.bidderName?.message}
                      </label>
                    </div>
                  ) :
                (
                  <div className='flex flex-row'>
                    <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
                      성명
                    </span>
                    <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                      *
                    </span>
                  </div>
                )}
                </div>
                <input
                  {...register("bidderName", {
                    required: "이름을 입력해주세요",
                    minLength: {
                      value: 2,
                      message: '2글자 이상 입력해주세요',
                    },
                    maxLength: {
                      value: 10,
                      message: '10글자 이하로 입력해주세요',
                    }
                  })}
                  maxLength={10}
                  value={biddingForm.bidName[stepNum - 1] || ''}
                  id="bidderName"
                  type="text"
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left h-[40px] px-2 leading-[135%] tracking-[-2%]"
                  placeholder="입찰자 성명을 입력해주세요"
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidName
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidName: temp }
                    })
                    handleInputChange(e)
                  }}
                />
              </div>
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                  {(errors.bidderPhone1?.type === 'required' ||
                    errors.bidderPhone2?.type === 'required' ||
                    errors.bidderPhone3?.type === 'required') && (biddingForm.bidPhone1[stepNum - 1] === ''|| biddingForm.bidPhone2[stepNum - 1] === ''|| biddingForm.bidPhone3[stepNum - 1] === '') ? (
                    <div className="flex w-[100%] justify-start">
                      <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                        전화번호를 입력해주세요
                      </span>
                    </div>
                  ) : (
                    <div className='flex flex-row justify-start w-[100%]'>
                      <label
                        htmlFor="bidderPhone"
                        className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                      >
                        전화번호
                      </label>
                      <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                        *
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-[0.5%]">
                  <input
                    {...register('bidderPhone1', { required: true })}
                    id="bidderPhone1"
                    name="bidderPhone1"
                    inputMode="numeric"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    type="text"
                    maxLength={3}
                    placeholder="010"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] leading-[135%] tracking-[-2%] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone1[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone1
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone1: temp }
                      })
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone
                        temp[stepNum - 1] = e.target.value + biddingForm.bidPhone2[stepNum - 1] + biddingForm.bidPhone3[stepNum - 1]
                        return { ...prev, bidPhone: temp }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                  <input
                    {...register('bidderPhone2', {
                      required: true,
                      maxLength: 4,
                    })}
                    type="text"
                    id="bidderPhone2"
                    inputMode="numeric"
                    name="bidderPhone2"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="1234"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone2[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone2
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone2: temp }
                      })
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone
                        temp[stepNum - 1] = biddingForm.bidPhone1[stepNum - 1] + e.target.value + biddingForm.bidPhone3[stepNum - 1]
                        return { ...prev, bidPhone: temp }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                  <input
                    {...register('bidderPhone3', {
                      required: true,
                      maxLength: 4,
                    })}
                    type="text"
                    id="bidderPhone3"
                    inputMode="numeric"
                    name="bidderPhone3"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="5678"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone3[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone3
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone3: temp }
                      })
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone
                        temp[stepNum - 1] = biddingForm.bidPhone1[stepNum - 1] + biddingForm.bidPhone2[stepNum - 1] + e.target.value
                        return { ...prev, bidPhone: temp }
                      })
                      handlePhoneFocusMove(e.target)
                      handleInputChange(e)
                    }}
                  />
                </div>
              </div>
              {biddingForm.bidCorpYn[stepNum - 1] === 'I' ? (
                <>
                  <div className={`${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'flex' : 'hidden'} flex-col w-[100%] gap-1`}>
                    <div className='flex justify-between w-[100%]'>
                      {errors.bidderIdNum1?.type === 'required' &&
                          errors.bidderIdNum2?.type === 'required' && 
                          (biddingForm.bidIdNum[stepNum - 1] === '' || biddingForm.bidIdNum[stepNum - 1] === undefined) ? (
                          <div className="flex w-[100%] justify-start h-[15px] mb-1">
                            <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                              주민등록번호를 입력해주세요
                            </span>
                          </div>
                        ) :
                        (
                          <div className='flex flex-row justify-between w-[100%]'>
                            <div className='flex flex-row justify-start'>
                              <label htmlFor="bidIdNum" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                                주민등록번호
                              </label>
                              <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                                *
                              </span>
                            </div>
                            <div>
                              <span className="hidden md:flex md:text-[15px] text-[0.8rem] font-light leading-[135%] tracking-[-3%] font-['suit'] not-italic text-left text-red-500">
                                주민등록번호는 별도로 저장되지 않습니다
                              </span>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="flex flex-row gap-[5%] relative">
                      <input
                        {...register('bidderIdNum1', {
                          required: true,
                          maxLength: 6,
                        })}
                        id="bidderIdNum1"
                        inputMode="numeric"
                        name="bidderIdNum1"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        type="text"
                        maxLength={6}
                        className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                        value={biddingForm.bidIdNum1[stepNum - 1] ?? ''}
                        onChange={(e) => {
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidIdNum1
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidIdNum1: temp }
                          })
                          setBiddingForm((prev: any) => {
                            const temp = prev.bidIdNum
                            temp[stepNum - 1] = e.target.value + biddingForm.bidIdNum2[stepNum - 1]
                            return { ...prev, bidIdNum: temp }
                          })
                          handleIdNumFocusMove(e.target)
                          handleInputChange(e)
                        }}
                      />
                      <span className="flex text-mygray font-['suit'] font-bold mt-1">
                        -
                      </span>
                        <input
                          {...register('bidderIdNum2', { required: true, maxLength: 7})}
                          id="bidderIdNum2"
                          inputMode="numeric"
                          name="bidderIdNum2"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          type={`${!passwordActive ? 'password' : 'text'}`}
                          maxLength={7}
                          className="flex justify-center items-center border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[150%] tracking-[-1%] font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
                          value={biddingForm.bidIdNum2[stepNum - 1] ?? ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidIdNum2
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidIdNum2: temp }
                            })
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidIdNum
                              temp[stepNum - 1] =
                                biddingForm.bidIdNum1[stepNum - 1] +
                                e.target.value
                              return { ...prev, bidIdNum: temp }
                            })
                            handleInputChange(e)
                          }}
                        />
                        <div className="flex items-center absolute rigth-0 top-[10px] md:left-[95%] left-[93%] md:w-[10%] w-[15%] cursor-pointer"
                          onClick={() => setPasswordActive(!passwordActive)}
                          style={{
                            zIndex:10
                          }}
                        >
                          {passwordActive ? (
                            <LiaEyeSolid className="cursor-pointer" />
                          ) : (
                            <LiaEyeSlashSolid className="cursor-pointer" />
                          )}
                        </div>
                      </div>
                    </div>
                </>
                ) : (
                  <>
                    <div className={`${biddingForm.bidCorpYn[stepNum - 1] === 'C' ? 'flex' : 'hidden'} flex-col w-[100%] gap-1`}>
                      <div className='flex justify-between w-[100%]'>
                        {(errors.bidderCorpNum1?.type === 'required' ||
                          errors.bidderCorpNum2?.type === 'required' ||
                          errors.bidderCorpNum3?.type === 'required') && 
                          (biddingForm.bidCorpNum1[stepNum - 1] === '' || biddingForm.bidCorpNum2[stepNum - 1] === '' || biddingForm.bidCorpNum3[stepNum - 1] === '') ? (
                          <div className="flex w-[100%] justify-start mb-1">
                            <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                              사업자등록번호를 입력해주세요
                            </span>
                          </div>
                        ) : (
                          <div className='flex flex-row justify-start w-[100%]'>
                            <label htmlFor="bidCorpNum" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                              사업자 등록번호
                            </label>
                            <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                              *
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row gap-[5%]">
                        <input
                          {...register('bidderCorpNum1', {
                            required: true,
                            maxLength: 3,
                          })}
                          type="text"
                          placeholder="123"
                          id="bidderCorpNum1"
                          inputMode="numeric"
                          name="bidderCorpNum1"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={3}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum1[stepNum - 1] ?? ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum1
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum1: temp }
                            })
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum
                              temp[stepNum - 1] = e.target.value + biddingForm.bidCorpNum2[stepNum - 1] + biddingForm.bidCorpNum3[stepNum - 1]
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                        <span className="flex text-mygray font-['suit'] font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum2', {
                            required: true,
                            maxLength: 2,
                          })}
                          type="text"
                          placeholder="45"
                          id="bidderCorpNum2"
                          inputMode="numeric"
                          name="bidderCorpNum2"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={2}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum2[stepNum - 1] ?? ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum2
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum2: temp }
                            })
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum
                              temp[stepNum - 1] = biddingForm.bidCorpNum1[stepNum - 1] + e.target.value + biddingForm.bidCorpNum3[stepNum - 1]
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                            handleInputChange(e)
                          }}
                        />
                        <span className="flex text-mygray font-['suit'] font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum3', {
                            required: true,
                            maxLength: 5,
                          })}
                          type="text"
                          placeholder="67890"
                          id="bidderCorpNum3"
                          inputMode="numeric"
                          name="bidderCorpNum3"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={5}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum3[stepNum - 1] ?? ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum3
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum3: temp }
                            })
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum
                              temp[stepNum - 1] = biddingForm.bidCorpNum1[stepNum - 1] + biddingForm.bidCorpNum2[stepNum - 1] + e.target.value
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                            handleInputChange(e)
                          }}
                        />
                      </div>
                      <div className="flex flex-col w-[100%] gap-1 mt-1">
                        <div className='flex justify-between w-[100%]'>
                          {(errors.bidderCorpRegiNum1?.type === 'required' ||
                            errors.bidderCorpRegiNum2?.type === 'required') &&
                              (biddingForm.bidCorpRegiNum1[stepNum - 1] === '' || biddingForm.bidCorpRegiNum2[stepNum - 1] === '') ? 
                            (
                            <div className="flex flex-row w-[100%] justify-start mb-1">
                              <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                                법인 등록번호를 입력해주세요
                              </span>
                            </div>
                          ) : (
                            <div className='flex flex-row justify-start w-[100%]'>
                              <label
                                htmlFor="bidCorpRegiNum"
                                className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left"
                              >
                                법인 등록번호
                              </label>
                              <span className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left text-red-500">
                                *
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row gap-[5%]">
                          <input
                            {...register('bidderCorpRegiNum1', {
                              required: true,
                              maxLength: 6,
                            })}
                            type="text"
                            inputMode="numeric"
                            name="bidderCorpRegiNum1"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1')
                            }}
                            maxLength={6}
                            id="bidderCorpRegiNum1"
                            placeholder="123456"
                            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                            value={biddingForm.bidCorpRegiNum1[stepNum - 1] || ''}
                            onChange={(e) => {
                              setBiddingForm((prev: any) => {
                                const temp = prev.bidCorpRegiNum1
                                temp[stepNum - 1] = e.target.value
                                return { ...prev, bidCorpRegiNum1: temp }
                              })
                              setBiddingForm((prev: any) => {
                                const temp = prev.bidCorpRegiNum
                                temp[stepNum - 1] = e.target.value + biddingForm.bidCorpRegiNum2[stepNum - 1]
                                return { ...prev, bidCorpRegiNum: temp }
                              })
                              handleCorpRegiNumFocusMove(e.target)
                              handleInputChange(e)
                            }}
                          />
                          <span className="flex text-mygray font-['suit'] font-bold mt-1">
                            -
                          </span>
                          <input
                            {...register('bidderCorpRegiNum2', {
                              required: true,
                              maxLength: 7,
                            })}
                            type="text"
                            inputMode="numeric"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1')
                            }}
                            maxLength={7}
                            id="bidderCorpRegiNum2"
                            name="bidderCorpRegiNum2"
                            placeholder="1234567"
                            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                            value={biddingForm.bidCorpRegiNum2[stepNum - 1] ?? ''}
                            onChange={(e) => {
                              setBiddingForm((prev: any) => {
                                const temp = prev.bidCorpRegiNum2
                                temp[stepNum - 1] = e.target.value
                                return { ...prev, bidCorpRegiNum2: temp }
                              })
                              setBiddingForm((prev: any) => {
                                const temp = prev.bidCorpRegiNum
                                temp[stepNum - 1] = biddingForm.bidCorpRegiNum1[stepNum - 1] + e.target.value
                                return { ...prev, bidCorpRegiNum: temp }
                              })
                              handleInputChange(e)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
              <div className={`flex flex-col w-[100%] h-[60px] bg-mybg gap-1 relative`}>
                {biddingForm.agentYn === 'Y' && (
                  <div className="flex flex-col w-[100%] gap-1">
                    <div className='flex justify-between w-[100%]'>
                      <div className='flex flex-row justify-start w-[100%]'>
                        <label htmlFor="bidderJob" className="md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left">
                          직업
                        </label>
                      </div>
                    </div>
                    <input
                      value={biddingForm.bidJob[stepNum - 1] || ''}
                      id="bidderJob"
                      maxLength={10}
                      name="bidderJob"
                      type="text"
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold leading-[135%] tracking-[-2%] font-['suit'] not-italic text-left h-[40px] px-2"
                      placeholder="직업을 입력해주세요(예: 회사원, 농부)"
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidJob
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidJob: temp }
                        })
                      }}
                    />
                  </div>
                )}
                <SearchAddress 
                  stepNum={stepNum}
                  register={register}
                  errors={errors}
                  setError={setError}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  setValue={setValue}
                />
              </div>
            </div>
            <div className={`flex flex-row fixed gap-[10px] md:w-[550px] w-[90%] ${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'md:bottom-[80px] bottom-[10px]' : 'md:bottom-[80px] bottom-[10px]'}`}>
              <button
                type="button"
                className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
                onClick={() => {
                  stepNum === 1 ? setStateNum(6) : setStepNum((prev) => prev - 1)
                }}
              >
                <span className="text-sutTitle font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  이전으로
                </span>
              </button>
              <button
                type="submit"
                className="flex w-[60%] md:w-[65%] h-[50px] bg-myBlue rounded-full justify-center items-center cursor-pointer"
              >
                <span className="text-white font-bold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  다음으로
                </span>
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}