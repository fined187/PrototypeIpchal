import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import { IpchalType } from '@/interface/IpchalType'
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
    bidDeposit: 0
  })

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
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingForm.mstSeq}/payments`);
        if (response.status !== 200) throw new Error('에러');
        setPaymentsInfo({
          ...paymentsInfo,
          biddingTime: response.data.data.biddingInfoList[0].biddingTime,
          appraisalAmount: response.data.data.biddingInfoList[0].appraisalAmount,
          minimumAmount: response.data.data.biddingInfoList[0].minimumAmount,
          bidDeposit: response.data.data.biddingInfoList[0].bidDeposit
        })
        if (biddingForm.biddingPrice === 0) {
          setBiddingForm({
            ...biddingForm,
            biddingPrice: response.data.data.biddingInfoList[0].minimumAmount
          })
        }
        if (biddingForm.depositPrice === 0) {
          setBiddingForm({
            ...biddingForm,
            depositPrice: response.data.data.biddingInfoList[0].bidDeposit
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetBiddingPrice();
  }, [])

  const handleBiddingPrice = () => {
    if (biddingForm.biddingPrice >= paymentsInfo.minimumAmount && biddingForm.depositPrice >= paymentsInfo.bidDeposit) {
      setStateNum(stateNum + 1)
    } else {
      alert('입찰금액과 입찰보증금을 확인해주세요')
    }
  }

  console.log(biddingForm)

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <span className="text-lg font-extrabold font-nanum not-italic leading-8">
          입찰 가격을 입력해주세요
        </span>
        <div className="flex flex-col w-full">
          <span className="text-[13px] font-bold font-nanum text-center leading-[11px]">
            감정가: <span className="text-mygold">{paymentsInfo.appraisalAmount.toLocaleString('ko-KR')}</span>
          </span>
          <span className="text-[13px] font-bold font-nanum text-center leading-[11px] mt-[10px]">
            최저가: <span className="text-mygold">{paymentsInfo.minimumAmount.toLocaleString('ko-KR')}</span>
          </span>
          <div className="flex justify-center mt-5">
            <span className="text-[13px] font-bold font-nanum text-center leading-[11px] mt-[10px]">
              ※ 최저가 이상으로 입력해주세요
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[420px] min-h-[257px] max-h-[500px] bg-white absolute top-[145px] rounded-lg border-slate-500">
          <div className="flex w-full pt-[27px] pl-[10px]">
            <span className="text-[10px] font-nanum not-italic font-bold leading-[9px]">
              입찰금액
            </span>
          </div>
          <div className="flex w-full pt-[5px] pl-[10px]">
            <input
              type="text"
              id="number"
              value={biddingForm.biddingPrice === 0 ? 0 : biddingForm.biddingPrice.toLocaleString('ko-KR')}
              className="flex w-[95%] border border-gray-300 rounded-md"
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
          <div className="flex justify-between w-[95%] pt-[5px] border-b-2 border-myyellow ml-2">
            <span className="text-[10px] font-nanum not-italic font-bold leading-[9px] mb-2">
              일금
            </span>
            <span className="text-[10px] font-nanum not-italic font-bold text-red-500 leading-[9px] mb-2">
              {num2han(biddingPrice) + '원'}
            </span>
          </div>
          <div className="flex w-full pt-[27px] pl-[10px]">
            <span className="text-[10px] font-nanum not-italic font-bold leading-[9px]">
              입찰보증금
            </span>
          </div>
          <div className="flex w-full pt-[5px] pl-[10px]">
            <input
              type="text"
              id="number2"
              value={biddingForm.depositPrice === 0 ? 0 : biddingForm.depositPrice.toLocaleString('ko-KR')}
              className="flex w-[95%] border border-gray-300 rounded-md"
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
          <div className="flex justify-between w-[95%] pt-[5px] border-b-2 border-myyellow ml-2">
            <span className="text-[10px] font-nanum not-italic font-bold leading-[9px] mb-2">
              일금
            </span>
            <span className="text-[10px] font-nanum not-italic font-bold text-red-500 leading-[9px] mb-2">
              {num2han(depositPrice) + '원'}
            </span>
          </div>
        </div>
      </div>
      <Button
        prevStepNum={stateNum - 2}
        nextStepNum={stateNum + 1}
        handleBiddingPrice={handleBiddingPrice}
      />
    </div>
  )
}
