import { biddingInfoState, stepState } from "@/atom"
import SearchAddress from "@/components/SearchAddress"
import Spinner from "@/components/Spinner"
import { BiddingInfoType } from "@/interface/IpchalType"
import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRecoilState } from "recoil"

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

export default function BidderFormMod() {
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

  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)   //  전역 상태에서 저장하는 값
  const [bidderList, setBidderList] = useState<BidderListProps>()         //  입찰자 정보(서버에서 받아온 값)
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
  console.log(biddingInfo)
  //  초기 컴포넌트 마운트 시 서버에 저장된 입찰자 정보를 불러온다.
  useEffect(() => {
    const handleGetBidders = async () => {
      try {
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`)
        if (response.status === 200) {
          setBidderList({
            agentYn: response.data.data.agentYn ?? null,
            bidderCount: response.data.data.bidderCount ?? 0,
            mstSeq: response.data.data.mstSeq ?? 0,
            number: response.data.data.number ?? 0,
            state: response.data.data.state ?? 0,
            bidders: response.data.data.bidders ?? []
          })
          //  입찰자 수가 기존 서버 저장 값보다 클 경우
          if (response.data.data.bidderCount < biddingForm.bidderNum) {
            setBiddingForm((prev: any) => {
              const temp1 = prev.bidName
              const temp2 = prev.bidPhone
              const temp3 = prev.bidIdNum
              const temp4 = prev.bidCorpNum
              const temp5 = prev.bidCorpRegiNum
              const temp6 = prev.bidAddr
              const temp7 = prev.bidAddrDetail
              const temp8 = prev.bidCorpYn
              const temp9 = prev.bidJob
              temp1.push('')
              temp2.push('')
              temp3.push('')
              temp4.push('')
              temp5.push('')
              temp6.push('')
              temp7.push('')
              temp8.push('I')
              temp9.push('')
              return {
                ...prev,
                bidName: temp1,
                bidPhone: temp2,
                bidIdNum: temp3,
                bidCorpNum: temp4,
                bidCorpRegiNum: temp5,
                bidAddr: temp6,
                bidAddrDetail: temp7,
                bidCorpYn: temp8,
                bidJob: temp9,
              }
            })
          } else if (response.data.data.bidderCount > biddingForm.bidderNum) {
            //  입찰자 수가 기존 서버 저장 값보다 작을 경우
            console.log("여기")
            setBiddingForm((prev: any) => {
              const temp1 = prev.bidName
              const temp2 = prev.bidPhone
              const temp3 = prev.bidIdNum
              const temp4 = prev.bidCorpNum
              const temp5 = prev.bidCorpRegiNum
              const temp6 = prev.bidAddr
              const temp7 = prev.bidAddrDetail
              const temp8 = prev.bidCorpYn
              const temp9 = prev.bidJob
              temp1.pop()
              temp2.pop()
              temp3.pop()
              temp4.pop()
              temp5.pop()
              temp6.pop()
              temp7.pop()
              temp8.pop()
              temp9.pop()
              return {
                ...prev,
                bidName: temp1,
                bidPhone: temp2,
                bidIdNum: temp3,
                bidCorpNum: temp4,
                bidCorpRegiNum: temp5,
                bidAddr: temp6,
                bidAddrDetail: temp7,
                bidCorpYn: temp8,
                bidJob: temp9,
              }
            })
          } else {
            //  입찰자 수가 기존 서버 저장 값과 같을 경우
            setBiddingForm((prev: any) => {
              let temp1 = prev.bidName
              let temp2 = prev.bidPhone
              let temp3 = prev.bidCorpNum
              let temp4 = prev.bidCorpRegiNum
              let temp5 = prev.bidAddr
              let temp6 = prev.bidCorpYn
              let temp7 = prev.bidJob
              temp1 = response.data.data.bidders.map((item: any) => item.name)
              temp2 = response.data.data.bidders.map((item: any) => item.phoneNo)
              temp3 = response.data.data.bidders.map((item: any) => item.companyNo)
              temp4 = response.data.data.bidders.map((item: any) => item.corporationNo)
              temp5 = response.data.data.bidders.map((item: any) => item.address)
              temp6 = response.data.data.bidders.map((item: any) => item.bidderType)
              temp7 = response.data.data.bidders.map((item: any) => item.job)
              return {
                ...prev,
                bidName: temp1,
                bidPhone: temp2,
                bidCorpNum: temp3,
                bidCorpRegiNum: temp4,
                bidAddr: temp5,
                bidCorpYn: temp6,
                bidJob: temp7,
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

  //  민증 검증
  const handleVerifyIdNum = (idNum: string) => {
    if (idNum.length > 0 && idNum.length < 14) {
      const idNumArr = idNum.split('')
      const idNumArr1 = (idNumArr.length > 0 && idNumArr.map((item) => parseInt(item)))
      const idNumArr2 = idNumArr1 && idNumArr1.map((item, index) => {
        if (index === 0) {
          return item * 2
        } else if (index === 1) {
          return item * 3
        } else if (index === 2) {
          return item * 4
        } else if (index === 3) {
          return item * 5
        } else if (index === 4) {
          return item * 6
        } else if (index === 5) {
          return item * 7
        } else if (index === 6) {
          return item * 8
        } else if (index === 7) {
          return item * 9
        } else if (index === 8) {
          return item * 2
        } else if (index === 9) {
          return item * 3
        } else if (index === 10) {
          return item * 4
        } else if (index === 11) {
          return item * 5
        } else if (index === 12) {
          return item * 1
        }
      })

      const idNumArr3 = (idNumArr2 && idNumArr2.reduce((acc: any, cur: any) => acc + cur)) 
      const idNumArr4 = (idNumArr3 && (idNumArr3 - idNumArr2[12]!) % 11) 
      const idNumArr5 = (idNumArr4 && 11 - idNumArr4) 
      const idNumArr6 = (idNumArr5 && idNumArr5 % 10)
      if (idNumArr6 === (idNumArr1 && idNumArr1[12])) {
        return true
      } else {
        return false
      }
    }
  }
  
  //  사업자 등록 번호 검증
  const handleVerifyCorpNum = (number: string) => {
    if (number.length !== 10) {
      return false;
    }

    const regsplitNum = number.replace(/-/gi, '').split('').map(function(item) {
      return parseInt(item, 10);
    });
    
    if (regsplitNum.length === 10) {
      const regkey = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let regNumSum = 0;
      for (var i = 0; i < regkey.length; i++) {
        regNumSum += regkey[i] * regsplitNum[i];
      }
      regNumSum += parseInt(((regkey[8] * regsplitNum[8]) / 10).toString(), 10);
      const regCheck = (Math.floor(regsplitNum[9])) === ((10 - (regNumSum % 10) ) % 10);
    
      return regCheck;    
    }
  }

  //  법인등록번호 검증
  const handleVerifyCorpReiNum = (num: string) => {
    const rawValue = num.replace(/[^\d]/g, '').split('').map(r => Number(r));
    const checkSum = rawValue.pop();

    const sum = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2].map((n, i) => n * rawValue[i]).reduce((sum, n) => {
      sum += n;
      return sum;
    }, 0) % 10;

    if (sum === (10 - (checkSum ? checkSum : 0)) % 10 === true) {
      return true
    } else {
      alert('법인등록번호를 확인해주세요')
      return false
    }
  }

  //  수정 사항 반영
  const handleUpdate = async () => {
    try {
      if (biddingForm?.bidCorpYn[stepNum - 1] === 'I') {
        const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders/${bidderList?.bidders[stepNum - 1]?.peopleSeq}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          job: biddingForm?.bidJob[stepNum - 1],
          name: biddingForm?.bidName[stepNum - 1],
          phoneNo: biddingForm?.bidPhone[stepNum - 1],
        })
        if (response.status === 200) {
          return
        }
      } else if (biddingForm?.bidCorpYn[stepNum - 1] === 'C') {
        const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders/${bidderList?.bidders[stepNum - 1]?.peopleSeq}`, {
          address: biddingForm?.bidAddr[stepNum - 1],
          bidderType: biddingForm?.bidCorpYn[stepNum - 1],
          companyNo: biddingForm?.bidCorpNum[stepNum - 1],
          corporationNo: biddingForm?.bidCorpRegiNum[stepNum - 1],
          job: biddingForm?.bidJob[stepNum - 1],
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
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`,
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
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`,
          {
            bidderType: biddingForm.bidCorpYn[stepNum - 1],
            name: biddingForm.bidName[stepNum - 1],
            phoneNo: biddingForm.bidPhone[stepNum - 1],
            address: biddingForm.bidAddr[stepNum - 1],
            job: biddingForm.bidJob[stepNum - 1],
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

  //  다음 스텝 / 단계 이동
  const handleNextStep = async () => {
    handleUpdateIdNum(stepNum - 1)
    if (biddingForm.bidderNum === 1) {
      setStateNum(8)
      await handleUpdate()
    } else {
      //  1. 입찰자 수 증가의 경우
      if (biddingForm.bidderNum > bidderList?.bidders.length!) {
        if (stepNum === biddingForm.bidderNum) {
          await handleBidderFormSave()
          setStateNum(7)
        } else if (stepNum > bidderList?.bidders.length! && stepNum < biddingForm.bidderNum) {
          await handleBidderFormSave()
          setStepNum(stepNum + 1)
          reset()
        } else {
          await handleUpdate()
          setStepNum(stepNum + 1)
          reset()
        }
      } else if (biddingForm.bidderNum < bidderList?.bidders.length!) {
        //  2. 입찰자 수 감소의 경우
        if (stepNum === biddingForm.bidderNum) {
          await handleUpdate()
          // await handleDecreaseBidder()
          setStateNum(7)
        } else {
          await handleUpdate()
          // await handleDecreaseBidder()
          setStepNum(stepNum + 1)
        }
      } else {
        //  3. 입찰자 수 변경 없는 경우
        if (stepNum === biddingForm.bidderNum) {
          await handleUpdate()
          // await handleDecreaseBidder()
          setStateNum(7)
        } else {
          await handleUpdate()
          // await handleDecreaseBidder()
          setStepNum(stepNum + 1)
        }
      }
    }
  }
    
  const onSubmit: SubmitHandler<BiddingInfoType> = async () => {
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'I' && !handleVerifyIdNum(biddingForm.bidIdNum1[stepNum - 1] + biddingForm.bidIdNum2[stepNum - 1])) {
    //   alert('주민등록번호를 확인해주세요')
    //   return
    // } 
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'C' && !handleVerifyCorpNum(biddingForm.bidCorpNum1[stepNum - 1] + biddingForm.bidCorpNum2[stepNum - 1] + biddingForm.bidCorpNum3[stepNum - 1])) {
    //   alert('사업자등록번호를 확인해주세요')
    //   return
    // } 
    // if (biddingForm.bidCorpYn[stepNum - 1] === 'C' && !handleVerifyCorpReiNum(biddingForm.bidCorpRegiNum1[stepNum - 1] + biddingForm.bidCorpRegiNum2[stepNum - 1])) {
    //   alert('법인등록번호를 확인해주세요')
    //   return
    // } 
    if (isOpen === false) {
      try {
        await handleNextStep()
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const handleInitCorpYn = () => {
      //  현재 스텝에 해당하는 입찰자의 법인여부가 없을 경우
      if (biddingForm.bidCorpYn[stepNum - 1] === '' || biddingForm.bidCorpYn[stepNum - 1] === undefined) {
        setBiddingForm((prev: any) => {
          const temp = prev.bidCorpYn
          temp[stepNum - 1] = 'I'
          return { ...prev, bidCorpYn: temp }
        })
      }
    }
    handleInitCorpYn()
  }, [stepNum])

  const handleUpdateIdNum = (index: number) => {
    setBiddingForm((prev: any) => {
      const newBidIdNum = [...prev.bidIdNum]
      const newBidderType = [...prev.bidCorpYn]

      if (newBidderType[index] === 'C' && newBidIdNum[index] !== '') {
        newBidIdNum.splice(index, 1, '')
      } else if (newBidderType[index + 1] === 'C' && newBidIdNum[index + 1] !== '') {
        newBidIdNum.splice(index + 1, 1, '')
      } else if (newBidderType[index + 1] === undefined) {
        newBidIdNum.splice(index + 1, 1, '')
      }
      return { ...prev, bidIdNum: newBidIdNum }
    })
  }

  console.log(biddingForm)

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      {loading && (
        <Spinner />
      )}
      {!loading && (
        <div className="flex flex-col gap-4  md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative">
          <div className="flex flex-row py-6 pt-4">
            <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
              본인 정보를 입력해주세요
            </span>
            {biddingForm.bidderNum > 1 && (
              <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8 ml-2">
                {`(${stepNum} / ${biddingForm.bidderNum})`}
              </span>
            )}
          </div>
          <div className="flex flex-row gap-10 w-[80%] justify-center">
            <div className={`flex flex-row w-[80px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'text-white bg-myyellow' : 'text-myyellow bg-white'}`} 
              onClick={() => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidCorpYn
                  temp[stepNum - 1] = 'I'
                  return { ...prev, bidCorpYn: temp }
                })
              }}
            >
              <div className={`${biddingForm.bidCorpYn[stepNum - 1]  === 'I' ? 'flex mr-1' : 'hidden'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                >
                  <path
                    d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className={`text-[13px] font-NanumGothic not-italic font-extrabold ${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'text-white' : 'text-myyellow'}`}>
                개인
              </span>
            </div>
            <div
              className={`flex flex-row w-[80px] h-[40px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
                biddingForm.bidCorpYn[stepNum - 1] === 'C'
                  ? 'text-white bg-myyellow'
                  : 'text-myyellow bg-white'
              }`}
              onClick={() => {
                setBiddingForm((prev: any) => {
                  const temp = prev.bidCorpYn
                  temp[stepNum - 1] = 'C'
                  return { ...prev, bidCorpYn: temp }
                })
              }}
            >
              <div className={`${biddingForm.bidCorpYn[stepNum - 1] === 'C' ? 'flex mr-1' : 'hidden'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                >
                  <path
                    d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className={`text-[13px] font-NanumGothic not-italic font-extrabold ${biddingForm.bidCorpYn[stepNum - 1] === 'C' ? 'text-white' : 'text-myyellow'}`}>
                법인
              </span>
            </div>
          </div>

          {/* 입력정보 */}
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:w-[50%] w-[80%] h-[100%] justify-center items-center'>
            <div className="flex flex-col w-[100%] h-[100%] gap-2">
              <div className="flex flex-col w-[100%] gap-1">
                <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                  성명
                </span>
                <input
                  value={biddingForm.bidName[stepNum - 1] || ''}
                  id="bidderName"
                  type="text"
                  className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2"
                  placeholder="입찰자 성명을 입력해주세요"
                  {...register('bidderName', { required: true })}
                  onChange={(e) => {
                    setBiddingForm((prev: any) => {
                      const temp = prev.bidName
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidName: temp }
                    })
                    setBiddingInfo((prev: any) => {
                      const temp = prev.bidderName
                      temp[stepNum - 1] = e.target.value
                      return { ...prev, bidName: temp }
                    })
                  }}
                />
              </div>
              {(errors.bidderName?.type === 'required' ||
              errors.bidderName?.type === 'minLength') && (
                <div className="flex w-[100%] justify-start">
                  <label
                    htmlFor="bidderName"
                    className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500"
                  >
                    입찰자 성명을 입력해주세요
                  </label>
                </div>
              )}
              <div className="flex flex-col w-[100%] gap-1">
                <label
                  htmlFor="bidderPhone"
                  className="text-[12px] font-NanumGothic not-italic font-extrabold text-left"
                >
                  전화번호
                </label>
                <div className="flex flex-row gap-[5%]">
                  <input
                    {...register('bidderPhone1', { required: true })}
                    id="bidderPhone1"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    type="text"
                    maxLength={3}
                    placeholder="010"
                    className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                    value={biddingForm.bidPhone1[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone1
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone1: temp }
                      })
                      setBiddingInfo((prev: any) => {
                        const temp = prev.bidderPhone1
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone1: temp }
                      })
                      handlePhoneFocusMove(e.target)
                    }}
                  />
                  <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                    -
                  </span>
                  <input
                    {...register('bidderPhone2', { required: true })}
                    type="text"
                    id="bidderPhone2"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="1234"
                    className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                    value={biddingForm.bidPhone2[stepNum - 1] || ''}
                    onChange={(e) => {
                      setBiddingForm((prev: any) => {
                        const temp = prev.bidPhone2
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone2: temp }
                      })
                      setBiddingInfo((prev: any) => {
                        const temp = prev.bidderPhone2
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone2: temp }
                      })
                      handlePhoneFocusMove(e.target)
                    }}
                  />
                  <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                    -
                  </span>
                  <input
                    {...register('bidderPhone3', { required: true })}
                    type="text"
                    id="bidderPhone3"
                    maxLength={4}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value
                        .replace(/[^0-9.]/g, '')
                        .replace(/(\..*)\./g, '$1')
                    }}
                    placeholder="5678"
                    className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
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
                      setBiddingInfo((prev: any) => {
                        const temp = prev.bidderPhone3
                        temp[stepNum - 1] = e.target.value
                        return { ...prev, bidPhone3: temp }
                      })
                      handlePhoneFocusMove(e.target)
                    }}
                  />
                </div>
              </div>
              {(errors.bidderPhone1?.type === 'required' ||
                errors.bidderPhone2?.type === 'required' ||
                errors.bidderPhone3?.type === 'required') && (
                <div className="flex w-[100%] justify-start">
                  <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                    전화번호를 입력해주세요
                  </span>
                </div>
              )}
              {biddingForm.bidCorpYn[stepNum - 1] === 'I' ? (
                <>
                  <div className={`${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'flex' : 'hidden'} flex-col w-[100%] gap-1`}>
                    <label htmlFor="bidIdNum" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                      주민등록번호
                    </label>
                    <div className="flex flex-row gap-[5%]">
                      <input
                        {...register('bidderIdNum1', { required: true })}
                        id="bidderIdNum1"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        type="text"
                        maxLength={6}
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[45%] text-center"
                        value={biddingForm.bidIdNum1[stepNum - 1] || ''}
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
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderIdNum1
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidIdNum1: temp }
                          })
                          handleIdNumFocusMove(e.target)
                        }}
                      />
                      <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                        -
                      </span>
                      <input
                        {...register('bidderIdNum2', { required: true })}
                        id="bidderIdNum2"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1')
                        }}
                        type="text"
                        maxLength={7}
                        className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[45%] text-center"
                        value={biddingForm.bidIdNum2[stepNum - 1] || ''}
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
                          setBiddingInfo((prev: any) => {
                            const temp = prev.bidderIdNum2
                            temp[stepNum - 1] = e.target.value
                            return { ...prev, bidIdNum2: temp }
                          })
                        }}
                      />
                    </div>
                  </div>
                    {errors.bidderIdNum1?.type === 'required' &&
                      errors.bidderIdNum2?.type === 'required' && (
                      <div className="flex w-[80%] justify-start h-[15px] mb-1">
                        <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                          주민등록번호를 입력해주세요
                        </span>
                      </div>
                    )}
                </>
                ) : (
                  <>
                    <div className={`${biddingForm.bidCorpYn[stepNum - 1] === 'C' ? 'flex' : 'hidden'} flex-col w-[100%] gap-1`}>
                      <label htmlFor="bidCorpNum" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                        사업자 등록번호
                      </label>
                      <div className="flex flex-row gap-[5%]">
                        <input
                          {...register('bidderCorpNum1', { required: true })}
                          type="text"
                          placeholder="123"
                          id="bidderCorpNum1"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={3}
                          className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum1[stepNum - 1] || ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum1
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum1: temp }
                            })
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum1
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum1: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                        <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum2', { required: true })}
                          type="text"
                          placeholder="45"
                          id="bidderCorpNum2"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={2}
                          className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum2[stepNum - 1] || ''}
                          onChange={(e) => {
                            setBiddingForm((prev: any) => {
                              const temp = prev.bidCorpNum2
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum2: temp }
                            })
                            setBiddingInfo((prev: any) => {
                              const temp = prev.bidderCorpNum2
                              temp[stepNum - 1] = e.target.value
                              return { ...prev, bidCorpNum2: temp }
                            })
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                        <span className="flex text-mygray font-NanumGothic font-bold mt-1">
                          -
                        </span>
                        <input
                          {...register('bidderCorpNum3', { required: true })}
                          type="text"
                          placeholder="67890"
                          id="bidderCorpNum3"
                          onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
                          }}
                          maxLength={5}
                          className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[30%] text-center"
                          value={biddingForm.bidCorpNum3[stepNum - 1] || ''}
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
                            handleCorpNumFocusMove(e.target)
                          }}
                        />
                      </div>
                      {(errors.bidderCorpNum1?.type === 'required' ||
                        errors.bidderCorpNum2?.type === 'required' ||
                        errors.bidderCorpNum3?.type === 'required') && (
                        <div className="flex w-[100%] justify-start mb-1">
                          <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                            사업자등록번호를 입력해주세요
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col w-[100%] gap-1 mt-1">
                        <label
                          htmlFor="bidCorpRegiNum"
                          className="text-[12px] font-NanumGothic not-italic font-extrabold text-left"
                        >
                          법인 등록번호
                        </label>
                        <div className="flex flex-row gap-[5%]">
                          <input
                            {...register('bidderCorpRegiNum1', { required: true })}
                            type="text"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value
                                .replace(/[^0-9.]/g, '')
                                .replace(/(\..*)\./g, '$1')
                            }}
                            maxLength={6}
                            id="bidderCorpRegiNum1"
                            placeholder="123456"
                            className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[50%] text-center"
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
                              setBiddingInfo((prev: any) => {
                                const temp = prev.bidderCorpRegiNum1
                                temp[stepNum - 1] = e.target.value
                                return { ...prev, bidCorpRegiNum1: temp }
                              })
                              handleCorpRegiNumFocusMove(e.target)
                            }}
                          />
                          <span className="flex text-mygray font-NanumGothic font-bold mt-1">
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
                            className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold h-[40px] px-2 w-[50%] text-center"
                            value={biddingForm.bidCorpRegiNum2[stepNum - 1] || ''}
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
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {(errors.bidderCorpRegiNum1?.type === 'required' ||
                      errors.bidderCorpRegiNum2?.type === 'required') && (
                      <div className="flex w-[100%] justify-start mb-1">
                        <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
                          법인 등록번호를 입력해주세요
                        </span>
                      </div>
                    )}
                  </>
                )
              }
              <div className={`flex flex-col w-[100%] h-[60px] gap-1 `}>
                <div className="flex flex-col w-[100%] gap-1">
                  <label htmlFor="bidderJob" className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
                    직업
                  </label>
                  <input
                    {...register('bidderJob', { required: true })}
                    value={biddingForm.bidJob[stepNum - 1] || ''}
                    id="bidderJob"
                    type="text"
                    className="border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2"
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
                {errors.bidderJob?.type === 'required' && (
                  <div className="flex w-[100%] justify-start">
                    <label
                      htmlFor="agentJob"
                      className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500"
                    >
                      {errors.bidderJob?.message}
                    </label>
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
              <div className={`flex flex-row gap-[10px] absolute ${biddingForm.bidCorpYn[stepNum - 1] === 'I' ? 'top-[700px]' : 'top-[770px]'} justify-center items-center md:w-[50%] w-[80%]`}>
                <button
                  type="button"
                  className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
                  onClick={() => {
                    stepNum === 1 ? setStateNum(5) : setStepNum((prev) => prev - 1)
                  }}
                >
                  <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                    이전
                  </span>
                </button>
                <button
                  type="submit"
                  className="flex w-[60%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
                >
                  <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                    다음
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}