import { atom } from 'recoil'
import { v4 } from 'uuid'

export const stepState = atom({
  key: `stepState/${v4()}`,
  default: 0,
  dangerouslyAllowMutability: true,
})

export const biddingInfoState = atom({
  key: `biddingInfoState/${v4()}`,
  default: {
    mstSeq: 0,
    state: 0,
    infoId: '',
    caseNo: '',
    sagunNum: '',
    mulgunNum: '',
    sagunAddr: '',
    ipchalDate: '',
    bidder: '',
    bidderNum: 1,
    bidCorpYn: [''],
    distribute: {
      sharedName: [''],
      sharedPercent: [0],
    },
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: '',
    bidName: [''],
    bidPhone1: [''],
    bidPhone2: [''],
    bidPhone3: [''],
    bidPhone: [''],
    bidIdNum1: [''],
    bidIdNum2: [''],
    bidIdNum: [''],
    bidAddr: [''],
    bidAddrDetail: [''],
    bidCorpNum1: [''],
    bidCorpNum2: [''],
    bidCorpNum3: [''],
    bidCorpNum: [''],
    bidCorpRegiNum1: [''],
    bidCorpRegiNum2: [''],
    bidCorpRegiNum: [''],
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
    agentJob: '',
    agentRel: '',
  },
  dangerouslyAllowMutability: true,
})

export const loginState = atom({
  key: `loginState/${v4()}`,
  default: false,
  dangerouslyAllowMutability: true,
})