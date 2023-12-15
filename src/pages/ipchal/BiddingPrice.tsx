import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import { IpchalType } from '@/interface/IpchalType'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function BiddingPrice() {
  const [biddingPrice, setBiddingPrice] = useState<number>(0)
  const [depositPrice, setDepositPrice] = useState<number>(0)
  const [goNext, setGoNext] = useState<boolean>(false)
  const stateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)

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
    if (biddingForm.bidderNum > 1) {
      if (biddingForm.biddingPrice > 0 && biddingForm.depositPrice > 0) {
        setGoNext(true)
      } else {
        setGoNext(false)
      }
    } else {
      if (biddingForm.biddingPrice > 0 && biddingForm.depositPrice > 0) {
        setGoNext(true)
      } else {
        setGoNext(false)
      }
    }
  }, [biddingForm.biddingPrice, biddingForm.depositPrice])

  return (
    <div className="flex w-full h-screen bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[100%] h-screen bg-mybg items-center text-center relative">
        <span className="text-lg font-extrabold font-nanum not-italic leading-8">
          입찰 가격을 입력해주세요
        </span>
        <div className="flex flex-col w-full">
          <span className="text-[13px] font-bold font-nanum text-center leading-[11px]">
            감정가: <span className="text-mygold">18,000,000</span>
          </span>
          <span className="text-[13px] font-bold font-nanum text-center leading-[11px] mt-[10px]">
            최저가: <span className="text-mygold">10,000,000</span>
          </span>
          <div className="flex justify-center mt-5">
            <span className="text-[13px] font-bold font-nanum text-center leading-[11px] mt-[10px]">
              ※ 최저가 이상으로 입력해주세요
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[360px] min-h-[257px] max-h-[500px] bg-white absolute top-[145px] rounded-lg border-slate-500">
          <div className="flex w-full pt-[27px] pl-[10px]">
            <span className="text-[10px] font-nanum not-italic font-bold leading-[9px]">
              입찰금액
            </span>
          </div>
          <div className="flex w-full pt-[5px] pl-[10px]">
            <input
              type="text"
              id="number"
              value={biddingForm.biddingPrice.toLocaleString('ko-KR')}
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
              value={biddingForm.depositPrice.toLocaleString('ko-KR')}
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
        prevStepNum={biddingForm.bidderNum > 1 ? stateNum - 1 : stateNum - 2}
        nextStepNum={stateNum + 1}
        goNext={!goNext}
      />
    </div>
  )
}