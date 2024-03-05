import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet" />
      </Head>
      <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width, minimum-scale=1.0" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
