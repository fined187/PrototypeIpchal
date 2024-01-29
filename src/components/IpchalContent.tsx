import { biddingInfoState } from "@/atom"
import { useRecoilState } from "recoil"
import ModalCoIpchal from "./ModalContent/ModalCoIpchal"
import ModalCoIpchalForm from "./ModalContent/ModalCoIpchalForm"

export default function IpchalContent({ onClose }: {onClose: () => void}) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
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
        <>
          <div className="flex-col bg-mybg w-[100%] h-[800px] max-h-[2000px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
            <div className="w-[100%] md:max-w-[850px] absolute top-[0px] h-[600px] bg-mybg">
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
                        {biddingInfo.reqCourtName + ' 집행관 귀하'}
                      </span>
                    </div>
                    <div>
                      <span className="md:text-[11pt] text-[12px] leading-[-1px] font-batang pr-[3px]">
                        입찰기일 :{' '}
                        {biddingInfo.ipchalDate.substring(0, 4) + '년 ' + biddingInfo.ipchalDate.substring(4, 6) + '월 ' + biddingInfo.ipchalDate.substring(6, 8) + '일'}
                      </span>
                    </div>
                  </div>
                </div>
                {/* 두 번째 박스 */}
                <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
                  <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                    <span className="md:text-[11pt] text-[12px] font-batang">
                      사건
                      <br />
                      번호
                    </span>
                  </div>
                  <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                    <span className="md:text-[11pt] text-[12px] font-batang">
                      {biddingInfo.sagunNum}
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
                    <span className={`md:text-[11pt] text-[12px] font-batang`}>
                      {biddingInfo.mulgunNum ? parseInt(biddingInfo.mulgunNum) : '1'}
                    </span>
                    <span className={`md:text-[9pt] text-[8px] font-batang`}>
                      ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                    </span>
                  </div>
                </div>
                {/* 세 번째 박스 */}
                <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[50%]">
                  <div className="flex justify-center items-center leading-[300%] border-black border-r-[1px] w-[5.2%]">
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
                                {biddingInfo.bidName[0]}
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
                              {biddingInfo.bidPhone[0].length === 10 ? biddingInfo.bidPhone[0].substring(0, 2) + '-' + biddingInfo.bidPhone[0].substring(2, 6) + '-' + biddingInfo.bidPhone[0].substring(6, 10) : biddingInfo.bidPhone[0].substring(0, 3) + '-' + biddingInfo.bidPhone[0].substring(3, 7) + '-' + biddingInfo.bidPhone[0].substring(7, 11)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row border-black border-b-[1px] h-[35%]">
                          <div className="flex justify-center items-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                            <span className="md:text-[11pt] text-[12px] font-batang text-center">
                              주민(사업자)
                              <br />
                              등록번호
                            </span>
                          </div>
                          <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center leading-[-1px]">
                            <span className="md:text-[11pt] text-[12px] font-batang">
                              {biddingInfo.bidCorpYn[0] === 'I' ? 
                                biddingInfo.bidIdNum[0].substring(0, 6) + '-' + biddingInfo.bidIdNum[0].substring(6, 14) 
                                : biddingInfo.bidCorpNum[0].substring(0, 3) + '-' + biddingInfo.bidCorpNum[0].substring(3, 5) + '-' + biddingInfo.bidCorpNum[0].substring(5, 10)}
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
                              {biddingInfo.bidCorpYn[0] === 'C' ? biddingInfo.bidCorpRegiNum[0].substring(0, 6) + '-' + biddingInfo.bidCorpRegiNum[0].substring(6, 13) : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row h-[35%]">
                          <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                            <span className="md:text-[11pt] text-[12px] font-batang text-center">주&nbsp;&nbsp;소</span>
                          </div>
                          <div className="flex justify-center items-center w-[80%] leading-[-1px]">
                            <span className="md:text-[11pt] text-[12px] font-batang text-center">
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
                              {biddingInfo.agentPhone !== '' && biddingInfo.agentPhone.length === 10 ? biddingInfo.agentPhone.substring(0, 2) + '-' + biddingInfo.agentPhone.substring(2, 6) + '-' + biddingInfo.agentPhone.substring(6, 10) : biddingInfo.agentPhone.length === 11 ? biddingInfo.agentPhone.substring(0, 3) + '-' + biddingInfo.agentPhone.substring(3, 7) + '-' + biddingInfo.agentPhone.substring(7, 11) : ''}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between items-stretch h-[30%]">
                          <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                            <span className="md:text-[11pt] text-[12px] font-batang text-center">주&nbsp;&nbsp;소</span>
                          </div>
                          <div className="flex justify-center items-center text-center w-[80%]">
                            <span className="md:text-[11pt] text-[12px] font-batang text-center">
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
                    <span className="md:text-[11pt] text-[12px] font-batang">
                      입찰
                      <br />
                      가격
                    </span>
                  </div>
                  <div className="w-[3%] h-[100%]">
                    <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                      <span className="md:text-[11pt] text-[12px] font-batang">천억</span>
                    </div>
                    <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">백억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">십억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">천만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">백만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">십만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">천</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">백</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">십</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">일</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          <br />
                        </span>
                      </div>
                      <div className="text-left mt-[10px]">
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          원
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                    <span className="md:text-[11pt] text-[12px] font-batang">
                      보증
                      <br />
                      금액
                    </span>
                  </div>
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                      <span className="md:text-[11pt] text-[12px] font-batang">천억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        {
                        biddingInfo.depositPrice.toString().length === 12
                          ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                          : ''}
                      </span>
                    </div>
                  </div>
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                      <span className="md:text-[11pt] text-[12px] font-batang">백억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">십억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">천만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">백만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">십만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">천</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">백</span>
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">십</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] font-batang">
                        <br />
                      </span>
                      <span className="md:text-[11pt] text-[12px] font-batang">일</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="md:text-[11pt] text-[12px] font-batang">
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
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          <br />
                        </span>
                      </div>
                      <div className="text-left mt-[10px]">
                        <span className="md:text-[11pt] text-[12px] font-batang">
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
                      <span className="md:text-[11pt] text-[12px] text-left font-batang">
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
                        <span className="md:text-[11pt] text-[12px] mt-1">현금·자기앞수표</span>
                      </div>
                      <div className="flex flex-row w-[100%]">
                        <input
                          type="checkbox"
                          checked={biddingInfo.bidWay === 'W' ? true : false}
                          className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                          readOnly
                        />
                        <span className="md:text-[11pt] text-[12px] mt-1">
                          보증서
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                    <div className="flex justify-start">
                      <span className="md:text-[11pt] text-[12px] text-left font-batang ml-[10px]">
                        보증을 반환 받았습니다.
                      </span>
                    </div>
                    <div className='flex justify-center'>
                      <span className="md:text-[11pt] text-[12px] font-batang mr-[10px]">
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
              <div className={`flex flex-col bg-mybg h-[1600px] w-[100%] md:w-[90%] m-auto justify-center items-center overflow-x-scroll scrollbar-hide absolute top-[800px]`}>
                <div className="flex w-[100%] absolute top-0">
                  <p className="md:text-[12pt] text-[10px] font-batang">
                    (뒷면)
                  </p>
                </div>
                <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                  <span className="md:text-[18pt] text-[18px] font-extrabold font-batang">
                    위임장
                  </span>
                  <div className="flex flex-row w-[100%] h-[200px] border-black border-[2px] absolute top-[100px]">
                    <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                      <p className="md:text-[12pt] text-[11pt] font-batang">
                        대리인
                      </p>
                    </div>
                    <div className="flex flex-col w-[570px] h-[100%]">
                      <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                        <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                          <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                            성
                          </span>
                          <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                            명
                          </span>
                        </div>
                        <div className="flex flex-row md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="md:text-[12pt] text-[12px] font-batang">
                            {biddingInfo.agentName}
                          </p>
                          <p className="md:text-[12pt] text-[12px] font-batang">
                            (인)
                          </p>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <p className="md:text-[12pt] text-[12px] font-batang">
                            직업
                          </p>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <p className="md:text-[12pt] text-[12px] font-batang">
                            {biddingInfo.agentJob}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                        <div className="flex flex-row w-[100%] h-[100%]">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[20px] font-batang">
                              주민등록번호
                            </p>
                          </div>
                          <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="md:text-[12pt] text-[12px] font-batang">
                              {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                            </p>
                          </div>
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <p className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                              전 화 번 호
                            </p>
                          </div>
                          <div className="flex w-[30%] justify-center items-center text-center">
                            <p className="md:text-[12pt] text-[12px] font-batang">
                              {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row w-[100%] h-[40%] ">
                        <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                          <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                            주
                          </span>
                          <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                            소
                          </span>
                        </div>
                        <div className="flex w-[80%] justify-center items-center text-center">
                          <p className="md:text-[12pt] text-[12px] font-batang">
                            {biddingInfo.agentAddr + ' ' + biddingInfo.agentAddrDetail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[25px] w-[100%] justify-center items-center text-center absolute top-[400px]">
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    위 사람을 대리인으로 정하고 다음 사항을 위임함.
                  </span>
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
                  </span>
                  <div className="flex flex-row w-[100%] justify-center items-center text-center">
                    <span className="md:text-[12pt] text-[14px]">
                      {biddingInfo.reqCourtName + ' 본원 '}
                    </span>
                    <span className="md:text-[12pt] text-[14px] text-red-500 font-bold">
                      &nbsp;{biddingInfo.caseNo.substring(0, 4)}&nbsp;
                    </span>
                    <span className="md:text-[12pt] text-[14px]">
                      &nbsp;타경&nbsp;
                    </span>
                    <span className="md:text-[12pt] text-[14px] font-batang text-red-500 font-bold">
                      {biddingInfo.caseNo.substring(4, 11)}
                    </span>
                    <span className="md:text-[12pt] text-[14px] font-batang">
                      &nbsp;호
                    </span>
                  </div>
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    경매사건에 관한입찰행위 일체
                  </span>
                </div>
                <div className="flex flex-col w-[100%] justify-center items-center absolute top-[700px]">
                  {biddingInfo.bidName.map((_, index) => {
                    return (
                      <div key={index} className={`flex w-[100%] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                        <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                          <p className="md:text-[12pt] text-[14px] font-batang">
                            본인
                            <br />
                            {index + 1}
                          </p>
                        </div>
                        <div className="flex flex-col w-[570px] h-[100%]">
                          <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                            <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                              <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                                성
                              </span>
                              <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                                명
                              </span>
                            </div>
                            <div className="flex flex-row md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                              <div className="flex w-[80%] md:justify-end justify-center">
                                <p className="md:text-[12pt] text-[12px] font-batang">
                                  {biddingInfo.bidName[index]}
                                </p>
                              </div>
                              <div className="flex w-[20%] font-batang justify-end mr-1">
                                <span className="md:text-[12pt] text-[12px] font-batang">
                                  (인)
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                              <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                                직
                              </span>
                              <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                                업
                              </span>
                            </div>
                            <div className="flex w-[30%] justify-center items-center text-center">
                              <p className="md:text-[12pt] text-[12px] font-batang">
                                {biddingInfo.bidJob[index]}
                              </p>
                            </div>
                          </div>
                          <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                            <div className="flex flex-row w-[100%] h-[100%]">
                              <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                                <p className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[20px] font-batang">
                                  주민등록번호
                                </p>
                              </div>
                              <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                                <p className="md:text-[12pt] text-[12px] font-batang">
                                  {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum1[index] + '-' + biddingInfo.bidIdNum2[index] : biddingInfo.bidCorpNum1[index] + '-' + biddingInfo.bidCorpNum2[index] + '-' + biddingInfo.bidCorpNum3[index]}
                                </p>
                              </div>
                              <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                                <p className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                                  전 화 번 호
                                </p>
                              </div>
                              <div className="flex w-[30%] justify-center items-center text-center">
                                <p className="md:text-[12pt] text-[12px] font-batang">
                                  {biddingInfo.bidPhone1[index] + '-' + biddingInfo.bidPhone2[index] + '-' + biddingInfo.bidPhone3[index]}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row w-[100%] h-[40%] ">
                            <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                              <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                                주
                              </span>
                              <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                                소
                              </span>
                            </div>
                            <div className="flex w-[80%] justify-center items-center text-center">
                              <span className="font-batang md:text-[12pt] text-[12px]">
                                {biddingInfo.bidAddr[index] + ' ' + biddingInfo.bidAddrDetail[index]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[800px] mt-[25px]">
                    <span className="font-batang md:text-[12pt] text-[12px]">
                      * 본인의 인감 증명서 첨부
                    </span>
                    <span className="font-batang md:text-[12pt] text-[12px]">
                      * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
                    </span>
                    <span className="font-extrabold font-batang md:text-[25px] text-[20px]">
                      {biddingInfo.reqCourtName + ' 본원 귀중' }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="fixed md:w-[40%] w-[80%] justify-center items-center text-center bg-mygold rounded-md h-[4%] cursor-pointer md:top-[80%] top-[90%]" onClick={() => {
            onClose()
          }}>
            <span className="text-white font-bold text-center justify-center items-center">
              확인했습니다
            </span>
          </div>
        </>
      )}
      {biddingInfo.bidName.length > 1 && (
        <div className="flex flex-col bg-mybg w-[100%] h-[5200px] justify-center items-center mx-auto relative overflow-y-scroll scrollbar-hide">
          <ModalCoIpchal />
          {/* 공동입찰 신고서 */}
          <ModalCoIpchalForm />
          {/* 공동입찰자 목록 */}
          {/* 대리인 */}
          {biddingInfo.agentName !== '' && (
            <div className={`flex flex-col bg-mybg h-[1600px] w-[100%] md:w-[90%] m-auto justify-center items-center overflow-x-scroll scrollbar-hide absolute top-[2500px]`}>
              <div className="flex w-[100%] absolute top-0">
                <span className="md:text-[12pt] text-[10px] font-batang">
                  (뒷면)
                </span>
              </div>
              <div className="flex flex-col w-[100%] items-center text-center absolute top-[50px]">
                <span className="md:text-[18pt] text-[18px] font-batang">
                  위임장
                </span>
                <div className="flex flex-row w-[100%] h-[200px] border-black border-[2px] absolute top-[100px]">
                  <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                    <span className="md:text-[12pt] text-[11pt] font-batang">
                      대리인
                    </span>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                      <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                        성
                      </span>
                      <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                        명
                      </span>
                      </div>
                      <div className="flex flex-row md:gap-[50px] gap-[5%] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                        <div className="flex w-[80%] md:justify-end justify-center">
                          <span className="md:text-[12pt] text-[12px] font-batang">
                            {biddingInfo.agentName ?? ''}
                          </span>
                        </div>
                        <div className="flex w-[20%] font-batang justify-end mr-1">
                          <span className="md:text-[12pt] text-[12px] font-batang">
                            (인)
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                          직
                        </span>
                        <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                          업
                        </span>
                      </div>
                      <div className="flex w-[30%] justify-center items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang">
                          {biddingInfo.agentJob}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                      <div className="flex flex-row w-[100%] h-[100%]">
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="md:text-[16px] text-[12px]">
                            {biddingInfo.agentIdNum1 + '-' + biddingInfo.agentIdNum2}
                          </span>
                        </div>
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                            전 화 번 호
                          </span>
                        </div>
                        <div className="flex w-[30%] justify-center items-center text-center">
                          <span className="md:text-[12pt] text-[12px] font-batang">
                            {biddingInfo.agentPhone1 + '-' + biddingInfo.agentPhone2 + '-' + biddingInfo.agentPhone3}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-[100%] h-[40%] ">
                      <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                          주
                        </span>
                        <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                          소
                        </span>
                      </div>
                      <div className="flex w-[80%] justify-center items-center text-center">
                        <span className="font-batang md:text-[12pt] text-[12px]">
                          {biddingInfo.agentAddr}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[25px] w-[100%] justify-center items-center text-center absolute top-[400px]">
                <span className="md:text-[12pt] text-[14px] font-batang">
                  위 사람을 대리인으로 정하고 다음 사항을 위임함.
                </span>
                <span className="md:text-[12pt] text-[14px] font-batang">
                  다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;음
                </span>
                <div className="flex flex-row w-[100%] justify-center items-center text-center">
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    {biddingInfo.reqCourtName + ' 본원 '}
                  </span>
                  <span className="md:text-[12pt] text-[14px] text-red-500 font-bold font-batang">
                    &nbsp;{biddingInfo.caseNo.substring(0, 4)}&nbsp;
                  </span>
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    &nbsp;타경&nbsp;
                  </span>
                  <span className="md:text-[12pt] text-[14px] text-red-500 font-bold font-batang">
                    {biddingInfo.caseNo.substring(4, 11)}
                  </span>
                  <span className="md:text-[12pt] text-[14px] font-batang">
                    &nbsp;호
                  </span>
                </div>
                <span className="md:text-[12pt] text-[14px] font-batang">
                  경매사건에 관한입찰행위 일체
                </span>
              </div>
              <div className="flex flex-col w-[100%] justify-center items-center absolute top-[650px]">
                {biddingInfo.bidName.map((_, index) => {
                  return (
                    <div key={index} className={`flex w-[100%] h-[200px] ${index + 1 >= 2 ? 'border-black border-r-[2px] border-b-[2px] border-l-[2px]' : 'border-black border-[2px]'} `}>
                      <div className="flex w-[30px] justify-center items-center text-center border-black border-r-[1px]">
                        <span className="md:text-[12pt] text-[14px] font-batang">
                          본인
                          <br />
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex flex-col w-[100%] h-[100%]">
                        <div className="flex flex-row w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                            <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                              성
                            </span>
                            <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                              명
                            </span>
                          </div>
                          <div className="flex flex-row gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                            <div className="flex w-[80%] md:justify-end justify-center">
                              <span className="md:text-[12pt] text-[12px] font-batang">
                                {biddingInfo.bidName[index]}
                              </span>
                            </div>
                            <div className="flex w-[20%] font-batang justify-end mr-1">
                              <span className="md:text-[12pt] text-[12px] font-batang">
                                (인)
                              </span>
                            </div>
                          </div>
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                              직
                            </span>
                            <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                              업
                            </span>
                          </div>
                          <div className="flex w-[30%] justify-center items-center text-center">
                            <span className="md:text-[12pt] text-[12px] font-batang">
                              {biddingInfo.bidJob[index]}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-[100%] h-[30%] border-black border-b-[1px]">
                          <div className="flex flex-row w-[100%] h-[100%]">
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <span className="md:text-[12pt] text-[12px] leading-[20px] font-batang">
                                주민등록번호
                              </span>
                            </div>
                            <div className="flex gap-[50px] w-[30%] border-black border-r-[1px] justify-center items-center text-center">
                              <span className="md:text-[12pt] text-[12px] font-batang">
                                {biddingInfo.bidCorpYn[index] === 'I' ? biddingInfo.bidIdNum[index]?.substring(0, 6) + '-' + biddingInfo.bidIdNum[index]?.substring(6, 13) : biddingInfo.bidCorpYn[index] === 'C' ? biddingInfo.bidCorpNum[index]?.substring(0, 3) + '-' + biddingInfo.bidCorpNum[index]?.substring(3, 5) + '-' + biddingInfo.bidCorpNum[index]?.substring(5, 10) : ''}
                              </span>
                            </div>
                            <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                              <span className="md:text-[12pt] text-[12px] tracking-[5pt] leading-[15px] font-batang">
                                전 화 번 호
                              </span>
                            </div>
                            <div className="flex w-[30%] justify-center items-center text-center">
                              <span className="md:text-[12pt] text-[12px] font-batang">
                                {biddingInfo.bidPhone[index].length === 10 ? biddingInfo.bidPhone[index].substring(0, 2) + '-' + biddingInfo.bidPhone[index].substring(2, 6) + '-' + biddingInfo.bidPhone[index].substring(6, 10) : biddingInfo.bidPhone[index].substring(0, 3) + '-' + biddingInfo.bidPhone[index].substring(3, 7) + '-' + biddingInfo.bidPhone[index].substring(7, 11)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-[100%] h-[40%] ">
                          <div className="flex justify-between w-[20%] border-black border-r-[1px] items-center text-center">
                            <span className="md:text-[12pt] text-[12px] font-batang ml-1">
                              주
                            </span>
                            <span className="md:text-[12pt] text-[12px] font-batang mr-1">
                              소
                            </span>
                          </div>
                          <div className="flex w-[80%] justify-center items-center text-center">
                            <span className="font-batang md:text-[12pt] text-[12px]">
                              {biddingInfo.bidAddr[index]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex flex-col justify-center items-center text-center gap-[25px] w-[800px] mt-[25px]">
                  <span className="font-batang md:text-[12pt] text-[12px]">
                    * 본인의 인감 증명서 첨부
                  </span>
                  <span className="font-batang md:text-[12pt] text-[12px]">
                    * 본인이 법인인 경우에는 주민등록번호란에 사업자등록번호를 기재
                  </span>
                  <span className="font-extrabold font-batang md:text-[25px] text-[20px]">
                    {biddingInfo.reqCourtName + ' 본원 귀중'}
                  </span>
                </div>
              </div>
            </div>
          )}
        <div className="fixed flex md:w-[40%] w-[80%] justify-center items-center text-center bg-mygold rounded-md h-[5%] cursor-pointer md:top-[80%] top-[90%]" onClick={() => {
          onClose()
        }}>
          <span className="text-white font-bold text-center justify-center items-center">
            확인했습니다
          </span>
        </div>
      </div>
      )}
    </>
  )
}