import emailjs from '@emailjs/browser'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRecoilValue } from 'recoil'
import { biddingInfoState } from '@/atom'
import { useForm } from 'react-hook-form'

interface EmailFormProps {
  openEmailForm: boolean
  setOpenEmailForm: React.Dispatch<React.SetStateAction<boolean>>
}

const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY
const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY

export default function EmailForm({
  openEmailForm,
  setOpenEmailForm,
}: EmailFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const recipientRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [msg, setMsg] = useState<string>('')

  const biddingInfo = useRecoilValue(biddingInfoState)

  const {    
    register,
    handleSubmit,
    setFocus,
    reset,
    setError,
    formState: { errors },
  } = useForm()

  const sendEamil = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let base64 = biddingInfo.resultImg
    try {
      await emailjs.send(serviceId!, templateId!, {
        title: titleRef.current!.value,
        recipient: recipientRef.current!.value,
        message: messageRef.current!.value,
        content: base64
      })
      alert('메일이 전송되었습니다')
    } catch (error) {
      console.log(error)
    } finally {
      setOpenEmailForm(false)
    }
  }

  const handleMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value)
  }

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!)
  }, [])

  return (
    <Transition.Root show={openEmailForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpenEmailForm}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            
          </span>
          {/* Modal panel, show/hide based on modal state. */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-[100%] w-[100%]">
              <div className='flex justify-end p-[10px] border border-b-[1px] border-gray-300'>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mygray hover:mygray cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setOpenEmailForm(false)}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form encType='multipart/form-data' method='post' ref={formRef} onSubmit={sendEamil}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      제목
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      id="title"
                      type="text"
                      placeholder="제목을 입력해주세요"
                      name="title"
                      ref={titleRef}
                    />
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      이메일
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      id="recipient"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      name="recipient"
                      ref={recipientRef}
                    />

                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      메시지
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="message"
                      placeholder="메시지를 입력해주세요"
                      name="message"
                      ref={messageRef}
                      value={`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files`}
                      onChange={(e) => {
                        handleMessage(e)
                      }}
                    />
                  </div>
                </div>
                <div className='flex flex-row-reverse justify-center items-center'>
                  <input 
                    type="submit"
                    name="submit"
                    value="보내기"
                    className='bg-mygold text-white w-[160px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 cursor-pointer'
                  />
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
