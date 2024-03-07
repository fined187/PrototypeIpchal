import { biddingInfoState, stepState } from "@/atom"
import Button from "@/components/shared/Button";
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/bidders/mandates`, {
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
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${biddingInfo.mstSeq}/bidders/mandates`, {
        bidderCount: biddingInfo.bidderNum,
        mandates: biddingInfo.mandates
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (response.status === 200) {
        console.log(response.data)
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
      setStateNum(8)
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

  return (
    <div id="box" className="flex w-[100%] bg-mybg justify-center relative">
      <div className="flex flex-col w-[100%] h-[100%] items-center text-center md:py-[0px] py-[25px]">
        <div className="flex flex-col relative md:w-[550px] w-[90%] pt-[50px]">
          <span className="md:text-[1.5rem] text-[1.2rem] font-bold font-['suit'] not-italic leading-8">
            어느 입찰자를 대리하시겠습니까?
          </span>
          <div className="flex items-center justify-end w-[95%] mt-[80px]">
            <input 
              id="allChecked"
              checked={allChecked}
              className="md:w-[20px] md:h-[20px] w-[15px] h-[15px] text-white md:text-white bg-gray-100 border-gray-300 accent-myBlue"
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
            <label htmlFor="allChecked" className="ml-2 md:text-[1rem] text-[0.8rem] text-subTitle font-normal">전체 선택</label>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[550px] h-[450px] w-[90%] gap-[10px] overflow-auto pt-[25px] pb-[25px]"> 
          {biddingInfo.bidName.map((name: any, index: number) => (
            <div className={`flex justify-between md:w-[500px] w-[90%] h-[100px] ${checkedItems[index] ? 'bg-mySelect' : 'bg-unClicked'} justify-between cursor-pointer`} key={index}
              onClick={() => {
                const newCheckedItems = [...checkedItems];
                newCheckedItems[index] = !newCheckedItems[index];
                setCheckedItems(newCheckedItems);
                setBiddingInfo((prev: any) => {
                  const newMandates = [...prev.mandates];
                  newMandates[index].mandateYn = newCheckedItems[index] ? 'Y' : 'N';
                  return {
                    ...prev,
                    mandates: newMandates
                  }
                })
              
              }}
            >
              <div className="flex flex-col w-[100%] justify-center items-start ml-[20px]">
                <span className="md:text-[1rem] text-[0.8rem] font-['suit'] text-sutTitle font-normal">
                  {"#" + (index + 1)}
                </span>
                <span className="md:text-[1.2rem] text-[1rem] font-['suit'] font-normal">
                  {name + (biddingInfo.bidCorpYn[index] === 'I' ? ' (개인)' : ' (법인)')}
                </span>
              </div>
              <div className="flex justify-center items-center mr-[20px]">
                {biddingInfo.bidCorpYn[index] === 'I' ? (
                  <svg width="50" height="50" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="45.5" cy="45" r="44.5" fill="white" stroke="#8E8EA9"/>
                    <path d="M45.5014 42.3192C51.4187 42.3192 56.2157 37.5222 56.2157 31.6049C56.2157 25.6876 51.4187 20.8906 45.5014 20.8906C39.5841 20.8906 34.7871 25.6876 34.7871 31.6049C34.7871 37.5222 39.5841 42.3192 45.5014 42.3192Z" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M24.0723 69.1066V58.3923C24.0723 55.4336 26.4707 53.0352 29.4294 53.0352H61.5723C64.531 53.0352 66.9294 55.4336 66.9294 58.3923V69.1066" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                ) : (
                  <>
                    <svg width="50" height="50" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_61_783)">
                        <path d="M45 89.5C69.5767 89.5 89.5 69.5767 89.5 45C89.5 20.4233 69.5767 0.5 45 0.5C20.4233 0.5 0.5 20.4233 0.5 45C0.5 69.5767 20.4233 89.5 45 89.5Z" fill="white" stroke="#8E8EA9"/>
                        <path d="M40.082 48.918V57.043" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M50.918 48.918V57.043" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26.543 38.082V67.8737" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M64.457 38.082V67.8737" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.125 67.875H69.875" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.125 38.082H69.875" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M64.4583 29.9586L45.5 19.125" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26.543 29.9586L45.5013 19.125" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M40.082 48.918V57.043" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M50.918 48.918V57.043" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26.543 38.082V67.8737" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M64.457 38.082V67.8737" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.125 67.875H69.875" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.125 38.082H69.875" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M64.4583 29.9586L45.5 19.125" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26.543 29.9586L45.5013 19.125" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M45.5 50V56" stroke="#8E8EA9" stroke-width="2" stroke-linecap="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_61_783">
                          <rect width="90" height="90" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button 
        nextText='다음으로'
        handleNextStep={handleNextStep}
        handlePrevStep={() => {
          setStateNum(16)
        }}
      />
    </div>
  )
}