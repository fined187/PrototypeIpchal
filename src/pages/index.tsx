import { useRecoilValue, useSetRecoilState } from 'recoil'
import StartIpchal from './ipchal/StartIpchal'
import { bidderInfo, biddingInfoState, loginState, stepState } from '@/atom'
import GetIpchalInfo from './ipchal/GetIpchalInfo'
import BidderInfo from './ipchal/BidderInfo'
import BidderCnt from './ipchal/BidderCnt'
import ShareInfo from './ipchal/ShareInfo'
import BiddingPrice from './ipchal/BiddingPrice'
import BiddingPayment from './ipchal/BiddingPayment'
import IpchalInfo from './ipchal/IpchalInfo'
import CreateFile from './ipchal/CreateFile'
import IpchalShare from './ipchal/IpchalShare'
import BidderForm from './ipchal/BidderForm'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IpchalResult from './ipchal/IpchalResult'
import DownIpchal from './ipchal/DownIpchal'
import BidderFormMod from './ipchal/BidderFormMod'
import { useQuery } from 'react-query'
import TimeInfo from './ipchal/TimeInfo'
import AgentFormMod from './ipchal/AgentFormMod'
import AgentForm from './ipchal/AgentForm'

export default function Home() {
  const stateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const setBiddingForm = useSetRecoilState(biddingInfoState)
  const setBidderInfos = useSetRecoilState(bidderInfo)

  const bidderInfos = useRecoilValue(bidderInfo)

  const setLoginState = useSetRecoilState(loginState)
  const loginStateValue = useRecoilValue(loginState)

  const router = useRouter()
  let userId = router.query.userId

  useEffect(() => {
    const handleLoginStatus = async (id: string) => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${id}/login-status`,
        )
        if (response.status === 200) {
          setLoginState(true)
          setBiddingForm({
            ...biddingForm,
            userId: id,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleLoginStatus(userId as string)
  }, [])

  return (
    <>
      {stateNum === 0 && <StartIpchal />}
      {stateNum === 1 && <GetIpchalInfo />}
      {stateNum === 2 && biddingForm.biddingInfos.length > 1 && <TimeInfo />}
      {stateNum === 3 && <BidderInfo />}
      {stateNum === 4 && <AgentForm />}
      {stateNum === 5 && <BidderCnt />}
      {stateNum === 6 && <BidderForm />}
      {stateNum === 7 && biddingForm.bidName.length > 1 && <ShareInfo />}
      {stateNum === 8 && <BiddingPrice />}
      {stateNum === 9 && <BiddingPayment />}
      {stateNum === 10 && <IpchalInfo />}
      {stateNum === 11 && <IpchalResult />}
      {stateNum === 12 && <CreateFile />}
      {stateNum === 13 && <IpchalShare />}
      {stateNum === 14 && <DownIpchal />}
      {stateNum === 15 && <BidderFormMod />}
      {stateNum === 16 && <AgentFormMod />}
    </>
  )
}
