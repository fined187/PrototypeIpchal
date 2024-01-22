import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import LoadingResult from '@/components/LoadingResult'
import CoIpchalContent from '@/components/CoIpchalContent/CoIpchalResult'
import AgentListForm from '@/components/CoIpchalContent/AgentListForm'
import { TotalResultType } from '@/interface/IpchalType'
import SingleIpchalResult from '@/components/SingleIpchalContent/SingleIpchalResult'

export default function IpchalResult() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)

  const [totalResult, setTotalResult] = useState<TotalResultType>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const handleGetResult = async () => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}`,
        )
        if (response.status === 200) {
          setBiddingInfo({
            ...biddingInfo,
            reqCourtName: response.data.data.reqCourtName,
            bidIdNum1: biddingInfo.bidIdNum.map((item) => item !== '' ? item?.substring(0, 6) : ''),
            bidIdNum2: biddingInfo.bidIdNum.map((item) => item !== '' ? item?.substring(6, 13) : ''),
          })
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
        <SingleIpchalResult totalResult={totalResult} />
      )}
      {!loading && (totalResult && totalResult.bidders.length > 1) && (
        <CoIpchalContent />
      )}
      {!loading && (totalResult && totalResult.agentYn === 'Y') && (
        <AgentListForm totalResult={totalResult} />
      )}
      {/* 버튼 */}
      <div className="flex justify-center items-center w-[100%] h-[100%] bg-white">
        <div className='flex flex-row justify-center items-center w-[50%] bg-mybg gap-[20px]'>
          <button
            type="button"
            className="flex md:w-[200px] w-[150px] h-[40px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => setStateNum(stateNum - 1)}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex md:w-[280px] w-[230px] h-[40px] bg-mygold rounded-md justify-center items-center cursor-pointer"
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
    </>
  )
}
