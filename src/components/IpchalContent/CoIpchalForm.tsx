export default function CoIpchalForm() {

  return (
    <div className="flex flex-col bg-mybg h-screen md:w-full w-[420px] m-auto relative justify-center items-center border-black border-dashed border-t-[2px]">
      <div className="flex flex-col bg-mybg h-screen sm:w-[800px] w-[420px] m-auto relative justify-center items-center">
        <div className="text-[22px] font-bold py-[60px] absolute top-0 bg-mybg">
          공 동 입 찰 신 고 서
        </div>
        <div className="flex justify-end text-right sm:w-[800px] w-full absolute top-[200px] ">
          <span className="text-[15px] font-bold font-nanum">
            수원지방법원 본원 집행관 귀하
          </span>
        </div>
        <div className="flex flex-col gap-[10px] justify-start sm:w-[800px] w-full ">
          <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
            <span>
              사건번호
            </span>
            <span>
              2021가소123456
            </span>
          </div>
          <div className="flex flex-row w-[100%] sm:gap-[115px] gap-[150px] ">
            <span>
              물건번호
            </span>
            <span>
              12
            </span>
          </div>
          <div className="flex flex-row w-[100%] sm:gap-[110px] gap-[135px] ">
            <span>
              공동입찰자
            </span>
            <span>
              별지목록과 같음
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
