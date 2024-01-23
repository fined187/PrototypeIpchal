import { biddingInfoState } from "@/atom"
import { Dispatch, SetStateAction } from "react"
import { useRecoilValue } from "recoil"

export default function IpchalContent({ onClose }: {onClose: () => void}) {
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
        <div className="flex-col bg-mybg w-[100%] h-[800px] max-h-[2000px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
          <div className="w-[100%] mx-auto absolute top-[60px] h-[100%] bg-mybg">
            <div className="border border-black text-[1.5rem] text-center min-w-[420px] md:max-w-[600px] h-[100%] m-auto bg-mybg">
              {/* 첫 번째 박스 */}
              <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
                <div className="flex absolute top-[0px] left-[0px] w-[100%] pl-[5px]">
                  <span className="text-left text-[11pt] leading-[-1px]">
                    (앞면)
                  </span>
                </div>
                <div className="justify-center items-center text-center absolute top-[30%] w-[100%]">
                  <span className="text-[15pt] tracking-[20pt] leading-[23px] font-bold font-batang">
                    기일입찰표
                  </span>
                </div>
                <div className="flex justify-between w-[100%] absolute bottom-[0px]">
                  <div>
                    <span className="pl-[3px] text-[11pt] leading-[-1px] font-batang">
                      {biddingInfo.reqCourtName + ' 집행관 귀하'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11pt] leading-[-1px] font-batang pr-[3px]">
                      입찰기일 :{' '}
                      {biddingInfo.ipchalDate.substring(0, 4) + '년 ' + biddingInfo.ipchalDate.substring(4, 6) + '월 ' + biddingInfo.ipchalDate.substring(6, 8) + '일'}
                    </span>
                  </div>
                </div>
              </div>
              {/* 두 번째 박스 */}
              <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
                <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                  <span className="text-[11pt] font-batang">
                    사건
                    <br />
                    번호
                  </span>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                  <span className="text-[11pt] font-batang">
                    {biddingInfo.sagunNum}
                  </span>
                </div>
                <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                  <span className="text-[11pt] font-batang">
                    물건 
                    <br />
                    번호
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                  <span
                    className={`text-[11pt] font-batang`}
                  >
                    {biddingInfo.mulgunNum ? parseInt(biddingInfo.mulgunNum) : '1'}
                  </span>
                  <span className={`text-[8pt] font-batang`}>
                    ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                  </span>
                </div>
              </div>
              {/* 세 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[50%]">
                <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5.2%]">
                  <span className="text-[11pt] font-batang">
                    입<br />찰<br />자
                  </span>
                </div>
                <div className="w-[100%] h-[100%]">
                  <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                    <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                      <span className="text-[11pt] font-batang">본인</span>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[30%]">
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[11pt] font-batang">성&nbsp;&nbsp;명</span>
                        </div>
                        <div className="flex items-center justify-center border-black border-r-[1px] w-[30%]">
                          <div className="flex w-[60%] justify-end">
                            <span className="text-[11pt] font-batang">
                              {biddingInfo.bidName[0]}
                            </span>
                          </div>
                          <div className="flex w-[40%] justify-end mr-1">
                            <span className="text-[11pt] font-batang text-right">
                              (인)
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[11pt] font-batang">전화번호</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[11pt] font-batang">
                            {biddingInfo.bidPhone[0].length === 10 ? biddingInfo.bidPhone[0].substring(0, 2) + '-' + biddingInfo.bidPhone[0].substring(2, 6) + '-' + biddingInfo.bidPhone[0].substring(6, 10) : biddingInfo.bidPhone[0].substring(0, 3) + '-' + biddingInfo.bidPhone[0].substring(3, 7) + '-' + biddingInfo.bidPhone[0].substring(7, 11)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                          <span className="text-[11pt] font-batang text-center">
                            주민(사업자)
                            <br />
                            등록번호
                          </span>
                        </div>
                        <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center leading-[-1px]">
                          <span className="text-[11pt] font-batang">
                            {biddingInfo.bidCorpYn[0] === 'I' ? 
                              biddingInfo.bidIdNum[0].substring(0, 6) + '-' + biddingInfo.bidIdNum[0].substring(6, 14) 
                              : biddingInfo.bidCorpNum[0].substring(0, 3) + '-' + biddingInfo.bidCorpNum[0].substring(3, 5) + '-' + biddingInfo.bidCorpNum[0].substring(5, 10)}
                          </span>
                        </div>
                        <div className="flex justify-center items-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                          <span className="text-[11pt] font-batang text-center">
                            법인등록
                            <br />
                            번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-[30%] text-center leading-[-1px]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.bidCorpYn[0] === 'C' ? biddingInfo.bidCorpRegiNum[0].substring(0, 6) + '-' + biddingInfo.bidCorpRegiNum[0].substring(6, 13) : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[35%]">
                        <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                          <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                        </div>
                        <div className="flex justify-center items-center w-[80%] leading-[-1px]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.bidAddr.length > 1
                              ? ''
                              : biddingInfo.bidAddr[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                    <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                      <span className="text-[14px] font-batang">대리인</span>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                          <span className="text-[11pt] font-batang text-center">성&nbsp;&nbsp;명</span>
                        </div>
                        <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                          <div className="flex w-[60%] justify-end">
                            <span className="text-[11pt] font-batang text-center">
                              {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName : ''}
                            </span>
                          </div>
                          <div className="flex w-[40%] justify-end mr-1">
                            <span className="text-[11pt] font-batang text-center">(인)</span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[11pt] font-batang text-center">
                            본인과의
                            <br />
                            관계
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' && biddingInfo.agentRel ? biddingInfo.agentRel : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[11pt] font-batang text-center">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) +
                              '-' +
                              biddingInfo.agentIdNum.substring(6, 14) : ''}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[11pt] font-batang text-center">
                            전화번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.agentPhone !== '' && biddingInfo.agentPhone.length === 10 ? biddingInfo.agentPhone.substring(0, 2) + '-' + biddingInfo.agentPhone.substring(2, 6) + '-' + biddingInfo.agentPhone.substring(6, 10) : biddingInfo.agentPhone.length === 11 ? biddingInfo.agentPhone.substring(0, 3) + '-' + biddingInfo.agentPhone.substring(3, 7) + '-' + biddingInfo.agentPhone.substring(7, 11) : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch h-[30%]">
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[11pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80%]">
                          <span className="text-[11pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' && biddingInfo.agentAddr ? biddingInfo.agentAddr : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 네 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[15%]">
                <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                  <span className="text-[11pt] font-batang">
                    입찰
                    <br />
                    가격
                  </span>
                </div>
                <div className="w-[3%] h-[100%]">
                  <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                    <span className="text-[11pt] font-batang">천억</span>
                  </div>
                  <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo?.biddingPrice?.toString().length,
                      )?.substring(0, 1) === '0'
                        ? ''
                        :
                          handlePrice(
                            biddingInfo?.biddingPrice?.toString().length,
                          )?.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(1, 2)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]  leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(2, 3)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 4) === '0000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(3, 4)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 5) === '00000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(4, 5)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 6) === '000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(5, 6)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 7) === '0000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(6, 7)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 8) === '00000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(7, 8)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 9) === '000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(8, 9)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 10) === '0000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(9, 10)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 11) === '00000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(10, 11)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 12) === '000000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(11, 12)}
                    </span>
                  </div>
                </div>
                <div className="w-[27px]">
                  <div className="h-[100%] w-[100%] border-black border-r-[2px] leading-[70%] text-center">
                    <div className="h-[50%]">
                      <span className="text-[11pt] font-batang">
                        <br />
                      </span>
                    </div>
                    <div className="text-left mt-[10px]">
                      <span className="text-[15px] font-batang">
                        원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                  <span className="text-[11pt] font-batang">
                    보증
                    <br />
                    금액
                  </span>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      biddingInfo.depositPrice.toString().length === 12
                        ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 2) === '00'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(1, 2))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 3) === '000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(2, 3))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 4) === '0000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(3, 4))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 5) === '00000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(4, 5))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 6) === '000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(5, 6))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 7) === '0000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(6, 7))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 8) === '00000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(7, 8))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 9) === '000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(8, 9))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 10) === '0000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(9, 10))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 11) === '00000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(10, 11))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 12) === '000000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(11, 12))}
                    </span>
                  </div>
                </div>
                <div className="w-[27px]">
                  <div className="h-[100%] w-[100%] border-black leading-[70%] text-center">
                    <div className="h-[50%]">
                      <span className="text-[11pt] font-batang">
                        <br />
                      </span>
                    </div>
                    <div className="text-left mt-[10px]">
                      <span className="text-[11pt] font-batang">
                        원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 다섯 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] h-[13.5%]">
                <div className="flex flex-row w-[49.7%] border-black border-r-[2px] h-[100%]">
                  <div className='flex items-center justify-start w-[30%] h-[100%]'>
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
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] mt-1">현금·자기앞수표</span>
                    </div>
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] mt-1">
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
                  <div className='flex justify-center'>
                    <span className="text-[11pt] font-batang mr-[10px]">
                      본인 또는 대리인{' '}
                      {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName + ' (인)' : biddingInfo.bidName[0] + ' (인)'}
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
                <p className="text-[15px] font-batang">
                  (뒷면)
                </p>
              </div>
              <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                <span className="text-[22px] font-extrabold font-batang">
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
                <span className="text-[16px] font-batang">
                  위 사람을 대리인으로 정하고 다음 사항을 위임함.
                </span>
                <span className="text-[16px] font-batang">
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
                  <span className="font-extrabold font-batang text-[25px]">
                    {biddingInfo.reqCourtName + ' 본원 귀중' }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {biddingInfo.bidName.length > 1 && (
        <div className="flex flex-col bg-mybg w-[100%] h-[800px] max-h-[4000px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
          <div className="w-[100%] mx-auto absolute top-[60px] h-[100%] bg-mybg">
            <div className="border border-black text-[1.5rem] text-center min-w-[420px] md:max-w-[600px] h-[100%] m-auto bg-mybg">
              {/* 첫 번째 박스 */}
              <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
                <div className="flex absolute top-[0px] left-[0px] w-[100%] pl-[5px]">
                  <span className="text-left text-[11pt] leading-[-1px]">
                    (앞면)
                  </span>
                </div>
                <div className="justify-center items-center text-center absolute top-[30%] w-[100%]">
                  <span className="text-[15pt] tracking-[20pt] leading-[23px] font-bold font-batang">
                    기일입찰표
                  </span>
                </div>
                <div className="flex justify-between w-[100%] absolute bottom-[0px]">
                  <div>
                    <span className="pl-[3px] text-[11pt] leading-[-1px] font-batang">
                      {biddingInfo.reqCourtName + ' 집행관 귀하'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11pt] leading-[-1px] font-batang pr-[3px]">
                      입찰기일 :{' '}
                      {biddingInfo.ipchalDate.substring(0, 4) + '년 ' + biddingInfo.ipchalDate.substring(4, 6) + '월 ' + biddingInfo.ipchalDate.substring(6, 8) + '일'}
                    </span>
                  </div>
                </div>
              </div>
              {/* 두 번째 박스 */}
              <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
                <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                  <span className="text-[11pt] font-batang">
                    사건
                    <br />
                    번호
                  </span>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                  <span className="text-[11pt] font-batang">
                    {biddingInfo.sagunNum}
                  </span>
                </div>
                <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                  <span className="text-[11pt] font-batang">
                    물건 
                    <br />
                    번호
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                  <span
                    className={`text-[11pt] font-batang`}
                  >
                    {biddingInfo.mulgunNum ? parseInt(biddingInfo.mulgunNum) : '1'}
                  </span>
                  <span className={`text-[8pt] font-batang`}>
                    ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                  </span>
                </div>
              </div>
              {/* 세 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5.2%]">
                  <span className="text-[11pt] font-batang">
                    입<br />찰<br />자
                  </span>
                </div>
                <div className="w-[100%] h-[100%]">
                  <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                    <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                      <span className="text-[10pt] font-batang">본인</span>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretc h-[30%]">
                        <div className="flex justify-center items-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                          <span className="text-[10pt] font-batang">성&nbsp;&nbsp;명</span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[30%]">
                        <div className="flex justify-center text-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                          <span className="text-[10pt] font-batang">
                            주민(사업자)
                            <br />
                            등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-[80%]">
                          <span className="text-[15px] font-batang font-bold text-red-500">
                            별첨 목록과 같음
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[40%]">
                        <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                          <span className="text-[10pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                    <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                      <span className="text-[14px] font-batang">대리인</span>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                          <span className="text-[10pt] font-batang text-center">성&nbsp;&nbsp;명</span>
                        </div>
                        <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                          <div className="flex w-[60%] justify-end">
                            <span className="text-[10pt] font-batang text-center">
                              {biddingInfo.bidder === 'agent' ? biddingInfo.agentName : ''}
                            </span>
                          </div>
                          <div className="flex w-[40%] justify-end mr-1">
                            <span className="text-[10pt] font-batang text-center">(인)</span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[10pt] font-batang text-center">
                            본인과의
                            <br />
                            관계
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[10pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentRel : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[10pt] font-batang text-center">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="text-[10pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentIdNum.substring(0, 6) + '-' + biddingInfo.agentIdNum.substring(6, 14) : ''}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[10pt] font-batang text-center">
                            전화번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[10pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentPhone.length === 10 ? biddingInfo.agentPhone.substring(0, 2) + '-' + biddingInfo.agentPhone.substring(2, 6) + '-' + biddingInfo.agentPhone.substring(6, 10) : biddingInfo.agentPhone.substring(0, 3) + '-' + biddingInfo.agentPhone.substring(3, 7) + '-' + biddingInfo.agentPhone.substring(7, 11) : ''}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch h-[30%]">
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[10pt] font-batang text-center">주&nbsp;&nbsp;소</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80%]">
                          <span className="text-[10pt] font-batang text-center">
                            {biddingInfo.bidder === 'agent' ? biddingInfo.agentAddr : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 네 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[15%]">
                <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                  <span className="text-[11pt] font-batang">
                    입찰
                    <br />
                    가격
                  </span>
                </div>
                <div className="w-[3%] h-[100%]">
                  <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                    <span className="text-[11pt] font-batang">천억</span>
                  </div>
                  <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo?.biddingPrice?.toString().length,
                      )?.substring(0, 1) === '0'
                        ? ''
                        :
                          handlePrice(
                            biddingInfo?.biddingPrice?.toString().length,
                          )?.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(1, 2)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]  leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(2, 3)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 4) === '0000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(3, 4)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 5) === '00000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(4, 5)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 6) === '000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(5, 6)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 7) === '0000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(6, 7)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 8) === '00000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(7, 8)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 9) === '000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(8, 9)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 10) === '0000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(9, 10)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 11) === '00000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(10, 11)}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      handlePrice(
                        biddingInfo.biddingPrice.toString().length,
                      )?.substring(0, 12) === '000000000000'
                        ? ''
                        : 
                          handlePrice(
                            biddingInfo.biddingPrice.toString().length,
                          )?.substring(11, 12)}
                    </span>
                  </div>
                </div>
                <div className="w-[27px]">
                  <div className="h-[100%] w-[100%] border-black border-r-[2px] leading-[70%] text-center">
                    <div className="h-[50%]">
                      <span className="text-[11pt] font-batang">
                        <br />
                      </span>
                    </div>
                    <div className="text-left mt-[10px]">
                      <span className="text-[15px] font-batang">
                        원
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                  <span className="text-[11pt] font-batang">
                    보증
                    <br />
                    금액
                  </span>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                      biddingInfo.depositPrice.toString().length === 12
                        ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 2) === '00'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(1, 2))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 3) === '000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(2, 3))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 4) === '0000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(3, 4))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 5) === '00000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(4, 5))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 6) === '000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(5, 6))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 7) === '0000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(6, 7))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 8) === '00000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(7, 8))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 9) === '000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(8, 9))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 10) === '0000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(9, 10))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 11) === '00000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(10, 11))}
                    </span>
                  </div>
                </div>
                <div className="w-[3%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                    <span className="text-[11pt] font-batang">
                      <br />
                    </span>
                    <span className="text-[11pt] font-batang">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[11pt] font-batang">
                      {
                        (handleDepositPrice(
                          biddingInfo.depositPrice.toString().length,
                        )?.substring(0, 12) === '000000000000'
                          ? ''
                          : 
                            handleDepositPrice(
                              biddingInfo.depositPrice.toString().length,
                            )?.substring(11, 12))}
                    </span>
                  </div>
                </div>
                <div className="w-[27px]">
                  <div className="h-[100%] w-[100%] border-black leading-[70%] text-center">
                    <div className="h-[50%]">
                      <span className="text-[11pt] font-batang">
                        <br />
                      </span>
                    </div>
                    <div className="text-left mt-[10px]">
                      <span className="text-[11pt] font-batang">
                        원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 다섯 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] h-[23.5%]">
                <div className="flex flex-row w-[49.7%] border-black border-r-[2px] h-[100%]">
                  <div className='flex items-center justify-start w-[30%] h-[100%]'>
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
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] mt-1">현금·자기앞수표</span>
                    </div>
                    <div className="flex flex-row w-[100%]">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[11pt] mt-1">
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
                  <div className='flex justify-center'>
                    <span className="text-[11pt] font-batang mr-[10px]">
                      본인 또는 대리인{' '}
                      {biddingInfo.bidder === 'agent' && biddingInfo.agentName ? biddingInfo.agentName + ' (인)' : biddingInfo.bidName[0] + ' (인)'}
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
                <span className="text-[15px] font-bold font-batang">
                  {biddingInfo.reqCourtName} 본원 집행관 귀하
                </span>
              </div>
              <div className="flex flex-col gap-[10px] justify-start w-[100%] ml-2 absolute top-[350px]">
                <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
                  <span className="text-[15px] font-bold font-batang">
                    사건번호
                  </span>
                  <div className="flex flex-row gap-3">
                    <span className="text-[15px] text-black font-bold font-batang">
                      {biddingInfo.sagunNum}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
                  <span className="text-[15px] font-bold font-batang">
                    물건번호
                  </span>
                  <span className="text-[15px] text-red-500 font-bold font-batang">
                    {biddingInfo.mulgunNum}
                  </span>
                </div>
                <div className="flex flex-row w-[100%] sm:gap-[100px] gap-[135px] ">
                  <span className="text-[15px] font-bold font-batang">
                    공동입찰자
                  </span>
                  <span className="text-[15px] text-black font-batang">
                    별지목록과 같음
                  </span>
                </div>
                <div className="flex mt-10">
                  <span className="text-[15px] font-batang">
                    위 사건에 관하여 공동입찰을 신고합니다.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[30px] justify-center items-center w-[100%] absolute top-[600px] ">
                <span>
                </span>
                <div className="flex flex-row justify-center items-center gap-[10px] w-[100%]">
                  <span className="text-[15px] font-batang">
                    신청인
                  </span>
                  <span className="text-[15px] font-batang text-red-500 font-bold">
                    {biddingInfo.bidName[0]}
                  </span>
                  <span className="text-[15px] font-batang">
                    외
                  </span>
                  <span className="text-[15px] font-batang text-red-500 font-bold">
                    {biddingInfo.bidName.length - 1}
                  </span>
                  <span className="text-[15px] font-batang">
                    {' 인(별지목록 기재와 같음)'}
                  </span>
                </div>
              </div>
              <div className="flex absolute top-[750px] justify-center items-center">
                <div>
                  <span className="text-[10pt] font-batang">
                    ※ 1. 공동입찰을 하는 때에는 {" "}
                    <span className=" underline underline-offset-1">
                      입찰표에 각자의 지분을 분명하게 표시하여야 합니다.
                    </span>
                    <br />
                    &nbsp;&nbsp; 2. 별지 공동입찰자 목록과 사이에 {" "}
                    <span className="text-[10pt] underline underline-offset-1">
                      공동입찰자 전원이 간인하십시오.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 공동입찰자 목록 */}
          <div className="flex bg-mybg w-[600px] h-[800px] justify-center items-center mx-auto overflow-y-scroll scrollbar-hide absolute top-[1600px]">
            <div className="flex flex-col bg-mybg h-[100%] w-[100%] m-auto absolute top-0 items-center">
              <span className="text-[18pt] font-batang py-[30px]">
                공 동 입 찰 자 목 록
              </span>
            </div>
            <div className="flex sm:w-[600px] h-[800px] border border-black absolute top-[150px]">
              <div className="flex flex-col w-[10%] h-[100%] border-black border-r-[1px]">
                <div className="flex justify-center items-center border-black border-b-[1px] w-[100%] h-[50px]">
                  번호
                </div>
                {Array(10).fill('').map((_, idx) => {
                  return (
                  <div className={`flex justify-center items-center border-black ${idx === 9 ? '' : 'border-b-[1px]'} w-[100%] h-[75px]`} key={idx}>
                    {idx + 1}
                  </div>
                  )
                })}
              </div>
              <div className="flex flex-col w-[100%]">
                <div className="flex flex-row w-[100%] h-[50px] border-black border-b-[1px] justify-start items-center">
                  <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                    <span className="text-[11pt] font-batang">
                      성명
                    </span>
                  </div>
                  <div className="flex flex-col w-[60%] border-black border-r-[1px] justify-center items-center">
                    <div className="border-black border-b-[1px] w-[100%] justify-center items-center text-center">
                      <span className="text-[11pt] font-batang">
                        주소
                      </span>
                    </div>
                    <div className="flex flex-row w-[100%] justify-center items-center text-center h-[100%]">
                      <div className="flex w-[100%] border-black border-r-[1px] justify-center items-center text-center h-[100%]">
                        <span className="text-[11pt] font-batang">
                          주민등록번호
                        </span>
                      </div>
                      <div className="flex w-[100%] justify-center items-center text-center">
                        <span className="text-[11pt] font-batang">
                          전화번호
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[20%] justify-center items-center">
                    <span className="text-[11pt] font-batang">
                      지분
                    </span>
                  </div>
                </div>
                {Array(10).fill('').map((_, idx) => {
                  return (
                  <div className={`flex flex-row w-[100%] h-[75px] border-black ${idx === 9 ? '' : 'border-b-[1px]'} justify-start items-center text-center`} key={idx}>
                    <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px] h-[100%]">
                      <div className="flex justify-between items-center text-center w-[100%]">
                        <div className="flex w-[60%] justify-end">
                          <span className="text-[11pt] font-batang">
                            {biddingInfo.bidName[idx] ? biddingInfo.bidName[idx] : ''}
                          </span>
                        </div>
                        <div className="flex w-[40%] mr-1 justify-end">
                          <span>
                            {' (인)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-[60%] h-[100%] border-black border-r-[1px]">
                      <div className="flex border-black border-b-[1px] w-[100%] h-[50%] justify-center items-center text-center">
                        <span className="text-[11pt] font-batang text-wrap">
                          {biddingInfo.bidAddr[idx] ?? ''}
                        </span>
                      </div>
                      <div className="flex flex-row w-[100%] h-[50%]">
                        <div className="flex w-[100%] h-[100%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[11pt] font-batang">
                            {biddingInfo.bidCorpYn[idx] === 'I' ?  biddingInfo.bidIdNum1[idx] + '-' + biddingInfo.bidIdNum2[idx] 
                              : biddingInfo.bidCorpYn[idx] === 'C' ? 
                              biddingInfo.bidCorpNum1[idx] + '-' + biddingInfo.bidCorpNum2[idx] + '-' + biddingInfo.bidCorpNum3[idx]
                              : ''
                            }
                          </span>
                        </div>
                        <div className="flex w-[100%] h-[100%] justify-center items-center text-center">
                          <span className="text-[11pt] font-batang">
                            {
                              biddingInfo.bidPhone[idx] ? biddingInfo.bidPhone[idx].length === 10 ? 
                                biddingInfo.bidPhone[idx].substring(0, 2) + '-' + biddingInfo.bidPhone[idx].substring(2, 6) + '-' + biddingInfo.bidPhone[idx].substring(6, 10)
                              : biddingInfo.bidPhone[idx].length === 11 ? 
                                biddingInfo.bidPhone[idx].substring(0, 3) + '-' + biddingInfo.bidPhone[idx].substring(3, 7) + '-' + biddingInfo.bidPhone[idx].substring(7, 11)
                              : ''
                              : ''
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[20%] justify-center items-center">
                      <span className="text-[12pt] font-batang text-red-500 font-bold">
                        {biddingInfo.numerator[idx] ? biddingInfo.numerator[idx] + " / " : ''} {biddingInfo.denominator[idx] ? biddingInfo.denominator[idx] : ''}
                      </span>
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
                <p className="text-[15px] font-batang">
                  (뒷면)
                </p>
              </div>
              <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                <span className="text-[22px] font-extrabold font-batang">
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
                          {biddingInfo.agentAddr}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[30px] w-[100%] justify-center items-center text-center absolute top-[400px]">
                <span className="text-[16px] font-batang">
                  위 사람을 대리인으로 정하고 다음 사항을 위임함.
                </span>
                <span className="text-[16px] font-batang">
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
                                {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum[index]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[index]?.substring(6, 13) : biddingInfo.bidCorpYn[index] === 'C' ? biddingInfo.bidCorpNum[index]?.substring(0, 3) + '-' + biddingInfo.bidCorpNum[index]?.substring(3, 5) + '-' + biddingInfo.bidCorpNum[index]?.substring(5, 10) : ''}
                              </p>
                            </div>
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <p className="text-[16px]">
                                전 화 번 호
                              </p>
                            </div>
                            <div className="flex w-[30%] justify-center items-center text-center">
                              <p className="text-[16px]">
                                {biddingInfo.bidPhone[index].length === 10 ? biddingInfo.bidPhone[index].substring(0, 2) + '-' + biddingInfo.bidPhone[index].substring(2, 6) + '-' + biddingInfo.bidPhone[index].substring(6, 10) : biddingInfo.bidPhone[index].substring(0, 3) + '-' + biddingInfo.bidPhone[index].substring(3, 7) + '-' + biddingInfo.bidPhone[index].substring(7, 11)}
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
                              {biddingInfo.bidAddr[index]}
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
                  <span className="font-extrabold font-batang text-[25px]">
                    {biddingInfo.reqCourtName + ' 본원 귀중' }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex w-[600px] justify-center items-center bg-mygold mt-[10px] mb-[10px] rounded-md h-[50px] cursor-pointer" onClick={() => {
        onClose()
      }}>
        <span className="text-white font-bold ">
          확인했습니다
        </span>
      </div>
    </>
  )
}