'use client';
import { AgentInfoType, BiddingInfoType } from '@/model/IpchalType'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetError } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { biddingInfoState } from '@/atom'
import ModalAddr from './ModalAddr'
import { createPortal } from 'react-dom';

interface SearchAddressProps {
  stepNum?: number
  register?: UseFormRegister<BiddingInfoType>
  errors?: FieldErrors<BiddingInfoType>
  setError?: UseFormSetError<BiddingInfoType>
  agentRegister?: UseFormRegister<AgentInfoType>
  agentErrors?: FieldErrors<AgentInfoType>
  agentSetError?: UseFormSetError<AgentInfoType>
  biddingInfo?: BiddingInfoType
  setBiddingInfo?: Dispatch<SetStateAction<BiddingInfoType>>
  agentInfo?: AgentInfoType
  setAgentInfo?: Dispatch<SetStateAction<AgentInfoType>>
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  setValue?: any
  agentSetValue?: any
}

export default function SearchAddress({
  stepNum,
  register,
  errors,
  agentRegister,
  agentErrors,
  agentSetError,
  biddingInfo,
  setBiddingInfo,
  agentInfo,
  setAgentInfo,
  setValue,
  isOpen,
  onClose,
  onOpen,
  agentSetValue,
}: SearchAddressProps) {
  let [portalElement, setPortalElement] = useState<Element | null>(null);
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)

  useEffect(() => {
    setPortalElement(document.getElementById('portal'));
  }, [])

  const handleModal = () => {
    if (isOpen && onClose) {
      onClose()
      setBiddingForm((prev) => ({
        ...prev,
        isModalOpen: true,
      }))
    } else {
      onOpen && onOpen()
      setBiddingForm((prev) => ({
        ...prev,
        isModalOpen: true,
      }))
    }
  }
  
  return (
    <>
      <div className="flex flex-col w-[full]  gap-1">
        <div className="flex w-[100%] ">
          <div className='flex justify-between w-[100%]'>
            {errors?.bidderAddr?.type === 'required' && stepNum && (biddingForm?.bidAddr[stepNum - 1] === '') ? (
              <div className="flex w-[100%] justify-start">
                <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left text-red-500">
                  주소를 입력해주세요
                </span>
              </div>
            ) : (
                agentErrors?.agentAddr?.type === 'required' && (biddingForm.agentAddr === '') ? (
                  <div className="flex w-[70%] justify-start">
                    <span className="md:text-[20px] text-[12px] font-semibold font-['suit'] not-italic text-left text-red-500">
                      주소를 입력해주세요
                    </span>
                  </div>
                ) :
                (
                  <div className='flex flex-row justify-start w-[100%]'>
                    <label
                      htmlFor="addr"
                      className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]"
                    >
                      주소
                    </label>
                    <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] text-red-500">
                      *
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
        <div className="flex flex-row gap-[1%]">
          {register && (
            <input
              {...register('bidderAddr', { required: true })}
              id="bidderAddr"
              name='bidderAddr'
              readOnly
              type="text"
              className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue"
              value={stepNum && biddingForm?.bidAddr[stepNum - 1] ? biddingForm?.bidAddr[stepNum - 1] : ''}
            />
            
          )}
          {agentRegister && (
            <input
              {...agentRegister("agentAddr", { required: true })}
              id="agentAddr"
              readOnly
              type="text"
              className="border border-gray-300 rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] h-[40px] px-2 w-[95%] focus:outline-2 focus:outline-myBlue text-left"
              value={biddingForm.agentAddr ?? ''}
            />
          )}
          <button
            className="text-black bg-mySelect focus:outline-2 focus:outline-myBlue rounded-md w-[25%] h-[40px] border border-black"
            onClick={() => {
              handleModal && handleModal()
            }}
          >
            <span className="md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic text-left leading-[135%] tracking-[-2%]">
              주소검색
            </span>
          </button>
        </div>
        {/* 상세주소 */}
        <div className="flex flex-col w-[100%] bg-mybg gap-1">
          {(register && (
            <input
              id="bidAddrDetail"
              type="text"
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
              value={stepNum && biddingForm?.bidAddrDetail[stepNum - 1] ? biddingForm?.bidAddrDetail[stepNum - 1] : ''}
            />
          ))}
          {(agentRegister && (
            <input
              id="agentAddrDetail"
              type="text"
              readOnly
              className="border border-gray-300 focus:outline-2 focus:outline-myBlue rounded-md md:text-[20px] text-[16px] font-semibold font-['suit'] not-italic leading-[135%] tracking-[-2%] text-left h-[40px] px-2 w-[100%]"
              value={biddingForm.agentAddrDetail}
            />
          ))}
        </div>
      </div>
      {isOpen && portalElement ? (
        createPortal(
          <ModalAddr
            isOpen={isOpen}
            onClose={onClose}
            stepNum={stepNum}
            biddingInfo={biddingInfo}
            setBiddingInfo={setBiddingInfo}
            agentInfo={agentInfo}
            setAgentInfo={setAgentInfo}
            agentSetError={agentSetError}
            setValue={setValue}
            agentSetValue={agentSetValue}
          />
        , portalElement)
        )
        : null}
    </>
  )
}
