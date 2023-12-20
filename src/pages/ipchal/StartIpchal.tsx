import { biddingInfoState, loginState, stepState } from '@/atom'
import axios from 'axios'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'

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
          idCode: 'A1403F3F403D3F3D3E403E3C3D4349474A3C3E8',
          biddingDate: `20231221`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
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
            response.data.data.startYear +
            response.data.data.startMonth +
            response.data.data.startDay,
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
      <div className="flex justify-center relative">
        <div className="flex flex-col md:w-[50%] w-full h-screen bg-white items-center text-center">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic">
              입찰표 작성을 시작합니다
            </span>
          </div>
          <div className="flex absolute top-16">
            <span className="text-xs text-mygray font-bold font-nanum not-italic">
              질문에 답변해 주세요.
            </span>
          </div>
          <div className="flex md:w-[50%] w-[80%] absolute top-32 justify-center">
            <Image
              priority
              src={'/MainImg.jpg'}
              alt="MainImg"
              width={300}
              height={300}
              style={{
                height: 'auto',
                width: 'auto',
              }}
            />
          </div>
          <div
            className="flex absolute top-[445px] bg-mygold w-[163px] h-[30px] rounded-lg items-center justify-center cursor-pointer"
            onClick={() => {
              loginStateValue ? handleCheck() : alert('로그인 후 이용해주세요.')
            }}
          >
            <span className="text-white text-sm font-nanum font-extrabold not-italic leading-4">
              시작하기
            </span>
          </div>
          <div className="flex flex-col absolute top-[540px] w-[80%] justify-center">
            <span className="text-[10px] text-mygray font-normal">
              ※ 입찰표의 주민등록번호는 저장하지 않습니다
            </span>
            <span className="text-[10px] text-mygray font-normal">
              다음 번 입찰표 작성 시, 개인정보를 다시 입력해주셔야합니다.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
