// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { biddingInfoState } from '@/atom'
import { format } from 'date-fns'
import jsPDF from 'jspdf'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRecoilState } from 'recoil'

type Data = {
  file: string
}

export default async function generatePdf( req: NextApiRequest, res: NextApiResponse<Data>,) {
  const getHeight = req.body
  let file = File && new File([], '')
  const date = new Date()
  const [biddingInfo, setBiddingInfo] = useRecoilState(biddingInfoState)
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    encryption: {
      userPassword: biddingInfo.pdfPassword,
      ownerPassword: biddingInfo.pdfPassword,
      userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
    },
  })
  const img = biddingInfo.imageFile
  let imgWidth = 210
  let pageHeight = 295
  let imgHeight = getHeight
  let heightLeft = imgHeight
  let position = 0
  doc.text('100', 100, 20)
  doc?.addImage(img, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  while (heightLeft >= 20) {
    position = heightLeft - imgHeight
    doc?.addPage()
    doc?.addImage(img, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }
  const blob = doc.output('blob')
  //  저장
  doc.save(`best_${format(date, 'yyyyMMddHHmmss')}.pdf`)
  file = new File([blob], `best_${format(date, 'yyyyMMddHHmmss')}.pdf`, {
    type: 'application/pdf',
  })
  setBiddingInfo({
    ...biddingInfo,
    pdfFile: file,
    isFileCreated: true,
  })
  res.status(200).json({
    file: "file",
  })
}
