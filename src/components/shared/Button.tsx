interface ButtonProps {
  isDisabled?: boolean
  handleNextStep?: () => void
  handlePrevStep?: () => void
  nextText?: string
  prevText?: string
  bottom?: string
  hidden?: boolean
}

const Button = ({ isDisabled, handlePrevStep, handleNextStep, nextText, bottom, prevText, hidden }: ButtonProps) => {
  return (
    <div className={`flex flex-row fixed items-center md:w-[550px] w-[90%] ${bottom ? `md:bottom-[${bottom}px] bottom-[10px]` : 'md:bottom-[80px] bottom-[10px]'} gap-[10px]`} >
      <button
        type="button"
        className="flex w-[35%] h-[50px] bg-prevBtn rounded-full justify-center items-center cursor-pointer"
        onClick={handlePrevStep}
      >
        <span className="text-sutTitle font-extrabold font-['suit'] md:text-[1.2rem] text-[1rem]">
          {prevText || '이전으로'}
        </span>
      </button>
      <button
        type="button"
        className={`flex w-[60%] md:w-[65%] h-[50px] ${isDisabled ? 'bg-disabled' : 'bg-myBlue'} rounded-full justify-center items-center cursor-pointer`}
        disabled={isDisabled}
        onClick={handleNextStep}
      >
        <span className="text-white font-extrabold font-['suit'] md:text-[1.2rem] text-[1rem]">
          {nextText || '다음으로'}
        </span>
      </button>
    </div>
  )
}

export default Button
