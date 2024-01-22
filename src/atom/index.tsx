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
    isFileCreated: false,
    selectedTime: '0',
    mstSeq: 0,
    state: 0,
    infoId: '',
    caseNo: '',
    sagunNum: '',
    mulgunNum: '',
    sagunAddr: '',
    ipchalDate: '',
    biddingInfos: [
      {
        biddingTime: '',
        appraisalAmount: 0,
        minimumAmount: 0,
        bidDeposit: 0,
      },
    ],
    bidder: '',
    bidderNum: 0,
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: '',
    bidCorpYn: [''],
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
    bidJob: [''],
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
    pdfFile: new File([], ''),
    reqCourtName: '',
    idcode: '',
    userId: '',
    bidders: [],
    imageFile: '',
    isModalOpen: false,
    shareWay: 'S',
    numerator: [''],
    denominator: [''],
  },
  dangerouslyAllowMutability: true,
})

export const loginState = atom({
  key: `loginState/${v4()}`,
  default: false,
  dangerouslyAllowMutability: true,
})

export const bidderInfo = atom({
  key: `bidderInfo/${v4()}`,
  default: {
    agentYn: '',
    mstSeq: 0,
    state: 0,
    bidderCount: 0,
    number: 0,
    bidders:[
      {
        peopleSeq: 0,
        bidderType: '',
        name: '',
        phoneNo: '',
        address: '',
        job: '',
        companyNo: '',
        corporationNo: '',
        share: ''
      }
    ]
  },
  dangerouslyAllowMutability: true,
})

export const agentInfo = atom({
  key: `agentInfo/${v4()}`,
  default: {
    agentYn: '',
    mstSeq: 0,
    state: 0,
    agent: {
      name: '',
      phoneNo: '',
      address: '',
      job: '',
      relationship: '',
    },
  },
  dangerouslyAllowMutability: true,
})