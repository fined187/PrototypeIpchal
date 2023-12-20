import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import axios from 'axios'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function GetIpchalInfo() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `http://118.217.180.254:8081/ggi/api/bid-form/inits`,
        {
          userId: 'best',
          infoId: biddingInfo.infoId,
          caseNo: biddingInfo.caseNo,
          mulSeq: biddingInfo.mulgunNum,
          biddingDate: biddingInfo.ipchalDate,
        },
      )
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          mstSeq: response.data.data.mstSeq,
          state: response.data.data.state,
        })
        setStateNum(stateNum + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex w-full h-screen justify-center bg-mybg relative">
        <div className="flex flex-col w-full h-screen bg-mybg items-center text-center-500">
          <div className="flex">
            <span className="text-[20px] font-bold font-nanum not-italic leading-8">
              사건 번호와 입찰일자를 확인해주세요
            </span>
          </div>
          <div className="flex min-w-[400px] h-[257px] bg-white absolute top-[107px] justify-center rounded-lg border-slate-500">
            <div className="flex flex-row absolute top-8 border-b w-[80%] border-gray-200">
              <span className="text-black text-[12px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                사건번호 :
              </span>
              <span className="text-mygray text-[12px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.sagunNum}
              </span>
            </div>
            <div className="flex flex-row absolute top-24 border-b w-[80%] border-gray-200">
              <span className="text-black text-[12px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                입찰기일 :
              </span>
              <span className="text-mygray text-[12px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.ipchalDate.substring(0, 4)}년{' '}
                {biddingInfo.ipchalDate.substring(4, 6)}월{' '}
                {biddingInfo.ipchalDate.substring(6, 8)}일
              </span>
            </div>
            <div className="flex flex-row absolute top-40 border-b w-[80%] border-gray-200">
              <span className="text-black text-[12px] tracking-[-0.45px] font-extrabold mb-3 font-nanum leading-9">
                주소 :
              </span>
              <span className="text-mygray text-[12px] tracking-[-0.45px] font-extrabold justify-end ml-3 mb-3 font-nanum leading-9">
                {biddingInfo.sagunAddr}
              </span>
            </div>
          </div>
        </div>
        <Button
          prevStepNum={stateNum - 1}
          nextStepNum={stateNum + 1}
          handleConfirm={handleConfirm}
        />
      </div>
    </>
  )
}
