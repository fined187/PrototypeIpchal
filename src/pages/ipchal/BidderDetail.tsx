import { stepState } from "@/atom";
import Button from "@/components/Button";
import SearchAddress from "@/components/SearchAddress";
import { IpchalType } from "@/interface/IpchalType";
import { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface BidderDetailProps {
  formData: IpchalType;
  setFormData: Dispatch<SetStateAction<IpchalType>>;
}

interface AddrType {
  roadAddrPart1: string;
  addrDetail?: string;
  roadAddrPart2: string;
  zipNo?: string;
}

interface FormType {
  bidName: string;
  bidPhone1: string;
  bidPhone2: string;
  bidPhone3: string;
  bidIdNum1: string;
  bidIdNum2: string;
  bidCorpNum1: string;
  bidCorpNum2: string;
  bidCorpNum3: string;
  bidCorpRegiNum1: string;
  bidCorpRegiNum2: string;
}

export default function BidderDetail({
  formData,
  setFormData,
}: BidderDetailProps) {
  const setStateNum = useSetRecoilState(stepState);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

  const stateNum = useRecoilValue(stepState);
  //  사업자등록번호 input focus 이동
  const focusRef1 = useRef<HTMLInputElement | null>(null);
  const focusRef2 = useRef<HTMLInputElement | null>(null);
  const focusRef3 = useRef<HTMLInputElement | null>(null);

  //  전화번호 input focus 이동
  const phoneFocusRef1 = useRef<HTMLInputElement | null>(null);
  const phoneFocusRef2 = useRef<HTMLInputElement | null>(null);
  const phoneFocusRef3 = useRef<HTMLInputElement | null>(null);

  const handlePhoneFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "bidPhone1" &&
      phoneFocusRef2.current?.value.length === 0
    ) {
      phoneFocusRef2.current?.focus();
    } else if (
      target.value.length === 4 &&
      target.id === "bidPhone2" &&
      phoneFocusRef3.current?.value.length === 0
    ) {
      phoneFocusRef3.current?.focus();
    }
  };

  const handleFocusMove = (target: HTMLInputElement) => {
    if (
      target.value.length === 3 &&
      target.id === "bidCorpNum1" &&
      focusRef2.current?.value.length === 0
    ) {
      focusRef2.current?.focus();
    } else if (
      target.value.length === 2 &&
      target.id === "bidCorpNum2" &&
      focusRef3.current?.value.length === 0
    ) {
      focusRef3.current?.focus();
    }
  };

  const { onChange, ref } = register("bidPhone1");

  console.log(formData);

  return (
    <div className="flex w-full bg-mybg justify-center relative">
      <div className="flex flex-col gap-4 md:w-[420px] w-[90%] h-screen bg-mybg items-center text-center">
        <div className="flex">
          <span className="text-lg font-extrabold font-nanum not-italic leading-8">
            입찰자 정보를 입력해주세요
          </span>
        </div>
        <div className="flex flex-row gap-10 w-[70%] justify-center">
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              formData?.CorpYn === "N"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() => setFormData({ ...formData, CorpYn: "N" })}
          >
            <div
              className={`${formData?.CorpYn === "N" ? "flex mr-1" : "hidden"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
              >
                <path
                  d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className={`text-[13px] font-nanum not-italic font-extrabold ${
                formData?.CorpYn === "N" ? "text-white" : "text-myyellow"
              }`}
            >
              개인
            </span>
          </div>
          <div
            className={`flex flex-row w-[53px] h-[25px] border border-myyellow rounded-md cursor-pointer justify-center items-center ${
              formData?.CorpYn === "Y"
                ? "text-white bg-myyellow"
                : "text-myyellow bg-white"
            }`}
            onClick={() =>
              setFormData({
                ...formData,
                CorpYn: "Y",
              })
            }
          >
            <div
              className={`${formData?.CorpYn === "Y" ? "flex mr-1" : "hidden"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
              >
                <path
                  d="M1.47559 2.65157L4.01506 7.42824L9.8136 1.09314"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className={`text-[13px] font-nanum not-italic font-extrabold ${
                formData?.CorpYn === "Y" ? "text-white" : "text-myyellow"
              }`}
            >
              법인
            </span>
          </div>
        </div>
        {/* 입력정보 */}
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-[80%] h-[60px] gap-1">
            <div className="flex flex-row justify-between">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                성명
              </span>
            </div>
            <input
              {...register("bidName", { required: true })}
              type="text"
              className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2"
              placeholder="입찰자 성명을 입력해주세요"
              onChange={(e) =>
                setFormData({ ...formData, bidName: e.target.value })
              }
            />
            {errors.bidName?.type === "required" && (
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left text-red-500">
                성명을 입력해주세요
              </span>
            )}
          </div>
          <div className="flex flex-col w-[80%] h-[60px] gap-1">
            <div className="flex flex-row justify-between">
              <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                전화번호
              </span>
            </div>
            <div className="flex flex-row gap-[5%]">
              <input
                type="text"
                id="bidPhone1"
                {...register("bidPhone1", { required: true })}
                maxLength={3}
                placeholder="010"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                onChange={(e) => {
                  setFormData({ ...formData, bidPhone1: e.target.value });
                  handlePhoneFocusMove(e.target);
                }}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input
                type="text"
                id="bidPhone2"
                {...register("bidPhone2", { required: true })}
                maxLength={4}
                placeholder="1234"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                value={formData?.bidPhone2}
                onChange={(e) => {
                  setFormData({ ...formData, bidPhone2: e.target.value });
                  handlePhoneFocusMove(e.target);
                }}
              />
              <span className="flex text-mygray font-nanum font-normal">-</span>
              <input
                type="text"
                id="bidPhone3"
                {...register("bidPhone3", { required: true })}
                maxLength={4}
                placeholder="5678"
                className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                value={formData?.bidPhone3}
                onChange={(e) => {
                  setFormData({ ...formData, bidPhone3: e.target.value });
                  handlePhoneFocusMove(e.target);
                }}
              />
            </div>
          </div>
          {formData?.CorpYn === "N" ? (
            <div className="flex flex-col w-[80%] h-[60px] gap-1">
              <div className="flex flex-row justify-between">
                <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                  주민등록번호
                </span>
              </div>
              <div className="flex flex-row gap-[5%]">
                <input
                  type="text"
                  maxLength={6}
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                  value={formData?.bidIdNum1}
                  onChange={(e) =>
                    setFormData({ ...formData, bidIdNum1: e.target.value })
                  }
                />
                <span className="flex text-mygray font-nanum font-normal">
                  -
                </span>
                <input
                  type="text"
                  maxLength={7}
                  className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[45%] text-center"
                  value={formData?.bidIdNum2}
                  onChange={(e) =>
                    setFormData({ ...formData, bidIdNum2: e.target.value })
                  }
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-[80%] h-[60px] gap-1">
                <div className="flex flex-row justify-between">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    사업자 등록번호
                  </span>
                </div>
                <div className="flex flex-row gap-[5%]">
                  <input
                    type="text"
                    placeholder="123"
                    id="bidCorpNum1"
                    ref={focusRef1}
                    maxLength={3}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={formData?.bidCorpNum1}
                    onChange={(e) => {
                      setFormData({ ...formData, bidCorpNum1: e.target.value });
                      handleFocusMove(e.target);
                    }}
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    placeholder="45"
                    id="bidCorpNum2"
                    ref={focusRef2}
                    maxLength={2}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={formData?.bidCorpNum2}
                    onChange={(e) => {
                      setFormData({ ...formData, bidCorpNum2: e.target.value });
                      handleFocusMove(e.target);
                    }}
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    placeholder="67890"
                    id="bidCorpNum3"
                    ref={focusRef3}
                    maxLength={5}
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold h-[30px] px-2 w-[30%] text-center"
                    value={formData?.bidCorpNum3}
                    onChange={(e) => {
                      setFormData({ ...formData, bidCorpNum3: e.target.value });
                      handleFocusMove(e.target);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-[80%] h-[60px] gap-1">
                <div className="flex flex-row justify-between">
                  <span className="text-[10px] font-nanum not-italic font-extrabold text-left">
                    법인등록번호
                  </span>
                </div>
                <div className="flex flex-row gap-[5%]">
                  <input
                    type="text"
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[45%]"
                    value={formData?.bidCorpRegiNum1}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        bidCorpRegiNum1: e.target.value,
                      });
                    }}
                  />
                  <span className="flex text-mygray font-nanum font-normal">
                    -
                  </span>
                  <input
                    type="text"
                    className="border border-gray-300 focus:border-myyellow rounded-md text-[12px] font-nanum not-italic font-extrabold text-left h-[30px] px-2 w-[45%]"
                    value={formData?.bidCorpRegiNum2}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        bidCorpRegiNum2: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <SearchAddress formData={formData} setFormData={setFormData} />
          <div className="flex flex-row gap-2 absolute top-[578px]">
            <button
              type="button"
              className="flex w-[82px] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
              onClick={() => setStateNum(stateNum - 1)}
            >
              <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                이전
              </span>
            </button>
            <button
              type="submit"
              className="flex w-[229px] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
            >
              <span className="text-white font-extrabold font-nanum text-[18px] leading-[15px] tracking-[-0.9px]">
                {stateNum <= 3 ? "확인" : "다음"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
