import { useRecoilState, useSetRecoilState } from 'recoil'
import StartIpchal from './ipchal/StartIpchal'
import { biddingInfoState, loginState, stepState } from '@/atom'
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
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IpchalResult from './ipchal/IpchalResult'
import DownIpchal from './ipchal/DownIpchal'
import BidderFormMod from './ipchal/BidderFormMod'
import TimeInfo from './ipchal/TimeInfo'
import AgentFormMod from './ipchal/AgentFormMod'
import AgentForm from './ipchal/AgentForm'
import Spinner from '@/components/Spinner'

export default function Home() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
  const setLoginState = useSetRecoilState(loginState)
  const [loading, setLoading] = useState<boolean>(false)
  const [bidders, setBidders] = useState({
    mstSeq: 0,
    state: 0,
    mulNo: "",
    caseYear: "",
    caseDetail: "",
    startYear: "",
    startMonth: "",
    startDay: "",
    reqCourtName: "",
    biddingDate: "",
    bidPrice: null || 0,
    bidDeposit: null || 0,
    depositType: null || "",
    agentYn: null || "",
    agent: {
      name: "" || null,
      phoneNo: "" || null,
      address: "" || null,
      job: "" || null,
      relationship: "" || null,
    },
    bidderCount: null || 0,
    bidders: [
        {
          peopleSeq: 0,
          bidderType: "",
          name: "",
          phoneNo: "",
          address: "",
          job:  "",
          companyNo: "",
          corporationNo: "",
          share: ""
        }
    ]
  })

  const router = useRouter()
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

  const handleGetIpchalInfo = async (query: string) => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      try {
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${Number(query)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.status === 200) {
          setBidders({
            ...bidders,
            state: response.data.data.state ?? 0,
            mulNo: response.data.data.mulNo ?? '',
            caseYear: response.data.data.caseYear ?? '',
            caseDetail: response.data.data.caseDetail ?? '',
            startYear: response.data.data.startYear ?? '',
            startMonth: response.data.data.startMonth ?? '',
            startDay: response.data.data.startDay ?? '',
            reqCourtName: response.data.data.reqCourtName ?? '',
            biddingDate: response.data.data.biddingDate ?? '',
            bidPrice: response.data.data.bidPrice ?? 0,
            bidDeposit: response.data.data.bidDeposit ?? 0,
            depositType: response.data.data.depositType ?? '',
            agentYn: response.data.data.agentYn ?? '',
            agent: response.data.data.agent ?? '',
            bidderCount: response.data.data.bidderCount ?? 0,
            bidders: response.data.data.bidders ?? [],
          })
          setBiddingForm({
            ...biddingForm,
            mstSeq: Number(query),
            state: response.data.data?.state,
            mulgunNum: response.data.data?.mulNo,
            caseNo: response.data.data?.caseYear + " 타경 " + response.data.data.caseDetail,
            sagunNum: response.data.data?.caseYear + " 타경 " + response.data.data.caseDetail,
            reqCourtName: response.data.data?.reqCourtName,
            ipchalDate: response.data.data?.startYear + "년 " + response.data.data.startMonth + "월 " + response.data.data.startDay + "일",
            biddingPrice: response.data.data?.bidPrice ?? 0,
            depositPrice: response.data.data.bidDeposit ?? 0,
            bidWay: response.data.data?.depositType,
            agentName: response.data.data?.agent ? response.data.data.agent.name : '',
            agentPhone: response.data.data?.agent ? response.data.data.agent.phoneNo : '',
            agentRel: response.data.data?.agent ? response.data.data.agent.relationship : '',
            agentAddr: response.data.data?.agent ? response.data.data.agent.address : '',
            agentJob: response.data.data?.agent ? response.data.data.agent.job : '',
            bidderNum: response.data.data?.bidderCount ?? 0,
            bidder: response.data.data?.agentYn === 'Y' ? 'agent' : 'self',
            bidders: response.data.data?.bidders,
            bidName: response.data.data?.bidders.map((bidder: any) => bidder.name),
            bidPhone: response.data.data?.bidders.map((bidder: any) => bidder.phoneNo),
            bidPhone1: response.data.data?.bidders.map((bidder: any) => bidder.phoneNo.length === 10 ? bidder.phoneNo.substring(0, 2) : bidder.phoneNo.substring(0, 3)),
            bidPhone2: response.data.data?.bidders.map((bidder: any) => bidder.phoneNo.substring(3, 7)),
            bidPhone3: response.data.data?.bidders.map((bidder: any) => bidder.phoneNo.substring(7, 11)),
            agentPhone1: response.data.data.agent !== null ? response.data.data.agent.phoneNo.length === 10 ? response.data.data.agent.phoneNo.substring(0, 2) : response.data.data.agent.phoneNo.substring(0, 3) : '',
            agentPhone2: response.data.data.agent !== null ? response.data.data.agent.phoneNo.length === 10 ? response.data.data.agent.phoneNo.substring(3, 6) : response.data.data.agent.phoneNo.substring(3, 7) : '',
            agentPhone3: response.data.data.agent !== null ? response.data.data.agent.phoneNo.length === 10 ? response.data.data.agent.phoneNo.substring(6, 10) : response.data.data.agent.phoneNo.substring(7, 11) : '',
            bidAddr: response.data.data?.bidders ? response.data.data?.bidders.map((bidder: any) => bidder.address) : [''],
            bidJob: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.job) : [''],
            bidCorpNum: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.companyNo) : [''],
            bidCorpNum1: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.companyNo?.substring(0, 3)) : [''],
            bidCorpNum2: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.companyNo?.substring(3, 5)) : [''],
            bidCorpNum3: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.companyNo?.substring(5, 10)) : [''],
            bidCorpRegiNum: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.corporationNo) : [''],
            bidCorpRegiNum1: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.corporationNo?.substring(0, 6)) : [''],
            bidCorpRegiNum2: response.data.data?.bidders ? response.data.data?.bidders?.map((bidder: any) => bidder.corporationNo?.substring(6, 13)) : [''],
            bidCorpYn: response.data.data?.bidders ? response.data.data?.bidders.map((bidder: any) => bidder.bidderType) : [''],
            numerator: response.data.data?.bidders ? response.data.data?.bidders.map((bidder: any) => bidder.share?.split('/')[0]) : [''],
            denominator: response.data.data?.bidders ? response.data.data?.bidders.map((bidder: any) => bidder.share?.split('/')[1]) : [''],
            shareWay: response.data.data?.bidders ? response.data.data?.bidders.every((ele: any) => ele.share === response.data.data?.bidders[0].share) ? 'S' : 'N' : 'S',
          })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const handleStateNum = () => {
    if (bidders.state === 0) {
      setStateNum(3)
    } else if ((bidders.state === 1 || bidders.state === 2) && bidders.agentYn === "Y") {
      setStateNum(16)
    } else if ((bidders.state === 1 || bidders.state === 2) && bidders.agentYn !== "Y") {
      setStateNum(5)
    } else if (bidders.state >= 4 && bidders.agentYn === "Y") {
      setStateNum(16)
    } else if (bidders.state >= 4 && bidders.agentYn !== "Y") {
      setStateNum(15)
    } else {
      setStateNum(1)
    }
  }

  useEffect(() => {
    const { mstSeq }: any = router.query
    const { userId }: any = router.query
    if (mstSeq !== undefined) {
      handleGetIpchalInfo(mstSeq as string)
      handleStateNum()
    }
      
    if (userId !== undefined) {
      handleLoginStatus(userId as string)
    }
  }, [router.query.mstSeq, router.query.userId, bidders.state, bidders.agentYn])

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center bg-white w-[100%] h-screen'>
          <div className='flex flex-col justify-center items-center bg-mybg w-[50%] h-[100%]'>
            <Spinner />
          </div>
        </div>
      )
      : (
        <>
          {(stateNum === 0) && <StartIpchal />}
          {(stateNum === 1) && <GetIpchalInfo />}
          {stateNum === 2 && biddingForm.biddingInfos.length > 1 && <TimeInfo />}
          {(bidders.state === 0 && stateNum === 3) ? <BidderInfo /> : (stateNum === 3) && <BidderInfo />}
          {(stateNum === 4) && <AgentForm />}
          {((bidders.state === 1 || bidders.state === 2) && stateNum === 5) ? <BidderCnt /> : (stateNum === 5) && <BidderCnt />}
          {(stateNum === 6) && <BidderForm />}
          {stateNum === 7 && biddingForm.bidName.length > 1 && <ShareInfo />}
          {stateNum === 8 && <BiddingPrice />}
          {stateNum === 9 && <BiddingPayment />}
          {stateNum === 10 && <IpchalInfo />}
          {stateNum === 11 && <IpchalResult />}
          {stateNum === 12 && <CreateFile />}
          {stateNum === 13 && <IpchalShare />}
          {stateNum === 14 && <DownIpchal />}
          {(bidders.state >= 4 || bidders.state <= 6) && (bidders.agentYn !== "Y") && (stateNum === 15) ? <BidderFormMod /> : (stateNum === 15) && <BidderFormMod />}
          {(bidders.state >= 1 || bidders.state <= 6) && (bidders.agentYn === "Y") && (stateNum === 16) ? <AgentFormMod /> : (stateNum === 16) && <AgentFormMod />}
        </>
      )}
    </>
  )
}
