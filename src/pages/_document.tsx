import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width, minimum-scale=1.0" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
