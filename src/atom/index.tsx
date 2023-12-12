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
    mulgunNum: "2023년 11월 06일",
    sagunAddr: "경기도 시흥시 도창동48",
    ipchalDate: "",
    bidder: "",
    bidderNum: 1,
    CorpYn: [""],
    distribute: {
      sharedName: [""],
      sharedPercent: [0],
    },
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: "",
    bidName: [""],
    bidPhone: [""],
    bidIdNum: [""],
    bidAddr: [""],
    bidCorpNum: [""],
    bidCorpRegiNum: [""],
  },
  dangerouslyAllowMutability: true,
});