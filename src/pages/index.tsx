import { useRecoilState } from 'recoil'
import StartIpchal from './ipchal/StartIpchal'
import { biddingInfoState, stepState } from '@/atom'
import BidderInfo from './ipchal/BidderInfo'
import BidderCnt from './ipchal/BidderCnt'
import ShareInfo from './ipchal/ShareInfo'
import BiddingPrice from './ipchal/BiddingPrice'
import BiddingPayment from './ipchal/BiddingPayment'
import IpchalInfo from './ipchal/IpchalInfo'
import CreateFile from './ipchal/CreateFile'
import BidderForm from './ipchal/BidderForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import IpchalResult from './ipchal/IpchalResult'
import BidderFormMod from './ipchal/BidderFormMod'
import TimeInfo from './ipchal/TimeInfo'
import AgentFormMod from './ipchal/AgentFormMod'
import AgentForm from './ipchal/AgentForm'
import Spinner from '@/components/Spinner'
import PreparingList from './ipchal/PreparingList'
import AgentCheck from './ipchal/AgentCheck'
import SearchIpchal from './ipchal/SearchIpchal'
import GetIpchalInfo from './ipchal/GetIpchalInfo'

export default function Home() {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)
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
  const handleGetIpchalInfo = async (mstSeq: string, userId: string) => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${Number(mstSeq)}`, {
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
            mstSeq: Number(mstSeq),
            aesUserId: userId ?? '',
            state: response.data.data?.state,
            mulNo: response.data.data?.mulNo === '' ? '1' : response.data.data?.mulNo,
            caseNo: response.data.data?.caseYear + " 타경 " + response.data.data.caseDetail,
            sagunNum: response.data.data?.caseYear + " 타경 " + response.data.data.caseDetail,
            reqCourtName: response.data.data?.reqCourtName,
            ipchalDate: (response.data.data.startYear) + '년 ' +
            (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) + '월 ' +
            (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay) + '일',
            biddingDate: response.data.data?.biddingDate,
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
            sagunAddr: response.data.data?.address ?? '',
            biddingInfos: response.data.data?.biddingInfo,
            biddingInfo: response.data.data?.biddingInfo,
            mandates: response.data.data?.bidders.map((bidder: any) => {return {name: bidder.name, peopleSeq: bidder.peopleSeq, mandateYn: bidder.mandateYn}}),
            agentYn: response.data.data?.agentYn,
            usage: response.data.data?.usage,
            etcAddress: response.data.data?.etcAddress,
            roadAddress: response.data.data?.roadAddress,
            courtFullName: response.data.data?.courtFullName,
          })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setStateNum(0)
        setLoading(false)
      }
    }
  }

  const handleStateNum = () => {
    if (bidders.state === 0) {
      setStateNum(4)
    } else if ((bidders.state === 1 || bidders.state === 2) && bidders.agentYn === "Y") {
      setStateNum(17)
    } else if ((bidders.state === 1 || bidders.state === 2) && bidders.agentYn !== "Y") {
      setStateNum(6)
    } else if (bidders.state >= 4 && bidders.agentYn === "Y") {
      setStateNum(17)
    } else if (bidders.state >= 4 && bidders.agentYn !== "Y") {
      setStateNum(16)
    } else if (bidders.state === 9) {
      setStateNum(0)
    }
  }
  const handleCheck = async (idcode: string, userId: string) => {
    setLoading(true)
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}checks`,
          {
            idCode: idcode,
          },
          { 
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (response.status === 200) {
          setBiddingForm({
            ...biddingForm,
            caseNo: response.data.data.caseNo,
            infoId: response.data.data.infoId,
            sagunNum:
              response.data.data.caseYear +
              ' 타경 ' +
              response.data.data.caseDetail,
            mulNo: response.data.data.mulNo === '' ? '1' : response.data.data.mulNo,
            mulSeq: response.data.data.mulSeq,
            ipchalDate:
              (response.data.data.startYear) + '년 ' +
              (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) + '월 ' +
              (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay) + '일',
            biddingDate: (response.data.data.startYear) +
            (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) +
            (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay),
            sagunAddr: response.data.data.address,
            usage: response.data.data.usage,
            etcAddress: response.data.data.etcAddress,
            roadAddress: response.data.data.roadAddress,
            biddingInfos: response.data.data.biddingInfos,
            idcode: idcode as string,
            courtFullName: response.data.data.courtFullName,
            reqCourtName: response.data.data.reqCourtName,
            aesUserId: userId ?? "",
          })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  }

  useEffect(() => {
    const { idcode } = router.query
    const { mstSeq } = router.query
    const { userId } = router.query
    const handleStart = async () => {
      if (idcode) {
        await handleCheck(idcode as string, userId as string)
      }
      if (mstSeq) {
        await handleGetIpchalInfo(mstSeq as string, userId as string)
        handleStateNum()
      }
    }
    handleStart()
  }, [router.query, bidders.state, bidders.agentYn])

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
          {(((bidders.state === 9) || (stateNum === 0)) ? <StartIpchal /> : (stateNum === 0) && <StartIpchal />)}
          {(stateNum === 1) && <SearchIpchal />}
          {(stateNum === 2) && <GetIpchalInfo />}
          {stateNum === 3 && biddingForm.biddingInfos.length > 1 && <TimeInfo />}
          {(bidders.state === 0 && stateNum === 4) ? <BidderInfo /> : (stateNum === 4) && <BidderInfo />}
          {(stateNum === 5) && <AgentForm />}
          {((bidders.state === 1 || bidders.state === 2) && stateNum === 6) ? <BidderCnt /> : (stateNum === 6) && <BidderCnt />}
          {(stateNum === 7) && <BidderForm />}
          {stateNum === 8 && biddingForm.bidderNum > 1 && <ShareInfo />}
          {stateNum === 9 && <BiddingPrice />}
          {stateNum === 10 && <BiddingPayment />}
          {stateNum === 11 && <IpchalInfo />}
          {stateNum === 12 && <IpchalResult />}
          {stateNum === 13 && <CreateFile />}
          {stateNum === 14 && <PreparingList />}
          {(bidders.state >= 4 || bidders.state <= 6) && (bidders.agentYn !== "Y") && (stateNum === 16) ? <BidderFormMod /> : (stateNum === 16) && <BidderFormMod />}
          {(bidders.state >= 1 || bidders.state <= 6) && (bidders.agentYn === "Y") && (stateNum === 17) ? <AgentFormMod /> : (stateNum === 17) && <AgentFormMod />}
          {stateNum === 19 && biddingForm.agentYn === "Y" && <AgentCheck />}
        </>
      )}
    </>
  )
}
