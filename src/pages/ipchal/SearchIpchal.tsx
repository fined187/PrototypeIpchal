import { biddingInfoState, stepState } from "@/atom";
import Spinner from "@/components/Spinner";
import Button from "@/components/shared/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function SearchIpchal() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [getCase, setGetCase] = useState<string>('')
  const [getAuction, setGetAuction] = useState<string>('')
  const [searchResult, setSearchResult] = useState<number>(1)
  const [getData, setGetData] = useState<any>([])

  const handleHeight = () => {
    let height = window.innerHeight;
    if (document && document.getElementById('box')) {
      const boxElement = document.getElementById('box');
      if (boxElement) {
        boxElement.style.height = height + 'px';
      }
    }
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  const handleSearch = async() => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}cases/${getCase}/${getAuction}`)
      if (response.status === 200) {
        setGetData(response.data.data)
        setLoading(false)
        setSearchResult(2)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextStep = async(infoId: string, caseNo: string, mulSeq: string) => {
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}cases/checks`, {
        infoId: infoId,
        caseNo: caseNo,
        mulSeq: mulSeq
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        setBiddingInfo({
          ...biddingInfo,
          infoId: response.data.data.infoId,
          caseNo: response.data.data.caseNo,
          mulSeq: response.data.data.mulSeq,
          biddingDate: (response.data.data.startYear) +
          (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) +
          (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay),
          courtFullName: response.data.data.courtFullName,
          reqCourtName: response.data.data.reqCourtName,
          mulNo: response.data.data.mulNo === '' ? '1' : response.data.data.mulNo,
          sagunNum:
              response.data.data.caseYear +
              ' 타경 ' +
              response.data.data.caseDetail,
          ipchalDate: (response.data.data.startYear) + '년 ' +
          (response.data.data.startMonth.length !== 2 ? "0" + response.data.data.startMonth : response.data.data.startMonth) + '월 ' +
          (response.data.data.startDay.length !== 2 ? "0" + response.data.data.startDay : response.data.data.startDay) + '일',
          sagunAddr: response.data.data.address,
          usage: response.data.data.usage,
          etcAddress: response.data.data.etcAddress,
          roadAddress: response.data.data.roadAddress,
          biddingInfos: response.data.data.biddingInfos,
        })
        setLoading(false)
        setStateNum(2)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleNextButton = (number: number, infoId: string, caseNo: string, mulSeq: string) => {
    if (number === 1) {
      handleGetAlert()
    } else if (number === 2) {
      handleNextStep(infoId, caseNo, mulSeq)
    }
  }

  const handleGetAlert = () => {
    if (getAuction === '') {
      alert('경매번호를 입력해 주세요.')
    } else if (getData === '' && searchResult === 1) {
      alert('입찰하실 사건번호를 검색해주세요.')
    } else if (getData === '' && searchResult === 2) {
      alert('검색결과가 없습니다. 이전 버튼을 눌러 다시 검색해주세요.')
    } else {
      setSearchResult(2)
      handleSearch()
    }
  }

  const handlePrevButton = () => {
    if (searchResult === 2) {
      setSearchResult(1)
    } else {
      setStateNum(stateNum - 1)
    }
  }

  const date = new Date()
  const nowDate = date.getFullYear().toString() + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1)).toString() + date.getDate().toString()
  
  return (
    <div id='box' className="flex w-[100%] justify-center bg-white relative">
      {loading && (
          <Spinner />
        )}
      <div className="flex flex-col md:w-[50%] w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
        <div className="flex md:pt-[100px] pt-[50px]">
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
            입찰예정 경매사건을 입력해 주세요.
          </span>
        </div>
        {searchResult === 1 ? (
          <div className="flex flex-row md:w-[550px] w-[90%] h-[200px] bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px]">
            <label htmlFor="yearSelect" className="sr-only">Select Year</label>
            <select id="yearSelect" className="border-gray border w-[150px] h-[40px] rounded-lg outline-myyellow" onChange={(e) => {
              setGetCase(e.target.value)
            }}
              value={getCase || '2024'}
            >
              {Array.from({ length: parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - 1994 + 1) : (parseInt(nowDate.substring(0, 4)) - 1994 + 2) }).map((_, index) => (
                <option key={index} value={parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}>{parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}</option>
              ))}
            </select>
            &nbsp;
            <span className="font-['nanum] md:text-[1rem] text-[0.8rem]">
              타경
            </span>
            &nbsp;
            <label htmlFor="auctionInput" className="sr-only">Auction Number</label>
            <input 
              id="auctionInput"
              type="text"
              className="border-gray border w-[250px] h-[40px] rounded-lg outline-myyellow font-['nanum'] md:text-[1rem] text-[0.8rem] p-[10px]"
              value={getAuction}
              onChange={(e) => setGetAuction(e.target.value)}
              placeholder="사건번호를 입력해주세요."
              onKeyUp={(e) => handleEnter(e)}
            />
            <div className="w-[60px] h-[40px] bg-mygold ml-2 flex justify-center items-center cursor-pointer rounded-lg" onClick={() => handleNextButton(searchResult, biddingInfo.infoId, biddingInfo.caseNo, biddingInfo.mulSeq)}>
              <span className="text-white font-bold font-NanumGothic md:text-[1rem] text-[0.8rem]">
                검색
              </span>
            </div>
          </div>
        ) : searchResult === 2 && getData?.cases?.length > 0 ? (
          <div className="flex flex-col w-[95%] min-h-[250px] max-h-[650px] bg-white md:mt-[150px] mt-[100px] items-center rounded-lg absolute pt-[20px]">
            <div className="flex flex-row w-[95%]">
              <div className="flex justify-start">
                <span className="md:text-[1rem] text-[0.8rem] font-bold font-NanumGothic not-italic">
                  검색 결과
                </span>
                <span className="md:text-[1rem] text-[0.8rem] font-bold font-NanumGothic not-italic text-mygold">
                  {"(" + getData.cases.length + ")"}
                </span>
              </div>
            </div>
            <div className="md:flex hidden flex-row w-[95%] h-[50px] border border-black bg-gray-300">
              <div className="flex flex-col w-[15%] h-[100%] border-black border-r-[1px] justify-center items-center">
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold ">
                  매각기일
                </span>
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold ">
                  용도
                </span>
              </div>
              <div className="flex w-[60%] h-[100%] border-black border-r-[1px] justify-center items-center">
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold ">
                  물건기본내역
                </span>
              </div>
              <div className="flex flex-col w-[25%] h-[100%] border-black justify-center items-center">
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold ">
                  감정가
                </span>
                <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold ">
                  최저가
                </span>
              </div>
            </div>
            <div className={`border-r-[1px] ${getData?.cases.length <= 4 ? '' : 'border-b-[1px]'} border-l-[1px] border-black w-[95%] min-h-[100px] max-h-[500px] overflow-y-auto scrollbar-hide`}>
              {getData?.cases?.map((data: any, index: number) => (
                <div key={index} className={`flex flex-row w-[100%] h-[100px] ${index > 3 && (getData.cases.length - 1 === index) ? '' : 'border-b-[1px]'} border-black ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} items-center hover:bg-gray-200 cursor-pointer`} onClick={() => {
                  handleNextStep(data.infoId, data.caseNo, data.mulSeq)
                }}>
                  <div className="flex flex-col w-[15%] h-[100%] border-black border-r-[1px] justify-center items-center">
                    <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold ">
                      {data.biddingDate.substring(0, 4) + '년 ' + data.biddingDate.substring(4, 6) + '월 ' + data.biddingDate.substring(6, 8) + '일'}
                    </span>
                    <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-bold text-blue-500">
                      {"(" + data.usage + ")"}
                    </span>
                  </div>
                  <div className="flex flex-col w-[60%] h-[100%] border-black border-r-[1px] items-start justify-center p-[5px] flex-wrap">
                    <span className="md:text-[0.9rem] text-[0.7rem] font-nanum font-semibold text-center text-mygold">
                      {data.reqCourtName + "계 " + data.caseNoString + "[" + (data.mulNo ? data.mulNo : "1") + "]" + (data.subCaseNoString ? "[" + data.subCaseNoString + "]" : '')}
                    </span>
                    <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold text-center">
                      {data.address + (data.oldAddress ? "(구: " + data.oldAddress + ")" : '') + (data.roadAddress ? "[" + data.roadAddress + "]" : '') +(data.etcAddress ? "[일괄]" + data.etcAddress : '')}
                    </span>
                    <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold text-center text-red-500">
                      {(data.checkInfo ? "[" + data.checkInfo + "]" : '')}
                    </span>
                    {
                      data.usage === ('차량' || '중기') && (data.carInfo) ? 
                      (
                        <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold text-center text-black">
                          {"차량 정보 [" + data.carInfo + "]"}
                        </span>
                      )
                      :
                      (
                      <span className="md:text-[0.8rem] text-[0.7rem] font-nanum font-semibold text-center text-black">
                        {(data.buildingArea ? "건물 " + data.buildingArea + "㎡" + (data.landPyungArea ? "(" + data.landPyungArea + "평)" : "") + (data.pyungHyung > 0 ? "[" + data.pyungHyung + "평형]" : "") + (data.landArea ? " | 토지 " + data.landArea + "㎡" + (data.landPyungArea ? "(" + data.landPyungArea + "평)" : "") : "") : "")}
                      </span>
                      )
                    }
                  </div>
                  <div className="flex flex-col w-[25%] h-[100%] justify-center items-center">
                    <span className="md:text-[1rem] text-[0.8rem] font-nanum font-bold text-center text-black">
                      {data.appraisalAmount.toLocaleString('ko-KR')}
                    </span>
                    <span className="md:text-[1rem] text-[0.8rem] font-nanum font-bold text-center text-blue-500">
                      {data.minimumAmount.toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:w-[550px] w-[90%] h-[200px] bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px]">
            <span className="md:text-[1.2rem] text-[1rem] font-nanum font-bold text-center text-black">
              검색결과가 없습니다. 
            </span>
            <br />
            <span className="md:text-[1rem] text-[0.8rem] font-nanum font-bold text-center text-gray-400">
              이전 버튼을 눌러 다시 검색해주세요.
            </span>
          </div>
        )}
      </div>
      <Button 
        nextText="다음"
        handleNextStep={() => {
          handleNextButton(searchResult, biddingInfo.infoId, biddingInfo.caseNo, biddingInfo.mulSeq)
        }}
        handlePrevStep={handlePrevButton}
      />
    </div>
  )
}