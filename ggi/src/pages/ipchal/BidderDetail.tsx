import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";

interface BidderDetailProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
}

export default function BidderDetail({ formData, setFormData}: BidderDetailProps) {

  return (
    <>
      <div className="flex justify-center relative">
        <div className="flex flex-col gap-4 w-full h-screen bg-mybg items-center text-center">
          <div className="flex">
            <span className="text-lg font-extrabold font-nanum not-italic leading-8">입찰자 정보를 입력해주세요</span>
          </div>
          <div className="flex flex-row gap-10 w-[70%] justify-center">
            <div 
              className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${formData?.CorpYn === 'N' ? 'text-white bg-myyellow' : 'text-myyellow bg-white'}`}
              onClick={() => setFormData({...formData, CorpYn: 'N'})}
            >
              <div className={`${formData?.CorpYn === 'N' ? 'flex mr-1' : 'hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={`text-[13px] font-nanum not-italic font-extrabold ${formData?.CorpYn === 'N' ? 'text-white' : 'text-myyellow'}`}>개인</span>
            </div>
            <div className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${formData?.CorpYn === 'Y' ? 'text-white bg-myyellow' : 'text-myyellow bg-white'}`} onClick={() => setFormData({
              ...formData,
              CorpYn: 'Y',
            })}>
              <div className={`${formData?.CorpYn === 'Y' ? 'flex mr-1' : 'hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className={`text-[13px] font-nanum not-italic font-extrabold ${formData?.CorpYn === 'Y' ? 'text-white' : 'text-myyellow'}`}>법인</span>
            </div>
          </div>
          {/* 입력정보 */}
          <div className="flex flex-col w-[80%] h-[60px] gap-1">
            <div className="flex flex-row justify-between">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">성명</span>
            </div>
            <input 
              type="text" 
              className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
              placeholder="입찰자 성명을 입력해주세요"
              value={formData?.bidName}
              onChange={(e) => setFormData({...formData, bidName: e.target.value})}
            />
          </div>
          <div className="flex flex-col w-[80%] h-[60px] gap-1">
            <div className="flex flex-row justify-between">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">전화번호</span>
            </div>
            <div className="flex flex-row gap-[5%]">
              <input 
                type="text" 
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                value={formData?.bidPhone1}
                onChange={(e) => setFormData({...formData, bidPhone1: e.target.value})}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input 
                type="text" 
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                value={formData?.bidPhone2}
                onChange={(e) => setFormData({...formData, bidPhone2: e.target.value})}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input 
                type="text" 
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                value={formData?.bidPhone3}
                onChange={(e) => setFormData({...formData, bidPhone3: e.target.value})}
              />
            </div>
          </div>
          {
            formData?.CorpYn === 'N' ? (
            <div className="flex flex-col w-[80%] h-[60px] gap-1">
              <div className="flex flex-row justify-between">
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left">주민등록번호</span>
              </div>
              <div className="flex flex-row gap-[5%]">
                <input 
                  type="text" 
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[45%]"
                  value={formData?.bidIdNum1}
                  onChange={(e) => setFormData({...formData, bidIdNum1: e.target.value})}
                />
                <span className="flex text-mygray font-nanum font-normal">-</span>  
                <input 
                  type="text" 
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[45%]"
                  value={formData?.bidIdNum2}
                  onChange={(e) => setFormData({...formData, bidIdNum2: e.target.value})}
                />
              </div>
            </div>
            )
            :
            (
              <div className="flex flex-col w-[80%] h-[60px] gap-1">
                <div className="flex flex-row justify-between">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left">사업자 등록번호</span>
                </div>
                <div className="flex flex-row gap-[5%]">
                  <input 
                    type="text" 
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                    value={formData?.bidIdNum1}
                    onChange={(e) => setFormData({...formData, bidName: e.target.value})}
                  />
                  <span className="flex text-mygray font-nanum font-normal">-</span>
                  <input 
                    type="text" 
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                    value={formData?.bidName}
                    onChange={(e) => setFormData({...formData, bidName: e.target.value})}
                  />
                  <span className="flex text-mygray font-nanum font-normal">-</span>
                  <input 
                    type="text" 
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[30%]"
                    value={formData?.bidName}
                    onChange={(e) => setFormData({...formData, bidName: e.target.value})}
                  />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
};