import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import { useRecoilValue } from 'recoil'

export default function GetIpchalInfo() {
  const stateNum = useRecoilValue(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)

  return (
    <>
      <div className="flex w-full h-screen justify-center bg-mybg relative">
        <div className="flex flex-col w-full h-screen bg-mybg items-center text-center-500">
          <div className="flex">
            <span className="text-[20px] font-bold font-nanum not-italic leading-8">
              사건 번호와 입찰일자를 확인해주세요
            </span>
          </div>
          <div className="flex w-[360px] h-[257px] bg-white absolute top-[107px] justify-center rounded-lg border-slate-500">
            <div className="flex flex-row absolute top-8 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                사건번호:{' '}
              </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.sagunNum}
              </span>
            </div>
            <div className="flex flex-row absolute top-24 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                입찰기일:
              </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.mulgunNum}
              </span>
            </div>
            <div className="flex flex-row absolute top-40 border-b w-[80%] border-gray-200">
              <span className="text-black text-[15px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                주소:
              </span>
              <span className="text-mygray text-[15px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.sagunAddr}
              </span>
            </div>
          </div>
        </div>
        <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
      </div>
    </>
  )
}
