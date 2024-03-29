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
    courtFullName: '',
    mstSeq: 0,
    state: 0,
    infoId: '',
    caseNo: '',
    sagunNum: '',
    mulNo: '',
    usage: '',
    etcAddress: '',
    roadAddress: '',
    sagunAddr: '',
    ipchalDate: '',
    biddingDate: '',
    biddingInfos: [
      {
        biddingTime: '',
        appraisalAmount: 0,
        minimumAmount: 0,
        bidDeposit: 0,
      },
    ],
    biddingInfo: {
      biddingTime: '',
      appraisalAmount: 0,
      minimumAmount: 0,
      bidDeposit: 0,
    },
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
    agentYn: '',
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
    pdfFile: new Blob(),
    reqCourtName: '',
    idcode: '',
    aesUserId: '',
    bidders: [],
    imageFile: '',
    isModalOpen: false,
    shareWay: 'S',
    numerator: [''],
    denominator: [''],
    mulSeq: '',
    mandates: [{
      peopleSeq: 0,
      name: '',
      mandateYn: '',
    }],
    pdfPassword: '',
    fileName: '',
    searchResults: [] || null,
    searchResultState: 1,
  },
  dangerouslyAllowMutability: true,
})

export const bidderInfoState = atom({
  key: `bidderInfoState/${v4()}`,
  default: {
    mstSeq: 0,
    state: 0,
    courtFullName: "",
    reqCourtName: "",
    mulNo: "",
    caseYear: "",
    caseDetail: "",
    startYear: "",
    startMonth: "",
    startDay: "",
    usage: "",
    address: "",
    etcAddress: "",
    roadAddress: "",
    biddingDate: "",
    bidPrice: 0,
    depositPrice: 0,
    biddingInfo: {
      biddingTime: "",
      appraisalAmount: 0,
      minimumAmount: 0,
      bidDeposit: 0,
    },
    agentYn: "",
    agent: {
      name: "",
      relationship: "",
      phoneNo: "",
      addressNo: "",
      job: "",
    },
    bidderCount: 0,
    bidders: [
      {
        peopleSeq: 0,
        name: "",
        phoneNo: "",
        address: "",
        job: "",
        companyNo: "",
        corporationNo: "",
        share: "",
        mandateYn: "",
      }
    ]
    },
  dangerouslyAllowMutability: true,
})