import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  Fragment,
  useEffect,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import IpchalContent from './IpchalContent'

interface PdfContentProps {
  openPdf: boolean
  setOpenPdf: Dispatch<SetStateAction<boolean>>
}

export default function PdfContent({ openPdf, setOpenPdf }: PdfContentProps) {
  return (
    <>
      <Transition.Root show={openPdf} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setOpenPdf}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 justify-center items-center w-screen h-screen">
            <div className="flex items-center min-h-full h-[100%] justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform justify-center items-center overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-[50%] w-[100%] sm:h-[80%] h-[100%] sm:my-8">
                  <div className="bg-white justify-center items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="flex justify-center items-center flex-col">
                      <div className="flex flex-col justify-center items-center w-[100%] h-[720px] bg-mybg relative">
                        <IpchalContent setOpenPdf={setOpenPdf} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}