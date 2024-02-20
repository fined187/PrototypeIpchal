import { biddingInfoState } from "@/atom";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function SearchIpchal() {
  const [loading, setLoading] = useState<boolean>(false)
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [getCase, setGetCase] = useState<string>('')
  const [getAuction, setGetAuction] = useState<string>('')
  const [searchResult, setSearchResult] = useState<number>(2)
  const [getData, setGetData] = useState<any>([''])

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

  const date = new Date()
  const nowDate = date.getFullYear().toString() + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1)).toString() + date.getDate().toString()

  return (
    <div id='box' className="flex w-[100%] justify-center bg-white relative">
      {loading && (
          <Spinner />
        )}
      <div className="flex flex-col md:w-[50%] w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
        <div className="flex md:pt-[100px] pt-[50px]">
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
            입찰예정 경매사건을 입력해 주세요.
          </span>
        </div>
        {searchResult === 1 ? (
          <div className="flex flex-row md:w-[550px] w-[90%] h-[200px] bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px]">
            <label htmlFor="yearSelect" className="sr-only">Select Year</label>
            <select id="yearSelect" className="border-gray border w-[150px] h-[40px] rounded-lg outline-myyellow">
              {Array.from({ length: parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - 1994 + 1) : (parseInt(nowDate.substring(0, 4)) - 1994 + 2) }).map((_, index) => (
                <option key={index} value={parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}>{parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}</option>
              ))}
            </select>
            &nbsp;
            <span className="font-['nanum] md:text-[1rem] text-[0.8rem]">
              타경
            </span>
            &nbsp;
            <label htmlFor="auctionInput" className="sr-only">Auction Number</label>
            <input 
              id="auctionInput"
              type="text"
              className="border-gray border w-[200px] h-[40px] rounded-lg outline-myyellow font-['nanum'] md:text-[1rem] text-[0.8rem] p-[10px]"
              value={getAuction}
              onChange={(e) => setGetAuction(e.target.value)}
              placeholder="Enter Auction Number"
            />
          </div>
        ) : searchResult === 2 && getData.length > 0 ? (
          <div className="flex flex-row w-[95%] h-[300px] bg-white md:mt-[200px] mt-[130px] justify-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px] overflow-y-auto">
            <div className="flex flex-row w-[95%] h-[30px] border border-black bg-gray-100">
              <div className="w-[15%] h-[100%] border-black border-r-[1px]">
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold ">
                  매각기일 / 용도
                </span>
              </div>
              <div className="w-[40%] h-[100%] border-black border-r-[1px]">
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold ">
                  물건기본내역
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            검색결과가 없습니다.
          </div>
        )}
      </div>
      <div className="flex flex-row fixed items-center md:bottom-[80px] bottom-[10px] gap-[10px] md:w-[550px] w-[90%] ">
        <button
          type="button"
          className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
        >
          <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
            이전
          </span>
        </button>
        <button
          type="button"
          className="flex w-[60%] md:w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            searchResult === 1 ? setSearchResult(2) : setSearchResult(1)
          }}
        >
          <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
            다음
          </span>
        </button>
      </div>
    </div>
  )
}