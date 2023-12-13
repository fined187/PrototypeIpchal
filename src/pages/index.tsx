import { useRecoilValue } from "recoil";
import StartIpchal from "./ipchal/StartIpchal";
import { biddingInfoState, stepState } from "@/atom";
import GetIpchalInfo from "./ipchal/GetIpchalInfo";
import { useState } from "react";
import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import BidderInfo from "./ipchal/BidderInfo";
import BidderCnt from "./ipchal/BidderCnt";
import ShareInfo from "./ipchal/ShareInfo";
import BiddingPrice from "./ipchal/BiddingPrice";
import BiddingPayment from "./ipchal/BiddingPayment";
import IpchalInfo from "./ipchal/IpchalInfo";
import IpchalContent from "./ipchal/IpchalContent";
import CreateFile from "./ipchal/CreateFile";
import IpchalShare from "./ipchal/IpchalShare";
import BidderForm from "./ipchal/BidderForm";
import AgentForm from "./ipchal/AgentForm";

export default function Home() {
  const stateNum = useRecoilValue(stepState);
  const biddingForm = useRecoilValue(biddingInfoState);
  const [formData, setFormData] = useState<IpchalType>({
    sagunNum: "",
    mulgunNum: "",
    ipchalDate: "",
    addr: "",
    bidder: "",
    bidderNum: 1,
    CorpYn: "N",
    distribute: {
      sharedName: [""],
      sharedPercent: [],
    },
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: "",
    bidName: "",
    bidPhone1: "",
    bidPhone2: "",
    bidPhone3: "",
    bidIdNum1: "",
    bidIdNum2: "",
    bidAddr: "",
    bidAddrDetail: "",
    bidCorpNum1: "",
    bidCorpNum2: "",
    bidCorpNum3: "",
    bidCorpRegiNum1: "",
    bidCorpRegiNum2: "",
  });


  return (
    <>
      {stateNum === 0 && (
        <StartIpchal />
      )}
      {stateNum === 1 && (
        <GetIpchalInfo />
      )}
      {stateNum === 2 && (
        <BidderInfo />
      )}
      {stateNum === 3 && (
        <BidderCnt />
      )}
      {stateNum === 4 && (
        <BidderForm />
      )}
      {stateNum === 5 && biddingForm.bidder === 'agent' && (
        <AgentForm />
      )}
      {(stateNum === 6) && (
        <ShareInfo />
      )}
      {(stateNum === 7) && (
        <BiddingPrice />
      )}
      {(stateNum === 8) && (
        <BiddingPayment />
      )}
      {(stateNum === 9) && (
        <IpchalInfo />
      )}
      {(stateNum === 10) && (
        <IpchalContent />
      )}
      {(stateNum === 11) && (
        <CreateFile />
      )}
      {(stateNum === 12) && (
        <IpchalShare />
      )}
    </>
  );
}
