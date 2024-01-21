import { biddingInfoState } from '@/atom'
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
    </>
  )
}
