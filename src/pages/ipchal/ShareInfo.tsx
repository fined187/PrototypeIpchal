import { biddingInfoState, stepState } from '@/atom'
import Spinner from '@/components/Spinner'
import Button from '@/components/shared/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export default function ShareInfo() {
  const[biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [isDataIn, setIsDataIn] = useState<any>([])
  const [goNext, setGoNext] = useState<boolean>(false)
  const [loadding, setLoadding] = useState<boolean>(false)

  const [shareList, setShareList] = useState({
    shareList: Array(biddingInfo.bidderNum).fill({
      peopleSeq: 0,
      name: '',
      share: '',
    }),
  })

  const handleShareList = () => {
    let numerator = (document && document.getElementById('numerator') as HTMLInputElement)?.value
    let denominator = (document && document.getElementById('denominator') as HTMLInputElement)?.value

    const temp = [...shareList.shareList]
    if (biddingInfo.shareWay === 'S') {
      for (let i = 0; i < biddingInfo.bidderNum; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingInfo.bidName[i] ?? '',
          share: '1/' + biddingInfo.bidderNum.toString(),
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    } else {
      for (let i = 0; i < biddingInfo.bidderNum; i++) {
        temp[i] = {
          peopleSeq: i + 1,
          name: biddingInfo.bidName[i] ?? '',
          share: biddingInfo.numerator[i] + '/' + biddingInfo.denominator[i],
        }
      }
      setShareList({
        ...shareList,
        shareList: temp,
      })
    }
  }

  const handleValidate = () => {
    let valid = 0
    let numerator = (document && document.getElementById('numerator') as HTMLInputElement)?.value
    let denominator = (document && document.getElementById('denominator') as HTMLInputElement)?.value
    if (numerator === '' || denominator === '' || biddingInfo.shareWay === "") {
      alert('지분을 확인해주세요')
      setGoNext(true)
      return
    } else if (biddingInfo.shareWay === 'N') {
      for(let i = 0; i < biddingInfo.bidderNum; i++) {
        valid += parseInt(shareList.shareList[i].share)
      }
      if (valid !== parseInt(denominator)) {
        setGoNext(true)
      } else {
        setGoNext(false)
        handleGetBiddingFormUpdate()
        handlePutShare()
      }
    } else {
      setGoNext(false)
      handleGetBiddingFormUpdate()
      handlePutShare()
    }
  }

  const handlePutShare = async () => {
    setLoadding(true)
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/bidders/shares`, {
        bidderCount: biddingInfo.bidderNum,
        shares: shareList.shareList,
      })
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          numerator: shareList.shareList.map((item: any) => item.share?.split('/')[0]),
          denominator: shareList.shareList.map((item: any) => item.share?.split('/')[1]),
        })
        setStateNum(stateNum + 1)
        setLoadding(false)
      }
    } catch (error) {
      console.log(error)
      setLoadding(false)
    }
  }

  const handleGetBiddingFormUpdate = async () => {
    setLoadding(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/bidders`)
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          bidName: response.data.data.bidders.map((item: any) => item.name),
          bidAddr: response.data.data.bidders.map((item: any) => item.address),
          bidPhone: response.data.data.bidders.map((item: any) => item.phoneNo),
          bidCorpYn: response.data.data.bidders.map((item: any) => item.bidderType),
          bidCorpNum: response.data.data.bidders.map((item: any) => item.companyNo),
          bidJob: response.data.data.bidders.map((item: any) => item.job),
          bidCorpRegiNum: response.data.data.bidders.map((item: any) => item.corporationNo),
        })
        setShareList({
          ...shareList,
          shareList: response.data.data.bidders.map((item: any) => {
            return {
              peopleSeq: item.peopleSeq,
              name: item.name,
              share: item.share,
            }
          }),
        })
        setLoadding(false)
      }
    } catch (error) {
      console.log(error)
      setLoadding(false)
    }
  }

  useEffect(() => {
    handleShareList()
  }, [biddingInfo.shareWay])

  useEffect(() => {
    const handleSyncBiddingForm = async () => {
      setLoadding(true)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}`)
        if (response.status === 200) {
          setIsDataIn(response.data.data.bidders)
          setBiddingInfo({
            ...biddingInfo,
            bidName: response.data.data?.bidders?.map((item: any) => item.name),
            bidAddr: response.data.data?.bidders?.map((item: any) => item.address),
            bidAddrDetail: response.data.data?.bidders?.length < biddingInfo.bidAddrDetail.length ? biddingInfo.bidAddrDetail.splice(response.data.data?.bidders?.length - 1, biddingInfo.bidAddrDetail.length - response.data.data?.bidders?.length) : biddingInfo.bidAddrDetail,
            bidPhone: response.data.data?.bidders?.map((item: any) => item.phoneNo),
            bidPhone1: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(0, 3) : item.phoneNo?.slice(0, 2)),
            bidPhone2: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(3, 7) : item.phoneNo?.slice(2, 6)),
            bidPhone3: response.data.data?.bidders?.map((item: any) => item.phoneNo.length === 11 ? item.phoneNo?.slice(7, 11) : item.phoneNo?.slice(6, 10)),
            bidCorpYn: response.data.data?.bidders?.map((item: any) => item.bidderType),
            bidCorpNum: response.data.data?.bidders?.map((item: any) => item.companyNo),
            bidCorpNum1: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(0, 3) ?? null),
            bidCorpNum2: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(3, 5) ?? null),
            bidCorpNum3: response.data.data?.bidders?.map((item: any) => item.companyNo?.slice(5, 10) ?? null),
            bidJob: response.data.data?.bidders?.map((item: any) => item.job),
            bidCorpRegiNum: response.data.data?.bidders?.map((item: any) => item.corporationNo),
            bidCorpRegiNum1: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(0, 6) ?? null),
            bidCorpRegiNum2: response.data.data?.bidders?.map((item: any) => item.corporationNo?.slice(6, 13) ?? null),
            denominator: biddingInfo.shareWay === 'S' ? Array(biddingInfo.bidderNum).fill(biddingInfo.bidderNum.toString()) : response.data.data?.bidders?.map((item: any) => item.share?.split('/')[1]),
            numerator: biddingInfo.shareWay === 'S' ? Array(biddingInfo.bidderNum).fill('1') : response.data.data?.bidders?.map((item: any) => item.share?.split('/')[0]),
          })
          setLoadding(false)
        }
      } catch (error) {
        console.log(error)
        setLoadding(false)
      }
    }
    handleSyncBiddingForm()
    handleShareList()
  }, [])

  const handlePrevStep = () => {
    if (biddingInfo.agentYn === 'Y' && biddingInfo.bidName.length > 1) {
      setStateNum(19)
    } else {
      setStateNum(16)
    }
  }

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

  useEffect(() => {
    let valid = 0
    for(let i = 0; i < biddingInfo.bidderNum; i++) {
      valid += parseInt(biddingInfo.numerator[i])
      if (valid !== parseInt(biddingInfo.denominator[0])) {
        setGoNext(true)
      } else {
        setGoNext(false)
      }
    }
  }, [biddingInfo.numerator, biddingInfo.denominator])
console.log(biddingInfo)
  return (
    <div className={`flex w-screen bg-mybg justify-center relative`}>
      <div className="flex flex-col w-[100%] h-[100vh] bg-mybg items-center text-center pt-[50px] gap-[25px]">
        <span className="md:text-[32.5px] text-[1.4rem] font-bold font-['suit'] not-italic leading-[135%] tracking-[-1%]">
          입찰자의 지분을 입력해주세요
        </span>
        <div className='flex flex-row gap-[20px] md:w-[550px] w-[90%] justify-center items-center'>
          <div className='flex flex-row gap-[5px]'>
            <input 
              id='shareWay'
              name='shareWay'
              checked={biddingInfo.shareWay === 'S' ?? false}
              className='cursor-pointer w-[15px]'
              type='radio'
              onChange={() => {
                setBiddingInfo({
                  ...biddingInfo,
                  shareWay: 'S',
                  numerator: Array(biddingInfo.bidderNum).fill('1'),
                })
              }}
            />
            <label>
              <span className="md:text-[20px] text-[1rem] font-normal font-['suit'] leading-[135%] tracking-[-2%] not-italic text-left">
                균등배분
              </span>
            </label>
          </div>
          <div className='flex flex-row gap-[5px]'>
            <input 
              id='shareWay'
              className='cursor-pointer w-[15px]'
              checked={biddingInfo.shareWay === 'N' ?? false}
              name='shareWay'
              type='radio'
              onChange={() => {
                setBiddingInfo({
                  ...biddingInfo,
                  shareWay: 'N',
                  denominator: Array(biddingInfo.bidderNum).fill('100'),
                })
              }}
          />
          <label>
            <span className="md:text-[20px] text-[1rem] font-normal font-['suit'] leading-[135%] tracking-[-2%] not-italic text-left">
              직접입력
            </span>
          </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px] md:w-[550px] w-[90%] h-[500px] absolute top-[150px] items-center rounded-lg border-slate-500 pt-[25px] pb-[25px] overflow-auto bg-mybg">
        {loadding && (
          <Spinner />
        )}
        {(isDataIn && isDataIn.length > 0) && biddingInfo.bidName.map((name, index) => {
            return (
            <div key={index} className="flex flex-row gap-[25%] w-[100%] h-[100px] bg-white border border-black rounded-lg relative">
              <div className="flex flex-col w-[100%] justify-center items-start ml-5">
              <span className="md:text-[17px] text-[0.8rem] font-['suit'] leading-[135%] tracking-[0px] text-sutTitle font-normal">
                {"#" + (index + 1)}
              </span>
              <span className="md:text-[20px] text-[1rem] font-['suit'] leading-[140%] tracking-[-1%] font-normal">
                {name + (biddingInfo.bidCorpYn[index] === 'I' ? ' (개인)' : ' (법인)')}
              </span>
              </div>
              <div className={`flex flex-row gap-[10px] w-[95px] justify-center absolute top-[50%] ${biddingInfo.shareWay === 'S' ? 'border-b-[0.5px] border-b-sutTitle' : 'md:mr-[50px]'} transform translate-y-[-50%] right-5 mt-[10px]`}>
              {biddingInfo.shareWay === 'S' ? (
                <>
                <input
                  id="numerator"
                  type="text"
                  readOnly
                  value={'1'}
                  className={`rounded-md md:text-[20px] text-[0.8rem] font-['suit'] leading-[140%] tracking-[0px] not-italic font-normal text-center text-sutTitle w-[20px] bg-white border-none focus:border-transparent focus:outline-none`}
                />
                <span className='flex'>/</span>
                <input
                  aria-label="denominator"
                  id='denominator'
                  type="text"
                  readOnly
                  value={biddingInfo.bidderNum}
                  className="rounded-md md:text-[20px] text-[0.8rem] font-['suit'] leading-[140%] tracking-[0px] not-italic font-normal text-center text-sutTitle w-[20px] bg-white border-none focus:border-transparent focus:outline-none"
                />
                </>
              ) : (
                <>
                <input
                  id="numerator"
                  type="text"
                  value={shareList.shareList[index]?.share?.split('/')[0] === 'undefined' ? '1' : shareList.shareList[index]?.share?.split('/')[0]}
                  className={` ${
                  (biddingInfo.shareWay === 'N') && goNext
                    ? 'text-red-500'
                    : ''
                  } rounded-md md:text-[20px] text-[0.8rem] font-['suit'] leading-[150%] tracking-[-1%] p-[10px] not-italic font-semibold text-center h-[40px] w-[80px] border-[1px] border-sutTitle`}
                  onChange={(e) => {
                  let temp = [...shareList.shareList]
                  temp[index] = {
                    ...temp[index],
                    share: e.target.value + '/' + (document && document.getElementById('denominator') as HTMLInputElement)?.value,
                  }
                  setShareList({
                    ...shareList,
                    shareList: temp,
                  })
                  setBiddingInfo({
                    ...biddingInfo,
                    numerator: temp.map((item: any) => item.share?.split('/')[0]),
                  })
                  }}
                  onFocus={(e) => {
                  e.target.style.border = 'none';
                  }}
                  onBlur={(e) => {
                  e.target.style.border = '2px solid';
                  }}
                />
                <span className='mt-2'>/</span>
                <input
                  readOnly
                  id='denominator'
                  type="text"
                  value={100}
                  className={`rounded-md md:text-[20px] text-[0.8rem] font-['suit'] leading-[150%] tracking-[-1%] p-[10px] text-center h-[40px] w-[80px] border-[1px] border-sutTitle`}
                  onChange={(e) => {
                  let temp = [...shareList.shareList]
                  temp[index] = {
                    ...temp[index],
                    share: (document && document.getElementById('numerator') as HTMLInputElement)?.value + '/' + e.target.value,
                  }
                  setShareList({
                    ...shareList,
                    shareList: temp,
                  })
                  }}
                  onFocus={(e) => {
                  e.target.style.border = 'none';
                  }}
                  onBlur={(e) => {
                  e.target.style.border = '2px solid';
                  }}
                />
                </>
              )}
              </div>
            </div>
            )
        })}
        {(biddingInfo.shareWay === 'N' && goNext) ? (
          <div className='flex w-[100%] flex-row-reverse'>
            <span className="md:text-[18px] text-[0.8rem] font-['suit'] font-light leading-[135%] tracking-[-1%] text-red-500 text-right">
              입력하신 지분 값을 다시 확인해주세요
            </span>
          </div>
        ) : (biddingInfo.shareWay === 'N' && !goNext) ? (
          null
        ) : (null)}
      </div>
        <Button 
          nextText='다음으로'
          handleNextStep={handleValidate}
          handlePrevStep={handlePrevStep}
        />
    </div>
  )
}
