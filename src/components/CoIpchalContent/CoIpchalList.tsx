import { biddingInfoState } from "@/atom";
import { GetBiddingInfoType } from "@/interface/IpchalType";
import { useRecoilValue } from "recoil";

interface CoIpchalListProps {
  totalResult: GetBiddingInfoType;
}

export default function CoIpchalList({ totalResult }: CoIpchalListProps) {
  const biddingInfo = useRecoilValue(biddingInfoState);
  return (
    <div className="flex flex-col bg-mybg h-[1300px] w-screen m-auto justify-center items-center relative overflow-x-scroll scrollbar-hide">
      <div className="flex absolute top-0">
        <p className="text-[22px] font-bold py-[30px]">
          공 동 입 찰 자 목 록
        </p>
      </div>
      <div className="flex sm:w-[800px] min-w-[800px] h-[1100px] border border-black absolute top-[150px]">
        <div className="flex flex-col w-[100px] h-[100%] border-black border-r-[1px]">
          <div className="flex justify-center items-center border-black border-b-[1px] w-[100px] h-[50px]">
            번호
          </div>
          {totalResult && totalResult?.bidders.map((_, idx) => {
            return (
            <div className="flex justify-center items-center border-black border-b-[1px] w-[100px] h-[105px]">
              {idx + 1}
            </div>
            )
          })}
        </div>
        <div className="flex flex-col w-[100%]">
          <div className="flex flex-row w-[100%] h-[50px] border-black border-b-[1px] justify-start items-center">
            <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
              <p className="text-[15px] font-nanum font-normal">
                성명
              </p>
            </div>
            <div className="flex flex-col w-[80%] justify-center items-center">
              <div className="border-black border-b-[1px] w-[100%] justify-center items-center text-center">
                <p className="text-[15px] font-nanum font-normal">
                  주소
                </p>
              </div>
              <div className="flex flex-row w-[100%] justify-center items-center text-center h-[100%]">
                <div className="flex w-[100%] border-black border-r-[1px] justify-center items-center text-center h-[100%]">
                  <p className="text-[15px] font-nanum font-normal">
                    주민등록번호
                  </p>
                </div>
                <div className="flex w-[100%] justify-center items-center text-center">
                  <p className="text-[15px] font-nanum font-normal">
                    전화번호
                  </p>
                </div>
              </div>
            </div>
          </div>
          {totalResult && totalResult?.bidders.map((el, idx) => {
            return (
            <div className="flex flex-row w-[100%] h-[105px] border-black border-b-[1px] justify-start items-center text-center" key={idx}>
              <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                <p className="text-[15px] font-nanum font-normal">
                  {el.name + ' (인)'}
                </p>
              </div>
              <div className="flex flex-col w-[80%] h-[100%]">
                <div className="flex border-black border-b-[1px] w-[100%] h-[50%] justify-center items-center text-center">
                  <p className="text-[15px] font-nanum font-normal">
                    {el.address}
                  </p>
                </div>
                <div className="flex flex-row w-[100%] h-[50%]">
                  <div className="flex w-[100%] h-[100%] border-black border-r-[1px] justify-center items-center text-center">
                    <p className="text-[15px] font-nanum font-normal">
                      {biddingInfo.bidCorpYn[idx] === 'I' ?  biddingInfo.bidIdNum1[idx] + '-' + biddingInfo.bidIdNum1[idx] : biddingInfo.bidCorpNum1[idx] + '-' + biddingInfo.bidCorpNum2[idx] + '-' + biddingInfo.bidCorpNum3[idx]}
                    </p>
                  </div>
                  <div className="flex w-[100%] h-[100%] justify-center items-center text-center">
                    <p className="text-[15px] font-nanum font-normal">
                      {el.phoneNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}