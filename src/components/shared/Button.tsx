interface ButtonProps {
  isDisabled?: boolean
  handleNextStep?: () => void
  handlePrevStep?: () => void
  nextText?: string
  bottom?: string
}

const Button = ({ isDisabled, handlePrevStep, handleNextStep, nextText, bottom }: ButtonProps) => {
  return (
    <div className={`flex flex-row fixed items-center md:w-[550px] w-[90%] ${bottom ? `md:bottom-[${bottom}px] bottom-[10px]` : 'md:bottom-[80px] bottom-[10px]'}   gap-[10px]`} >
      <button
        type="button"
        className="flex w-[35%] h-[36px] bg-mygraybg rounded-md justify-center items-center cursor-pointer"
        onClick={handlePrevStep}
      >
        <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
          이전
        </span>
      </button>
      <button
        type="button"
        className="flex w-[60%] md:w-[65%] h-[37px] bg-mygold rounded-md justify-center items-center cursor-pointer"
        disabled={isDisabled}
        onClick={handleNextStep}
      >
        <span className="text-white font-extrabold font-NanumGothic md:text-[1.2rem] text-[1rem] leading-[15px] tracking-[-0.9px]">
          {nextText || '다음'}
        </span>
      </button>
    </div>
  )
}

export default Button
