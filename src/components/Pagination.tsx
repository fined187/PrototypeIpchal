export default function Pagination({ totalCount, currentPage, setCurrentPage, pageUpClick, pageDownClick }: any) {
  return (
    <div className="flex justify-center items-center gap-2 mt-5">
      <button
        onClick={pageDownClick}
        className="w-[30px] h-[30px] rounded-full bg-[#e1e1e1] text-[#666666] text-[10px] font-nanum not-italic font-extrabold"
      >
        {'<'}
      </button>
      <span className="text-[10px] font-nanum not-italic font-extrabold text-[#666666]">
        {currentPage} / {Math.ceil(totalCount / 10)}
      </span>
      <button
        onClick={pageUpClick}
        className="w-[30px] h-[30px] rounded-full bg-[#e1e1e1] text-[#666666] text-[10px] font-nanum not-italic font-extrabold"
      >
        {'>'}
      </button>
    </div>
  )
};