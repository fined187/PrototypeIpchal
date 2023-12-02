import { IpchalType } from "@/interface/IpchalType"
import { Dispatch, SetStateAction, useRef, useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import baseApiInstance from "@/pages/api/address";

interface SearchAddressProps {
  formData: IpchalType,
  setFormData: Dispatch<SetStateAction<IpchalType>>
}
const confmKey = process.env.NEXT_PUBLIC_ADDR_API_KEY;
const returnUrl = 'https://business.juso.go.kr';
const resultType = '4';
const useDetailAddress = 'Y';

export default function SearchAddress({ formData, setFormData }: SearchAddressProps) {
//U01TX0FVVEgyMDIzMTIwMTA5MTQwNzExNDMyNDE=
  const [isOpen, setIsOpen] = useState(false);
  const [searchAddr, setSearchAddr] = useState<string>('');
  const cancelButtonRef = useRef(null)

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInput = (e: HTMLInputElement) => {
    setSearchAddr(e.value);
  };

  const handleSearch = async(keyword: string) => {
    const param = {
      confmKey: process.env.NEXT_PUBLIC_ADDR_API_KEY,
      resultType: 'json',
      currentPage: 1,
      countPerPage: 10,
      keyword: searchAddr,
    };
    try {
      const result = await baseApiInstance.get('/addrlink/addrLinkApi.do', { params: param });
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-[80%] h-[60px] gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left">주소</span>
          <button className="text-[12px] font-nanum not-italic font-extrabold" onClick={handleModal}>
            주소검색
          </button>
        </div>
        <input 
          id="bidAddr"
          type="text"
          className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
          value={formData?.bidAddr}
          onChange={(e) => {
            setFormData({...formData, bidAddr: e.target.value})
          }}
        />
      </div>
      <div className="flex flex-col w-[80%] h-[60px] gap-1">
        <div className="flex">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left">상세주소</span>
        </div>
        <input 
          type="text"
          className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[100%]"
          value={formData?.bidAddrDetail}
          onChange={(e) => {
            setFormData({...formData, bidAddrDetail: e.target.value})
          }}
        />
      </div>
      {isOpen && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                      <div className="flex justify-center">
                        <div className="mt-3 text-center justify-center items-center w-full">
                          <div className="flex flex-row w-full">
                            <input 
                              type="text"
                              className="
                                border 
                                border-gray-300 
                                focus:border-myyellow 
                                rounded-md 
                                text-[12px] 
                                font-nanum 
                                not-italic 
                                font-extrabold 
                                text-left 
                                h-[30px] 
                                px-2 
                                w-[80%]"
                                onChange={(e) => handleInput(e.target)}
                            />
                            <button 
                              className="
                                ml-2
                                text-center
                                cursor-pointer
                                border 
                                border-gray-300 
                                focus:border-myyellow 
                                rounded-md 
                                text-[12px] 
                                font-nanum 
                                not-italic 
                                font-extrabold 
                                text-left 
                                h-[30px] 
                                px-2 
                                w-[20%]
                              "
                              onClick={() => handleSearch(searchAddr)}
                            >
                              검색
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        주소입력
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsOpen(false)}
                        ref={cancelButtonRef}
                      >
                        취소
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  )
}