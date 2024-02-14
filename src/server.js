import express from "express";
import bodyParser from "body-parser";
import {jsPDF} from 'jspdf'
import { format } from 'date-fns'
import cors from 'cors'

const PORT = 4000;
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

let file = File && new File([], '')
const date = new Date()

app.post("/test", async function (req, res) {
  const height = req.body?.height;
  const imgData = req.body?.imgData;
  const password = req.body?.password;
  
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    encryption: {
      userPassword: "1234",
      ownerPassword: "1234",
      userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
    },
  });
  
  let imgWidth = 210;
  let pageHeight = 295
  let imgHeight = height
  let heightLeft = imgHeight
  let position = 0

  doc?.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  while (heightLeft >= 20) {
    position = heightLeft - imgHeight
    doc?.addPage()
    doc?.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  const blob = doc?.output('blob')
  // doc.save(`best_${format(date, 'yyyyMMddHHmmss')}.pdf`)
  file = new File([blob], `test-${format(date, 'yyyy-MM-dd')}.pdf`, { type: 'application/pdf' })
  console.log('file', file)
  return res.status(200).json({ file })
});
const handleListening = () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
}

app.listen(PORT, handleListening);