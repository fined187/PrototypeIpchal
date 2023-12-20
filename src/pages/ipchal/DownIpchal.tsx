import { biddingInfoState } from "@/atom";
import PdfContent from "@/components/PdfContent";
import { useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { useRecoilValue } from "recoil";

export default function DownIpchal() {
  const biddingInfo = useRecoilValue(biddingInfoState)
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
      <div className="flex w-full h-screen justify-center bg-mybg relative">
        <div className="flex flex-col gap-[60px] md:w-[520px] w-[100%] h-[80%] bg-mybg items-center text-center top-20 relative">
          <span className="text-[20px] font-extrabold font-nanum not-italic leading-8">
            입찰표 작성이 모두 끝났습니다
            <br />
            수고하셨습니다
          </span>
          <span className="text-[14px] font-nanum not-italic text-gray-400 leading-[30px] font-bold">
            꼭 낙찰 받으시길 기원합니다
          </span>
        </div>
        <div className="flex flex-col gap-[30px] md:w-[520px] bg-mybg items-center text-center absolute top-[350px] cursor-pointer">
          <div className="flex bg-mygold w-[163px] h-[30px] rounded-md justify-center items-center" onClick={() => setOpenPdf(true)}>
            <span className="text-center text-white font-nanum text-[15px] font-bold leading-[15px]">
              입찰표 확인하기
            </span>
          </div>
          <div className="flex flex-row bg-orange-400 w-[163px] h-[30px] rounded-md justify-center items-center cursor-pointer" onClick={handleDownload}>
            <span className="text-center text-white font-nanum text-[15px] font-bold leading-[15px]">
              다운받기
            </span>
            <TfiDownload className='bg-orange-400 ml-2 text-white stroke-[1px]' size={20} />
          </div>
        </div>
      </div>
      {openPdf && (
        <div className="flex w-[90vw] h-[80%]">
          <PdfContent openPdf={openPdf} setOpenPdf={setOpenPdf} />
        </div>
      )}
    </>
  ) 
}