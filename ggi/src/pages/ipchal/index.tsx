import GetIpchalInfo from './GetIpchalInfo';
import StartIpchal from './StartIpchal';
import { useRecoilState } from 'recoil';
import { stepState } from '@/atom';
import BidderInfo from './BidderInfo';
import { useState } from 'react';
import { IpchalType } from '@/type/IpchalType';
import BidderCnt from './BidderCnt';

export default function IpChal() {
  const [ipchalStep, setIpchalStep] = useRecoilState(stepState);
  const [formData, setFormData] = useState<IpchalType>({
    sagunNum: '',
    mulgunNum: '',
    ipchalDate: '',
    addr: '',
    bidder: '',
    bidderNum: 1,
    CorpYn: '',
    distribute: '',
    biddingPrice: 0,
    depositPrice: 0,
    bidWay: '',
  });

	return (
    <>
      {
        ipchalStep === 0 ? (<StartIpchal />)
        :
        ipchalStep === 1 ? (<GetIpchalInfo setFormData={setFormData} formData={formData} />)
        :
        ipchalStep === 2 ? (<BidderInfo setFormData={setFormData} formData={formData} />)
        :
        ipchalStep === 3 ? (<BidderCnt setFormData={setFormData} formData={formData} />)
        :
        (<></>)
      }
    </>
  )
}