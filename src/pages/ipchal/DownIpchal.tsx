import { biddingInfoState, stepState } from "@/atom";
import PdfContent from "@/components/PdfContent";
import { useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function DownIpchal() {
  const biddingInfo = useRecoilValue(biddingInfoState)
  const setStateNum = useSetRecoilState(stepState)
  const [openPdf, setOpenPdf] = useState<boolean>(false)

  const handleDownload = async () => {
    const url = `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`
    await fetch(url, {method: 'GET'}).then((response) => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${biddingInfo.sagunNum} 입찰표.pdf`;
        a.click();
      }).catch((error) => {
        console.log(error)
      });
    });
  }

  return (
    <>
      <div className="flex w-[100%] h-screen justify-center bg-white relative">
        <div className="flex flex-col gap-[60px] md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative">
          <span className="text-[20px] font-extrabold font-NanumGothic not-italic leading-8">
            입찰표 작성이 모두 끝났습니다
            <br />
            수고하셨습니다
          </span>
          <span className="text-[14px] font-NanumGothic not-italic text-gray-400 leading-[30px] font-bold">
            꼭 낙찰 받으시길 기원합니다
          </span>
        </div>
        <div className="flex flex-col gap-[30px] md:w-[520px] bg-mybg items-center text-center absolute top-[350px] cursor-pointer">
          <div className="flex bg-mygold w-[163px] h-[30px] rounded-md justify-center items-center" onClick={() => setOpenPdf(true)}>
            <span className="text-center text-white font-NanumGothic text-[15px] font-bold leading-[15px]">
              입찰표 확인하기
            </span>
          </div>
          <div className="flex flex-row bg-orange-400 w-[163px] h-[30px] rounded-md justify-center items-center cursor-pointer" onClick={handleDownload}>
            <span className="text-center text-white font-NanumGothic text-[15px] font-bold leading-[15px]">
              다운받기
            </span>
            <TfiDownload className='bg-orange-400 ml-2 text-white stroke-[1px]' size={20} />
          </div>
        </div>
        <div className="flex flex-row gap-[10px] absolute top-[578px]">
          <button
            type="button"
            className="flex w-[100px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
            onClick={() => {
              setStateNum(12)
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
              setStateNum(0)
            }}
          >
            <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
              닫기
            </span>
          </button>
        </div>
      </div>
      {openPdf && (
        <div className="flex w-full h-screen">
          <PdfContent openPdf={openPdf} setOpenPdf={setOpenPdf} />
        </div>
      )}
    </>
  ) 
}