import GetIpchalInfo from './GetIpchalInfo';
import StartIpchal from './StartIpchal';
import { useRecoilState } from 'recoil';
import { stepState } from '@/atom';

export default function IpChal() {
  const [ipchalStep, setIpchalStep] = useRecoilState(stepState)
	return (
    <>
      {ipchalStep === 0 && (<StartIpchal setIpchalStep={setIpchalStep} />)}
      {ipchalStep === 1 && (<GetIpchalInfo setIpchalStep={setIpchalStep} />)}
    </>
  )
}