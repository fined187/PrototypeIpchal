import { useRecoilValue } from "recoil";
import StartIpchal from "./ipchal/StartIpchal";
import { stepState } from "@/atom";
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

export default function Home() {
  const stateNum = useRecoilValue(stepState);
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
      {stateNum === 0 && <StartIpchal />}
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
      {(stateNum === 5) && (
        <ShareInfo />
      )}
      {(stateNum === 6) && (
        <BiddingPrice formData={formData} setFormData={setFormData} />
      )}
      {(stateNum === 7) && (
        <BiddingPayment formData={formData} setFormData={setFormData} />
      )}
      {(stateNum === 8) && (
        <IpchalInfo />
      )}
      {(stateNum === 9) && (
        <IpchalContent />
      )}
      {(stateNum === 10) && (
        <CreateFile />
      )}
      {(stateNum === 11) && (
        <IpchalShare />
      )}
    </>
  );
}
