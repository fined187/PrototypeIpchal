import { biddingInfoState, stepState } from '@/atom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import LoadingResult from '@/components/LoadingResult'
import AgentListForm from '@/components/coIpchalContent/AgentListForm'
import { TotalResultType } from '@/interface/IpchalType'
import SingleIpchalResult from '@/components/SingleIpchalContent/SingleIpchalResult'
import CoIpchalResult from '@/components/coIpchalContent/CoIpchalResult'
import Button from '@/components/shared/ButtonCp'

export default function IpchalResult() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)

  const [totalResult, setTotalResult] = useState<TotalResultType>()
  const [loading, setLoading] = useState<boolean>(false)
  const mandatesList = totalResult?.bidders.filter((item) => item.mandateYn === 'Y')

  const totalPage = Math.ceil((mandatesList?.length ?? 0) / 3)
  const listPerPage = 3
  let currentPage = 1;
  let currentList: any = [];

  const handleReturnList = () => {
    let startIndex = (currentPage - 1) * listPerPage
    let endIndex = startIndex + listPerPage
    for (let i = 0; i < totalPage; i++) {
      currentList.push(mandatesList?.slice(startIndex, endIndex))   //  0 ~ 3, 3 ~ 6, 6 ~ 9
      startIndex = endIndex
      endIndex = endIndex + listPerPage
      currentPage++
    }
    return currentList.filter((item: any) => item.length > 0)
  }

  useEffect(() => {
    setLoading(true)
    const handleGetResult = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}`,
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
  console.log(totalResult)
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
        <CoIpchalResult />
      )}
      {!loading && (totalResult && totalResult.agentYn === 'Y') && (
        totalResult && totalResult.bidders.length > 3 ? (
          handleReturnList().map((item: any, index: number) => (
            <AgentListForm totalResult={totalResult} bidders={item} key={index} />
          ))
        ) : 
        (<AgentListForm totalResult={totalResult} />)
      )}
      {/* 버튼 */}
      <div className="flex justify-center items-center w-[100%] h-[100%] bg-white">
        <Button 
          nextText='확인했습니다'
          handleNextStep={() => setStateNum(stateNum + 1)}
          handlePrevStep={() => setStateNum(stateNum - 1)}
        />
      </div>
    </>
  )
}
