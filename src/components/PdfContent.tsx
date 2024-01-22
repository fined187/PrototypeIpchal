import {
  Fragment,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import IpchalContent from './IpchalContent'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

interface PdfContentProps {
  isOpen: boolean
  onClose: () => void
}

export default function PdfContent({ isOpen, onClose }: PdfContentProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="fixed inset-0 z-10 justify-center items-center w-screen h-screen">
                <div className="flex items-center min-h-full h-[100%] justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="bg-white justify-center items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                      <div className="flex justify-center items-center flex-col">
                        <div className="flex flex-col justify-center items-center w-[100%] h-[720px] bg-mybg relative">
                          <IpchalContent onClose={onClose} />
                        </div>
                      </div>
                  </div>
                </div>
              </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}