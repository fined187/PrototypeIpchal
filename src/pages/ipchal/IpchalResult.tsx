import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import LoadingResult from '@/components/LoadingResult'
import CoIpchalContent from '@/components/CoIpchalContent/CoIpchalContent'
import AgentListForm from '@/components/CoIpchalContent/AgentListForm'
import IpchalText from '@/components/CoIpchalContent/IpchalText'

export default function IpchalResult() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)

  const [totalResult, setTotalResult] = useState<any>(null)
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

  return (
    <>
      {loading && (
        <div className="flex flex-col bg-white h-screen w-[100%] relative justify-center items-center">
          <LoadingResult />
        </div>
      )}
      {!loading && (totalResult && totalResult.bidders.length === 1) && (
        <div className="flex flex-col bg-white max-h-[2000px] h-[1300px] sm:w-[100%] mx-auto relative justify-center items-center">
          <div className="flex flex-col bg-mybg h-[100%] md:w-[50%] w-[100%] mx-auto relative justify-center items-center" id="capture">
            <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
              입찰표
            </div>
            <div className="min-w-[420px] md:max-w-[850px] overflow-x-scroll absolute top-[160px] h-[650px] bg-mybg scrollbar-hide">
              <div className="border border-black text-[1.5rem] text-center md:w-[800px] w-[420px] h-[100%] m-auto bg-mybg">
                {/* 첫 번째 박스 */}
                <div className="p-[1%] pb-0 border-black border-b-[1px] h-[15%]">
                  <div className="text-left text-[14px]">(앞면)</div>
                  <div className="text-[19px] font-semibold">
                    기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
                  </div>
                  <div className="flex flex-row justify-between items-stretch">
                    <div>
                      <span className="text-[12px] font-semibold font-NanumGothic">
                        {totalResult && totalResult.reqCourtName + ' 귀하'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[12px] font-semibold font-NanumGothic">
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
                <div className="flex flex-row justify-between items-center border-black border-b-[1px] text-center h-[12%]">
                  <div className="border-black border-r-[1px] md:w-[5%] w-[10%] h-[100%] justify-center items-start">
                    <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                      사건 
                      <br />
                      번호
                    </span>
                  </div>
                  <div className="flex justify-center items-center border-black border-r-[1px] md:w-[45%] w-[40%] text-center h-[100%]">
                    <span className="md:text-[12px] text-[12px] font-NanumGothic font-semibold">
                      {totalResult &&
                        totalResult.caseYear +
                          ' 타경 ' +
                          totalResult.caseDetail}
                    </span>
                  </div>
                  <div className="border-black border-r-[1px] md:w-[5%] w-[10%] justify-center items-center text-center h-[100%]">
                    <span className="md:text-[10px] text-[10px] font-NanumGothic font-bold">
                      물건 
                      <br />
                      번호
                    </span>
                  </div>
                  <div className="flex justify-center items-center text-center md:w-[44%] w-[40%]">
                    <span
                      className={
                        totalResult && totalResult?.mulNo
                          ? 'text-[12px] font-bold font-NanumGothic'
                          : 'text-[8px] font-bold font-NanumGothic'
                      }
                    >
                      {totalResult && totalResult?.mulNo
                        ? totalResult?.mulNo
                        : ''}
                    </span>
                  </div>
                </div>
                {/* 세 번째 박스 */}
                <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[40%]">
                  <div className="flex justify-center items-center border-black border-r-[1px] w-[5.2%]">
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
                              {totalResult && totalResult?.bidders?.length > 1
                                ? ''
                                : totalResult && totalResult?.bidders[0]?.name}
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
                              {
                                biddingInfo.bidPhone1[0] + '-' + biddingInfo.bidPhone2[0] + '-' + biddingInfo.bidPhone3[0]
                              }
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
                              {biddingInfo.bidCorpYn[0] === 'I' ? (
                                biddingInfo.bidIdNum1[0] + '-' + biddingInfo.bidIdNum2[0]
                              ): (
                                biddingInfo.bidCorpNum1[0] + '-' + biddingInfo.bidCorpNum2[0] + '-' + biddingInfo.bidCorpNum3[0]
                              )}
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
                              {totalResult && totalResult?.bidders?.length > 1
                                ? '-'
                                : totalResult &&
                                  totalResult?.bidders[0]?.corporationNo}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row h-[40%]">
                          <div className="flex w-[20%] border-black border-r-[1px] justify-center items-center text-center">
                            <span className="text-[12px] font-NanumGothic">주소</span>
                          </div>
                          <div className="flex justify-center items-center w-[80%]">
                            <span className="text-[12px] font-NanumGothic">
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
                        <span className="text-[14px] font-NanumGothic">대리인</span>
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
                            <span className="text-[12px] font-NanumGothic">
                              주민등록번호
                            </span>
                          </div>
                          <div className="flex justify-center items-center text-center w-[30%] border-black border-r-[1px]">
                            <span className="font-NanumGothic text-[12px]">
                              {biddingInfo.agentIdNum.substring(0, 6) +
                                '-' +
                                biddingInfo.agentIdNum.substring(6, 14) ?? '-'}
                            </span>
                          </div>
                          <div className="flex justify-center items-center text-center w-[20%] border-black border-r-[1px]">
                            <span className="text-[12px] font-NanumGothic">
                              전화번호
                            </span>
                          </div>
                          <div className="flex justify-center items-center text-center w-[30%]">
                            <span className="text-[12px] font-NanumGothic">
                              {biddingInfo.agentPhone ?? '-'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between items-stretch h-[30%]">
                          <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                            <span className="text-[12px] font-NanumGothic">주소</span>
                          </div>
                          <div className="flex justify-center items-center text-center w-[80%]">
                            <span className="text-[12px] font-NanumGothic">
                              {biddingInfo.agentAddr ?? '-'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 네 번째 박스 */}
                <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px] h-[25%]">
                  <div className="w-[4%] border-black border-r-[1px] h-[100%]">
                    <span className="text-[12px] font-NanumGothic font-bold">
                      입
                      <br />
                      찰
                      <br />
                      가
                      <br />
                      격
                    </span>
                  </div>
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">천억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">백억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">십억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">천만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">백만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">십만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">천</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">백</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">십</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">일</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                    <span className="text-[15px] font-NanumGothic font-bold">원</span>
                  </div>
                  <div className="w-[4%] border-black border-r-[1px]">
                    <span className="text-[14px] font-NanumGothic font-bold">
                      보
                      <br />
                      증
                      <br />
                      금
                      <br />액
                    </span>
                  </div>
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">천억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
                        {totalResult &&
                        totalResult?.bidDeposit?.toString().length === 12
                          ? totalResult?.bidDeposit?.toString()?.substring(0, 1)
                          : ''}
                      </span>
                    </div>
                  </div>
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">백억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">십억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">억</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">천만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">백만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic">십만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">만</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">천</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">백</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">십</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="w-[3%]">
                    <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                      <span className="text-[12px] font-NanumGothic text-mybg">
                        <br />
                      </span>
                      <span className="text-[12px] font-NanumGothic">일</span>
                    </div>
                    <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                      <span className="text-[12px] font-NanumGothic font-bold">
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
                  <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                    <span className="text-[15px] font-NanumGothic font-bold">원</span>
                  </div>
                </div>
                {/* 다섯 번째 박스 */}
                <div className="flex flex-row justify-between items-stretch w-[100%] h-[8%]">
                  <div className="flex w-[50%] border-black border-r-[2px] h-[100%]">
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
                          className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-1 indeterminate:bg-white"
                          readOnly
                        />
                        <span className="text-[12px] font-bold">현금</span>
                      </div>
                      <div className="flex flex-row w-[100%]">
                        <input
                          type="checkbox"
                          checked={biddingInfo.bidWay === 'W' ? true : false}
                          className="w-[10px] h-[10px] border-black border-[2px] mr-1 mt-1 indeterminate:bg-white"
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
                      <span className="text-[12px] font-NanumGothic font-bold ml-[10px]">
                        보증을 반환 받았습니다.
                      </span>
                    </div>
                    <div className='flex justify-end'>
                      <span className="text-[12px] font-NanumGothic font-bold mr-[10px]">
                        본인 또는 대리인{' '}
                        {totalResult && totalResult.bidders[0].name} (인)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <IpchalText />
          {/* 버튼 */}
          <div className="flex justify-between md:w-[520px] min-w-[420px] absolute md:top-[1200px] bottom-[20px]">
            <button
              type="button"
              className="flex md:w-[200px] w-[150px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
              onClick={() => setStateNum(stateNum - 1)}
            >
              <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
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
              <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
                확인했습니다
              </span>
            </button>
          </div>
        </div>
      )}
      {!loading && (totalResult && totalResult.bidders.length > 1) && (
        <CoIpchalContent />
      )}
      {!loading && (totalResult && totalResult.agentYn === 'Y') && (
        <AgentListForm totalResult={totalResult} />
      )}
    </>
  )
}
