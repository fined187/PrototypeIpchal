import emailjs from '@emailjs/browser'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRecoilValue } from 'recoil'
import { biddingInfoState } from '@/atom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

interface EmailFormProps {
  isOpen: boolean
  onClose: () => void
}

const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY
const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY

export default function EmailForm({
  isOpen,
  onClose,
}: EmailFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const recipientRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [msg, setMsg] = useState<string>('')
  const [data, setData] = useState({
    title: '',
    recipient: '',
    message: '',
  })

  const biddingInfo = useRecoilValue(biddingInfoState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const sendEamil: SubmitHandler<any> = async (data) => {
    try {
      await emailjs.send(serviceId!, templateId!, {
        title: data.title,
        recipient: data.recipient,
        message: data.message,
      })
      alert('메일이 전송되었습니다')
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
    }
  }

  const handleMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value)
    setData({
      ...data,
      message: e.target.value,
    })
  }

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <ModalContent>
          <ModalBody>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-[100%] w-[100%]">
                  <div className='flex justify-end p-[10px] border border-b-[1px] border-gray-300'>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mygray hover:mygray cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={onClose}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form encType='multipart/form-data' method='post' ref={formRef} onSubmit={handleSubmit(async () => {
                    await sendEamil(data)
                  })}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="flex flex-col mb-4 w-[100%]">
                        <div className='flex justify-between w-[100%]'>
                          <div className='flex w-[15%] justify-start'>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="name"
                            >
                              제목
                            </label>
                          </div>
                          {errors.titleRef?.type === 'required' && (data.title === '') && (
                            <div className='flex w-[85%] justify-end'>
                              <span className="text-red-500 text-[12px] font-bold">제목을 입력해주세요</span>
                            </div>
                          )}
                        </div>
                        <input
                          {...register('titleRef', { required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:outline-myyellow mb-4"
                          id="title"
                          type="text"
                          placeholder="제목을 입력해주세요"
                          value={data.title || ''}
                          onChange={(e) => {
                            setData({
                              ...data,
                              title: e.target.value,
                            })
                          }}
                        />
                        <div className='flex justify-between w-[100%]'>
                          <div className='flex w-[15%] justify-start'>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="email"
                            >
                              이메일
                            </label>
                          </div>
                          {errors.recipientRef?.type === 'required' && (data.recipient === '') && (
                            <div className='flex w-[85%] justify-end'>
                              <span className="text-red-500 text-[12px] font-bold">이메일을 입력해주세요</span>
                            </div>
                          )}
                        </div>
                        <input
                          {...register('recipientRef', { required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:outline-myyellow mb-4"
                          id="recipient"
                          type="email"
                          placeholder="이메일을 입력해주세요"
                          value={data.recipient || ''}
                          onChange={(e) => {
                            setData({
                              ...data,
                              recipient: e.target.value,
                            })
                          }}
                        />
                        <div className='flex justify-between w-[100%]'>
                          <div className='flex w-[15%] justify-start'>
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="message"
                            >
                              메시지
                            </label>
                          </div>
                          {errors.messageRef?.type === 'required' && (data.message === '') && (
                            <div className='flex w-[85%] justify-end'>
                              <span className="text-red-500 text-[12px] font-bold">메시지를 입력해주세요</span>
                            </div>
                          )}
                        </div>
                        <textarea
                          {...register('messageRef', { required: true })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:outline-myyellow"
                          id="message"
                          placeholder="메시지를 입력해주세요"
                          name="message"
                          value={`http://118.217.180.254:8081/ggi/api/bid-form/${biddingInfo.mstSeq}/files` || ''}
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
            </div>
          </ModalBody>
        </ModalContent>
    </Modal>
  )
}
