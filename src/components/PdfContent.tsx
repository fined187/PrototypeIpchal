import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  Fragment,
  useEffect,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'

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
          <div className="fixed inset-0 z-10 justify-center items-center">
            <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="flex justify-center flex-col">
                      <div className="flex flex-row justify-between">
                        
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