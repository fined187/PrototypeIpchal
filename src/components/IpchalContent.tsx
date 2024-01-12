import { biddingInfoState } from "@/atom"
import { Dispatch, SetStateAction } from "react"
import { useRecoilValue } from "recoil"

export default function IpchalContent({ setOpenPdf }: {setOpenPdf: Dispatch<SetStateAction<boolean>>}) {
  const biddingInfo = useRecoilValue(biddingInfoState)
  const handlePrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + biddingInfo?.biddingPrice
    } else {
      return biddingInfo?.biddingPrice?.toString()
    }
  }

  const handleDepositPrice = (len: number) => {
    if (12 - len > 0) {
      return '0'.repeat(12 - len) + biddingInfo?.depositPrice
    } else {
      return biddingInfo?.depositPrice?.toString()
    }
  }

  return (
    <>
      {biddingInfo.bidName.length === 1 && (
        <div className="flex-col bg-mybg w-[600px] h-[800px] max-h-[2000px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
          <div className="text-[22px] font-bold text-center py-[10px] w-[600px] absolute top-0 bg-mybg">
            입찰표
          </div>
          <div className="w-[600px] mx-auto absolute top-[60px] h-[100%] bg-mybg">
            <div className="border border-black text-[1.5rem] text-center min-w-[420px] md:max-w-[600px] h-[100%] m-auto bg-mybg">
              {/* 첫 번째 박스 */}
              <div className="p-[1%] pb-0 border-black border-b-[1px] h-[15%]">
                <div className="text-left text-[14px]">(앞면)</div>
                <div className="text-[19px] font-semibold">
                  기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                </div>
                <div className="flex flex-row justify-between items-stretch">
                  <div>
                    <span className="text-[12px] font-semibold font-NanumGothic text-center">
                      {biddingInfo.reqCourtName + ' 귀하'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold font-NanumGothic text-center">
                      입찰기일 :{' '}
                      {biddingInfo.ipchalDate.substring(0, 4)}년{' '}
                      {biddingInfo.ipchalDate.substring(4, 6)}월{' '}
                      {biddingInfo.ipchalDate.substring(6, 8)}일
                    </span>
                  </div>
                </div>
              </div>
              {/* 두 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] text-center h-[12%]">
                <div className="border-black border-r-[1px] w-[8%]">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold text-center">
                    사건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[42%] text-center">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold">
                    {biddingInfo.sagunNum}
                  </span>
                </div>
                <div className="border-black border-r-[1px] w-[8%] justify-center items-center text-center">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold">
                    물건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center text-center w-[42%]">
                  <span
                    className={biddingInfo.mulgunNum
                        ? 'text-[12px] font-bold font-NanumGothic'
                        : 'text-[8px] font-bold font-NanumGothic'
                    }
                  >
                    {biddingInfo.mulgunNum ? biddingInfo.mulgunNum : ''}
                  </span>
                </div>
              </div>
              {/* 세 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                  <span className="text-[14px] font-bold font-NanumGothic">
                    입<br />찰<br />자
                  </span>
                </div>
                <div className="w-[100%] h-[100%]">
                  <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                    <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                      <span className="text-[14px] font-NanumGothic">본인</span>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[30%]">
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px]">성명</span>
                        </div>
                        <div className="flex justify-center text-center items-center border-black border-r-[1px] w-[30%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidName.length > 1
                              ? ''
                              : biddingInfo.bidName[0]}
                          </span>
                          <span className="mr-1 text-[12px] float-right">
                            (인)
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px]">전화번호</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px]">
                            {biddingInfo?.bidPhone.length > 1
                              ? ''
                              : biddingInfo.bidPhone[0].length === 10 ? biddingInfo.bidPhone[0].substring(0, 2) + '-' + biddingInfo.bidPhone[0].substring(2, 6) + '-' + biddingInfo.bidPhone[0].substring(6, 10) : biddingInfo.bidPhone[0].substring(0, 3) + '-' + biddingInfo.bidPhone[0].substring(3, 7) + '-' + biddingInfo.bidPhone[0].substring(7, 11)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row border-black border-b-[1px]">
                        <div className="flex justify-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px] font-NanumGothic">
                            주민(사업자)
                            <br />
                            등록번호
                          </span>
                        </div>
                        <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidIdNum[0].toString().substring(0, 6)}-
                            {biddingInfo.bidIdNum[0].toString().substring(6, 14)}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px]">
                            법인등록
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-[30%] text-center">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidCorpRegiNum.length > 1 || biddingInfo.bidCorpRegiNum[0] === null
                              ? '-'
                              : biddingInfo?.bidCorpRegiNum[0]?.substring(0, 3) + '-' + biddingInfo?.bidCorpRegiNum[0]?.substring(3, 5) + '-' + biddingInfo?.bidCorpRegiNum[0]?.substring(5, 10)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[40%]">
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12px] font-NanumGothic">주소</span>
                        </div>
                        <div className="flex justify-center items-center w-[80%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidAddr.length > 1
                              ? ''
                              : biddingInfo.bidAddr[0] + ' ' + biddingInfo.bidAddrDetail[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                    <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                      <span className="text-[14px] font-NanumGothic">대리인</span>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px]">성명</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentName : ''}
                          </span>
                          <span className="text-[12px] mr-1">(인)</span>
                        </div>
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px]">
                            본인과의
                            <br />
                            관계
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentRel : '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-NanumGothic">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="font-NanumGothic text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 14) : '-'}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-NanumGothic">전화번호</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentPhone : '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch h-[30%]">
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px] font-NanumGothic">주소</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentAddr + biddingInfo.agentAddrDetail : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 네 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[25%]">
                <div className="w-[4.7%] border-black border-r-[1px] h-[100%]">
                  <span className="text-[14px] font-NanumGothic font-bold">
                    입
                    <br />
                    찰
                    <br />
                    가
                    <br />격
                  </span>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 1) === '0'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(1, 2)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo?.biddingPrice.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : handlePrice(
                            biddingInfo?.biddingPrice.toString().length,
                          )?.substring(2, 3)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 4) === '0000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(3, 4)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 5) === '00000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(4, 5)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 6) === '000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(5, 6)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 7) === '0000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(6, 7)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 8) === '00000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(7, 8)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 9) === '000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(8, 9)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 10) === '0000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(9, 10)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 11) === '00000000000'
                        ? ''
                        :handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(10, 11)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 12) === '000000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(11, 12)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                  <span className="text-[15px] font-NanumGothic font-bold">원</span>
                </div>
                <div className="w-[5%] border-black border-r-[1px]">
                  <span className="text-[14px] font-NanumGothic font-bold">
                    보
                    <br />
                    증
                    <br />
                    금
                    <br />액
                  </span>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {biddingInfo.depositPrice.toString().length === 12
                        ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo?.depositPrice?.toString().length,
                        )?.substring(0, 2) === '00'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo?.depositPrice?.toString().length,
                            )?.substring(1, 2))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 3) === '000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(2, 3))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 4) === '0000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(3, 4))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice?.toString().length,
                        )?.substring(0, 5) === '00000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice?.toString().length,
                            )?.substring(4, 5))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 6) === '000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(5, 6))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 7) === '0000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(6, 7))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 8) === '00000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(7, 8))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 9) === '000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(8, 9))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 10) === '0000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(9, 10))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 11) === '00000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(10, 11))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 12) === '000000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(11, 12))}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                  <span className="text-[15px] font-NanumGothic font-bold">원</span>
                </div>
              </div>
              {/* 다섯 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] h-[8%]">
                <div className="flex flex-row justify-around items-stretch w-[49.9%] py-[10px] border-black border-r-[2px]">
                  <div className='flex justify-start w-[50%] h-[100%] ml-[10px]'>
                    <span className="text-[12px] font-NanumGothic font-bold">
                      보증의 제공방법
                    </span>
                  </div>
                  <div className="flex flex-col justify-end w-[50%] h-[100%]">
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'M' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">현금</span>
                    </div>
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">보증서</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                  <div className="flex justify-start">
                    <span className="text-[12px] font-NanumGothic font-bold ml-[10px]">
                      보증을 반환 받았습니다.
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[12px] font-NanumGothic font-bold mr-[10px]">
                      본인 또는 대리인 {biddingInfo.bidName[0]}{' '}
                      (인)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 대리인 */}
          {biddingInfo.agentName !== '' && (
            <div className={`flex flex-col bg-mybg h-[1600px] w-[600px] m-auto justify-center items-center overflow-x-scroll scrollbar-hide absolute top-[800px]`}>
              <div className="flex w-[100%] absolute top-0">
                <p className="text-[15px] font-NanumGothic">
                  (뒷면)
                </p>
              </div>
              <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                <span className="text-[22px] font-extrabold font-NanumGothic">
                  위임장
                </span>
                <div className="flex flex-row w-[100%] h-[200px] border-black border-[2px] absolute top-[100px]">
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <p className="text-[16px]">
                      대리인
                    </p>
                  </div>
                  <div className="flex flex-col w-[570px] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          성명
                        </p>
                      </div>
                      <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          {biddingInfo.agentName}
                        </p>
                        <p className="text-[16px]">
                          (인)
                        </p>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          직업
                        </p>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <p className="text-[16px]">
                          {biddingInfo.agentJob}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            주민등록번호
                          </p>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                          </p>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            전 화 번 호
                          </p>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <p className="text-[16px]">
                            {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p>
                          주 소
                        </p>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <p>
                          {biddingInfo.agentAddr + ' ' + biddingInfo.agentAddrDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px] w-[100%] justify-center items-center text-center absolute top-[400px]">
                <span className="text-[16px] font-NanumGothic">
                  위 사람을 대리인으로 정하고 다음 사항을 위임함.
                </span>
                <span className="text-[16px] font-NanumGothic">
                  다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
                </span>
                <div className="flex flex-row w-[100%] justify-center items-center text-center">
                  <span className="text-[16px]">
                    {biddingInfo.reqCourtName + ' 본원 '}
                  </span>
                  <span className="text-[16px] text-red-500 font-bold">
                    &nbsp;{biddingInfo.caseNo.substring(0, 4)}&nbsp;
                  </span>
                  <span className="text-[16px]">
                    &nbsp;타경&nbsp;
                  </span>
                  <span className="text-[16px] text-red-500 font-bold">
                    {biddingInfo.caseNo.substring(4, 11)}
                  </span>
                  <span className="text-[16px]">
                    &nbsp;호
                  </span>
                </div>
                <span className="text-[16px]">
                  경매사건에 관한입찰행위 일체
                </span>
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center absolute top-[700px]">
                {biddingInfo.bidName.map((_, index) => {
                  return (
                    <div key={index} className={`flex w-[100%] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                      <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                        <p className="text-[16px]">
                          본인
                          <br />
                          {index + 1}
                        </p>
                      </div>
                      <div className="flex flex-col w-[570px] h-[100%]">
                        <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              성명
                            </p>
                          </div>
                          <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              {biddingInfo.bidName[index]}
                            </p>
                            <p className="text-[16px]">
                              (인)
                            </p>
                          </div>
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              직업
                            </p>
                          </div>
                          <div className="flex w-[30%] justify-center items-center text-center">
                            <p className="text-[16px]">
                              {biddingInfo.bidJob[index]}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex flex-row w-[100%] h-[100%]">
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                주민등록번호
                              </p>
                            </div>
                            <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                              </p>
                            </div>
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                전 화 번 호
                              </p>
                            </div>
                            <div className="flex w-[30%] justify-center items-center text-center">
                              <p className="text-[16px]">
                                {biddingInfo.bidPhone1[index] + '-' + biddingInfo.bidPhone2[index] + '-' + biddingInfo.bidPhone3[index]}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-[100%] h-[40%] ">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p>
                              주 소
                            </p>
                          </div>
                          <div className="flex w-[80%] justify-center items-center text-center">
                            <p>
                              {biddingInfo.bidAddr[index] + ' ' + biddingInfo.bidAddrDetail[index]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[100%] mt-[50px]">
                  <span>
                    * 본인의 인감 증명서 첨부
                  </span>
                  <span>
                    * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
                  </span>
                  <span className="font-extrabold font-NanumGothic text-[25px]">
                    {biddingInfo.reqCourtName + ' 본원 귀중' }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {biddingInfo.bidName.length > 1 && (
        <div className="flex flex-col bg-mybg w-[600px] h-[800px] max-h-[4000px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
          {/* 입찰표 */}
          <div className="text-[22px] font-bold text-center py-[10px] w-[600px] absolute top-0 bg-mybg">
            입찰표
          </div>
          <div className="w-[600px] h-[100%] mx-auto absolute top-[60px] bg-mybg">
            <div className="border border-black text-[1.5rem] text-center min-w-[420px] md:max-w-[600px] h-[100%] m-auto bg-mybg">
              {/* 첫 번째 박스 */}
              <div className="p-[1%] pb-0 border-black border-b-[1px] h-[15%]">
                <div className="text-left text-[14px]">(앞면)</div>
                <div className="text-[19px] font-semibold">
                  기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                </div>
                <div className="flex flex-row justify-between items-stretch">
                  <div>
                    <span className="text-[12px] font-semibold font-NanumGothic text-center">
                      {biddingInfo.reqCourtName + ' 귀하'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold font-NanumGothic text-center">
                      입찰기일 :{' '}
                      {biddingInfo.ipchalDate.substring(0, 4)}년{' '}
                      {biddingInfo.ipchalDate.substring(4, 6)}월{' '}
                      {biddingInfo.ipchalDate.substring(6, 8)}일
                    </span>
                  </div>
                </div>
              </div>
              {/* 두 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] text-center h-[12%]">
                <div className="border-black border-r-[1px] w-[8%]">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold text-center">
                    사건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[42%] text-center">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold">
                    {biddingInfo.sagunNum}
                  </span>
                </div>
                <div className="border-black border-r-[1px] w-[8%] justify-center items-center text-center">
                  <span className="md:text-[14px] text-[12px] font-NanumGothic font-semibold">
                    물건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center text-center w-[42%]">
                  <span
                    className={biddingInfo.mulgunNum
                        ? 'text-[12px] font-bold font-NanumGothic'
                        : 'text-[8px] font-bold font-NanumGothic'
                    }
                  >
                    {biddingInfo.mulgunNum ? biddingInfo.mulgunNum : ''}
                  </span>
                </div>
              </div>
              {/* 세 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                <div className="flex justify-center items-center border-black border-r-[1px] w-[4.8%]">
                  <span className="text-[14px] font-bold font-NanumGothic">
                    입<br />찰<br />자
                  </span>
                </div>
                <div className="w-[100%] h-[100%]">
                  <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                    <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                      <span className="text-[14px] font-NanumGothic">본인</span>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretch h-[31%]">
                        <div className="flex justify-center items-center border-black border-b-[1px] border-r-[1px] w-[19.8%]">
                          <span className="text-[12px]">성명</span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="flex justify-center border-black border-b-[1px] border-r-[1px] w-[19.8%]">
                          <span className="text-[12px] font-NanumGothic">
                            주민(사업자)
                            <br />
                            등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80.2%]">
                          <span className="text-[15px] font-NanumGothic font-bold text-red-500">
                            별첨 목록과 같음
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[40%]">
                        <div className="flex w-[19.8%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12px] font-NanumGothic">주소</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                    <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                      <span className="text-[14px] font-NanumGothic">대리인</span>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px]">성명</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentName : '-'}
                          </span>
                          <span className="text-[12px] mr-1">(인)</span>
                        </div>
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px]">
                            본인과의
                            <br />
                            관계
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentRel : '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-NanumGothic">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="font-NanumGothic text-[12px]">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 14) : '-'}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-NanumGothic">전화번호</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentPhone : '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch h-[30%]">
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px] font-NanumGothic">주소</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80%]">
                          <span className="text-[12px] font-NanumGothic">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentAddr : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 네 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[25%]">
                <div className="w-[4.7%] border-black border-r-[1px] h-[100%]">
                  <span className="text-[14px] font-NanumGothic font-bold">
                    입
                    <br />
                    찰
                    <br />
                    가
                    <br />격
                  </span>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 1) === '0'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(1, 2)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo?.biddingPrice.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : handlePrice(
                            biddingInfo?.biddingPrice.toString().length,
                          )?.substring(2, 3)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 4) === '0000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(3, 4)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 5) === '00000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(4, 5)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 6) === '000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(5, 6)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 7) === '0000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(6, 7)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 8) === '00000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(7, 8)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 9) === '000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(8, 9)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 10) === '0000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(9, 10)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 11) === '00000000000'
                        ? ''
                        :handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(10, 11)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 12) === '000000000000'
                        ? ''
                        : handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(11, 12)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                  <span className="text-[15px] font-NanumGothic font-bold">원</span>
                </div>
                <div className="w-[5%] border-black border-r-[1px]">
                  <span className="text-[14px] font-NanumGothic font-bold">
                    보
                    <br />
                    증
                    <br />
                    금
                    <br />액
                  </span>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {biddingInfo.depositPrice.toString().length === 12
                        ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo?.depositPrice?.toString().length,
                        )?.substring(0, 2) === '00'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo?.depositPrice?.toString().length,
                            )?.substring(1, 2))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 3) === '000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(2, 3))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 4) === '0000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(3, 4))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice?.toString().length,
                        )?.substring(0, 5) === '00000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice?.toString().length,
                            )?.substring(4, 5))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 6) === '000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(5, 6))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 7) === '0000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(6, 7))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 8) === '00000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(7, 8))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 9) === '000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(8, 9))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 10) === '0000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(9, 10))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 11) === '00000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(10, 11))}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-NanumGothic text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-NanumGothic">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 12) === '000000000000'
                          ? ''
                          : handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(11, 12))}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center w-[3%]">
                  <span className="text-[15px] font-NanumGothic font-bold">원</span>
                </div>
              </div>
              {/* 다섯 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] h-[8%]">
                <div className="flex flex-row justify-around items-stretch w-[49.9%] py-[10px] border-black border-r-[2px]">
                  <div className='flex justify-start w-[50%] h-[100%] ml-[10px]'>
                    <span className="text-[12px] font-NanumGothic font-bold">
                      보증의 제공방법
                    </span>
                  </div>
                  <div className="flex flex-col justify-end w-[50%] h-[100%]">
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'M' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">현금</span>
                    </div>
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">보증서</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                  <div className="flex justify-start">
                    <span className="text-[12px] font-NanumGothic font-bold ml-[10px]">
                      보증을 반환 받았습니다.
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[12px] font-NanumGothic font-bold mr-[10px]">
                      본인 또는 대리인 {biddingInfo.bidName[0]}{' '}
                      (인)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 공동입찰 신고서 */}
          <div className="flex flex-col bg-mybg w-[600px] h-[800px] justify-center items-center mx-auto overflow-y-scroll scrollbar-hide absolute top-[800px]">
            <div className="flex flex-col bg-mybg h-[100%] w-[100%] m-auto relative justify-center items-center">
              <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
                공 동 입 찰 신 고 서
              </div>
              <div className="flex justify-end text-right w-[100%] absolute top-[200px] mr-2">
                <span className="text-[15px] font-bold font-NanumGothic">
                  {biddingInfo.reqCourtName} 본원 집행관 귀하
                </span>
              </div>
              <div className="flex flex-col gap-[10px] justify-start w-[100%] ml-2 absolute top-[350px]">
                <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
                  <span className="text-[15px] font-bold font-NanumGothic">
                    사건번호
                  </span>
                  <div className="flex flex-row gap-3">
                    <span className="text-[15px] text-red-500 font-bold font-NanumGothic">
                      {biddingInfo.caseNo.substring(0, 4)}
                    </span>
                    <span className="text-[15px] text-black font-bold font-NanumGothic">
                      {' 타경 '}
                    </span>
                    <span className="text-[15px] text-red-500 font-bold font-NanumGothic">
                      {biddingInfo.caseNo.substring(4, 11)}
                    </span>
                    <span className="text-[15px] text-black font-bold">
                      {'호'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
                  <span className="text-[15px] font-bold font-NanumGothic">
                    물건번호
                  </span>
                  <span className="text-[15px] text-red-500 font-bold font-NanumGothic">
                    {biddingInfo.mulgunNum}
                  </span>
                </div>
                <div className="flex flex-row w-[100%] sm:gap-[100px] gap-[135px] ">
                  <span className="text-[15px] font-bold font-NanumGothic">
                    공동입찰자
                  </span>
                  <span className="text-[15px] text-black font-NanumGothic">
                    별지목록과 같음
                  </span>
                </div>
                <div className="flex mt-10">
                  <span className="text-[15px] font-NanumGothic">
                    위 사건에 관하여 공동입찰을 신고합니다.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[30px] justify-center items-center w-[100%] absolute top-[600px] ">
                <span>
                </span>
                <div className="flex flex-row justify-center items-center gap-[10px] w-[100%]">
                  <span className="text-[15px] font-NanumGothic">
                    신청인
                  </span>
                  <span className="text-[15px] font-NanumGothic text-red-500 font-bold">
                    {biddingInfo.bidName[0]}
                  </span>
                  <span className="text-[15px] font-NanumGothic">
                    외
                  </span>
                  <span className="text-[15px] font-NanumGothic text-red-500 font-bold">
                    {biddingInfo.bidName.length - 1}
                  </span>
                  <span className="text-[15px] font-NanumGothic">
                    {' 인(별지목록 기재와 같음)'}
                  </span>
                </div>
              </div>
              <div className="flex absolute top-[750px]">
                <div>
                  <span className="text-[15px] font-NanumGothic">
                    1. 공동입찰을 하는 때에는 입찰표에 각자의 지분을 분명하게 표시하여야 합니다.
                    <br />
                    2. 별지 공동입찰자 목록과 사이에 공동입찰자 전원이 간인하십시오.
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 공동입찰자 목록 */}
          <div className="flex bg-mybg w-[600px] h-[800px] justify-center items-center mx-auto overflow-y-scroll scrollbar-hide absolute top-[1600px]">
            <div className="flex absolute top-0">
              <p className="text-[22px] font-bold py-[30px]">
                공 동 입 찰 자 목 록
              </p>
            </div>
            <div className="flex sm:w-[600px] h-[800px] border border-black absolute top-[150px]">
              <div className="flex flex-col w-[10%] h-[100%] border-black border-r-[1px]">
                <div className="flex justify-center items-center border-black border-b-[1px] w-[100%] h-[50px]">
                  번호
                </div>
                {biddingInfo.bidName.map((_, idx) => {
                  return (
                  <div className="flex justify-center items-center border-black border-b-[1px] w-[100%] h-[105px]" key={idx}>
                    {idx + 1}
                  </div>
                  )
                })}
              </div>
              <div className="flex flex-col w-[100%]">
                <div className="flex flex-row w-[100%] h-[50px] border-black border-b-[1px] justify-start items-center">
                  <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                    <p className="text-[15px] font-NanumGothic font-normal">
                      성명
                    </p>
                  </div>
                  <div className="flex flex-col w-[100%] justify-center items-center">
                    <div className="border-black border-b-[1px] w-[100%] justify-center items-center text-center">
                      <p className="text-[15px] font-NanumGothic font-normal">
                        주소
                      </p>
                    </div>
                    <div className="flex flex-row w-[100%] justify-center items-center text-center h-[100%]">
                      <div className="flex w-[100%] border-black border-r-[1px] justify-center items-center text-center h-[100%]">
                        <p className="text-[15px] font-NanumGothic font-normal">
                          주민등록번호
                        </p>
                      </div>
                      <div className="flex w-[100%] justify-center items-center text-center">
                        <p className="text-[15px] font-NanumGothic font-normal">
                          전화번호
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {biddingInfo.bidName.map((_, idx) => {
                  return (
                  <div className="flex flex-row w-[100%] h-[105px] border-black border-b-[1px] justify-start items-center text-center" key={idx}>
                    <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                      <p className="text-[15px] font-NanumGothic font-normal">
                        {biddingInfo.bidName[idx] + ' (인)'}
                      </p>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex border-black border-b-[1px] w-[100%] h-[50%] justify-center items-center text-center">
                        <p className="text-[15px] font-NanumGothic font-normal">
                          {biddingInfo.bidAddr[idx]}
                        </p>
                      </div>
                      <div className="flex flex-row w-[100%] h-[50%]">
                        <div className="flex w-[100%] h-[100%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[15px] font-NanumGothic font-normal">
                            {biddingInfo.bidCorpYn[idx] === 'I' ?  biddingInfo.bidIdNum1[idx] + '-' + biddingInfo.bidIdNum2[idx] : biddingInfo.bidCorpNum1[idx] + '-' + biddingInfo.bidCorpNum2[idx] + '-' + biddingInfo.bidCorpNum3[idx]}
                          </p>
                        </div>
                        <div className="flex w-[100%] h-[100%] justify-center items-center text-center">
                          <p className="text-[15px] font-NanumGothic font-normal">
                            {biddingInfo.bidPhone1[idx] + '-' + biddingInfo.bidPhone2[idx] + '-' + biddingInfo.bidPhone3[idx]}
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
          {/* 대리인 */}
          {biddingInfo.agentName !== '' && (
            <div className={`flex flex-col bg-mybg h-[1600px] w-[600px] m-auto justify-center items-center overflow-x-scroll scrollbar-hide absolute top-[2500px]`}>
              <div className="flex w-[100%] absolute top-0">
                <p className="text-[15px] font-NanumGothic">
                  (뒷면)
                </p>
              </div>
              <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                <span className="text-[22px] font-extrabold font-NanumGothic">
                  위임장
                </span>
                <div className="flex flex-row w-[100%] h-[200px] border-black border-[2px] absolute top-[100px]">
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <p className="text-[16px]">
                      대리인
                    </p>
                  </div>
                  <div className="flex flex-col w-[570px] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          성명
                        </p>
                      </div>
                      <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          {biddingInfo.agentName}
                        </p>
                        <p className="text-[16px]">
                          (인)
                        </p>
                      </div>
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p className="text-[16px]">
                          직업
                        </p>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <p className="text-[16px]">
                          {biddingInfo.agentJob}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            주민등록번호
                          </p>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                          </p>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="text-[16px]">
                            전 화 번 호
                          </p>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <p className="text-[16px]">
                            {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                        <p>
                          주 소
                        </p>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <p>
                          {biddingInfo.agentAddr + ' ' + biddingInfo.agentAddrDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px] w-[100%] justify-center items-center text-center absolute top-[400px]">
                <span className="text-[16px] font-NanumGothic">
                  위 사람을 대리인으로 정하고 다음 사항을 위임함.
                </span>
                <span className="text-[16px] font-NanumGothic">
                  다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
                </span>
                <div className="flex flex-row w-[100%] justify-center items-center text-center">
                  <span className="text-[16px]">
                    {biddingInfo.reqCourtName + ' 본원 '}
                  </span>
                  <span className="text-[16px] text-red-500 font-bold">
                    &nbsp;{biddingInfo.caseNo.substring(0, 4)}&nbsp;
                  </span>
                  <span className="text-[16px]">
                    &nbsp;타경&nbsp;
                  </span>
                  <span className="text-[16px] text-red-500 font-bold">
                    {biddingInfo.caseNo.substring(4, 11)}
                  </span>
                  <span className="text-[16px]">
                    &nbsp;호
                  </span>
                </div>
                <span className="text-[16px]">
                  경매사건에 관한입찰행위 일체
                </span>
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center absolute top-[700px]">
                {biddingInfo.bidName.map((_, index) => {
                  return (
                    <div key={index} className={`flex w-[100%] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                      <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                        <p className="text-[16px]">
                          본인
                          <br />
                          {index + 1}
                        </p>
                      </div>
                      <div className="flex flex-col w-[570px] h-[100%]">
                        <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              성명
                            </p>
                          </div>
                          <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              {biddingInfo.bidName[index]}
                            </p>
                            <p className="text-[16px]">
                              (인)
                            </p>
                          </div>
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="text-[16px]">
                              직업
                            </p>
                          </div>
                          <div className="flex w-[30%] justify-center items-center text-center">
                            <p className="text-[16px]">
                              {biddingInfo.bidJob[index]}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex flex-row w-[100%] h-[100%]">
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                주민등록번호
                              </p>
                            </div>
                            <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                              </p>
                            </div>
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                전 화 번 호
                              </p>
                            </div>
                            <div className="flex w-[30%] justify-center items-center text-center">
                              <p className="text-[16px]">
                                {biddingInfo.bidPhone1[index] + '-' + biddingInfo.bidPhone2[index] + '-' + biddingInfo.bidPhone3[index]}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-[100%] h-[40%] ">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p>
                              주 소
                            </p>
                          </div>
                          <div className="flex w-[80%] justify-center items-center text-center">
                            <p>
                              {biddingInfo.bidAddr[index] + ' ' + biddingInfo.bidAddrDetail[index]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[100%] mt-[50px]">
                  <span>
                    * 본인의 인감 증명서 첨부
                  </span>
                  <span>
                    * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
                  </span>
                  <span className="font-extrabold font-NanumGothic text-[25px]">
                    {biddingInfo.reqCourtName + ' 본원 귀중' }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex w-[600px] justify-center items-center bg-mygold mt-[10px] mb-[10px] rounded-md h-[50px] cursor-pointer" onClick={() => {
        setOpenPdf(false)
      }}>
        <span className="text-white font-bold ">
          확인했습니다
        </span>
      </div>
    </>
  )
}