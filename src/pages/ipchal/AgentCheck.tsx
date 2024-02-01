import { biddingInfoState, stepState } from "@/atom"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil"

export default function AgentCheck() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [checkedItems, setCheckedItems] = useState(biddingInfo.bidName.map((name: any, index: number) => false));

  const allChecked = checkedItems.every(Boolean);
  console.log(biddingInfo)
  useEffect(() => {
    const handleGetMandates = async () => {
      try {
        const response = await axios.get(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders/mandates`, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (response.status === 200) {
          setBiddingInfo((prev) => ({
            ...prev,
            mandates: response.data.data.mandates.map((mandate: any) => mandate.mandateYn === null ? { name: mandate.name, peopleSeq: mandate.peopleSeq, mandateYn: 'N' } : mandate)
          }))
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleGetMandates()
  }, [])

  const handlePostMandates = async () => {
    try {
      const response = await axios.put(`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/bidders/mandates`, {
        bidderCount: biddingInfo.bidderNum,
        mandates: biddingInfo.mandates
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 200) {
        console.log(response)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextStep = () => {
    if (checkedItems.every((item) => item === false)) {
      alert('대리인을 선택해주세요.')
      return
    } else {
      handlePostMandates()
      setStateNum(7)
    }
  }

  return (
    <div className="flex w-[100%] h-screen bg-white justify-center relative">
      <div className="flex flex-col md:w-[50%] w-[100%] h-[100%] bg-mybg items-center text-center md:py-[0px] py-[25px]">
        <div className="flex flex-col relative md:w-[80%] w-[100%] h-[100px]">
          <span className="md:text-[1.5rem] text-[1.2rem] font-bold font-Nanum Gothic not-italic leading-8">
            어느 입찰자를 대리하시겠습니까?
          </span>
          <div className="flex items-center absolute bottom-0 justify-end w-[100%]">
            <input 
              id="allChecked"
              checked={allChecked}
              className="w-[20px] h-[20px] text-yellow-400 bg-gray-100 border-gray-300 rounded ring-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
              type="checkbox"
              onChange={(e) => {
                const newCheckedItems = [...checkedItems];
                newCheckedItems.fill(e.target.checked);
                setCheckedItems(newCheckedItems);
                setBiddingInfo((prev: any) => {
                  const newMandates = [...prev.mandates];
                  newMandates.forEach((mandate: any) => mandate.mandateYn = e.target.checked ? 'Y' : 'N');
                  return {
                    ...prev,
                    mandates: newMandates
                  }
                })
              }}
            />
            <label htmlFor="allChecked" className="ml-2 text-[14pt] text-black font-bold dark:text-gray-400">전체 선택</label>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[90%] md:w-[40%] h-[350px] border border-gray-[1px] bg-white absolute top-[110px] justify-center items-center rounded-lg border-slate-500 ">
          <div className="flex flex-col gap-[80px] justify-center items-center w-[80%] h-[70%] overflow-y-scroll scrollbar-hide">
            {biddingInfo.bidName.map((name: any, index: number) => (
              <div className="flex w-[90%] justify-between ">
                <span className="md:text-[15pt] text-[12pt] font-NanumGothic font-bold">
                  {name}
                </span>
                <div>
                  <input 
                    id={name}
                    checked={checkedItems[index]}
                    className="w-[20px] h-[20px] text-yellow-400 bg-gray-100 border-gray-300 rounded ring-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    type="checkbox"
                    onChange={(e) => {
                      const newCheckedItems = [...checkedItems];
                      newCheckedItems[index] = e.target.checked;
                      setCheckedItems(newCheckedItems);
                      setBiddingInfo((prev: any) => {
                        const newMandates = [...prev.mandates];
                        newMandates[index].mandateYn = e.target.checked ? 'Y' : 'N';
                        return {
                          ...prev,
                          mandates: newMandates
                        }
                      })
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center md:w-[40%] w-[90%] gap-[10px] absolute md:top-[600px] top-[500px]">
        <button
          type="button"
          className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
        >
          <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
            이전
          </span>
        </button>
        <button
          type="button"
          className="flex w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
          onClick={handleNextStep}
        >
          <span className="text-white font-extrabold font-NanumGothic text-[18px] leading-[15px] tracking-[-0.9px]">
            다음
          </span>
        </button>
      </div>
    </div>
  )
}