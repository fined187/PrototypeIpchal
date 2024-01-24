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
              <div className="inset-0 z-10 justify-center items-center w-screen h-screen relative">
                <div className="flex items-center w-[100%] h-[100%] justify-center p-4 text-center md:items-center md:p-0">
                    <div className="bg-white justify-center items-center px-4 pb-4 pt-5 md:p-6 md:pb-4 w-[100%] h-[100%]">
                      <div className="flex justify-center items-center flex-col w-[100%] h-[100%]">
                        <div className="flex flex-col justify-center items-center w-[100%] md:h-[700px] h-[100%] bg-mybg relative">
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