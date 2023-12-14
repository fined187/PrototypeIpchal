import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function IpchalResult() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const date = new Date()
  const nowDate = date.getDate()
  const nowMonth = date.getMonth() + 1
  const nowYear = date.getFullYear()

  return (
    <>
      <div className="flex flex-col bg-mybg h-screen md:max-w-[700px] min-w-[500px] m-auto relative justify-center items-center">
        <div className="text-[2.8rem] font-bold py-[60px] absolute top-0">입찰표</div>
        <div className="min-w-[500px] md:max-w-[600px] overflow-x-scroll absolute top-[160px] h-screen">
          <div className="border border-black text-[1.5rem] text-center min-w-[500px] md:max-w-[600px] h-[600px] m-auto">
            {/* 첫 번째 박스 */}
            <div className="p-[1%] pb-0 border-black border-b-[1px]">
              <div className="text-left text-[14px]">(앞면)</div>
              <div className="text-[19px] font-semibold mb-[3%]">
                기&nbsp;&nbsp;&nbsp;일&nbsp;&nbsp;&nbsp;입&nbsp;&nbsp;&nbsp;찰&nbsp;&nbsp;&nbsp;표
              </div>
              <div className="flex flex-row justify-between items-stretch">
                <div>
                  <span className='text-[12px] font-semibold font-nanum'>
                    영월지원 집행관 귀하
                  </span>
                </div>
                <div>
                  <span className='text-[12px] font-semibold font-nanum'>
                    입찰기일 : 2023년 12월 12일
                  </span>
                </div>
              </div>
            </div>
            {/* 두 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] text-center">
              <div className='border-black border-r-[1px] md:w-[15%] w-[15%]'>
                <span className='md:text-[14px] text-[12px] font-nanum font-semibold'>
                  사건
                  <br />
                  번호
                </span>
              </div>
              <div className="flex justify-center items-center border-black border-r-[1px] w-[35%] md:w-[35%] text-center">
                <span className='md:text-[14px] text-[12px] font-nanum font-semibold'>
                  2016 타경 1425호
                </span>
              </div>
              <div className='border-black border-r-[1px] w-[15%] md:w-[15%] justify-center items-center text-center'>
                <span className='md:text-[14px] text-[12px] font-nanum font-semibold'>
                  물건
                  <br />
                  번호
                </span>
              </div>
              <div className="text-[1.2rem] flex justify-center items-center text-center">
                <span className='md:text-[10px] text-[8px] font-bold font-nanum font-semibold'>
                  ※ 물건번호가 여러개 있는 경우에는 꼭 기재
                </span>
              </div>
            </div>
            {/* 세 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] relative h-[200px]">
              <div className="flex justify-center items-center border-black border-r-[1px] w-[5%]">
                <span className='text-[14px] font-nanum'>
                  입<br />찰<br />자
                </span>
              </div>
              <div className='w-[100%] h-[200px]'>
                <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[50%]">
                  <div className="flex justify-center items-center border-black border-r-[1px] w-[12%]">
                    <span className='text-[14px] font-nanum'>
                      본인
                    </span>
                  </div>
                  <div className='flex flex-col w-[100%] h-[100%]'>
                    <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[30%]">
                      <div className="flex justify-center items-center border-black border-r-[1px] w-[20%]">
                        <span className='text-[1.1rem]'>
                          성명
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-black border-r-[1px] w-[30%]">
                        <span className='text-[1.1rem]'>
                          {biddingInfo.bidName}
                        </span>
                        <span className='mr-1 text-[1.1rem]'>
                          (인)
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                        <span className='text-[1.1rem]'>
                          전화번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center text-center w-[30%]">
                        <span className='text-[1.1rem]'>
                          {biddingInfo.bidPhone}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[40%]">
                      <div className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]">
                        <span className='text-[1.1rem]'>
                          주민(사업자)
                          <br />
                          등록번호
                        </span>
                      </div>
                      <div className="flex jsutify-center items-center text-center border-black border-r-[1px] w-[30%]">
                        <span className='text-[1.1rem]'>
                          {biddingInfo.bidIdNum}
                        </span>
                      </div>
                      <div
                        className="flex justify-center items-center text-center border-black border-r-[1px] w-[20%]"
                      >
                        <span className='text-[1.1rem]'>
                          법인등록
                          <br />
                          번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[30%]">
                        {biddingInfo.bidCorpNum}
                      </div>
                    </div>
                    <div className='flex flex-row justify-between h-[35%] '>
                      <div className="w-[20%] border-black border-r-[1px] items-center text-center">
                        <span className=" text-[1.1rem] font-nanum">
                          주소
                        </span>
                        <div className="flex justify-center items-center w-[80%]">
                          {biddingInfo.bidAddr}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-stretch w-[100%] h-[50%]">
                  <div className="flex justify-center items-center w-[11%] border-black border-r-[1px]">
                    <span className='text-[14px] font-nanum'>
                      대리인
                    </span>
                  </div>
                  <div className='w-[90.2%]'>
                    <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[30%]">
                      <div className="flex justify-center items-center table__text w-[19.8%] border-black border-r-[1px]">
                        <span className='text-[1.1rem]'>
                          성명
                        </span>
                      </div>
                      <div className="flex justify-between items-center w-[30%] border-black border-r-[1px]">
                        <span className='text-[1.1rem]'>
                          {biddingInfo.agentName}
                        </span>
                        <span className='text-[1.1rem] mr-1'>
                          (인)
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                        <span className='text-[1.1rem]'>
                          본인과의
                          <br />
                          관계
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[30%]">
                        <span className='text-[1.1rem]'>
                          {biddingInfo.agentRel}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-stretch border-black border-b-[1px] h-[35%]">
                      <div className="flex justify-center items-center w-[19.8%] border-black border-r-[1px]">
                        <span className='text-[1.1rem]'>
                          주민등록번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[30%] border-black border-r-[1px]">
                        {biddingInfo.agentIdNum}
                      </div>
                      <div className="flex justify-center items-center w-[20%] border-black border-r-[1px]">
                        <span className='text-[1.1rem]'>
                          전화번호
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[30%]">
                        {biddingInfo.agentPhone}
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-stretch h-[35%]">
                      <div className="flex justify-center items-center border-black border-r-[1px] w-[19.8%]" >
                        <span className='text-[1.1rem] font-nanum'>
                          주소
                        </span>
                      </div>
                      <div className="flex justify-center items-center w-[80%] text-center">
                        {biddingInfo.agentAddr}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 네 번째 박스 */}
            <div className="flex flex-row justify-between items-stretch w-[100%] border-black border-b-[1px]">
              <div className='w-[5%] border-black border-r-[1px]'>
                <span className='text-[14px] font-nanum font-bold'>
                  입
                  <br />
                  찰
                  <br />
                  가
                  <br />
                  격
                </span>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    천억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    백억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    십억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    천만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    백만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    십만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    천
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    백
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    십
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    일
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                <span className='text-[15px] font-nanum font-bold'>
                  원
                </span>
              </div>
              <div className='w-[5%] border-black border-r-[1px]'>
                <span className='text-[14px] font-nanum font-bold'>
                  보
                  <br />
                  증
                  <br />
                  금
                  <br />
                  액
                </span>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    천억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    백억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    십억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    억
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    천만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    백만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum'>
                    십만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    만
                  </span>
                </div>
                <div className="flex justify-center items-center h-[50%] border-black border-[2px]">
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    천
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    백
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    십
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className='w-[3.5%]'>
                <div className="h-[50%] w-[100%] border-black border-r-[1px] border-b-[1px]">
                  <span className='text-[1.1rem] font-nanum text-mybg'>
                    <br />
                  </span>
                  <span className='text-[1.1rem] font-nanum'>
                    일
                  </span>
                </div>
                <div className='flex justify-center items-center h-[50%] border-black border-[2px]'>
                  <span className='text-[1.1rem] font-nanum font-bold'>
                    1
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center border-black border-r-[1px] w-[3%]">
                <span className='text-[15px] font-nanum font-bold'>
                  원
                </span>
              </div>
            </div>
            <div className="main__flex_between">
              <div className="main__flex_around">
                <div>보증의 제공방법</div>
                <div>
                  <div>현금</div>
                  <div>보증서</div>
                </div>
              </div>
              <div>
                <div>보증을 반환 받았습니다.</div>
                <div>본인 또는 대리인</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
