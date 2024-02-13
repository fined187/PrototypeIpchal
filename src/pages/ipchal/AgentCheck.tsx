import { biddingInfoState, stepState } from "@/atom"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil"

export default function AgentCheck() {
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [checkedItems, setCheckedItems] = useState(biddingInfo.bidName.map((name: any, index: number) => false));

  const allChecked = checkedItems.every(Boolean);
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
          setCheckedItems(response.data.data.mandates.map((mandate: any) => mandate.mandateYn === 'Y'))
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
        <div className="flex flex-col relative md:w-[550px] w-[90%] h-[100px] md:pt-[100px] pt-[50px]">
          <span className="md:text-[1.5rem] text-[1.2rem] font-bold font-Nanum Gothic not-italic leading-8">
            어느 입찰자를 대리하시겠습니까?
          </span>
          <div className="flex items-center mt-[80px] right-[10px] justify-end w-[100%]">
            <input 
              id="allChecked"
              checked={allChecked}
              className="md:w-[20px] md:h-[20px] w-[15px] h-[15px] accent-mygold text-white bg-gray-100 border-gray-300 rounded ring-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-600" 
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
            <label htmlFor="allChecked" className="ml-2 md:text-[1.1rem] text-[1rem] text-black font-bold dark:text-gray-400">전체 선택</label>
          </div>
        </div>
        <div className="flex flex-col w-[90%] md:w-[550px] min-h-[250px] max-h-[400px] border border-gray-[1px] bg-white md:mt-[150px] mt-[100px] items-center rounded-lg border-slate-500 overflow-y-auto">
          <div className="flex flex-col justify-center gap-[30px] items-center w-[80%] h-[100%] ">
            {biddingInfo.bidName.map((name: any, index: number) => (
              <div className="flex md:w-[50%] w-[90%] justify-between" key={index}>
                <span className="md:text-[15pt] text-[12pt] font-NanumGothic font-bold">
                  {name}
                </span>
                <div>
                  <input 
                    id={name}
                    checked={checkedItems[index]}
                    className="md:w-[20px] md:h-[20px] w-[15px] h-[15px] accent-mygold text-white bg-gray-100 border-gray-300 rounded ring-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-600" 
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
      <div className="flex flex-row justify-center items-center fixed md:w-[26%] w-[80%] gap-[10px] md:bottom-[80px] bottom-[10px]">
        <button
          type="button"
          className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
          onClick={() => {
            setStateNum(15)
          }}
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