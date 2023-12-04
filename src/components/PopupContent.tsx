import { IpchalType } from "@/interface/IpchalType";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  Fragment,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import baseApiInstance from "@/pages/api/address";
import Pagination from "./Pagination";
import { IoClose } from "react-icons/io5";

interface PopupContentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
  formData: IpchalType;
}

export default function PopupContent({
  isOpen,
  setIsOpen,
  setFormData,
  formData,
}: PopupContentProps) {
  const cancelButtonRef = useRef(null);
  const [searchAddr, setSearchAddr] = useState<string>("");
  const [emptyView, setEmptyView] = useState<boolean>(false); // 검색결과 없을 때 뷰
  const [addrList, setAddrList] = useState([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hstry, setHstry] = useState<boolean>(false); // 변동된 주소정보 포함 여부 [true: 포함, false: 미포함
  const [firstSort, setFirstSort] = useState("none"); // 정렬기준 [none: 기본, road: 도로명 포함, location: 지번 포함]
  const [detailOpen, setDetailOpen] = useState<string>(""); // 상세보기 여부
  const countPerPage = 5;

  const [detailAddr, setDetailAddr] = useState<boolean>(false); // 상세주소 [상세주소] 입력창 오픈

  const handleInput = (e: HTMLInputElement) => {
    setSearchAddr(e.value);
  };

  const handleSearch = async (keyword: string, page: number) => {
    const param = {
      confmKey: process.env.NEXT_PUBLIC_ADDR_API_KEY,
      resultType: "json",
      currentPage: page,
      countPerPage: countPerPage,
      keyword: keyword,
      hstryYn: hstry ? "Y" : "N",
      firstSort: firstSort,
      addInfoYn: "Y",
    };
    try {
      const result = await baseApiInstance.get("/addrlink/addrLinkApi.do", {
        params: param,
      });
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
    if (currentPage === Math.ceil(totalCount / 5)) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (searchAddr.length > 0) {
      handleSearch(searchAddr, currentPage);
    }
  }, [currentPage, hstry, firstSort]);

  useEffect(() => {
    if (isOpen === false) {
      setSearchAddr("");
      setAddrList([]);
      setTotalCount(0);
      setCurrentPage(1);
    }
  }, [isOpen]);

  const handleRadioChange = (e: string) => {
    setFirstSort(e);
  };

  const handleDetailAddr = (e: HTMLInputElement) => {
    setFormData({
      ...formData,
      bidAddrDetail: e.value,
    });
  };

  return (
    <>
      {isOpen && (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setIsOpen}
          >
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
            <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto">
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full h-screen sm:my-8 sm:w-full sm:h-[800px] sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                      <div className="flex justify-center flex-col">
                        <div className="flex flex-row justify-between">
                          <div className="">
                            <span className="text-[13px] font-nanum not-italic font-extrabold text-left">
                              주소정보연계 | 도로명주소 안내시스템
                            </span>
                          </div>
                          <div
                            className="flex cursor-pointer"
                            onClick={() => {
                              setIsOpen(false);
                              setDetailAddr(false);
                              setFormData({
                                ...formData,
                                bidAddr: "",
                                bidAddrDetail: "",
                              });
                            }}
                          >
                            <IoClose className="flex" size={20} />
                          </div>
                        </div>
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
                              onClick={() =>
                                handleSearch(searchAddr, currentPage)
                              }
                            >
                              검색
                            </button>
                          </div>
                          <div className="flex flex-row gap-1 py-1">
                            <input
                              type="checkbox"
                              checked={hstry}
                              onChange={() => setHstry(!hstry)}
                            />
                            <div className="flex flex-row justify-between gap-2">
                              <span className="sm:text-[12px] text-[10px]">
                                변동된 주소 포함
                              </span>
                              <span className="text-[10px] text-blue-400 mt-[2px]">
                                예) 도로명(반포대로 58), 건물명(독립기념관),
                                지번(삼성동 25)
                              </span>
                            </div>
                          </div>
                          {addrList.length > 0 && !emptyView && !detailAddr && (
                            <>
                              <div className="flex flex-row w-full justify-between py-1">
                                <div className="flex flex-row">
                                  <span className="text-xs font-normal font-nanum">
                                    도로명주소 검색 결과
                                  </span>
                                  <span className="text-xs font-bold text-blue-500 ml-1">
                                    {`(${totalCount}건)`}
                                  </span>
                                </div>
                                <div className="flex flex-row gap-2">
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      defaultChecked
                                      id="none"
                                      value="none"
                                      name="orderBy"
                                      onChange={(e) =>
                                        handleRadioChange(e.target.value)
                                      }
                                    />
                                    <label className="ml-1 text-xs">
                                      정확도순
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="road"
                                      value="road"
                                      name="orderBy"
                                      checked={firstSort === "road"}
                                      onChange={(e) =>
                                        handleRadioChange(e.target.value)
                                      }
                                    />
                                    <label className="ml-1 text-xs">
                                      도로명 포함
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      id="location"
                                      value="location"
                                      name="orderBy"
                                      checked={firstSort === "location"}
                                      onChange={(e) =>
                                        handleRadioChange(e.target.value)
                                      }
                                    />
                                    <label className="ml-1 text-xs">
                                      지번 포함
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="border-t-2 border-b-2 border-black">
                                <div className="flex flex-row justify-between mt-1 mb-1 ml-2">
                                  <span className="text-xs font-bold font-nanum">
                                    No
                                  </span>
                                  <span className="text-xs font-bold font-nanum">
                                    도로명주소
                                  </span>
                                  <span className="text-xs font-bold font-nanum mr-2">
                                    우편번호
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                          {!detailAddr && (
                            <div
                              className={`flex w-full text-left ${
                                addrList.length === 0
                                  ? ""
                                  : "border border-spacing-1"
                              } rounded-md`}
                            >
                              {addrList.length > 0 && !emptyView && (
                                <>
                                  <div className="w-full">
                                    {addrList.map(
                                      (addr: any, index: number) => (
                                        <div
                                          key={index}
                                          className={`flex flex-row justify-between sm:overflow-hidden overflow-y-auto w-full items-center h-[100px] sm:max-h-[150px] sm:min-h-[100px] border-b-[1px] ${
                                            index % 2 === 0
                                              ? "bg-gray-50 hover:bg-gray-100"
                                              : "bg-white hover:bg-gray-100"
                                          }`}
                                        >
                                          <div className="relative px-2 w-full flex flex-row justify-between items-center">
                                            <span className="text-left text-[12px] font-nanum not-italic font-normal ml-1">
                                              {currentPage === 1
                                                ? index + 1
                                                : (currentPage - 1) * 5 +
                                                  index +
                                                  1}
                                            </span>
                                            <div className="flex flex-col flex-wrap sm:max-w-[300px] max-w-[240px] absolute left-8">
                                              <span
                                                className="text-left text-[12px] font-nanum not-italic font-extrabold"
                                                onClick={() => {
                                                  setFormData({
                                                    ...formData,
                                                    bidAddr: addr.roadAddrPart1,
                                                  });
                                                  setAddrList([]);
                                                  setEmptyView(false);
                                                  setDetailAddr(true);
                                                }}
                                              >
                                                {addr.roadAddr}
                                              </span>
                                              <span className="text-left text-[11px] font-nanum not-italic font-normal">
                                                {"[지번] " + addr.jibunAddr}
                                              </span>
                                              {detailOpen ===
                                                index.toString() && (
                                                <>
                                                  <div className="flex flex-row gap-1">
                                                    <span className="text-xs text-myBlue">
                                                      [관할주민센터]
                                                    </span>
                                                    <span className="text-xs">
                                                      {addr.hemdNm}
                                                    </span>
                                                  </div>
                                                  <span className="text-xs font-nanum font-bold text-myBlue">
                                                    ※ 관할주민센터는
                                                    참고정보이며, 실제와 다를 수
                                                    있습니다.
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                            <div className="flex flex-row gap-2 justify-end">
                                              {detailOpen ===
                                              index.toString() ? (
                                                <div
                                                  className="flex text-center items-center justify-center rounded-[5px] mr-1 bg-gray-400 w-[50px] h-[25px] cursor-pointer"
                                                  onClick={() =>
                                                    setDetailOpen("")
                                                  }
                                                >
                                                  <span className="text-[10px] text-white">
                                                    닫기
                                                  </span>
                                                </div>
                                              ) : (
                                                <div
                                                  className="flex bg-myBlue text-center items-center justify-center w-[50px] h-[25px] cursor-pointer rounded-[5px] mr-1"
                                                  onClick={() =>
                                                    setDetailOpen(
                                                      index.toString(),
                                                    )
                                                  }
                                                >
                                                  <span className="text-[10px] text-white">
                                                    상세보기
                                                  </span>
                                                </div>
                                              )}
                                              <span className="text-left text-[12px] font-nanum not-italic font-normal mr-1">
                                                {addr.zipNo}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </>
                              )}
                              {addrList.length === 0 &&
                                emptyView &&
                                !detailAddr && (
                                  <div className="w-full text-center items-center justify-center h-[50px]">
                                    <span className="text-[12px] font-nanum not-italic font-extrabold text-left">
                                      검색결과가 없습니다.
                                    </span>
                                  </div>
                                )}
                            </div>
                          )}
                          {detailAddr && (
                            <div className="flex flex-col w-full h-[350px] p-1 relative">
                              <div className="flex justify-start">
                                <span className="text-[12px] font-bold ">
                                  상세주소 입력
                                </span>
                              </div>
                              <div>
                                <div className="border-t border-gray-300 mt-6 w-full h-[150px] flex flex-col justify-center">
                                  <div className="w-[100%] flex flex-row h-[30%]">
                                    <div className="flex justify-center items-center w-[30%] h-[100%] bg-gray-100">
                                      <span className="text-sm font-bold font-nanum">
                                        도로명주소
                                      </span>
                                    </div>
                                    <div className="w-[70%] h-[100%] flex justify-center items-center">
                                      <span className="text-sm font-normal font-nanum">
                                        {formData.bidAddr}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-row w-[100%] h-[70%] border-t border-b border-black-200">
                                    <div className="flex justify-center items-center w-[30%] h-[100%] bg-gray-100">
                                      <span className="text-sm font-bold font-nanum">
                                        상세주소
                                      </span>
                                    </div>
                                    <div className="flex w-[70%] h-[100%] justify-center items-center">
                                      <input
                                        type="text"
                                        className="flex w-[90%] h-[50%] border border-gray-200"
                                        onChange={(e) =>
                                          handleDetailAddr(e.target)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex absolute bottom-0 left-[40%] w-[100%]">
                                <div
                                  className="flex justify-center items-center w-[100px] h-[40px] bg-blue-500 rounded-md cursor-pointer hover:bg-blue-300"
                                  onClick={() => {
                                    setDetailAddr(false);
                                    setIsOpen(false);
                                  }}
                                >
                                  <span className="text-sm text-white rounded-md">
                                    주소입력
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {addrList.length > 0 && !emptyView && !detailAddr && (
                            <Pagination
                              totalCount={totalCount}
                              currentPage={currentPage}
                              setCurrentPage={setCurrentPage}
                              pageUpClick={pageUpClick}
                              pageDownClick={() =>
                                setCurrentPage(currentPage - 1)
                              }
                              countPerPage={countPerPage}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
