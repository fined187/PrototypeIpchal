import { biddingInfoState, stepState } from "@/atom";
import { GetBiddingInfoType, TotalResultType } from "@/interface/IpchalType";
import { useRecoilValue } from "recoil";

interface CoIpchalListProps {
  totalResult?: TotalResultType;
}

export default function CoIpchalListContent({ totalResult }: CoIpchalListProps) {
  const biddingInfo = useRecoilValue(biddingInfoState);

  return (
    <div className={`flex flex-col bg-white h-[1300px] w-[100%] mx-auto justify-center items-center absolute top-[2600px] overflow-x-scroll scrollbar-hide`}>
      <div className="flex flex-col bg-white h-[100%] w-[100%] m-auto absolute top-0 items-center">
        <span className="md:text-[18pt] text-[15px] font-batang py-[30px]">
          공 동 입 찰 자 목 록
        </span>
      </div>
      <div className="flex md:w-[80%] w-[100%] h-[1100px] border border-black absolute top-[120px]">
        <div className="flex flex-col w-[50px] md:w-[100px] h-[100%] border-black border-r-[1px]">
          <div className="flex justify-center items-center border-black border-b-[1px] w-[100%] h-[50px]">
            <span className="md:text-[12pt] text-[12px] font-batang">
              번호
            </span>
          </div>
          {Array(10).fill(10).map((_, idx) => {
            return (
            <div className={`flex justify-center items-center border-black ${idx === 9 ? '' : 'border-b-[1px]'} w-[100%] h-[105px]`} key={idx}>
              <span className="md:text-[12pt] text-[12px] font-batang">
                {idx + 1}
              </span>
            </div>
            )
          })}
        </div>
        <div className="flex flex-col w-[100%]">
          <div className="flex flex-row w-[100%] h-[50px] border-black border-b-[1px] justify-start items-center">
            <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
              <span className="md:text-[12pt] text-[12px] font-batang">
                성명
              </span>
            </div>
            <div className="flex flex-col w-[60%] h-[100%] border-black border-r-[1px] justify-center items-center">
              <div className="border-black border-b-[1px] w-[100%] justify-center items-center text-center">
                <span className="md:text-[12pt] text-[12px] font-batang">
                  주소
                </span>
              </div>
              <div className="flex flex-row w-[100%] justify-center items-center text-center h-[100%]">
                <div className="flex w-[100%] border-black border-r-[1px] justify-center items-center text-center h-[100%]">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    주민등록번호
                  </span>
                </div>
                <div className="flex w-[100%] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    전화번호
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-[20%] justify-center items-center">
              <span className="md:text-[12pt] text-[12px] font-batang">
                지분
              </span>
            </div>
          </div>
          {Array(10).fill('').map((_, idx) => {
            return (
            <div className={`flex flex-row w-[100%] h-[105px] border-black ${idx === 9 ? '' : 'border-b-[1px]'} justify-start items-center text-center`} key={idx}>
              <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                <div className="flex justify-between items-center text-center w-[100%]">
                  <div className="flex w-[60%] justify-end">
                    <span className="md:text-[12pt] text-[10px] font-batang">
                      {totalResult && totalResult.bidders[idx]?.name ? totalResult && totalResult.bidders[idx]?.name : ''}
                    </span>
                  </div>
                  <div className="flex w-[40%] mr-1 justify-end">
                    <span className="md:text-[12pt] text-[10px] font-batang">
                      {' (인)'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[60%] h-[100%] border-black border-r-[1px]">
                <div className="flex border-black border-b-[1px] w-[100%] h-[50%] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[12px] font-batang">
                    {totalResult && totalResult.bidders[idx]?.address ? totalResult && totalResult.bidders[idx]?.address : ''}
                  </span>
                </div>
                <div className="flex flex-row w-[100%] h-[50%]">
                  <div className="flex w-[100%] h-[100%] border-black border-r-[1px] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                      {totalResult && totalResult.bidders[idx]?.bidderType === 'I' ? biddingInfo.bidIdNum[idx]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[idx]?.substring(6, 13) : totalResult && totalResult.bidders[idx]?.bidderType === 'C' ? totalResult && totalResult.bidders[idx]?.companyNo?.substring(0, 3) + '-' + totalResult.bidders[idx]?.companyNo?.substring(3, 5) + '-' + totalResult.bidders[idx]?.companyNo?.substring(5, 10): ''}
                    </span>
                  </div>
                  <div className="flex w-[100%] h-[100%] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[12px] font-batang">
                    {biddingInfo && biddingInfo.bidPhone[idx] ? biddingInfo && biddingInfo.bidPhone[idx].length === 10 ? biddingInfo.bidPhone[idx].substring(0, 2) + '-' + biddingInfo.bidPhone[idx].substring(2, 6) + '-' + biddingInfo.bidPhone[idx].substring(6, 10) : biddingInfo.bidPhone[idx].length === 11 ? biddingInfo.bidPhone[idx].substring(0, 3) + '-' + biddingInfo.bidPhone[idx].substring(3, 7) + '-' + biddingInfo.bidPhone[idx].substring(7, 11) : '' : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-[20%] justify-center items-center">
                <span className="md:text-[12pt] text-[12px] font-batang text-red-500 font-bold">
                  {totalResult && totalResult.bidders[idx]?.share ? totalResult && totalResult.bidders[idx]?.share : ''}
                </span>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}