import { useRecoilValue, useSetRecoilState } from 'recoil'
import StartIpchal from './ipchal/StartIpchal'
import { biddingInfoState, loginState, stepState } from '@/atom'
import GetIpchalInfo from './ipchal/GetIpchalInfo'
import BidderInfo from './ipchal/BidderInfo'
import BidderCnt from './ipchal/BidderCnt'
import ShareInfo from './ipchal/ShareInfo'
import BiddingPrice from './ipchal/BiddingPrice'
import BiddingPayment from './ipchal/BiddingPayment'
import IpchalInfo from './ipchal/IpchalInfo'
import IpchalContent from './ipchal/IpchalContent'
import CreateFile from './ipchal/CreateFile'
import IpchalShare from './ipchal/IpchalShare'
import BidderForm from './ipchal/BidderForm'
import AgentForm from './ipchal/AgentForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IpchalResult from './ipchal/IpchalResult'
import DownIpchal from './ipchal/DownIpchal'
import BidderFormMod from './ipchal/BidderFormMod'

export default function Home() {
  const stateNum = useRecoilValue(stepState)
  const biddingForm = useRecoilValue(biddingInfoState)
  const [getUserId, setGetUserId] = useState<string>('')

  const setLoginState = useSetRecoilState(loginState)
  const loginStateValue = useRecoilValue(loginState)

  const router = useRouter()
  const idcode = router.query.idCode
  const colmul_no = router.query.colmul_no
  const startdate = router.query.startdate
  const bubnm = router.query.bubnm
  const ipchalamt = router.query.ipchalamt
  const lowamt = router.query.lowamt

  useEffect(() => {
    const handleLoginStatus = async (id: string) => {
      try {
        const response = await axios.get(
          `http://118.217.180.254:8081/ggi/api/bid-form/${id}/login-status`,
        )
        if (response.data.data.isLoginStatus) {
          setLoginState(true)
          setGetUserId(response.data.data.userId)
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleLoginStatus('best')
  }, [])

  return (
    <>
      {stateNum === 0 && <StartIpchal />}
      {stateNum === 1 && <GetIpchalInfo />}
      {stateNum === 2 && <BidderInfo />}
      {stateNum === 3 && biddingForm.bidder === 'agent' && <AgentForm />}
      {stateNum === 4 && <BidderCnt />}
      {stateNum === 5 && <BidderForm />}
      {stateNum === 6 && biddingForm.bidderNum > 1 && <ShareInfo />}
      {stateNum === 7 && <BiddingPrice />}
      {stateNum === 8 && <BiddingPayment />}
      {stateNum === 9 && <IpchalInfo />}
      {stateNum === 10 && <IpchalResult />}
      {stateNum === 11 && <CreateFile />}
      {stateNum === 12 && <IpchalShare />}
      {stateNum === 13 && <DownIpchal />}
      {stateNum === 14 && <BidderFormMod />}
    </>
  )
}
