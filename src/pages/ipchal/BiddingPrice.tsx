import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/ButtonCp'
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
        console.log("입찰자 대리인 연결 실행")
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
      <div id='box' className="flex w-[100%] bg-white justify-center relative">
        <div className="flex flex-col gap-[20px] md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative mt-[20px] md:pt-[100px] pt-[50px]">
          {loading && (
              <Spinner />
            )}
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
            입찰 가격을 입력해주세요
          </span>
          <div className="flex flex-col w-full gap-[10px] relative justify-center items-center">
            <div className="flex justify-center absolute md:top-[15px] top-[0px]">
              <span className="md:text-[0.9rem] text-[0.8rem] font-bold font-Nanum Gothic text-center leading-[11px] mt-[10px] text-red-500">
                ※ 최저가 이상으로 입력해주세요
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:w-[550px] md:h-[300px] w-[90%] h-[45%] bg-white mt-[50px] border-slate-500 justify-center items-center">
            <div className='flex flex-col w-[100%] justify-center items-center'>
              <div className='flex justify-between md:w-[35%] w-[50%]'>
                <div className='flex w-[40%] justify-center items-center'>
                  <span className="md:text-[1.1rem] text-[1rem] font-bold font-NanumGothic text-center">
                    감정가 :
                  </span>
                </div>
                <div className='flex w-[50%] justify-end'>
                  <span className="text-mygold md:text-[1.1rem] text-[1rem] font-bold font-NanumGothic text-right">
                    &nbsp;&nbsp;&nbsp;{paymentsInfo.appraisalAmount.toLocaleString('ko-KR')}
                  </span>
                </div>
              </div>
              <div className='flex justify-between md:w-[35%] w-[50%]'>
                <div className='flex w-[40%] justify-center items-center'>
                  <span className="md:text-[1.1rem] text-[1rem] font-bold font-NanumGothic text-center ">
                    최저가 :
                  </span>
                </div>
                <div className='flex w-[40%] justify-end'>
                  <span className="text-mygold md:text-[1.1rem] text-[1rem] font-bold font-NanumGothic text-right">
                    &nbsp;&nbsp;&nbsp;{paymentsInfo.minimumAmount.toLocaleString('ko-KR')}
                  </span>
                </div> 
              </div>
            </div>
            <div className="flex flex-row gap-[20px] w-[90%]">
              <div className='flex justify-start md:w-[20%] w-[25%] pt-[20px] md:ml-[10px]'>
                <span className="text-[1rem] font-NanumGothic not-italic font-bold leading-[9px]">
                  입찰금액
                </span>
              </div>
              <div className="flex justify-end w-[75%] pt-[10px] mr-[10px]">
                <input
                  aria-label="입찰금액"
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
                  className="flex md:w-[100%] w-[80%] h-[30px] border text-[1rem] border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md pl-[10px] text-right p-[10px]"
                  onChange={(e) => {
                    handleChangeBiddingPrice(e)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-[85%] h-[40px] md:h-[30px] border-b-2 border-myyellow">
              <div className='flex w-[20%]'>
                <span className="md:text-[0.9rem] text-[0.8rem] text-mygold font-NanumGothic not-italic font-bold mb-2">
                  일금
                </span>
              </div>
              <div className='flex w-[80%] justify-end'>
                <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic not-italic font-bold text-red-500 mb-2">
                  {num2han(biddingForm.biddingPrice) + '원'  + "(최저가의 " + Math.floor(((biddingForm.biddingPrice - paymentsInfo.minimumAmount) / (paymentsInfo.minimumAmount)) * 100 + 100) + "%)"}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-[20px] w-[90%]">
              <div className="flex justify-start md:w-[25%] w-[40%] pt-[20px] md:ml-[10px]">
                <span className="text-[1rem] font-NanumGothic not-italic font-bold ">
                  입찰보증금
                </span>
              </div>
              <div className="flex justify-end w-[100%] pt-[10px] mr-[10px]">
                <input
                  aria-label="입찰보증금"
                  placeholder=""
                  type="text"
                  id="number2"
                  value={biddingForm.depositPrice.toLocaleString('ko-KR') || 0}
                  className="flex md:w-[100%] w-[85%] h-[30px] border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md pl-[10px] text-right p-[10px]"
                  onChange={(e) => {
                    handleChangeDepositPrice(e)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-[85%] h-[40px] md:h-[30px] border-b-2 border-myyellow">
              <div className='flex w-[20%]'>
                <span className="md:text-[0.9rem] text-[0.8rem] text-mygold font-NanumGothic not-italic font-bold mb-2">
                  일금
                </span>
              </div>
              <div className='flex w-[80%] h-[100%] justify-end'>
                <span className="md:text-[0.9rem] text-[0.8rem] font-NanumGothic not-italic font-bold text-red-500 mb-2">
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