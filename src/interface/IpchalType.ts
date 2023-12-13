export interface DistributeType {
  sharedName: string[];
  sharedPercent: number[];
}

export interface IpchalType {
  sagunNum: string;
  mulgunNum: string;
  ipchalDate: string;
  addr: string;
  bidder: string;
  bidderNum: number;
  CorpYn: string;
  distribute: DistributeType;
  biddingPrice: number;
  depositPrice: number;
  bidWay: string;
  bidName: string;
  bidPhone1: string;
  bidPhone2: string;
  bidPhone3: string;
  bidIdNum1?: string;
  bidIdNum2?: string;
  bidAddr: string;
  bidAddrDetail: string;
  bidCorpNum1?: string;
  bidCorpNum2?: string;
  bidCorpNum3?: string;
  bidCorpRegiNum1?: string;
  bidCorpRegiNum2?: string;
};

export interface BiddingInfoType {
  bidderName: string[];
  bidderPhone1: string[];
  bidderPhone2: string[];
  bidderPhone3: string[];
  bidderIdNum1: string[];
  bidderIdNum2: string[];
  bidderAddr: string[];
  bidderAddrDetail: string[];
  bidderCorpNum1: string[];
  bidderCorpNum2: string[];
  bidderCorpNum3: string[];
  bidderCorpRegiNum1: string[];
  bidderCorpRegiNum2: string[];
  bidderCorpYn: string[];
};

export interface AgentInfoType {
  agentName: string;
  agentRel: string;
  agentPhone1: string;
  agentPhone2: string;
  agentPhone3: string;
  agentIdNum1: string;
  agentIdNum2: string;
  agentAddr: string;
  agentAddrDetail: string;
  agentCorpNum1: string;
  agentCorpNum2: string;
  agentCorpNum3: string;
  agentCorpRegiNum1: string;
  agentCorpRegiNum2: string;
  agentCorpYn: string;
};