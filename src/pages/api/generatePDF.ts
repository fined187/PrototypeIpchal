// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import puppeteer from 'puppeteer'
import hb from 'handlebars'
import jsPDF from 'jspdf';

export const config = {
  api: {
    responseLimit: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, password, mstSeq, pageNum, html, userIdYn } = req.body;
    let data = {};
    console.log("Compiing the template with handlebars");
    const contentWrapperStart = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap" rel="stylesheet">
      </head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            fontFamily: {
              nanum: ['NanumGothic', 'sans-serif'],
              batang: ['Batang', 'serif'],
            },
            backgroundImage: {
              'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
              'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
          },
          colors: {
            white: colors.white,
            black: colors.black,
            gray: colors.gray,
            blue: colors.blue,
            red: colors.red,
            yellow: colors.yellow,
            green: colors.green,
            indigo: colors.indigo,
            purple: colors.purple,
            pink: colors.pink,
            teal: colors.teal,
            orange: colors.orange,
            cyan: colors.cyan,
            lime: colors.lime,
            emerald: colors.emerald,
            rose: colors.rose,
            fuchsia: colors.fuchsia,
            violet: colors.violet,
            amber: colors.amber,
            sky: colors.sky,
            mygray: '#8D8D8D',
            mybg: '#F6F6F6',
            myborder: '#E0E0E0',
            mygold: '#C89C23',
            mygraybg: '#D1D1D1',
            myyellow: '#D3AB3B',
            myRed: '#FF0000',
            myBlue: '#4a81a4'
          }
        },
        plugins: [require("tailwind-scrollbar-hide")],
      }
    </script>
    <body>
      <div class="flex flex-col bg-white h-[100%] w-[100%] mx-auto relative justify-center items-center">
      `;
    const contentWrapperEnd = `</div></body></html>`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      encryption: {
        userPassword: password,
        ownerPassword: password,
        userPermissions: ["print", "modify", "copy", "annot-forms"],
      },
    })

    const template = hb.compile(contentWrapperStart + html + contentWrapperEnd, {
      strict: true,
    });
    const result = template(data);
    const htmlResult = result;
    await page.setContent(htmlResult);
    await page.setViewport({ width: 1000, height: 1300 }); // 건드리면 안 됨
    
    const imgData = await page.screenshot({ fullPage: true });
    let imgWidth = 210; // 건드리면 안 됨
    let pageHeight = 290; // 건드리면 안 됨
    let imgHeight = pageHeight * pageNum; // pageNum는 페이지 장수를 뜻함
    let heightLeft = imgHeight;
    let position = 0;
    
    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 20) {
      position = heightLeft - imgHeight + 15; // 미세조정  필요
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    doc.save(`${name}.pdf`);
    
    let pdf: any = fs.readFileSync(`${name}.pdf`);
    fs.rmSync(`${name}.pdf`);
    console.log("PDF Generated!!");
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
    }
  }
