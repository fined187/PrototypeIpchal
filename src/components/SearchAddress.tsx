import { IpchalType } from "@/interface/IpchalType"
import { Dispatch, SetStateAction, useRef, useState, Fragment, useEffect } from "react"
import { Dialog, Transition } from '@headlessui/react'
import baseApiInstance from "@/pages/api/address";
import Pagination from "./Pagination";

interface SearchAddressProps {
  formData: IpchalType,
  setFormData: Dispatch<SetStateAction<IpchalType>>
}

export default function SearchAddress({ formData, setFormData }: SearchAddressProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchAddr, setSearchAddr] = useState<string>('');
  const cancelButtonRef = useRef(null);

  const [emptyView, setEmptyView] = useState<boolean>(false); // 검색결과 없을 때 뷰
  const [addrList, setAddrList] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInput = (e: HTMLInputElement) => {
    setSearchAddr(e.value);
  };

  const handleSearch = async(keyword: string, page: number) => {
    const param = {
      confmKey: process.env.NEXT_PUBLIC_ADDR_API_KEY,
      resultType: 'json',
      currentPage: page,
      countPerPage: 10,
      keyword: keyword,
    };
    try {
      const result = await baseApiInstance.get('/addrlink/addrLinkApi.do', { params: param });
      if (result) {
        console.log(result);
        setEmptyView(true);
        setAddrList(result.data.results.juso);
        setTotalCount(result.data.results.common.totalCount);
      }
      setEmptyView(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pageUpClick = () => {
    if (currentPage === Math.ceil(totalCount / 10)) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (searchAddr.length > 0) {
      handleSearch(searchAddr, currentPage);
    }
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col w-[80%] h-[60px] gap-1">
        <div className="flex">
          <span className="text-[10px] font-nanum not-italic font-extrabold text-left">주소</span>
        </div>
        <div className="flex flex-row justify-between gap-[5%]">
          <input 
            readOnly
            type="text"
            className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[70%]"
            value={formData?.bidAddr}
          />
          <button className="text-white text-[12px] bg-myyellow rounded-md font-nanum not-italic font-bold w-[25%]" onClick={handleModal}>
            주소검색
          </button>
        </div>
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
                                border-blue-300
                                hover:bg-blue-300
                                rounded-md 
                                text-[12px] 
                                font-nanum 
                                not-italic 
                                font-extrabold 
                                text-left 
                                h-[30px] 
                                px-2 
                                w-[20%]
                                bg-blue-500
                                text-white
                              "
                              onClick={() => handleSearch(searchAddr, currentPage)}
                            >
                              검색
                            </button>
                          </div>
                          <div className={`flex w-full text-left ${addrList.length === 0 ? '' : 'border border-spacing-1'} mt-1 rounded-md`}>
                            {addrList.length > 0 && !emptyView && (
                              <div className="w-full">
                                {addrList.map((addr: any, index: number) => (
                                  <div key={index} className="flex w-full h-[50px] border-b-[1px]">
                                    <button
                                      className="text-[12px] w-full text-left px-2 font-nanum not-italic font-extrabold cursor-pointer"
                                      onClick={() => {
                                        setFormData({...formData, bidAddr: addr.roadAddrPart1});
                                        setAddrList([]);
                                        setIsOpen(false);
                                        setEmptyView(false);
                                      }}
                                    >
                                      {addr.roadAddrPart1}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            {addrList.length === 0 && emptyView && (
                              <div className="w-full text-center items-center justify-center h-[50px]">
                                <span className="text-[12px] font-nanum not-italic font-extrabold text-left">검색결과가 없습니다.</span>
                              </div>
                            )}
                          </div>
                          {addrList.length > 0 && !emptyView && (
                            <Pagination 
                              totalCount={totalCount}
                              currentPage={currentPage}
                              setCurrentPage={setCurrentPage}
                              pageUpClick={pageUpClick}
                              pageDownClick={() => setCurrentPage(currentPage - 1)}
                            />
                          )}
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
                        onClick={() => {
                          setIsOpen(false);
                          setAddrList([]);
                        }}
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