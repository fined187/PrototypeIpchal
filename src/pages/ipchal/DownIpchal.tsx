import { biddingInfoState, stepState } from "@/atom";
import PdfContent from "@/components/PdfContent";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { useRecoilState, useRecoilValue } from "recoil";

export default function DownIpchal() {
  const biddingInfo = useRecoilValue(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [openPdf, setOpenPdf] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const date = new Date()
  const nowDate = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}${date.getDate()}${date.getHours() < 10 ? ('0' + date.getHours()) : (date.getHours())}${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
  
  const handleDownload = async () => {
    setLoading(true)
    const url = `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`
    await fetch(url, {method: 'GET'}).then((response) => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${biddingInfo.sagunNum}_${nowDate}.pdf`;
        a.click();
        setLoading(false)
        alert('파일이 다운로드 되었습니다.');
      }).catch((error) => {
        console.log(error)
        setLoading(false)
        alert('파일 다운로드가 실패했습니다.');
      });
    });
  }

  return (
    <>
      <div className="flex w-[100%] h-screen justify-center bg-white relative">
        <div className="flex flex-col gap-[60px] md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative md:py-[0px] py-[25px]">
          <span className="md:text-[1.5rem] text-[1.4rem] font-extrabold font-NanumGothic not-italic leading-8">
            입찰표 작성이 모두 끝났습니다
            <br />
            수고하셨습니다
          </span>
          <span className="text-[20px] font-NanumGothic not-italic text-gray-400 leading-[30px] font-bold">
            꼭 낙찰 받으시길 기원합니다
          </span>
        </div>
        <div className="flex flex-col gap-[30px] md:w-[520px] bg-mybg items-center text-center absolute top-[250px] cursor-pointer">
          <div className="flex bg-mygold w-[200px] h-[40px] rounded-md justify-center items-center" onClick={() =>onOpen()}>
            <span className="text-center text-white font-NanumGothic text-[18px] font-bold leading-[15px]">
              입찰표 확인하기
            </span>
          </div>
          <div className="flex flex-row bg-orange-400 w-[200px] h-[40px] rounded-md justify-center items-center cursor-pointer" onClick={handleDownload}>
            <span className="text-center text-white font-NanumGothic text-[18px] font-bold leading-[15px]">
              다운받기
            </span>
            <TfiDownload className='bg-orange-400 ml-2 text-white stroke-[1px]' size={20} />
          </div>
        </div>
        <div className="flex flex-row gap-[10px] absolute top-[500px]">
          <button
            type="button"
            className="flex w-[100px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(stateNum - 1)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              이전
            </span>
          </button>
          <button
            type="button"
            className="flex w-[230px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(17)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              다음
            </span>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex w-full h-screen">
          <PdfContent isOpen={isOpen} onClose={onClose} />
        </div>
      )}
    </>
  ) 
}