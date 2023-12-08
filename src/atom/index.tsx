import { atom } from "recoil";
import { v4 } from "uuid";

export const stepState = atom({
  key: `stepState/${v4()}`,
  default: 0,
  dangerouslyAllowMutability: true,
});


export const biddingInfoState = atom({
  key: `biddingInfoState/${v4()}`,
  default: {
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
  },
  dangerouslyAllowMutability: true,
});