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
import { MstSeq } from '@/model/MstSeq'
import useMstSeq from '@/components/hooks/useMstSeq'
import useChecks from '@/components/hooks/useChecks'
import { useMutation } from 'react-query'
import getChecks from '@/remote/getChecks'

export default function Home() {
  const router = useRouter()
  const { mstSeq } = router.query
  const { userId } = router.query
  const { idcode } = router.query
  const { data: mstSeqData, isSuccess: mstSeqDataSuccess } = useMstSeq(Number(mstSeq))
  const { mutate: idCodeData } = useMutation(({ idCode }: { idCode: string }) => {
    return getChecks(idCode)
  }, {
    onSuccess: (response) => {
      setFormData((prev) => ({
        ...prev,
        aesUserId: userId as string ?? '',
        infoId: response.infoId,
        caseNo: response.caseNo,
        mulSeq: response.mulSeq,
        biddingDate: response.biddingDate,
        courtFullName: response.courtFullName,
        reqCourtName: response.reqCourtName,
        mulNo: response.mulNo,
        caseYear: response.caseYear,
        caseDetail: response.caseDetail,
        startYear: response.startYear,
        startMonth: response.startMonth,
        startDay: response.startDay,
        caseNoString: response.caseNoString,
        usage: response.usage,
        biddingDateString: response.biddingDateString,
        dayDay: response.dayDay,
        address: response.address,
        etcAddress: response.etcAddress,
        roadAddress: response.roadAddress,
        carInfo: response.carInfo,
        biddingInfos: response.biddingInfos,
      }));
    }
  })
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<MstSeq>({
    aesUserId: '',
    mstSeq: 0,
    state: 0,
    courtFullName: '',
    reqCourtName: '',
    mulNo: '',
    caseYear: '',
    caseDetail: '',
    startYear: '',
    startMonth: '',
    startDay: '',
    usage: '',
    address: '',
    etcAddress: '',
    roadAddress: '',
    biddingDate: '',
    caseNoString: '',
    bidPrice: 0,
    bidDeposit: 0,
    depositType: '',
    biddingDateString: '',
    dayDay: '',
    carInfo: '',
    biddingInfo: {
      biddingTime: '',
      appraisalAmount: 0,
      minimumAmount: 0,
      bidDeposit: 0,
    },
    biddingInfos: [
      {
        biddingTime: '',
        appraisalAmount: 0,
        minimumAmount: 0,
        bidDeposit: 0,
      }
    ],
    agentYn: '',
    agent: {
      name: '',
      relationship: '',
      phoneNo: '',
      address: '',
      job: '',
    },
    bidderCount: 0,
    bidders: [
      {
        peopleSeq: 0,
        bidderType: '',
        name: '',
        phoneNo: '',
        address: '',
        job: '',
        companyNo: '',
        corporationNo: '',
        share: '',
        mandateYn: '',
      },
    ],
  })

  const handleStateNum = () => {
    if (formData.state === 0) {
      setStateNum(4)
    } else if ((formData.state === 1 || formData.state === 2) && formData.agentYn === "Y") {
      setStateNum(17)
    } else if ((formData.state === 1 || formData.state === 2) && formData.agentYn !== "Y") {
      setStateNum(6)
    } else if (formData.state >= 4 && formData.agentYn === "Y") {
      setStateNum(17)
    } else if (formData.state >= 4 && formData.agentYn !== "Y") {
      setStateNum(16)
    } else if (formData.state === 9) {
      setStateNum(0)
    }
  }

  const handleCheck = async () => {
    try {
      await idCodeData({ idCode: idcode as string })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (mstSeqDataSuccess && mstSeqData) {
      setLoading(true)
      setFormData((prev) => ({
        ...prev,
        aesUserId: userId as string ?? '',
        mstSeq: mstSeqData.mstSeq,
        address: mstSeqData.address ?? '',
        agentYn: mstSeqData.agentYn ?? '',
        agent: {
          name: mstSeqData.agent?.name ?? '',
          relationship: mstSeqData.agent?.relationship ?? '',
          phoneNo: mstSeqData.agent?.phoneNo ?? '',
          address: mstSeqData.agent?.address ?? '',
          job: mstSeqData.agent?.job ?? '',
        },
        bidders: mstSeqData.bidders ?? [],
        bidDeposit: mstSeqData.bidDeposit ?? 0,
        bidPrice: mstSeqData.bidPrice ?? 0,
        bidderCount: mstSeqData.bidderCount ?? 0,
        biddingDate: mstSeqData.biddingDate ?? '',
        biddingInfo: {
          appraisalAmount: mstSeqData.biddingInfo.appraisalAmount ?? 0,
          biddingTime: mstSeqData.biddingInfo.biddingTime ?? '',
          bidDeposit: mstSeqData.biddingInfo.bidDeposit ?? 0,
          minimumAmount: mstSeqData.biddingInfo.minimumAmount ?? 0,
        },
        caseDetail: mstSeqData.caseDetail ?? '',
        caseYear: mstSeqData.caseYear ?? '',
        courtFullName: mstSeqData.courtFullName ?? '',
        depositType: mstSeqData.depositType ?? '',
        etcAddress: mstSeqData.etcAddress ?? '',
        mulNo: mstSeqData.mulNo ?? '',
        reqCourtName: mstSeqData.reqCourtName ?? '',
        roadAddress: mstSeqData.roadAddress ?? '',
        startDay: mstSeqData.startDay ?? '',
        startMonth: mstSeqData.startMonth ?? '',
        startYear: mstSeqData.startYear ?? '',
        usage: mstSeqData.usage ?? '',
        state: mstSeqData.state ?? 0,
      }));
      setLoading(false)
      handleStateNum()
    }
    if (idcode) {
      handleCheck()
    }
  }, [mstSeqDataSuccess, mstSeqData, idcode]);

  const handleHeight = () => {
    let height = window.innerHeight;
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box');
      if (boxElement) {
        boxElement.style.height = height + 'px';
      }
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  console.log(formData)
  return (
    <div className={`flex flex-col`} id={`${stateNum === 12 ? '' : 'box'}`} style={{
      height: stateNum === 12 ? '' : 'auto',
    }}>
      {loading ? (
        <div className='flex justify-center items-center bg-white w-[100%] h-[100%]'>
          <div className='flex flex-col justify-center items-center bg-mybg w-[50%] h-[100%]'>
            <Spinner />
          </div>
        </div>
      )
      : (
        <>
          {(((formData.state === 9) || (stateNum === 0)) ? <StartIpchal /> : (stateNum === 0) && <StartIpchal />)}
          {(stateNum === 1) && <SearchIpchal />}
          {(stateNum === 2) && <GetIpchalInfo formData={formData} />}
          {stateNum === 3 && formData.biddingInfos.length > 1 && <TimeInfo />}
          {(formData.state === 0 && stateNum === 4) ? <BidderInfo /> : (stateNum === 4) && <BidderInfo />}
          {(stateNum === 5) && <AgentForm />}
          {((formData.state === 1 || formData.state === 2) && stateNum === 6) ? <BidderCnt /> : (stateNum === 6) && <BidderCnt />}
          {(stateNum === 7) && <BidderForm />}
          {stateNum === 8 && formData.bidderCount > 1 && <ShareInfo />}
          {stateNum === 9 && <BiddingPrice />}
          {stateNum === 10 && <BiddingPayment />}
          {stateNum === 11 && <IpchalInfo />}
          {stateNum === 12 && <IpchalResult />}
          {stateNum === 13 && <CreateFile />}
          {stateNum === 14 && <PreparingList />}
          {(formData.state >= 4 || formData.state <= 6) && (formData.agentYn !== "Y") && (stateNum === 16) ? <BidderFormMod /> : (stateNum === 16) && <BidderFormMod />}
          {(formData.state >= 1 || formData.state <= 6) && (formData.agentYn === "Y") && (stateNum === 17) ? <AgentFormMod /> : (stateNum === 17) && <AgentFormMod />}
          {stateNum === 19 && formData.agentYn === "Y" && <AgentCheck />}
        </>
      )}
    </div>
  )
}
