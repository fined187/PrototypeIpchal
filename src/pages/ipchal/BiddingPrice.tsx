import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BiddingPrice() {
  const [biddingPrice, setBiddingPrice] = useState<number>(0)
  const [depositPrice, setDepositPrice] = useState<number>(0)
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const [paymentsInfo, setPaymentsInfo] = useState({
    biddingTime: '',
    appraisalAmount: 0,
    minimumAmount: 0,
    bidDeposit: 0,
  })
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [errorMsg, setErrorMsg] = useState(false)

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
    const handleGetBiddingPrice = async () => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/payments`,
        )
        if (response.status === 200) {
          setPaymentsInfo({
            ...paymentsInfo,
            biddingTime: response.data.data.biddingInfo.biddingTime,
            appraisalAmount:
              response.data.data.biddingInfo.appraisalAmount,
            minimumAmount: response.data.data.biddingInfo.minimumAmount,
            bidDeposit: response.data.data.biddingInfo.bidDeposit,
          })
          if (biddingForm.biddingPrice === 0) {
            setBiddingForm({
              ...biddingForm,
              biddingPrice: response.data.data.biddingInfo.minimumAmount,
            })
          }
          if (biddingForm.depositPrice === 0) {
            setBiddingForm({
              ...biddingForm,
              depositPrice: response.data.data.biddingInfo.bidDeposit,
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBiddingPrice()
  }, [])

  const handleCheckPrice = () => {
    if (biddingForm.biddingPrice < paymentsInfo.minimumAmount) {
      alert('최저가 이상으로 입력해주세요')
      setErrorMsg(true)
      return
    }
    if (biddingForm.depositPrice < paymentsInfo.bidDeposit) {
      alert('최저가 이상으로 입력해주세요')
      setErrorMsg(true)
      return
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 2) {
      alert('최저가의 100% 이상입니다.')
      setErrorMsg(true)
      return
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 1.1 && biddingForm.biddingPrice < paymentsInfo.minimumAmount * 1.2) {
      alert('최저가의 10% 이상입니다.')
      setErrorMsg(true)
      return
    }
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount * 1.2 && biddingForm.biddingPrice < paymentsInfo.minimumAmount * 2) {
      alert('최저가의 20% 이상입니다.')
      setErrorMsg(true)
      return
    }
    setErrorMsg(false)
  }

  console.log(stateNum)

  const handleGetBiddingFormUpdate = async () => {
    try {
      const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/bidders`)
      if (response.status === 200) {
        setIsDataIn(response.data.data.bidders)
        setBiddingForm({
          ...biddingForm,
          bidName: response.data.data.bidders.map((item: any) => item.name),
          bidAddr: response.data.data.bidders.map((item: any) => item.address),
          bidPhone: response.data.data.bidders.map((item: any) => item.phoneNo),
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

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col gap-[20px] md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative">
        <span className="md:text-[1.5rem] text-[1.4rem] font-bold font-Nanum Gothic not-italic leading-8">
          입찰 가격을 입력해주세요
        </span>
        <div className="flex flex-col w-full gap-[10px]">
          <span className="text-[15px] font-bold font-Nanum Gothic text-center leading-[11px]">
            감정가:{' '}
            <span className="text-mygold text-[15px] font-bold font-Nanum Gothic">
              {paymentsInfo.appraisalAmount.toLocaleString('ko-KR')}
            </span>
          </span>
          <span className="text-[15px] font-bold font-Nanum Gothic text-center leading-[11px] mt-[10px]">
            최저가:{' '}
            <span className="text-mygold text-[15px] font-bold font-Nanum Gothic">
              {paymentsInfo.minimumAmount.toLocaleString('ko-KR')}
            </span>
          </span>
          <div className="flex justify-center mt-5">
            <span className="text-[15px] font-bold font-Nanum Gothic text-center leading-[11px] mt-[10px] text-red-500">
              ※ 최저가 이상으로 입력해주세요
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-[550px] w-[90%] min-h-[300px] max-h-[500px] bg-white absolute top-[180px] border-slate-500 justify-center items-center">
          <div className="flex flex-row gap-[20px] w-[90%]">
            <div className='flex justify-start md:w-[15%] w-[20%] pt-[20px] md:ml-[10px]'>
              <span className="md:text-[15px] text-[12px] font-NanumGothic not-italic font-bold leading-[9px]">
                입찰금액
              </span>
            </div>
            <div className="flex justify-end w-[80%] pt-[10px] mr-[10px]">
              <input
                type="text"
                id="number"
                onBlur={handleCheckPrice}
                value={
                  biddingForm.biddingPrice === 0
                    ? 0
                    : biddingForm.biddingPrice.toLocaleString('ko-KR')
                }
                className="flex md:w-[100%] w-[90%] h-[30px] border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md pl-[10px]"
                onChange={(e) => {
                  setBiddingPrice(
                    Number(e.target.value.toString().replaceAll(',', '')),
                  )
                  num2han(Number(e.target.value.toString().replaceAll(',', '')))
                  setBiddingForm({
                    ...biddingForm,
                    biddingPrice: Number(
                      e.target.value.toString().replaceAll(',', ''),
                    ),
                  })
                }}
              />
            </div>
          </div>
          <div className="flex justify-between w-[85%] pt-[5px] border-b-2 border-myyellow">
            <span className="text-[12px] text-mygold font-NanumGothic not-italic font-bold leading-[9px] mb-2">
              일금
            </span>
            <span className="text-[12px] font-NanumGothic not-italic font-bold text-red-500 leading-[9px] mb-2">
              {num2han(biddingPrice) + '원'}
            </span>
          </div>
          <div className="flex flex-row gap-[20px] w-[90%]">
            <div className="flex justify-start md:w-[20%] w-[30%] pt-[20px] md:ml-[10px]">
              <span className="md:text-[15px] text-[12px] font-NanumGothic not-italic font-bold leading-[9px]">
                입찰보증금
              </span>
            </div>
            <div className="flex justify-end w-[100%] pt-[10px] mr-[10px]">
              <input
                type="text"
                id="number2"
                value={
                  biddingForm.depositPrice === 0
                    ? 0
                    : biddingForm.depositPrice.toLocaleString('ko-KR')
                }
                className="flex md:w-[100%] w-[95%] h-[30px] border border-gray-300 focus:outline-2 focus:outline-myyellow rounded-md pl-[10px]"
                onChange={(e) => {
                  setDepositPrice(
                    Number(e.target.value.toString().replaceAll(',', '')),
                  )
                  num2han(Number(e.target.value.toString().replaceAll(',', '')))
                  setBiddingForm({
                    ...biddingForm,
                    depositPrice: Number(
                      e.target.value.toString().replaceAll(',', ''),
                    ),
                  })
                }}
              />
            </div>
          </div>
          <div className="flex justify-between w-[85%] pt-[5px] border-b-2 border-myyellow">
            <span className="text-[12px] text-mygold font-NanumGothic not-italic font-bold leading-[9px] mb-2">
              일금
            </span>
            <span className="text-[12px] font-NanumGothic not-italic font-bold text-red-500 leading-[9px] mb-2">
              {num2han(depositPrice) + '원'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center md:w-[600px] w-[400px] gap-[10px] absolute md:top-[600px] top-[600px]">
        <button
          type="button"
          className="flex md:w-[30%] w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            setStateNum(15)
          }}
        >
          <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
            이전
          </span>
        </button>
        <button
          type="button"
          className="flex md:w-[60%] w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            biddingForm.biddingPrice < paymentsInfo.minimumAmount ? alert('최저가 이상으로 입찰해주세요') : handleGetBiddingFormUpdate()
          }}
        >
          <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
            다음
          </span>
        </button>
      </div>
    </div>
  )
}
