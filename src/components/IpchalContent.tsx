import { biddingInfoState } from "@/atom"
import { useRecoilState } from "recoil"
import ModalCoIpchal from "./ModalContent/ModalCoIpchal"
import ModalCoIpchalForm from "./ModalContent/ModalCoIpchalForm"
import ModalCoIpchalList from "./ModalContent/ModalCoIpchalList"
import ModalAgentList from "./ModalContent/ModalAgentList"
import ModalSingleIpchal from "./ModalContent/ModalSingleIpchal"

export default function IpchalContent({ onClose }: {onClose: () => void}) {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)

  return (
    <>
      {biddingInfo.bidName.length === 1 && (
        <>
          <div className="flex flex-col bg-mybg w-[100%] h-[2600px] justify-center items-center mx-auto relative overflow-y-scroll">
            <ModalSingleIpchal />
            {biddingInfo.agentName !== '' && (
              <ModalAgentList />
            )}
            <div className="flex fixed md:w-[40%] w-[80%] justify-center items-center text-center bg-mygold rounded-md h-[4%] cursor-pointer md:top-[80%] top-[90%]" onClick={() => {
              onClose()
            }}>
              <span className="text-white font-bold text-center justify-center items-center">
                확인했습니다
              </span>
            </div>
          </div>
        </>
      )}
      {biddingInfo.bidName.length > 1 && (
        <div className="flex flex-col bg-mybg w-[100%] h-[5200px] justify-center items-center mx-auto relative overflow-y-scroll">
          <ModalCoIpchal />
          {/* 공동입찰 신고서 */}
          <ModalCoIpchalForm />
          {/* 공동입찰자 목록 */}
          <ModalCoIpchalList />
          {/* 대리인 */}
          {biddingInfo.agentName !== '' && (
            <ModalAgentList />
          )}
        <div className="fixed flex md:w-[40%] w-[80%] justify-center items-center text-center bg-mygold rounded-md h-[5%] cursor-pointer md:top-[80%] top-[90%]" onClick={() => {
          onClose()
        }}>
          <span className="text-white font-bold text-center justify-center items-center">
            확인했습니다
          </span>
        </div>
      </div>
      )}
    </>
  )
}