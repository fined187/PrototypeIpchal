export interface Bidders {
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
  bidderIdNum1?: string
  bidderIdNum2?: string
  bidderCorpNum1?: string
  bidderCorpNum2?: string
  bidderCorpNum3?: string
  bidderCorpRegiNum1?: string
  bidderCorpRegiNum2?: string
  bidderPhoneNo1?: string
  bidderPhoneNo2?: string
  bidderPhoneNo3?: string
  bidderAddrDetail?: string
}

export interface Agent {
  agentYn : string
  agent: {
    name: string
    relationship: string
    phoneNo: string
    address: string
    job: string
  }
  agentIdNum1?: string
  agentIdNum2?: string
  agentPhoneNo1?: string
  agentPhoneNo2?: string
  agentPhoneNo3?: string
  agentAddrDetail?: string
}