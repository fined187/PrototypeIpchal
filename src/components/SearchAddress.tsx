import { AgentInfoType, BiddingInfoType } from '@/interface/IpchalType'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import PopupContent from './PopupContent'
import { FieldErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { biddingInfoState } from '@/atom'

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

interface SearchAddressProps {
  stepNum?: number
  register?: UseFormRegister<BiddingInfoType>
  errors?: FieldErrors<BiddingInfoType>
  setError?: UseFormSetError<BiddingInfoType>
  agentRegister?: UseFormRegister<AgentInfoType>
  agentErrors?: FieldErrors<AgentInfoType>
  agentSetError?: UseFormSetError<AgentInfoType>
  handleModal: () => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function SearchAddress({
  stepNum,
  register,
  errors,
  setError,
  agentRegister,
  agentErrors,
  agentSetError,
  isOpen,
  setIsOpen,
}: SearchAddressProps) {
  const biddingForm = useRecoilValue(biddingInfoState)

  useEffect(() => {
    if (stepNum && biddingForm.bidAddr[stepNum - 1] === '') return

    if (setError) {
      setError('bidderAddr', { type: 'manual', message: '' })
    }
  }, [stepNum && biddingForm.bidAddr[stepNum - 1], setError])

  useEffect(() => {
    if (agentSetError) {
      agentSetError &&
        agentSetError('agentAddr', { type: 'manual', message: '' })
    }
  }, [agentErrors, agentSetError, biddingForm.agentAddr])

  return (
    <>
      <div className="flex flex-col w-[100%] h-[60px] gap-1">
        <div className="flex">
          <label
            htmlFor="addr"
            className="text-[12px] font-NanumGothic not-italic font-extrabold text-left"
          >
            주소
          </label>
        </div>
        <div className="flex flex-row gap-[5%]">
          {register && (
            <input
              {...register('bidderAddr', { required: true })}
              id="bidderAddr"
              readOnly
              type="text"
              className="border border-gray-300 focus:outline-2 focus:outline-yellow-500 rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2 w-[90%]"
              value={
                stepNum && biddingForm.bidAddr[stepNum - 1] === ''
                  ? ''
                  : stepNum && biddingForm.bidAddr[stepNum - 1]
              }
            />
            
          )}
          {agentRegister && (
            <input
              {...agentRegister('agentAddr', { required: true })}
              id="agentAddr"
              readOnly
              type="text"
              className="border border-gray-300 focus:outline-2 focus:outline-yellow-500 rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2 w-[90%]"
              value={
                biddingForm.agentAddr === ''
                  ? ''
                  : biddingForm.agentAddr
              }
            />
          )}
          <button
            className="text-white text-[13px] bg-myyellow rounded-md font-NanumGothic not-italic font-bold w-[25%] h-[40px]"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            주소검색
          </button>
        </div>
        <div className="flex flex-col w-[100%] h-[60px] gap-1">
          <div className="flex">
            <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left">
              상세주소
            </span>
          </div>
          {(register && (
            <input
              id="bidAddrDetail"
              type="text"
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-yellow-500 rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2 w-[100%]"
              value={
                stepNum && biddingForm.bidAddrDetail[stepNum - 1] === ''
                  ? ''
                  : stepNum && biddingForm.bidAddrDetail[stepNum - 1]
              }
            />
          ))}
          {(agentRegister && (
            <input
              id="agentAddrDetail"
              type="text"
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-yellow-500 rounded-md text-[15px] font-NanumGothic not-italic font-extrabold text-left h-[40px] px-2 w-[100%]"
              value={biddingForm.agentAddrDetail || ''}
            />
          ))}
        </div>
        {errors?.bidderAddr?.type === 'required' && (
          <div className="flex w-[100%] justify-start">
            <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
              주소를 입력해주세요
            </span>
          </div>
        )}
        {agentErrors?.agentAddr?.type === 'required' && (
          <div className="flex w-[100%] justify-start">
            <span className="text-[12px] font-NanumGothic not-italic font-extrabold text-left text-red-500">
              주소를 입력해주세요
            </span>
          </div>
        )}
      </div>
    </>
  )
}
