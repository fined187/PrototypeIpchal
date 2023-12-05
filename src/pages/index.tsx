import { useRecoilValue } from "recoil";
import StartIpchal from "./ipchal/StartIpchal";
import { stepState } from "@/atom";
import GetIpchalInfo from "./ipchal/GetIpchalInfo";
import { useState } from "react";
import { BiddingInfoType, IpchalType } from "@/interface/IpchalType";
import BidderInfo from "./ipchal/BidderInfo";
import BidderCnt from "./ipchal/BidderCnt";
import BidderDetail from "./ipchal/BidderDetail";
import ShareInfo from "./ipchal/ShareInfo";

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
    distribute: "",
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

  const [biddingInfo, setBiddingInfo] = useState<BiddingInfoType>({
    bidderName: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderPhone1: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderPhone2: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderPhone3: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderIdNum1: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderIdNum2: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderAddr: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderAddrDetail: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpNum1: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpNum2: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpNum3: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpRegiNum1: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpRegiNum2: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill(''),
    bidderCorpYn: Array(Number(formData.bidderNum) < 1 ? 1 : Number(formData.bidderNum)).fill('N'),
  });

  return (
    <>
      {stateNum === 0 && <StartIpchal />}
      {stateNum === 1 && (
        <GetIpchalInfo formData={formData} setFormData={setFormData} />
      )}
      {stateNum === 2 && (
        <BidderInfo formData={formData} setFormData={setFormData} />
      )}
      {stateNum === 3 && (
        <BidderCnt formData={formData} setFormData={setFormData} />
      )}
      {stateNum === 4 && (
        <BidderDetail formData={formData} setFormData={setFormData} biddingInfo={biddingInfo} setBiddingInfo={setBiddingInfo}  />
      )}
      {stateNum === 5 && (
        <ShareInfo formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
