import { biddingInfoState } from "@/atom";
import { TotalResultType } from "@/interface/IpchalType";
import { useRecoilState } from "recoil";
import IpchalText from "../coIpchalContent/IpchalText";

export default function SingleIpchalResult({ totalResult }: { totalResult: TotalResultType}) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)

  const handlePrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + totalResult?.bidPrice
    } else {
      return totalResult?.bidPrice?.toString()
    }
  }

  const handleDepositPrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + totalResult?.bidDeposit
    } else {
      return totalResult?.bidDeposit?.toString()
    }
  }

  return (
    <div className="flex flex-col bg-white max-h-[2600px] h-[1300px] w-[100%] mx-auto relative justify-center items-center" id="wrap-capture">
      <div className="flex flex-col bg-mybg h-[100%] md:w-[50%] w-[100%] mx-auto relative justify-center items-center" id="capture">
        <div className="w-[100%] md:max-w-[850px] overflow-x-scroll absolute top-[100px] h-[600px] bg-mybg scrollbar-hide">
          <div className="border border-black text-[1.5rem] md:w-[800px] w-[100%] h-[100%] m-auto bg-mybg">
            {/* 첫 번째 박스 */}
            <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
              <div className="flex absolute top-[0px] left-[0px] w-[100%] pl-[5px]">
                <span className="text-left md:text-[11pt] text-[10px] leading-[-1px]">
                  (앞면)
                </span>
              </div>
              <div className="justify-center items-center text-center absolute top-[20%] w-[100%]">
                <span className="md:text-[15pt] text-[15px] tracking-[20pt] leading-[23px] font-bold font-batang">
                  기일입찰표
                </span>
              </div>
              <div className="flex justify-between w-[100%] absolute bottom-[0px]">
                <div>
                  <span className="pl-[3px] md:text-[11pt] text-[12px] leading-[-1px] font-batang">
                    {totalResult && totalResult.reqCourtName + ' 집행관 귀하'}
                  </span>
                </div>
                <div>
                  <span className="md:text-[11pt] text-[12px] leading-[-1px] font-batang pr-[3px]">
                    입찰기일 :{' '}
                    {totalResult &&
                      totalResult?.biddingDate?.substring(0, 4)}
                    년 {totalResult?.biddingDate?.substring(4, 6)}월{' '}
                    {totalResult?.biddingDate?.substring(6, 8)}일
                  </span>
                </div>
              </div>
            </div>
            {/* 두 번째 박스 */}
            <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[7%]">
              <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                <span className="md:text-[11pt] text-[12px] font-batang">
                  사건
                  <br />
                  번호
                </span>
              </div>
              <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                <span className="md:text-[11pt] text-[12px] font-batang">
                  {totalResult &&
                    totalResult.caseYear +
                      ' 타경 ' +
                      totalResult.caseDetail + '호'}
                </span>
              </div>
              <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                <span className="md:text-[11pt] text-[12px] font-batang">
                  물건 
                  <br />
                  번호
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                <span className={`md:text-[11pt] text-[12px] font-batang`}
                >
                  {totalResult && totalResult?.mulNo
                    ? totalResult?.mulNo
                    : '1'}
                </span>
                <span className={`md:text-[9pt] text-[8px] font-batang`}>
                  ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                </span>
              </div>
            </div>
            {/* 세 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[50%]">
              <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5%]">
                <span className="md:text-[11pt] text-[12px] font-batang">
                  입<br />찰<br />자
                </span>
              </div>
              <div className="w-[100%] h-[100%]">
                <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                  <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                    <span className="md:text-[11pt] text-[12px] font-batang">본인</span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row items-stretch border-black border-b-[1px] h-[30%]">
                      <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                        <span className="md:text-[11pt] text-[12px] font-batang">성&nbsp;&nbsp;명</span>
                      </div>
                      <div className="flex items-center justify-center border-black border-r-[1px] w-[30%]">
                        <div className="flex w-[60%] justify-end">
                          <span className="md:text-[11pt] text-[12px] font-batang">
                            {totalResult && totalResult?.bidders?.length > 1
                              ? ''
                              : totalResult && totalResult?.bidders[0]?.name}
                          </span>
                        </div>
                        <div className="flex w-[40%] justify-end mr-1">
                          <span className="md:text-[11pt] text-[12px] font-batang text-right">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                        <span className="md:text-[11pt] text-[12px] font-batang">전화번호</span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[30%]">
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          {
                            totalResult && totalResult?.bidders[0]?.phoneNo.length === 10 ? totalResult?.bidders[0]?.phoneNo.substring(0, 2) + '-' + totalResult?.bidders[0]?.phoneNo.substring(2, 6) + '-' + totalResult?.bidders[0]?.phoneNo.substring(6, 10) : totalResult && totalResult?.bidders[0]?.phoneNo.substring(0, 3) + '-' + totalResult?.bidders[0]?.phoneNo.substring(3, 7) + '-' + totalResult?.bidders[0]?.phoneNo.substring(7, 11)
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row border-black border-b-[1px] h-[35%]">
                      <div className="flex justify-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          주민(사업자)
                          <br />
                          등록번호
                        </span>
                      </div>
                      <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          {biddingInfo.bidCorpYn[0] === 'I' ? (
                            biddingInfo.bidIdNum1[0] + '-' + biddingInfo.bidIdNum2[0]
                          ): (
                            totalResult && totalResult?.bidders[0].companyNo.substring(0, 3) + '-' + totalResult?.bidders[0].companyNo.substring(3, 5) + '-' + totalResult?.bidders[0].companyNo.substring(5, 10)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-center items-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          법인등록
                          <br />
                          번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[30%] text-center leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {totalResult && totalResult?.bidders?.length > 1 || totalResult?.bidders[0]?.corporationNo === null
                            ? ''
                            : totalResult &&
                              totalResult?.bidders[0]?.corporationNo?.substring(0, 6) + '-' + totalResult?.bidders[0]?.corporationNo?.substring(6, 13)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row h-[35%]">
                      <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">주&nbsp;&nbsp;소</span>
                      </div>
                      <div className="flex justify-center items-center w-[80%] leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {totalResult && totalResult?.bidders?.length > 1
                            ? ''
                            : totalResult &&
                              totalResult?.bidders[0]?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                  <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                    <span className="md:text-[14px] text-[12px] font-batang">대리인</span>
                  </div>
                  <div className="w-[90%]">
                    <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                      <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">성&nbsp;&nbsp;명</span>
                      </div>
                      <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                        <div className="flex w-[60%] justify-end">
                          <span className="md:text-[11pt] text-[12px] font-batang text-center">
                            {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName : ''}
                          </span>
                        </div>
                        <div className="flex w-[40%] justify-end mr-1">
                          <span className="md:text-[11pt] text-[12px] font-batang text-center">(인)</span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          본인과의
                          <br />
                          관계
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[30%]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {biddingInfo.bidder === 'agent' && biddingInfo.agentRel ? biddingInfo.agentRel : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                      <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          주민등록번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) +
                            '-' +
                            biddingInfo.agentIdNum.substring(6, 14) : ''}
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          전화번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[30%]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {
                            totalResult && totalResult?.agent !== null ? 
                            totalResult?.agent?.phoneNo.length === 10 ?
                            totalResult?.agent?.phoneNo.substring(0, 2) + '-' + totalResult?.agent?.phoneNo.substring(2, 6) + '-' + totalResult?.agent?.phoneNo.substring(6, 10) 
                              : totalResult?.agent?.phoneNo.substring(0, 3) + '-' + totalResult?.agent?.phoneNo.substring(3, 7) + '-' + totalResult?.agent?.phoneNo.substring(7, 11) : ''
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-stretch h-[30%]">
                      <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">주&nbsp;&nbsp;소</span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[80%]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {
                            totalResult && totalResult?.agent !== null ? 
                            totalResult?.agent?.address : ''
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 네 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[15%]">
              <div className="w-[5%] border-black border-r-[1px] h-[100%] justify-center items-center text-center">
                <span className="md:text-[12pt] text-[10px] font-batang">
                  입찰
                  가격
                </span> 
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">천억</span>
                </div>
                <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 1) === '0'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(0, 1)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">백억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 2) === '00'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(1, 2)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]  leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">십억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 3) === '000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(2, 3)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 4) === '0000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(3, 4)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">천만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 5) === '00000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(4, 5)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">백만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 6) === '000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(5, 6)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">십만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 7) === '0000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(6, 7)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 8) === '00000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(7, 8)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">천</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 9) === '000000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(8, 9)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">백</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 10) === '0000000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(9, 10)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">십</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 11) === '00000000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(10, 11)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">일</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    handlePrice(
                      totalResult?.bidPrice?.toString().length,
                    )?.substring(0, 12) === '000000000000'
                      ? ''
                      : totalResult &&
                        handlePrice(
                          totalResult?.bidPrice?.toString().length,
                        )?.substring(11, 12)}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[100%] w-[100%] border-black border-r-[2px] leading-[70%] text-center">
                  <div className="h-[50%]">
                    <span className="md:text-[11pt] text-[10px] font-batang">
                      <br />
                    </span>
                  </div>
                  <div>
                    <span className="md:text-[11pt] text-[14px] font-batang">
                      원
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[5%] border-black border-r-[1px] h-[100%] justify-center items-center text-center">
                <span className="md:text-[11pt] text-[10px] font-batang">
                  보증
                  <br />
                  금액
                </span>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">천억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                    totalResult?.bidDeposit?.toString().length === 12
                      ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                      : ''}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">백억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(1, 2))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">십억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(2, 3))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 4) === '0000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(3, 4))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">천만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 5) === '00000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(4, 5))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">백만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 6) === '000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(5, 6))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">십만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 7) === '0000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(6, 7))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 8) === '00000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(7, 8))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">천</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 9) === '000000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(8, 9))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">백</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 10) === '0000000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(9, 10))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">십</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 11) === '00000000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(10, 11))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">일</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {totalResult &&
                      (handleDepositPrice(
                        totalResult?.bidDeposit?.toString().length,
                      )?.substring(0, 12) === '000000000000'
                        ? ''
                        : totalResult &&
                          handleDepositPrice(
                            totalResult?.bidDeposit?.toString().length,
                          )?.substring(11, 12))}
                  </span>
                </div>
              </div>
              <div className="w-[3.46%] h-[100%]">
                <div className="h-[100%] w-[100%] border-black leading-[70%] text-center">
                  <div className="h-[50%]">
                    <span className="md:text-[11pt] text-[10px] font-batang">
                      <br />
                    </span>
                  </div>
                  <div>
                    <span className="md:text-[11pt] text-[14px] font-batang">
                      원
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 다섯 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch w-[100%] h-[13%]">
                <div className="flex flex-row w-[49.9%] border-black border-r-[2px] h-[100%]">
                  <div className='flex items-center justify-start w-[30%] h-[100%] ml-[10px]'>
                    <span className="text-[11pt] text-left font-batang">
                      보증의 
                      <br />
                      제공방법
                    </span>
                  </div>
                  <div className="flex flex-col justify-center w-[70%] h-[100%]">
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'M' ? true : false}
                        className="w-[15px] h-[15px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] font-batang mt-1">현금·자기앞수표</span>
                    </div>
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[15px] h-[15px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] font-batang mt-1">
                        보증서
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                  <div className="flex justify-start">
                    <span className="text-[11pt] text-left font-batang ml-[10px]">
                      보증을 반환 받았습니다.
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <div className='flex justify-between w-[70%] items-center'>
                      <span className="text-[11pt] font-batang mr-[10px]">
                        입찰자{' '}
                      </span>
                      <span className="text-[11pt] font-batang mr-[10px]">
                        {totalResult && totalResult.agent !== null ? totalResult && totalResult?.agent?.name : totalResult && totalResult.bidders[0].name}
                      </span>
                      <span className="text-[11pt] font-batang mr-[10px]">
                        (인)
                      </span>
                  </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <IpchalText />
      </div>
    </div>
  )
}