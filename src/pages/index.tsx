import { useRecoilValue } from "recoil";
import StartIpchal from "./ipchal/StartIpchal";
import { stepState } from "@/atom";
import GetIpchalInfo from "./ipchal/GetIpchalInfo";
import { useState } from "react";
import { IpchalType } from "@/interface/IpchalType";
import BidderInfo from "./ipchal/BidderInfo";
import BidderCnt from "./ipchal/BidderCnt";
import BidderDetail from "./ipchal/BidderDetail";

export default function Home() {
  const stateNum = useRecoilValue(stepState);
  const [formData, setFormData] = useState<IpchalType>({
    sagunNum: "",
    mulgunNum: "",
    ipchalDate: "",
    addr: "",
    bidder: "",
    bidderNum: "1",
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
        <BidderDetail formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
