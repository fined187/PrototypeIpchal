import { biddingInfoState, stepState } from "@/atom";
import Spinner from "@/components/Spinner";
import Button from "@/components/shared/Button";
import { SearchResultType } from "@/interface/IpchalType";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function SearchIpchal() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [loading, setLoading] = useState<boolean>(false)
  const [getCase, setGetCase] = useState<string>('2024')
  const [getAuction, setGetAuction] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<number>(1)
  const [getData, setGetData] = useState<SearchResultType[] | null>(null)
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
      handleSearch(getCase, getAuction || '') // Provide a default value of an empty string if getAuction is null
    }
  }
  console.log(getAuction)
  useEffect(() => {
    handleHeight()
    window.addEventListener('resize', handleHeight)
    return () => {
      window.removeEventListener('resize', handleHeight)
    }
  }, [])

  const handleSearch = async(caseNum: string, autionNum: string) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://dev-api.ggi.co.kr:8443/ggi/api/bid-form/cases/${caseNum}/${autionNum}`)
      if (response.status === 200) {
        if (response.data.data.cases.length > 0) {
          setGetData(response.data.data.cases)
          setBiddingInfo({
            ...biddingInfo,
            searchResults: response.data.data.cases
          })
          setSearchResult(2)
        } else {
          setGetData(null)
          setSearchResult(3)
        }
        setLoading(false)
      } 
    } catch (error) {
      console.log(error)
      setSearchResult(3)
      setLoading(false)
    }
  }
  const handleSearchResult = async(infoId: string, caseNo: string, mulSeq: string) => {
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
        setStateNum(stateNum + 1)
      } 
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  
  const handleNextButton = (number: number, infoId: string, caseNo: string, mulSeq: string) => {
    if (number === 1 && (getAuction === '' || getAuction === null || getAuction === undefined)) {
      alert('사건번호를 입력해 주세요.')
      return
    } else if (number === 1 && (getAuction !== '' && getAuction !== null && getAuction !== undefined)) {
      handleSearch(getCase, getAuction ?? '')
    } else if (number === 2) {
      if (getData?.length === 1) {
        handleSearchResult(infoId, caseNo, mulSeq)
      } else {
        alert('검색결과가 2건 이상입니다. 검색 결과를 클릭해주세요.')
      }
    } else if (number === 3) {
      alert('검색결과가 없습니다. 이전 버튼을 눌러 다시 검색해주세요.')
    } else {
      setStateNum(stateNum + 1)
    }
  }

  const handlePrevButton = () => {
    if (searchResult === 2) {
      setSearchResult(1)
    } else if (searchResult === 3) {
      setSearchResult(1)
    } else {
      setStateNum(stateNum - 1)
    }
  }

  const date = new Date()
  const nowDate = date.getFullYear().toString() + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1)).toString() + date.getDate().toString()

  useEffect(() => {
    if (biddingInfo.searchResults.length > 0 && biddingInfo.searchResultState === 2) {
      setGetCase((biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString?.substring(0, 4))
      setGetAuction((biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString.replace("-", "")?.substring(4, (biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString?.length))
      setGetData(biddingInfo.searchResults)
      setSearchResult(2)
    } else {
      setGetCase((biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString.substring(0, 4))
      setGetAuction((biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString.replace("-", "")?.substring(4, (biddingInfo.searchResults[0] as { caseNoString: string })?.caseNoString?.length))
      setSearchResult(1)
    }
  }, [])

  return (
    <div id='box' className="flex w-[100%] justify-center bg-white relative">
      {loading && (
          <Spinner />
        )}
      <div className="flex flex-col w-[100%] bg-mybg items-center text-center md:py-[0px] py-[15px] relative">
        <div className="flex md:pt-[100px] pt-[50px]">
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-NanumGothic not-italic leading-8">
            입찰예정 경매사건을 입력해 주세요.
          </span>
        </div>
        {searchResult === 1 ? (
          <div className="flex flex-row md:w-[550px] w-[90%] h-[200px] bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px]">
            <div className="flex flex-col w-[100%] justify-center items-center gap-[25px]">
              <div className="flex flex-row w-[100%] justify-center items-center">
                <label htmlFor="yearSelect" className="sr-only">Select Year</label>
                <select id="yearSelect" className="border-gray border w-[150px] h-[40px] rounded-lg outline-myyellow md:text-[1rem] text-[0.8rem]" onChange={(e) => {
                  setGetCase(e.target.value)
                }}
                  value={getCase}
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
                  className="border-gray border md:w-[200px] w-[150px] h-[40px] rounded-lg outline-myyellow font-['nanum'] md:text-[1rem] text-[0.8rem] p-[10px]"
                  value={getAuction || ''}
                  onChange={(e) => setGetAuction(e.target.value)}
                  placeholder="사건번호 입력"
                  onKeyUp={(e) => handleEnter(e)}
                />
              </div>
              <div className="w-[60px] h-[40px] bg-mygold ml-2 flex justify-center items-center cursor-pointer rounded-lg" 
                onClick={() => handleNextButton(searchResult, '', '', '')}>
                <span className="text-white font-bold font-NanumGothic md:text-[1rem] text-[0.8rem]">
                  검색
                </span>
              </div>
            </div>
          </div>
        ) : searchResult === 2 && (getData?.length ?? 0) > 0 ? (
          <>
            <div className="flex flex-col md:w-[55%] w-[95%] bg-white  max-h-[50%] md:mt-[200px] mt-[100px] items-center rounded-lg absolute pt-[20px] pb-[30px] overflow-y-auto cursor-pointer">
              <div className="flex flex-row w-[95%]">
                <div className="flex justify-start">
                  <span className="text-[1rem] font-bold font-NanumGothic not-italic">
                    검색 결과
                  </span>
                  <span className="text-[1rem] font-bold font-NanumGothic not-italic text-mygold">
                    {"(" + getData?.length + ")"}
                  </span>
                </div>
              </div>
              {getData?.map((data: any, index: number) => (
                <div key={index} className={`border border-black rounded-lg w-[95%] flex flex-col mt-[10px] pl-[10px] pr-[10px] ${index % 2 === 0 ? 'bg-white' : 'bg-white'} `}
                  onClick={() => {handleSearchResult(data.infoId, data.caseNo, data.mulSeq)}}
                >
                  <div className="flex flex-row w-[100%] mt-[10px]">
                    <span className="text-[1rem] font-nanum font-bold text-black text-left">
                      {data.reqCourtName + "계 " + data.caseNoString + "[" + (data.mulNo ? data.mulNo : "1") + "]" + (data.subCaseNoString ? "[" + data.subCaseNoString + "]" : '')}
                    </span>
                    <span className="text-[1rem] font-nanum font-bold text-mygold text-left ml-[10px]">
                      {data.biddingDate.substring(4, 6) + '.' + data.biddingDate.substring(6, 8)}
                    </span>
                  </div>
                  <div className="flex w-[100%] justify-start whitespace-normal">
                    <span className="text-[0.8rem] font-nanum font-bold text-left">
                      {data.address + (data.oldAddress ? "(구: " + data.oldAddress + ")" : '') + (data.roadAddress ? "[" + data.roadAddress + "]" : '') +(data.etcAddress ? "[일괄]" + data.etcAddress : '')}
                    </span>
                  </div>
                  <div className="flex w-[100%] justify-start whitespace-normal">
                    <span className="text-[0.8rem] font-nanum font-bold text-left text-red-500">
                      {(data.checkInfo ? "[" + data.checkInfo + "]" : '')}
                    </span>
                  </div>
                  {
                    data.usage === ('차량' || '중기') && (data.carInfo) ? 
                    (
                      <span className="text-[0.8rem] font-nanum font-semibold text-left text-black">
                        {"차량 정보 [" + data.carInfo + "]"}
                      </span>
                    )
                    :
                    (
                    <span className="text-[0.8rem] font-nanum font-semibold text-left text-black">
                      {(data.buildingArea ? "건물 " + data.buildingArea + "㎡" + (data.landPyungArea ? "(" + data.landPyungArea + "평)" : "") + (data.pyungHyung > 0 ? "[" + data.pyungHyung + "평형]" : "") + (data.landArea ? " | 토지 " + data.landArea + "㎡" + (data.landPyungArea ? "(" + data.landPyungArea + "평)" : "") : "") : "")}
                    </span>
                    )
                  }
                  <div className="flex justify-between w-[100%]">
                    <div className="flex flex-row">
                      <div className="flex bg-blue-500 rounded-lg w-[40px] h-[25px] justify-center items-center mt-[5px] mb-[5px]">
                        <span className="text-[0.7rem] font-nanum font-bold text-white text-center">
                          감정
                        </span>
                      </div>
                      <div className="flex justify-center items-center mt-[5px] mb-[5px]">
                        <span className="text-[0.8rem] font-nanum font-bold text-black ml-[10px]">
                          {data.appraisalAmount.toLocaleString('ko-KR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex bg-mygold rounded-lg w-[40px] h-[25px] justify-center items-center mt-[5px] mb-[5px]">
                        <span className="text-[0.7rem] font-nanum font-bold text-white text-center">
                          최저
                        </span>
                      </div>
                      <div className="flex justify-center items-center mt-[5px] mb-[5px]">
                        <span className="text-[0.8rem] font-nanum font-bold text-black ml-[10px]">
                          {data.minimumAmount.toLocaleString('ko-KR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : searchResult === 3 ? (
          <div className="flex flex-col md:w-[550px] w-[90%] h-[200px] bg-white md:mt-[200px] mt-[130px] justify-center items-center rounded-lg absolute overflow-auto pt-[30px] pb-[30px]">
            <span className="md:text-[1.2rem] text-[1rem] font-nanum font-bold text-center text-black">
              검색결과가 없습니다. 
            </span>
            <br />
            <span className="md:text-[1rem] text-[0.8rem] font-nanum font-bold text-center text-gray-400">
              이전 버튼을 눌러 다시 검색해주세요.
            </span>
          </div>
        ) : (
          null
        )}
      </div>
      <Button 
        nextText="다음"
        handleNextStep={() => {
          getData?.length === 1 ? handleSearchResult(getData[0]?.infoId, getData[0]?.caseNo, getData[0]?.mulSeq) : handleNextButton(searchResult, '', '', '')
        }}
        handlePrevStep={handlePrevButton}
      />
    </div>
  )
}