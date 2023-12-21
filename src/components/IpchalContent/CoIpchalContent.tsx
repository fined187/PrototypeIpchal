import { biddingInfoState, stepState } from "@/atom";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function CoIpchalContent() {
  const [totalResult, setTotalResult] = useState<any>(null);
  const biddingInfo = useRecoilValue(biddingInfoState);
  const stateNum = useRecoilValue(stepState);
  const setStateNum = useSetRecoilState(stepState);
  const [loading, setLoading] = useState<boolean>(false)

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

  useEffect(() => {
    setLoading(true)
    const handleGetResult = async () => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}`,
        )
        if (response.status === 200) {
          console.log(response)
          setTotalResult(response.data.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    handleGetResult()
  }, [])

  console.log(totalResult && totalResult)

  return (
    <>
      <div className="flex flex-col bg-mybg h-screen md:w-full w-[420px] m-auto relative justify-center items-center">
        <div className="flex flex-col bg-mybg h-screen md:w-full w-[420px] m-auto relative justify-center items-center">
          <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
            입찰표
          </div>
          <div className="min-w-[420px] md:max-w-[600px] absolute top-[160px] h-[600px] bg-mybg">
            <div className="border border-black text-[1.5rem] text-center min-w-[420px] md:max-w-[600px] h-[100%] m-auto bg-mybg">
              {/* 첫 번째 박스 */}
              <div className="p-[1%] pb-0 border-black border-b-[1px]">
                <div className="text-left text-[14px]">(앞면)</div>
                <div className="text-[19px] font-semibold mb-[3%]">
                  기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                </div>
                <div className="flex flex-row justify-between items-stretch">
                  <div>
                    <span className="text-[12px] font-semibold font-nanum">
                      {totalResult && totalResult.reqCourtName + ' 귀하'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold font-nanum">
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
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] text-center">
                <div className="border-black border-r-[1px] w-[8%]">
                  <span className="md:text-[14px] text-[12px] font-nanum font-semibold">
                    사건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center border-black border-r-[1px] w-[42%] text-center">
                  <span className="md:text-[14px] text-[12px] font-nanum font-semibold">
                    {totalResult &&
                      totalResult.caseYear +
                        ' 타경 ' +
                        totalResult.caseDetail}
                  </span>
                </div>
                <div className="border-black border-r-[1px] w-[8%] justify-center items-center text-center">
                  <span className="md:text-[14px] text-[12px] font-nanum font-semibold">
                    물건 번호
                  </span>
                </div>
                <div className="flex justify-center items-center text-center w-[42%]">
                  <span
                    className={
                      totalResult && totalResult?.mulNo
                        ? 'text-[12px] font-bold font-nanum'
                        : 'text-[8px] font-bold font-nanum'
                    }
                  >
                    {totalResult && totalResult?.mulNo
                      ? totalResult?.mulNo
                      : ''}
                  </span>
                </div>
              </div>
              {/* 세 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[200px]">
                <div className="flex justify-center items-center border-black border-r-[1px] w-[4.8%]">
                  <span className="text-[14px] font-bold font-nanum">
                    입<br />찰<br />자
                  </span>
                </div>
                <div className="w-[100%] h-[200px]">
                  <div className="flex flex-row items-stretch border-black border-b-[1px] h-[50%]">
                    <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                      <span className="text-[14px] font-nanum">본인</span>
                    </div>
                    <div className="flex flex-col w-[100%] h-[100%]">
                      <div className="flex flex-row items-stretch  h-[30%]">
                        <div className="flex justify-center items-center border-b-[1px] border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px]">성명</span>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="flex justify-center border-black border-b-[1px] border-r-[1px] w-[20%]">
                          <span className="text-[12px] font-nanum">
                            주민(사업자)
                            <br />
                            등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-[80%]">
                          <span className="text-[15px] font-bold text-red-500">
                            별첨 목록과 같음
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row h-[40%]">
                        <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                          <span className="text-[12px] font-nanum">주소</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                    <div className="flex justify-center items-center w-[10.8%] border-black border-r-[1px]">
                      <span className="text-[14px] font-nanum">대리인</span>
                    </div>
                    <div className="w-[90%]">
                      <div className="flex flex-row items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center table__text w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px]">성명</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="text-[12px]">
                            {biddingInfo.agentName ?? '-'}
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
                            {biddingInfo.agentRel ?? '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                        <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-nanum">
                            주민등록번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                          <span className="font-nanum text-[12px]">
                            {biddingInfo.agentIdNum.substring(0, 6) +
                              '-' +
                              biddingInfo.agentIdNum.substring(6, 14) ?? '-'}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                          <span className="text-[12px] font-nanum">
                            전화번호
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[30%]">
                          <span className="text-[12px] font-nanum">
                            {biddingInfo.agentPhone ?? '-'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-stretch h-[30%]">
                        <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                          <span className="text-[12px] font-nanum">주소</span>
                        </div>
                        <div className="flex justify-center items-center text-center w-[80%]">
                          <span className="text-[12px] font-nanum">
                            {biddingInfo.agentAddr ?? '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 네 번째 박스 */}
              <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px]">
                <div className="w-[4.7%] border-black border-r-[1px]">
                  <span className="text-[14px] font-nanum font-bold">
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
                    <span className="text-[12px] font-nanum">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
                      {totalResult &&
                      handlePrice(
                        totalResult?.bidPrice?.toString().length,
                      )?.substring(0, 2) === '00'
                        ? ''
                        : totalResult &&
                          handlePrice(
                            totalResult?.bidPrice?.toString().length,
                          )?.substring(1, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
                      {totalResult &&
                      handlePrice(
                        totalResult?.bidPrice?.toString().length,
                      )?.substring(0, 3) === '000'
                        ? ''
                        : totalResult &&
                          handlePrice(
                            totalResult?.bidPrice?.toString().length,
                          )?.substring(2, 1)}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                  <span className="text-[15px] font-nanum font-bold">원</span>
                </div>
                <div className="w-[5%] border-black border-r-[1px]">
                  <span className="text-[14px] font-nanum font-bold">
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
                    <span className="text-[12px] font-nanum">천억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
                      {totalResult &&
                      totalResult?.bidDeposit?.toString().length === 12
                        ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                        : ''}
                    </span>
                  </div>
                </div>
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">백억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">십억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">억</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">천만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">백만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum">십만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">만</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">천</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">백</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">십</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="w-[3.5%]">
                  <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                    <span className="text-[12px] font-nanum text-mybg">
                      <br />
                    </span>
                    <span className="text-[12px] font-nanum">일</span>
                  </div>
                  <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                    <span className="text-[12px] font-nanum font-bold">
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
                <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                  <span className="text-[15px] font-nanum font-bold">원</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-stretch w-[100%] md:h-[12%] h-[12%]">
                <div className="flex flex-row justify-around items-stretch w-[50%] py-[10px] border-black border-r-[2px]">
                  <span className="text-[12px] font-nanum font-bold">
                    보증의 제공방법
                  </span>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'M' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">현금</span>
                    </div>
                    <div className="flex flex-row">
                      <input
                        type="checkbox"
                        checked={biddingInfo.bidWay === 'W' ? true : false}
                        className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-2 indeterminate:bg-white"
                        readOnly
                      />
                      <span className="text-[12px] font-bold mt-1">
                        보증서
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-around items-stretch w-[50%] h-[100%]">
                  <div className="flex justify-start">
                    <span className="text-[12px] font-nanum font-bold">
                      보증을 반환 받았습니다.
                    </span>
                  </div>
                  <span className="text-[12px] font-nanum font-bold">
                    본인 또는 대리인{' '}
                    {totalResult && totalResult.bidders[0].name} (인)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between md:w-[520px] w-[420px] absolute top-[800px]">
          <button
            type="button"
            className="flex md:w-[200px] w-[150px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => setStateNum(stateNum - 1)}
          >
            <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex md:w-[280px] w-[230px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(stateNum + 1)
            }}
          >
            <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
              확인했습니다
            </span>
          </button>
        </div>
      </div>
    </>
  )
}