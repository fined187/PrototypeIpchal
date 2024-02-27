import { biddingInfoState, stepState } from "@/atom";
import Spinner from "@/components/Spinner";
import Button from "@/components/shared/Button";
import { useEffect, useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { useRecoilState } from "recoil";

export default function DownIpchal() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState<string>("")

  const date = new Date()
  const nowDate = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}${date.getDate()}${date.getHours() < 10 ? ('0' + date.getHours()) : (date.getHours())}${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
  
  async function handleDownload() {
    setLoading(true)
    const url = `${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/download `
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(biddingInfo.aesUserId)
    }).then((response) => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${biddingInfo.sagunNum}_${nowDate}.pdf`;
        a.click();
        console.log(response)
        if (response.status === 200) {
          alert('파일 다운로드가 성공했습니다.');
          setLoading(false)
        } else {
          alert('파일 다운로드가 실패했습니다.');
          setLoading(false)
        }
      }).catch((error) => {
        console.log(error)
        setLoading(false)
        alert('파일 다운로드가 실패했습니다.');
      });
    });
  }
  
  function newWindowPdf() {
    if (window && pdfUrl) {
      window.open(pdfUrl, "blob", "width=1200, height=1200, resizeable, scrollbars, noopener")
      window.URL.revokeObjectURL(pdfUrl)
    }
  }

  useEffect(() => { 
    setLoading(true)
    const handleGetPdfUrl = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/download `
        const response = await fetch(url, { method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(biddingInfo.aesUserId) })
        const data = await response.blob()
        setBiddingInfo({ ...biddingInfo, pdfFile: data })
        const newUrl = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
        setPdfUrl(newUrl)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    handleGetPdfUrl()
  }, [])
  console.log(pdfUrl)
  const handleHeight = () => {
    let height = window.innerHeight;
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box');
      if (boxElement) {
        boxElement.style.height = height + 'px';
      }
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  return (
    <>
      <div id="box" className="flex w-[100%] justify-center bg-white relative">
        <div className="flex flex-col gap-[60px] md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center relative md:pt-[100px] pt-[50px]">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <span className="md:text-[1.7rem] text-[1.4rem] font-extrabold font-NanumGothic not-italic leading-8">
                입찰표 작성이 모두 끝났습니다
                <br />
                수고하셨습니다
              </span>
              <span className="text-[1.2rem] font-NanumGothic not-italic text-gray-400 leading-[30px] font-bold">
                꼭 낙찰 받으시길 기원합니다
              </span>
              <div className="flex flex-col gap-[30px] md:w-[520px] bg-mybg items-center text-center mt-[50px] cursor-pointer">
                <div className="flex bg-mygold w-[200px] h-[40px] rounded-md justify-center items-center" onClick={() => {
                  newWindowPdf()
                }}>
                  <span className="text-center text-white font-NanumGothic text-[1rem] font-bold leading-[15px]">
                    입찰표 확인하기
                  </span>
                </div>
                <div className="flex flex-row bg-orange-400 w-[200px] h-[40px] rounded-md justify-center items-center cursor-pointer" onClick={handleDownload}>
                  <span className="text-center text-white font-NanumGothic text-[1rem] font-bold leading-[15px]">
                    다운받기
                  </span>
                  <TfiDownload className='bg-orange-400 ml-2 text-white stroke-[1px]' size={20} />
                </div>
              </div>
              <Button 
                nextText="다음"
                handleNextStep={() => {
                  setStateNum(18)
                }}
                handlePrevStep={() => {
                  setStateNum(stateNum - 2)
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  ) 
}