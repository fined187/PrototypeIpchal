import { biddingInfoState, stepState } from '@/atom'
import Button from '@/components/Button'
import EmailForm from '@/components/EmailForm'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function IpchalShare() {
  const stateNum = useRecoilValue(stepState)
  const setStateNum = useSetRecoilState(stepState)
  const biddingInfo = useRecoilValue(biddingInfoState)
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(false)

  const onShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          link: {
            mobileWebUrl: `${biddingInfo.pdfFile}`, //  마이페이지
            webUrl: `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`,
          },
          title: `${biddingInfo.sagunNum} 입찰표`,
          description: `사건번호 ${biddingInfo.sagunNum}의 입찰표입니다.`,
          imageUrl: `http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`,
        }
      })
    }
  }  
  
  return (
    <>
      <div className="flex w-[100%] h-screen justify-center bg-white relative">
        <div className="flex flex-col gap-4 md:w-[50%] w-[100%] h-screen bg-mybg items-center text-center">
          <span className="md:text-[1.5rem] text-[1.4rem] font-extrabold font-NanumGothic not-italic leading-8">
            입찰표파일이 만들어졌습니다
            <br />
            작성된 파일을 공유하시겠습니까?
          </span>
          <div className="flex flex-col gap-10 md:w-[550px] w-[420px] h-[257px] bg-white absolute top-[107px] justify-center items-center rounded-lg border-slate-500">
            <div className="flex justify-between w-[80%]">
              <div className="flex justify-start items-center w-[80%]">
                <span className="text-black text-center font-NanumGothic text-[15px] font-extrabold leading-[13px]">
                  아니요
                </span>
              </div>
              <div
                className="w-[40px] h-[40px] rounded-md bg-red-500 justify-end items-center relative cursor-pointer"
                onClick={() => {
                  setStateNum(stateNum + 1)
                }}
              >
                <div className="flex absolute top-2 left-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M20.4265 20.6849L1.93872 2.19726"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex absolute top-2 left-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M20.4263 2.19727L1.93872 20.6851"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-[80%]">
              <div
                className="flex justify-start items-center w-[80%]"
                onClick={onShare}
              >
                <span className="text-black text-center font-NanumGothic text-[15px] font-extrabold leading-[13px]">
                  카카오톡으로 보내기
                </span>
              </div>
              <div className="cursor-pointer" onClick={() => onShare()}>
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xlinkHref="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="-0.00610352"
                    y="0.782227"
                    width="39.7266"
                    height="39.7266"
                    fill="url(#pattern0)"
                  />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_69_73"
                        transform="scale(0.00444444)"
                      />
                    </pattern>
                    <image
                      id="image0_69_73"
                      width="225"
                      height="225"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex justify-between w-[80%]">
              <div
                className="flex w-[80%] items-center justify-start"
              >
                <span className="text-black text-center font-NanumGothic text-[15px] font-extrabold leading-[13px]">
                  이메일로 보내기
                </span>
              </div>
              <div className="flex cursor-pointer relative" onClick={() => setOpenEmailForm(true)}>
                <div className="flex relative">
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="-0.00610352"
                      y="0.392578"
                      width="39.7266"
                      height="39.7266"
                      rx="5"
                      fill="#4C61CF"
                    />
                  </svg>
                  <div className="flex absolute top-[7px] left-[8px] z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="11"
                      viewBox="0 0 23 11"
                      fill="none"
                    >
                      <path
                        d="M20.8916 0.518555H2.823C1.71843 0.518555 0.822998 1.41398 0.822998 2.51855V3.68411C0.822998 4.39928 1.20487 5.06002 1.82453 5.41705L10.8588 10.6223C11.4769 10.9784 12.2377 10.9784 12.8558 10.6223L21.8901 5.41705C22.5097 5.06002 22.8916 4.39928 22.8916 3.68411V2.51855C22.8916 1.41398 21.9962 0.518555 20.8916 0.518555Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex absolute top-[10px] left-[8px]">
                    <svg
                      width="23"
                      height="16"
                      viewBox="0 0 23 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.822998"
                        y="0.518555"
                        width="22.0686"
                        height="15.4751"
                        rx="2"
                        fill="#BFC8F5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button prevStepNum={stateNum - 1} nextStepNum={stateNum + 1} />
      </div>
      {openEmailForm && (
        <EmailForm
          openEmailForm={openEmailForm}
          setOpenEmailForm={setOpenEmailForm}
        />
      )}
    </>
  )
}
