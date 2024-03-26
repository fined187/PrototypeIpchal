interface TitleProps {
  title: string;
  subTitle1?: string;
  subTitle2?: string;
}

export default function Title({ title, subTitle1, subTitle2 }: TitleProps) {
  const 모바일인가 = window ? window.innerWidth < 768 : false
  
  return (
    <div className="flex flex-col pt-[50px] md:gap-[14px] gap-[5px]">
      <span className="md:text-[32.5px] text-[20px] leading-[135%] tracking-[-1%] font-bold font-['suit'] not-italic">
        {title}
      </span>
      {모바일인가 ? (
        <div className="flex flex-col md:hidden">
          <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
            {subTitle1}
          </span>
          <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
            {subTitle2}
          </span>
        </div>
      ) : (
        <div className="hidden md:flex flex-col">
          <span className="md:text-[18px] text-[16px] leading-[135%] tracking-[-1%] font-normal font-['suit'] not-italic text-sutTitle">
            {subTitle1}
          </span>
        </div>
      )}
    </div>
  )
}