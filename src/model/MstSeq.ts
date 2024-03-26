export interface MstSeq {
  aesUserId: string
  mstSeq: number
  state: number
  courtFullName: string
  reqCourtName: string
  mulNo: string
  caseYear: string
  caseDetail: string
  startYear: string
  startMonth: string
  startDay: string
  usage: string
  address: string
  etcAddress: string
  roadAddress: string
  biddingDate: string
  caseNoString: string
  bidPrice: number
  bidDeposit: number
  depositType: string
  biddingDateString: string
  dayDay: string
  carInfo: string
  biddingInfo: {
    biddingTime: string
    appraisalAmount: number
    minimumAmount: number
    bidDeposit: number
  },
  biddingInfos: [
    {
      biddingTime: string
      appraisalAmount: number
      minimumAmount: number
      bidDeposit: number
    }
  ],
  agentYn: string
  agent: {
    name: string | null
    relationship: string | null
    phoneNo: string | null
    address: string | null
    job: string | null
  },
  bidderCount: 0
  bidders: [
    {
      peopleSeq: number
      bidderType: string
      name: string
      phoneNo: string
      address: string
      job: string
      companyNo: string
      corporationNo: string
      share: string
      mandateYn: string
    }
  ]
}