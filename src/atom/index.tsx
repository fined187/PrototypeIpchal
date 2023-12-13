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
    sagunNum: "2022 타경 53843호",
    mulgunNum: "202020호",
    sagunAddr: "경기도 시흥시 도창동48",
    ipchalDate: "",
    bidder: "",
    bidderNum: 1,
    bidCorpYn: [""],
    agentCorpYn: "N",
    distribute: {
      sharedName: [""],
      sharedPercent: [0],
    },
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: "",
    bidName: [""],
    bidPhone1: [""],
    bidPhone2: [""],
    bidPhone3: [""],
    bidPhone: [""],
    bidIdNum1: [""],
    bidIdNum2: [""],
    bidIdNum: [""],
    bidAddr: [""],
    bidAddrDetail: [""],
    bidCorpNum1: [""],
    bidCorpNum2: [""],
    bidCorpNum3: [""],
    bidCorpNum: [""],
    bidCorpRegiNum1: [""],
    bidCorpRegiNum2: [""],
    bidCorpRegiNum: [""],
    agentName: '',
    agentPhone1: '',
    agentPhone2: '',
    agentPhone3: '',
    agentPhone: '',
    agentIdNum1: '',
    agentIdNum2: '',
    agentIdNum: '',
    agentAddr: '',
    agentAddrDetail: '',
    agentCorpNum1: '',
    agentCorpNum2: '',
    agentCorpNum3: '',
    agentCorpNum: '',
    agentCorpRegiNum1: '',
    agentCorpRegiNum2: '',
    agentCorpRegiNum: '',
    agentRel: '',
  },
  dangerouslyAllowMutability: true,
});