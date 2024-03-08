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
        <div className="flex flex-col md:pt-[100px] pt-[50px] gap-[10px]">
          <span className="md:text-[1.7rem] text-[1.4rem] font-bold font-['suit'] not-italic">
            {searchResult === 1 ? "입찰 예정인 경매물건을 검색해주세요" : searchResult === 2 ? "입찰서를 작성할 물건을 선택해주세요" : "검색 결과가 없습니다"}
          </span>
          <span className="md:text-[1rem] text-[0.8rem] font-bold font-['suit'] not-italic text-sutTitle">
            {searchResult === 1 ? "입찰표 하나 당 한 개의 물건만 검색할 수 있습니다" : searchResult === 2 ? "검색결과가 많을 경우 물건번호, 법원, 감정가, 입찰일을 확인해주세요" : "이전으로 버튼을 눌러 재검색해주세요"}
          </span>
        </div>
        {searchResult === 1 ? (
          <div className="flex flex-row md:w-[550px] w-[90%] h-[200px] md:mt-[200px] mt-[130px] justify-center items-center absolute overflow-auto">
            <div className="flex flex-row gap-[10px] items-center">
              <label htmlFor="yearSelect" className="sr-only">Select Year</label>
              <select id="yearSelect" className="border-gray border md:w-[150px] w-[100px] h-[40px] rounded-lg outline-myBlue md:text-[1rem] text-[0.8rem] text-right pr-1" onChange={(e) => {
                setGetCase(e.target.value)
              }}
                value={getCase}
              >
                {Array.from({ length: parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - 1994 + 1) : (parseInt(nowDate.substring(0, 4)) - 1994 + 2) }).map((_, index) => (
                  <option key={index} value={parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}>{parseInt(nowDate.substring(4, 6)) < 11 ? (parseInt(nowDate.substring(0, 4)) - index) : (parseInt(nowDate.substring(0, 4)) + 1 - index)}</option>
                ))}
              </select>
              <span className="font-['suit'] font-bold md:text-[1.2rem] text-[0.8rem]">
                타경
              </span>
              <label htmlFor="auctionInput" className="sr-only">Auction Number</label>
              <input 
                id="auctionInput"
                type="text"
                className="border-gray border md:w-[200px] w-[150px] h-[40px] rounded-lg outline-myBlue font-['suit'] md:text-[1rem] text-[0.8rem] p-[10px] text-right"
                value={getAuction || ''}
                onChange={(e) => setGetAuction(e.target.value)}
                placeholder="사건번호 (ex.10522)"
                onKeyUp={(e) => handleEnter(e)}
              />
            </div>
            <div className="w-[60px] h-[40px] bg-myBlue flex justify-center items-center cursor-pointer rounded-lg ml-[10px]" 
              onClick={() => handleNextButton(searchResult, '', '', '')}>
              <span className="text-white font-bold font-['suit'] md:text-[1rem] text-[0.8rem]">
                검색
              </span>
            </div>
          </div>
        ) : searchResult === 2 && (getData?.length ?? 0) > 0 ? (
          <>
            <div className="flex flex-col justify-start items-center md:w-[550px] w-[90%] h-[350px] overflow-y-auto pt-[10px] gap-[10px] mt-[25px]">
              {getData?.map((data: any, index: number) => (
              <div className="flex flex-col md:w-[500px] w-[100%] bg-white h-[110px] items-center rounded-lg pb-[10px] cursor-pointer" key={index}>
                <div className={`w-[95%] flex flex-col`}
                  onClick={() => {handleSearchResult(data.infoId, data.caseNo, data.mulSeq)}}
                >
                  <div className="flex flex-row w-[100%] mt-[10px]">
                    <span className="text-[1rem] font-['suit'] font-bold text-myOrange text-left">
                      {data.reqCourtName + "계 "}
                    </span>
                    <span className="text-[1rem] font-['suit'] font-bold text-black text-left">
                      &nbsp;{data.caseNoString + "[" + (data.mulNo ? data.mulNo : "1") + "]" + (data.subCaseNoString ? "[" + data.subCaseNoString + "]" : '')}
                    </span>
                    <span className="text-[1rem] font-['suit'] font-bold text-black text-left ml-[10px]">
                      {data.usage}
                    </span>
                  </div>
                    <div className="flex justify-between w-[100%]">
                      <div className="flex flex-col w-[50%] h-[60px]">
                        <div className="flex flex-row mt-[5px] mb-[5px]">
                          <div className="flex justify-center items-center">
                            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-black text-center">
                              감정가
                            </span>
                          </div>
                          <div className="flex justify-center items-center">
                            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-black ml-[10px]">
                              {data.appraisalAmount.toLocaleString('ko-KR')}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="flex justify-center items-center">
                            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-black text-center">
                              최저가
                            </span>
                          </div>
                          <div className="flex flex-row justify-center items-center">
                            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-myBlue ml-[10px]">
                              {"(" + data.rate + ")"}
                            </span>
                            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-black ml-[10px]">
                              {data.minimumAmount.toLocaleString('ko-KR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:w-[150px] w-[120px] h-[60px] rounded-md justify-center items-center bg-searchBg">
                        <span className="text-center font-['suit'] text-[1rem] font-bold">
                          {data.biddingDateString + " " + "입찰"}
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
            <span className="md:text-[1.2rem] text-[1rem] font-['suit'] font-bold text-center text-black">
              검색결과가 없습니다. 
            </span>
            <br />
            <span className="md:text-[1rem] text-[0.8rem] font-['suit'] font-bold text-center text-gray-400">
              이전 버튼을 눌러 다시 검색해주세요.
            </span>
          </div>
        ) : (
          null
        )}
      </div>
      <Button 
        handleNextStep={() => {
          getData?.length === 1 ? handleSearchResult(getData[0]?.infoId, getData[0]?.caseNo, getData[0]?.mulSeq) : handleNextButton(searchResult, '', '', '')
        }}
        handlePrevStep={handlePrevButton}
        isDisabled={getAuction === '' || getAuction === null || getAuction === undefined}
      />
    </div>
  )
}