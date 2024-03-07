import { biddingInfoState, stepState } from "@/atom"
import SearchAddress from "@/components/SearchAddress"
import Spinner from "@/components/Spinner"
import { BiddingInfoType } from "@/interface/IpchalType"
import { getBidders } from "@/remote/bidders"
import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia"
import { useQuery } from "react-query"
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
  const [biddingInfo, setBiddingInfo] = useState<BiddingInfoType>({       //  입찰자 정보 초기화(입찰자 수만큼 배열 생성)
    bidderName: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderPhone1: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderPhone2: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderPhone3: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderIdNum1: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderIdNum2: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderAddr: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderAddrDetail: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpNum1: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpNum2: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpNum3: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum1: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpRegiNum2: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
    bidderCorpYn: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill('I'),
    bidderJob: Array(isNaN(biddingForm.bidderNum) ? 0 : biddingForm.bidderNum).fill(''),
  })

   // 초기 컴포넌트 마운트 시 서버에 저장된 입찰자 정보를 불러온다.
  useEffect(() => {
    const handleGetBidders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`)
        if (response.status === 200) {
          setBidderList(response.data.data)
          if (biddingForm.bidderNum > response.data.data.length) {
            //  입찰자 수가 서버에 저장된 입찰자 수보다 많을 경우
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
              for (let i = response.data.data.length; i < biddingForm.bidderNum; i++) {
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
          } else if (biddingForm.bidderNum < response.data.data.length) {
            //  입찰자 수가 서버에 저장된 입찰자 수보다 적을 경우 => 입찰자 수 감소
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
              for (let i = response.data.data.length; i > biddingForm.bidderNum; i--) {
                temp1.pop()
                temp2.pop()
                temp3.pop()
                temp4.pop()
                temp5.pop()
                temp6.pop()
                temp7.pop()
                temp8.pop()
                temp9.pop()
                temp10.pop()
                temp11.pop()
                temp12.pop()
                temp13.pop()
                temp14.pop()
                temp15.pop()
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
          } else {
            //  입찰자 수가 서버에 저장된 입찰자 수와 같을 경우
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
    handleGetBidders()
  }, [])
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
        console.log("여기1")
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/${stepNum}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          job: biddingForm.agentYn === 'Y' ? biddingForm?.bidJob[stepNum - 1] : null,
          name: biddingForm?.bidName[stepNum - 1],
          phoneNo: biddingForm?.bidPhone[stepNum - 1],
        })
        if (response.status === 200) {
          return
        }
      } else if (biddingForm?.bidCorpYn[stepNum - 1] === 'C') {
        console.log("여기2")
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/${stepNum}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          companyNo: biddingForm?.bidCorpNum[stepNum - 1],
          corporationNo: biddingForm?.bidCorpRegiNum[stepNum - 1],
          job: biddingForm.agentYn === 'Y' ? biddingForm?.bidJob[stepNum - 1] : null,
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
  //  입찰자 정보 저장
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
            job: biddingForm.bidJob[stepNum - 1],
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
        if (biddingForm.agentYn === 'Y' && biddingForm.bidderNum <= bidderList?.length!) {
          //  1. 입찰자 수가 1명이고, 대리입찰자가 있고, 서버에 저장된 입찰자 수보다 적을 경우
          await handleBidderFormUpdate()
          setStateNum(19)
        } else if (biddingForm.agentYn !== 'Y' && biddingForm.bidderNum <= bidderList?.length!) {
          //  2. 입찰자 수가 1명이고, 대리입찰자가 없고, 서버에 저장된 입찰자 수보다 적을 경우
          await handleBidderFormUpdate()
          setStateNum(9)
        } else {
          //  3. 입찰자 수가 1명이고, 서버에 저장된 입찰자 수보다 많을 경우
          await handleBidderFormSave()
          setStateNum(9)
        }
      } else {
        if (biddingForm.agentYn === 'Y' && biddingForm.bidderNum > bidderList?.length!) {
          //  4. 입찰자 수가 2명 이상이고, 대리입찰자가 있고, 서버에 저장된 입찰자 수보다 증가된 경우
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
        } else if (biddingForm.agentYn !== 'Y' && biddingForm.bidderNum > bidderList?.length!) {
          //  5. 입찰자 수가 2명 이상이고, 대리입찰자가 없고, 서버에 저장된 입찰자 수보다 증가된 경우
          if (stepNum === biddingForm.bidderNum) {
            await handleBidderFormSave()
            setStateNum(8)
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
        } else if (biddingForm.agentYn === 'Y' && biddingForm.bidderNum < bidderList?.length!) {
          //  6. 입찰자 수가 2명 이상이고, 대리입찰자가 있고, 서버에 저장된 입찰자 수보다 감소된 경우
          if (stepNum === biddingForm.bidderNum) {
            await handleBidderFormUpdate()
            await handleRegisterMandate()
            setStateNum(19)
          } else {
            await handleBidderFormUpdate()
            setStepNum(stepNum + 1)
          }
        } else if (biddingForm.agentYn !== 'Y' && biddingForm.bidderNum < bidderList?.length!) {
          //  7. 입찰자 수가 2명 이상이고, 대리입찰자가 없고, 서버에 저장된 입찰자 수보다 감소된 경우
          if (stepNum === biddingForm.bidderNum) {
            await handleBidderFormUpdate()
            setStateNum(8)
          } else {
            await handleBidderFormUpdate()
            setStepNum(stepNum + 1)
          }
        } else {
          //  8. 입찰자 수가 2명 이상이고, 서버에 저장된 입찰자 수와 같은 경우
          if (stepNum === biddingForm.bidderNum) {
            if (biddingForm.agentYn === 'Y') {
              console.log("여기!!")
              await handleBidderFormUpdate()
              await handleRegisterMandate()
              setStateNum(19)
            } else {
              console.log("여기!!!")
              await handleBidderFormUpdate()
              setStateNum(8)
            }
          } else {
            console.log("여기!")
            await handleBidderFormUpdate()
            setStepNum(stepNum + 1)
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

  return (
    <div className={`flex w-[100%] h-[100vh] bg-mybg justify-center relative overflow-y-auto`} style={{
      zIndex: 1
    }}>
      {loading && (
        <Spinner />
      )}
        <div className="flex flex-col gap-4 w-[100%] h-[100%] bg-mybg items-center text-center relative">
          <div className='flex flex-col justify-center items-center md:w-[550px] w-[100%]'>
            <div className="flex flex-col flex-wrap justify-center items-center pt-[50px]">
              <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-['suit'] not-italic leading-8">
                {stepNum === 1 ? "입찰자(본인)" : "본인 외 "} 정보를 입력해주세요
              </span>
              {biddingForm.bidderNum > 1 && (
                <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-['suit'] not-italic leading-8 ml-2">
                  {`(${stepNum} / ${biddingForm.bidderNum})`}
                </span>
              )}
            </div>
            <div className='flex'>
              <span className="md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                (* 표시는 필수 입력사항입니다.)
              </span>
            </div>
          </div>
          <div className="flex flex-row md:w-[550px] w-[90%] justify-center items-center gap-[25px]">
            <div className='flex flex-row gap-[5px]'>
              <input 
                name='bidderType'
                checked={biddingForm.bidCorpYn[stepNum - 1] === 'I'}
                className='cursor-pointer w-[15px]'
                type='radio'
                onClick={() => {
                  setBiddingInfo((prev: any) => {
                    const temp = prev.bidderCorpYn
                    temp[stepNum - 1] = 'I'
                    return { ...prev, bidderCorpYn: temp }
                  })
                  setBiddingForm((prev: any) => {
                    const temp = prev.bidCorpYn
                    temp[stepNum - 1] = 'I'
                    return { ...prev, bidCorpYn: temp }
                  })
                }}
              />
              <label>
                <span className="md:text-[1.2rem] text-[1rem] font-semibold font-['suit'] not-italic text-left">
                  개인
                </span>
              </label>
            </div>
            <div className='flex flex-row gap-[5px]'>
              <input 
                checked={biddingForm.bidCorpYn[stepNum - 1] === 'C'}
                name='bidderType'
                className='cursor-pointer w-[15px]'
                type='radio'
                onClick={() => {
                  setBiddingInfo((prev: any) => {
                    const temp = prev.bidderCorpYn
                    temp[stepNum - 1] = 'C'
                    return { ...prev, bidderCorpYn: temp }
                  })
                  setBiddingForm((prev: any) => {
                    const temp = prev.bidCorpYn
                    temp[stepNum - 1] = 'C'
                    return { ...prev, bidCorpYn: temp }
                  })
                }}
              />
              <label>
                <span className="md:text-[1.2rem] text-[1rem] font-semibold font-['suit'] not-italic text-left">
                  법인
                </span>
              </label>
            </div>
          </div>
          
          {/* 입력정보 */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:w-[550px] w-[80%] h-[100%] justify-center items-center overflow-y-auto overflow-x-hidden relative'>
            <div className="flex flex-col w-[100%] h-[100%] gap-2">
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                  {(errors.bidderName?.type === 'required') && 
                    (biddingForm.bidName[stepNum - 1]) ?
                    (<div className="flex w-[100%] justify-start">
                      <label
                        htmlFor="bidderName"
                        className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500"
                      >
                        {"입찰자 성명을 입력해주세요"}
                      </label>
                    </div>) : 
                    (
                    <div className='flex flex-row'>
                      <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left">
                        성명
                      </span>
                      <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                        *
                      </span>
                    </div>
                    )
                  }
                </div>
                <input
                  value={biddingForm.bidName[stepNum - 1] || ''}
                  id="bidderName"
                  type="text"
                  className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic text-left h-[40px] px-2"
                  placeholder="입찰자 성명을 입력해주세요"
                  {...register('bidderName', { required: true })}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidName
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidName: temp }
                    })
                    setBiddingInfo((prev) => {
                      const temp = prev.bidderName
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidName: temp }
                    })
                  }}
                />
              </div>
              <div className="flex flex-col w-[100%] gap-1">
                <div className='flex justify-between w-[100%]'>
                  {(errors.bidderPhone1?.type === 'required' ||
                    errors.bidderPhone2?.type === 'required' ||
                    errors.bidderPhone3?.type === 'required') && (biddingForm.bidPhone1[stepNum - 1] === ''|| biddingForm.bidPhone2[stepNum - 1] === ''|| biddingForm.bidPhone3[stepNum - 1] === '') ? (
                    <div className="flex w-[100%] justify-start">
                      <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                        전화번호를 입력해주세요
                      </span>
                    </div>
                  ) : (
                    <div className='flex flex-row justify-start w-[100%]'>
                      <label
                        htmlFor="bidderPhone"
                        className="text-[1rem] font-semibold font-['suit'] not-italic text-left"
                      >
                        전화번호
                      </label>
                      <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
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
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    type="text"
                    maxLength={3}
                    placeholder="010"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone1[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingInfo((prev) => {
                        const temp = prev.bidderPhone1
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone1: temp }
                      })
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
                    }}
                  />
                  <input
                    {...register('bidderPhone2', { required: true })}
                    type="text"
                    id="bidderPhone2"
                    name="bidderPhone2"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="1234"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone2[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingInfo((prev: any) => {
                        const temp = prev.bidderPhone2
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone2: temp }
                      })
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
                    }}
                  />
                  <input
                    {...register('bidderPhone3', { required: true })}
                    type="text"
                    id="bidderPhone3"
                    name="bidderPhone3"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="5678"
                    className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[33%] text-center"
                    value={biddingForm.bidPhone3[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingInfo((prev: any) => {
                        const temp = prev.bidderPhone3
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone3: temp }
                      })
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
                            <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                              주민등록번호를 입력해주세요
                            </span>
                          </div>
                        ) :
                        (
                          <div className='flex flex-row justify-between w-[100%]'>
                            <div className='flex flex-row justify-start'>
                              <label htmlFor="bidIdNum" className="text-[1rem] font-semibold font-['suit'] not-italic text-left">
                                주민등록번호
                              </label>
                              <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                                *
                              </span>
                            </div>
                            <div>
                              <span className="md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                                주민등록번호는 저장되지 않습니다
                              </span>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="flex flex-row gap-[5%] relative">
                      <input
                        {...register('bidderIdNum1', { required: true })}
                        id="bidderIdNum1"
                        name="bidderIdNum1"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        type="text"
                        maxLength={6}
                        className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[45%] text-center"
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
                        }}
                      />
                      <span className="flex text-mygray font-['suit'] font-bold mt-1">
                        -
                      </span>
                      <div className='relative w-[45%] h-[40px]'>
                        <input
                          {...register('bidderIdNum2', { required: true })}
                          id="bidderIdNum2"
                          name="bidderIdNum2"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          type={`${!passwordActive ? 'password' : 'text'}`}
                          maxLength={7}
                          className="flex justify-center items-center border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[100%] text-center"
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
                          }}
                        />
                        <div className="flex justify-center items-center w-[10%] h-[40px] cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
                          onClick={() => setPasswordActive(!passwordActive)}
                        >
                          {passwordActive ? (
                            <LiaEyeSolid className="cursor-pointer" />
                          ) : (
                            <LiaEyeSlashSolid className="cursor-pointer" />
                          )}
                        </div>
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
                            <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                              사업자등록번호를 입력해주세요
                            </span>
                          </div>
                        ) : (
                          <div className='flex flex-row justify-start w-[100%]'>
                            <label htmlFor="bidCorpNum" className="text-[1rem] font-semibold font-['suit'] not-italic text-left">
                              사업자 등록번호
                            </label>
                            <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                              *
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row gap-[5%]">
                        <input
                          {...register('bidderCorpNum1', { required: true })}
                          type="text"
                          placeholder="123"
                          id="bidderCorpNum1"
                          name="bidderCorpNum1"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={3}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
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
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum1
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum1: temp }
                            })
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum
                              temp[stepNum - 1] = e.target.value + biddingInfo.bidderCorpNum2[stepNum - 1] + biddingInfo.bidderCorpNum3[stepNum - 1]
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                        <span className="flex text-mygray font-['suit'] font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum2', { required: true })}
                          type="text"
                          placeholder="45"
                          id="bidderCorpNum2"
                          name="bidderCorpNum2"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={2}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
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
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum2
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum2: temp }
                            })
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum
                              temp[stepNum - 1] = biddingInfo.bidderCorpNum1[stepNum - 1] + e.target.value + biddingInfo.bidderCorpNum3[stepNum - 1]
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                        <span className="flex text-mygray font-['suit'] font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum3', { required: true })}
                          type="text"
                          placeholder="67890"
                          id="bidderCorpNum3"
                          name="bidderCorpNum3"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={5}
                          className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[30%] text-center"
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
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum3
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum3: temp }
                            })
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum
                              temp[stepNum - 1] = biddingInfo.bidderCorpNum1[stepNum - 1] + biddingInfo.bidderCorpNum2[stepNum - 1] + e.target.value
                              return { ...prev, bidCorpNum: temp }
                            })
                            handleCorpNumFocusMove(e.target)
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
                              <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                                법인 등록번호를 입력해주세요
                              </span>
                              <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                                *
                              </span>
                            </div>
                          ) : (
                            <div className='flex flex-row justify-start w-[100%]'>
                              <label
                                htmlFor="bidCorpRegiNum"
                                className="text-[1rem] font-semibold font-['suit'] not-italic text-left"
                              >
                                법인 등록번호
                              </label>
                              <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                                *
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row gap-[5%]">
                          <input
                            {...register('bidderCorpRegiNum1', { required: true })}
                            type="text"
                            name="bidderCorpRegiNum1"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1')
                            }}
                            maxLength={6}
                            id="bidderCorpRegiNum1"
                            placeholder="123456"
                            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
                            value={biddingForm.bidCorpNum1[stepNum - 1] ?? ''}
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
                              setBiddingInfo((prev: any) => {
                                const temp = prev.bidderCorpRegiNum1
                                temp[stepNum - 1] = e.target.value
                                return { ...prev, bidCorpRegiNum1: temp }
                              })
                              setBiddingInfo((prev: any) => {
                                const temp = prev.bidderCorpRegiNum2
                                temp[stepNum - 1] = e.target.value + biddingInfo.bidderCorpRegiNum2[stepNum - 1]
                                return { ...prev, bidCorpRegiNum: temp }
                              })
                              handleCorpRegiNumFocusMove(e.target)
                            }}
                          />
                          <span className="flex text-mygray font-['suit'] font-bold mt-1">
                            -
                          </span>
                          <input
                            {...register('bidderCorpRegiNum2', { required: true })}
                            type="text"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1')
                            }}
                            maxLength={7}
                            id="bidderCorpRegiNum2"
                            name="bidderCorpRegiNum2"
                            placeholder="1234567"
                            className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic h-[40px] px-2 w-[50%] text-center"
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
                              setBiddingInfo((prev: any) => {
                                const temp = prev.bidderCorpRegiNum2
                                temp[stepNum - 1] = e.target.value
                                return { ...prev, bidCorpRegiNum2: temp }
                              })
                              setBiddingInfo((prev: any) => {
                                const temp = prev.bidderCorpRegiNum
                                temp[stepNum - 1] = biddingInfo.bidderCorpRegiNum1[stepNum - 1] + e.target.value
                                return { ...prev, bidCorpRegiNum: temp }
                              })
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
                      {errors.bidderJob?.type === 'required' && 
                        (biddingForm.bidJob[stepNum - 1] === '') ?
                        (
                          <div className="flex w-[100%] justify-start">
                            <label
                              htmlFor="agentJob"
                              className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500"
                            >
                              {"직업을 입력해주세요"}
                            </label>
                          </div>
                        ) : (
                          <div className='flex flex-row justify-start w-[100%]'>
                            <label htmlFor="bidderJob" className="text-[1rem] font-semibold font-['suit'] not-italic text-left">
                              직업
                            </label>
                            <span className="text-[1rem] font-semibold font-['suit'] not-italic text-left text-red-500">
                              *
                            </span>
                          </div>
                        )}
                    </div>
                    <input
                      {...register('bidderJob', { required: true })}
                      value={biddingForm.bidJob[stepNum - 1] || ''}
                      id="bidderJob"
                      name="bidderJob"
                      type="text"
                      className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[1rem] text-[0.8rem] font-semibold font-['suit'] not-italic text-left h-[40px] px-2"
                      placeholder="직업을 입력해주세요"
                      onChange={(e) => {
                        setBiddingForm((prev: any) => {
                          const temp = prev.bidJob
                          temp[stepNum - 1] = e.target.value
                          return { ...prev, bidJob: temp }
                        })
                        setBiddingInfo((prev: any) => {
                          const temp = prev.bidderJob
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
                  biddingInfo={biddingInfo}
                  setBiddingInfo={setBiddingInfo}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  setValue={setValue}
                />
              </div>
            </div>
            <div className={`flex flex-row fixed gap-[10px] md:w-[550px] w-[90%] ${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'bottom-[50px]' : 'bottom-[20px]'}`}>
              <button
                type="button"
                className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
                onClick={() => {
                  stepNum === 1 ? setStateNum(6) : setStepNum((prev) => prev - 1)
                }}
              >
                <span className="text-sutTitle font-extrabold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  이전으로
                </span>
              </button>
              <button
                type="submit"
                className="flex w-[60%] md:w-[65%] h-[50px] bg-myBlue rounded-full justify-center items-center cursor-pointer"
              >
                <span className="text-white font-extrabold font-['suit'] md:text-[1.2rem] text-[1rem]">
                  다음으로
                </span>
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}