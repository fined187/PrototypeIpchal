import { biddingInfoState } from "@/atom"
import { useRecoilState } from "recoil"

export default function ModalSingleIpchal() {
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
    <div className="flex flex-col bg-mybg md:w-[90%] w-[100%] mx-auto absolute top-0 justify-center items-center">
      <div className="flex flex-col bg-mybg h-[100%] w-[100%] mx-auto relative justify-center items-center">
        <div className="w-[100%] overflow-x-scroll absolute top-[0px] h-[600px] bg-mybg scrollbar-hide">
          <div className="border border-black text-[1.5rem] w-[100%] h-[100%] m-auto bg-mybg">
            {/* 첫 번째 박스 */}
            <div className="flex flex-col border-black border-b-[1px] h-[15%] w-[100%] justify-center items-center relative">
              <div className="absolute top-[0px] left-[0px] w-[100%] pl-[5px] text-left">
                <span className="md:text-[11pt] text-[10px] leading-[-1px]">
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
                  <span className="pl-[3px] md:text-[11pt] text-[10px] leading-[-1px] font-batang">
                    {biddingInfo.reqCourtName + ' 집행관 귀하'}
                  </span>
                </div>
                <div>
                  <span className="md:text-[11pt] text-[10px] leading-[-1px] font-batang pr-[3px]">
                    입찰기일 :{' '}
                    {biddingInfo.ipchalDate.length === 8 ? biddingInfo.ipchalDate.substring(0, 4) + '년 ' + biddingInfo.ipchalDate.substring(4, 6) + '월 ' + biddingInfo.ipchalDate.substring(6, 8) + '일 ' : ''}
                  </span>
                </div>
              </div>
            </div>
            {/* 두 번째 박스 */}
            <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[6.5%]">
              <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                <span className="md:text-[11pt] text-[10px] font-batang">
                  사건 
                  <br />
                  번호
                </span>
              </div>
              <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                <span className="md:text-[11pt] text-[10px] font-batang">
                  {biddingInfo.sagunNum}
                </span>
              </div>
              <div className="border-black border-r-[1px] leading-[50%] w-[82px] h-[100%] text-center">
                <span className="md:text-[11pt] text-[10px] font-batang">
                  물건 
                  <br />
                  번호
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-center md:w-[44%] w-[40%]">
                <span className={`md:text-[11pt] text-[10px] font-batang`}
                >
                  {biddingInfo.mulSeq ? biddingInfo.mulSeq : '1'}
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
                            {biddingInfo.bidName[0] ?? ''}
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
                      <div className="flex justify-center border-black border-r-[1px] w-[20%] leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          주민(사업자)
                          <br />
                          등록번호
                        </span>
                      </div>
                      <div className="flex w-[30%] border-black border-r-[1px] justify-center items-center leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang">
                          {biddingInfo.bidCorpYn[0] === 'I' ? biddingInfo.bidIdNum[0].substring(0, 6) + '-' + biddingInfo.bidIdNum[0].substring(6, 13) : biddingInfo.bidCorpYn[0] === 'C' ? biddingInfo.bidCorpNum[0].substring(0, 3) + '-' + biddingInfo.bidCorpNum[0].substring(3, 5) + '-' + biddingInfo.bidCorpNum[0].substring(5, 10) : ''}
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
                          {biddingInfo.bidCorpYn[0] === 'C' ? biddingInfo.bidCorpRegiNum[0]?.substring(0, 6) + '-' + biddingInfo.bidCorpRegiNum[0]?.substring(6, 13) : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row h-[35%]">
                      <div className="flex w-[20%] border-black border-r-[1px] h-[100%] justify-center items-center text-center leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">주&nbsp;&nbsp;소</span>
                      </div>
                      <div className="flex justify-center items-center w-[80%] leading-[-1px]">
                        <span className="md:text-[11pt] text-[12px] font-batang text-center">
                          {biddingInfo.bidAddr[0] ?? ''}
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
                          {biddingInfo.agentPhone.length === 10 ? biddingInfo.agentPhone.substring(0, 2) + '-' + biddingInfo.agentPhone.substring(2, 6) + '-' + biddingInfo.agentPhone.substring(6, 10) : biddingInfo.agentPhone.substring(0, 3) + '-' + biddingInfo.agentPhone.substring(3, 7) + '-' + biddingInfo.agentPhone.substring(7, 11)}
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
                <span className="md:text-[11pt] text-[10px] font-batang">
                  입찰
                  <br />
                  가격
                </span>
              </div>
              <div className="w-[3%] h-[100%]">
                <div className="h-[50%] border-black border-r-[1px] leading-[70%] border-b-[1px] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">천억</span>
                </div>
                <div className="flex justify-center items-center w-[100%] h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
              <div className="w-[3%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] leading-[70%] text-center">
                  <span className="md:text-[11pt] text-[10px] font-batang">백억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {handlePrice(
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
                  <span className="md:text-[11pt] text-[10px] font-batang">십억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px] ">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">천만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">백만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">십만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">천</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">백</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">십</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">일</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                    <span className="md:text-[11pt] text-[10px] font-batang">
                      <br />
                    </span>
                  </div>
                  <div className="text-left mt-[10px]">
                    <span className="md:text-[15px] text-[14px] font-batang">
                      원
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[27px] border-black border-r-[1px] h-[100%] leading-[70%] justify-center items-center text-center">
                <span className="md:text-[11pt] text-[10px] font-batang">
                  보증
                  <br />
                  금액
                </span>
              </div>
              <div className="w-[3%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">천억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    {
                    biddingInfo.depositPrice.toString().length === 12
                      ? biddingInfo.depositPrice.toString()?.substring(0, 1)
                      : ''}
                  </span>
                </div>
              </div>
              <div className="w-[3%]">
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px] text-center leading-[70%]">
                  <span className="md:text-[11pt] text-[10px] font-batang">백억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">십억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">억</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">천만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">백만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">십만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">만</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">천</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">백</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">십</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] font-batang">
                    <br />
                  </span>
                  <span className="md:text-[11pt] text-[10px] font-batang">일</span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className="md:text-[11pt] text-[10px] font-batang">
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
                    <span className="md:text-[11pt] text-[10px] font-batang">
                      <br />
                    </span>
                  </div>
                  <div className="text-left mt-[10px]">
                    <span className="md:text-[15px] text-[14px] font-batang">
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
                  <span className="md:text-[11pt] text-[10px] text-left font-batang">
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
                    <span className="md:text-[11pt] text-[10px] mt-1">현금·자기앞수표</span>
                  </div>
                  <div className="flex flex-row w-[100%]">
                    <input
                      type="checkbox"
                      checked={biddingInfo.bidWay === 'W' ? true : false}
                      className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                      readOnly
                    />
                    <span className="md:text-[11pt] text-[10px] mt-1">
                      보증서
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                <div className="flex justify-start">
                  <span className="md:text-[11pt] text-[10px] text-left font-batang ml-[10px]">
                    보증을 반환 받았습니다.
                  </span>
                </div>
                <div className='flex justify-center'>
                  <span className="md:text-[11pt] text-[10px] font-batang mr-[10px]">
                    본인 또는 대리인{' '}
                    {biddingInfo.agentName !== '' ?   biddingInfo.agentName + ' (인)' :   biddingInfo.bidName[0] + ' (인)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}