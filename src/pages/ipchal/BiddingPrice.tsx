import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function BiddingPrice() {
  const [biddingPrice, setBiddingPrice] = useState<number>(0)
  const [depositPrice, setDepositPrice] = useState<number>(0)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const [paymentsInfo, setPaymentsInfo] = useState({
    biddingTime: '',
    appraisalAmount: 0,
    minimumAmount: 0,
    bidDeposit: 0,
  })
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)

  function num2han(number: number) {
    const units = ['조', '억', '만', ''] // 단위
    const tenUnit = ['', '십', '백', '천']
    const numbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
    const unit = 10000 // 단위는 만
    let answer = ''

    while (number > 0) {
      number.toString().replace(',', '')
      const mod = number % unit
      const modToArray = mod.toString().split('')
      const length = modToArray.length - 1
      const modToKorean = modToArray.reduce(
        (acc: string, value: string, index: number) => {
          const valueToNumer = +value
          if (!valueToNumer) return acc
          const numberToKorean =
            index < length && valueToNumer === 1 ? '' : numbers[valueToNumer]
          return `${acc}${numberToKorean}${tenUnit[length - index]}`
        },
        '',
      )
      answer = `${modToKorean}${units.pop()}${answer}`
      number = Math.floor(number / unit)
    }
    return answer.replace(/억만/g, '억')
  }
  if (typeof document !== 'undefined') {
    const input = document.querySelector('#number') as HTMLInputElement
    input &&
      input.addEventListener('keyup', function (e: any) {
        let value = e.target.value
        value = Number(value.replaceAll(',', ''))
        if (isNaN(value)) {
          //NaN인지 판별
          input.value = '0'
        } else {
          //NaN이 아닌 경우
          const formatValue = value.toLocaleString('ko-KR')
          input.value = formatValue
        }
      })
    const input2 = document.querySelector('#number2') as HTMLInputElement
    input2 &&
      input2.addEventListener('keyup', function (e: any) {
        let value = e.target.value
        value = Number(value.replaceAll(',', ''))
        if (isNaN(value)) {
          //NaN인지 판별
          input2.value = '0'
        } else {
          //NaN이 아닌 경우
          const formatValue = value.toLocaleString('ko-KR')
          input2.value = formatValue
        }
      })
  }

  useEffect(() => {
    const handleRegisterMandate = async () => {
      if (biddingForm.agentYn === 'Y' && biddingForm.bidderNum === 1) {
        try {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders/mandates`, {
            bidderCount: biddingForm.bidderNum,
            mandates: [
              { 
                peopleSeq: 1,
                name: biddingForm.bidName[0],
                mandateYn: 'Y'
              }
            ]
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
          console.log("입찰자 대리인 연결 실패")
        }
      }
    }
    setTimeout(() => {
      handleRegisterMandate()
    }, 1000)
  }, [])

  const handleCheckPrice = () => {
    if (biddingForm.biddingPrice < paymentsInfo.minimumAmount) {
      alert('최저가 이상으로 입력해주세요')
      setErrorMsg(true)
      return
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 2) {
      if (window.confirm('최저가의 200% 이상입니다. 다음 단계로 넘어가시겠습니까?')) {
        setErrorMsg(false)
        handleGetBiddingFormUpdate()
      } else {
        setErrorMsg(true)
        return
      }
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 1.1 && biddingForm.biddingPrice < paymentsInfo.minimumAmount * 1.2) {
      if (window.confirm('최저가의 110% 이상입니다. 다음 단계로 넘어가시겠습니까?')) {
        setErrorMsg(false)
        handleGetBiddingFormUpdate()
      } else {
        setErrorMsg(true)
        return
      }
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 1.2 && biddingForm.biddingPrice < paymentsInfo.minimumAmount * 2) {
      if (window.confirm('최저가의 120% 이상입니다. 다음 단계로 넘어가시겠습니까?')) {
        setErrorMsg(false)
        handleGetBiddingFormUpdate()
      } else {
        setErrorMsg(true)
        return
      }
    }
    setErrorMsg(false)
  }

  const handleChangeBiddingPrice = (e: any) => {
    setBiddingForm((prev) => {
      return {
        ...prev,
        biddingPrice: Number(
          e.target.value.toString().replaceAll(',', ''),
        ),
      }
    })
    setBiddingPrice((prev) => {
      return Number(
        e.target.value.toString().replaceAll(',', ''),
      )
    })
    num2han(Number(e.target.value.toString().replaceAll(',', '')))
  }

  const handleChangeDepositPrice = (e: any) => {
    setBiddingForm((prev) => {
      return {
        ...prev,
        depositPrice: Number(
          e.target.value.toString().replaceAll(',', ''),
        ),
      }
    })
    setDepositPrice((prev) => {
      return Number(
        e.target.value.toString().replaceAll(',', ''),
      )
    })
    num2han(Number(e.target.value.toString().replaceAll(',', '')))
  }

  const handleGetBiddingFormUpdate = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/bidders`)
      if (response.status === 200) {
        setIsDataIn(response.data.data.bidders)
        setBiddingForm({
          ...biddingForm,
          bidName: response.data.data.bidders.map((item: any) => item.name),
          bidAddr: response.data.data.bidders.map((item: any) => item.address),
          bidPhone: response.data.data.bidders.map((item: any) => item.phoneNo),
          bidPhone1: response.data.data.bidders.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo.slice(0, 3) : item.phoneNo.slice(0, 2)),
          bidPhone2: response.data.data.bidders.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo.slice(3, 7) : item.phoneNo.slice(2, 6)),
          bidPhone3: response.data.data.bidders.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo.slice(7, 11) : item.phoneNo.slice(6, 10)),
          bidCorpYn: response.data.data.bidders.map((item: any) => item.bidderType),
          bidCorpNum: response.data.data.bidders.map((item: any) => item.companyNo),
          bidJob: response.data.data.bidders.map((item: any) => item.job),
          bidCorpRegiNum: response.data.data.bidders.map((item: any) => item.corporationNo),
        })
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handleSyncBiddingForm = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingForm.mstSeq}/payments`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (response.status === 200) {
          setPaymentsInfo({
            ...paymentsInfo,
            biddingTime: response2.data.data.biddingInfo.biddingTime,
            appraisalAmount: response2.data.data.biddingInfo.appraisalAmount,
            minimumAmount: response2.data.data.biddingInfo.minimumAmount,
            bidDeposit: response2.data.data.biddingInfo.bidDeposit,
          })
          setBiddingForm({
            ...biddingForm,
            bidName: response.data.data?.bidders?.map((item: any) => item.name),
            bidAddr: response.data.data?.bidders?.map((item: any) => item.address),
            bidAddrDetail: response.data.data?.bidders?.length < biddingForm.bidAddrDetail.length ? biddingForm.bidAddrDetail.splice(response.data.data?.bidders?.length) : biddingForm.bidAddrDetail,
            bidPhone: response.data.data?.bidders?.map((item: any) => item.phoneNo),
            bidPhone1: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(0, 3) : item.phoneNo?.slice(0, 2)),
            bidPhone2: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(3, 7) : item.phoneNo?.slice(2, 6)),
            bidPhone3: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(7, 11) : item.phoneNo?.slice(6, 10)),
            bidCorpYn: response.data.data?.bidders?.map((item: any) => item.bidderType),
            bidCorpNum: response.data.data?.bidders?.map((item: any) => item.companyNo),
            bidCorpNum1: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(0, 3) ?? null),
            bidCorpNum2: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(3, 5) ?? null),
            bidCorpNum3: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(5, 10) ?? null),
            bidJob: response.data.data?.bidders?.map((item: any) => item.job),
            bidCorpRegiNum: response.data.data?.bidders?.map((item: any) => item.corporationNo),
            bidCorpRegiNum1: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(0, 6) ?? null),
            bidCorpRegiNum2: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(6, 13) ?? null),
            denominator: response.data.data?.bidders?.length < biddingForm.denominator.length ? biddingForm.denominator?.splice(response.data.data?.bidders?.length) : biddingForm.denominator,
            numerator: response.data.data?.bidders?.length < biddingForm.numerator.length ? biddingForm.numerator?.splice(response.data.data?.bidders?.length) : biddingForm.numerator,
            bidIdNum1: biddingForm.bidIdNum.map((item) => item !== '' ? item?.substring(0, 6) : ''),
            bidIdNum2: biddingForm.bidIdNum.map((item) => item !== '' ? item?.substring(6, 13) : ''),
            depositPrice: biddingForm.depositPrice === 0 ? response2.data.data.biddingInfo.bidDeposit : biddingForm.depositPrice,
          })
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    handleSyncBiddingForm()
  }, [])

  const handleNextStep = () => {
    if (biddingForm.biddingPrice < paymentsInfo.minimumAmount) {
      alert('최저가 이상으로 입력해주세요')
      setErrorMsg(true)
      return
    } else {
      setErrorMsg(false)
      handleGetBiddingFormUpdate()
    }
  }

  const handlePrevStep = () => {
    if (biddingForm.bidderNum > 1) {
      setStateNum(stateNum - 1)
    } else {
      setStateNum(16)
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
  
  return (
    <>
      <div className="flex w-[100%] bg-mybg justify-center relative" style={{
        height: '100%',
      }}>
        <div className="flex flex-col gap-[20px] w-[100%] h-[100vh] bg-mybg items-center text-center relative pt-[50px]">
          {loading && (
              <Spinner />
            )}
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
            입찰 가격을 입력해주세요
          </span>
          <span className="md:text-[0.9rem] text-[0.8rem] font-bold font-Nanum Gothic text-center leading-[11px] mt-[10px] text-sutTitle">
            최저가 이상부터 입력할 수 있습니다
          </span>
          <div className="flex flex-col gap-2 md:w-[550px] w-[90%] h-[500px] mt-[20px] border-slate-500 items-center">
            <div className='flex flex-row w-[100%] justify-start'>              
              <svg width="15" height="15" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                marginTop: '5px',
              }}>
                <path d="M17.4993 32.0827C25.5535 32.0827 32.0827 25.5535 32.0827 17.4993C32.0827 9.4452 25.5535 2.91602 17.4993 2.91602C9.4452 2.91602 2.91602 9.4452 2.91602 17.4993C2.91602 25.5535 9.4452 32.0827 17.4993 32.0827Z" stroke="#181826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 8.77848V8.75" stroke="#181826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 14.584V26.2507" stroke="#181826" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`font-bold text-['suit'] text-sutTitle`}>
                &nbsp;{biddingForm.sagunNum}
              </span>
              <span className={`font-normal text-['suit'] text-sutTitle`}>
                &nbsp;의
              </span>
            </div>
            <div className='flex flex-col w-[100%] justify-start gap-[10px]'>
              <div className='flex justify-between w-[100%]'>
                <div className='flex w-[20%] justify-start'>
                  <span className="md:text-[1.2rem] text-[1rem] font-bold font-['suit'] text-center">
                    감정가는
                  </span>
                </div>
                <div className='flex flex-row w-[80%] justify-start'>
                  <input 
                    readOnly
                    className="text-sutTitle md:text-[1.2rem] text-[1rem] font-bold font-['suit'] text-right h-[40px] border border-gray-300 bg-mySelect rounded-md" 
                    value={paymentsInfo.appraisalAmount.toLocaleString('ko-KR')} 
                  />
                  <span className="text-sutTitle md:text-[1.2rem] text-[1rem] font-bold font-['suit'] mt-[5px]">
                    &nbsp; 원이며,
                  </span>
                </div>
              </div>
              <div className='flex justify-between w-[100%]'>
                <div className='flex w-[20%] justify-start'>
                  <span className="md:text-[1.2rem] text-[1rem] font-bold font-['suit'] text-center ">
                    최저가는
                  </span>
                </div>
                <div className='flex flex-row w-[80%] justify-start'>
                  <input 
                    value={paymentsInfo.minimumAmount.toLocaleString('ko-KR')}
                    className="text-myBlue md:text-[1.2rem] text-[1rem] font-bold font-['suit'] text-right h-[40px] border border-gray-300 bg-mySelect rounded-md" 
                    readOnly
                  />
                  <span className="text-sutTitle md:text-[1.2rem] text-[1rem] font-bold font-['suit'] mt-[5px]">
                    &nbsp; 원입니다.
                  </span>
                </div> 
              </div>
            </div>
            <div className='flex w-[100%] h-[1px] bg-gray-300 mt-[5px]' />
            <div className="flex flex-col gap-[10px] w-[100%]">
              <div className='flex justify-start w-[20%] pt-[25px]'>
                <span className="text-[1rem] font-['suit'] not-italic font-bold">
                  입찰 가격
                </span>
              </div>
              <div className="flex justify-end w-[100%]">
                <input
                  aria-label="입찰 가격"
                  placeholder=""
                  type="text"
                  id="number"
                  onBlur={handleCheckPrice}
                  value={biddingForm.biddingPrice.toLocaleString('ko-KR')}
                  onFocus={(e) => setBiddingPrice((prev) => {
                    return Number(
                      e.target.value.toString().replaceAll(',', ''),
                    )
                  })}
                  className="flex w-[100%] h-[40px] border text-[1.2rem] border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md text-right p-[10px]"
                  onChange={(e) => {
                    handleChangeBiddingPrice(e)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-[100%] h-[40px]">
              <div className='flex w-[100%] justify-end'>
                <span className="md:text-[1rem] text-[0.8rem] font-['suit'] not-italic font-bold text-myOrange mb-2 text-left">
                  {num2han(biddingForm.biddingPrice) + '원'  + "(최저가의 " + Math.floor(((biddingForm.biddingPrice - paymentsInfo.minimumAmount) / (paymentsInfo.minimumAmount)) * 100 + 100) + "%)"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-[100%]">
              <div className="flex justify-start w-[20%] pt-[25px]">
                <span className="text-[1rem] font-['suit'] not-italic font-bold ">
                  입찰 보증 금액
                </span>
              </div>
              <div className="flex justify-start w-[100%]">
                <input
                  aria-label="입찰 보증 금액"
                  placeholder=""
                  type="text"
                  id="number2"
                  value={biddingForm.depositPrice.toLocaleString('ko-KR') || 0}
                  className="flex w-[100%] h-[40px] border text-[1.2rem] border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md text-right p-[10px]"
                  onChange={(e) => {
                    handleChangeDepositPrice(e)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-[100%] h-[40px]">
              <div className='flex w-[100%] h-[100%] justify-end'>
                <span className="md:text-[1rem] text-[0.8rem] font-['suit'] not-italic font-bold text-myOrange mb-2 text-left">
                  {num2han(biddingForm.depositPrice) + '원' + "(최저가의 " + Math.floor(((biddingForm.depositPrice) / (paymentsInfo.minimumAmount)) * 100) + "%)"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button 
          nextText='다음'
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      </div>
    </>
  )
}