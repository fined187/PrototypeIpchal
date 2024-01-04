import { biddingInfoState, loginState, stepState } from '@/atom'
import axios from 'axios'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { format } from 'date-fns'

export default function StartIpchal() {
  const stateNum = useSetRecoilState(stepState)
  const loginStateValue = useRecoilValue(loginState)
  const setBiddingInfo = useSetRecoilState(biddingInfoState)
  const biddingInfo = useRecoilValue(biddingInfoState)

  const date = new Date()
  const nowDate = date.getDate()
  const nowMonth = date.getMonth() + 1
  const nowYear = date.getFullYear()
  
  const handleCheck = async () => {
    try {
      const response = await axios.post(
        `http://118.217.180.254:8081/ggi/api/bid-form/checks`,
        {
          idCode: 'A140483D3F3E3D40403D3E3D424240473E3E3C6',
          biddingDate: `20240109`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
        console.log(response)
        setBiddingInfo({
          ...biddingInfo,
          caseNo: response.data.data.caseNo,
          infoId: response.data.data.infoId,
          sagunNum:
            response.data.data.caseYear +
            ' 타경 ' +
            response.data.data.caseDetail,
          mulgunNum: response.data.data.mulSeq,
          ipchalDate:
            (response.data.data.startYear) +
            (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) +
            (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay),
          sagunAddr: response.data.data.address,
        })
        stateNum(1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex w-[100%] h-screen justify-center bg-white relative">
        <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center gap-[20px]">
          <div className="flex">
            <span className="md:text-[2rem] text-[1.4rem] font-extrabold font-nanumGothic not-italic">
              입찰표 작성을 시작합니다
            </span>
          </div>
          <div className="flex">
            <span className="md:text-[1rem] text-mygray font-bold font-nanum not-italic">
              질문에 답변해 주세요.
            </span>
          </div>
          <div className="flex sm:w-[50%] w-[100%] absolute top-32 justify-center">
            <Image
              priority
              src={'/visualImg.jpg'}
              alt="MainImg"
              width={350}
              height={350}
              style={{
                height: 'auto',
                width: 'auto',
              }}
            />
          </div>
          <div
            className="flex absolute top-[445px] bg-mygold w-[180px] h-[46px] rounded-md items-center justify-center cursor-pointer"
            onClick={() => {
              loginStateValue ? handleCheck() : alert('로그인 후 이용해주세요.')
            }}
          >
            <span className="text-white text-[16px] font-nanum font-extrabold not-italic leading-4">
              시작하기
            </span>
          </div>
          <div className="flex flex-col absolute top-[540px] w-[80%] justify-center">
            <span className="text-[12px] text-mygray font-normal">
              ※ 입찰표의 주민등록번호는 저장하지 않습니다
            </span>
            <span className="text-[12px] text-mygray font-normal">
              다음 번 입찰표 작성 시, 개인정보를 다시 입력해주셔야합니다.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
