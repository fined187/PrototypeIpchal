import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { RecoilRoot } from 'recoil'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    }
  }

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          defer
          onLoad={kakaoInit}
        />
      </Layout>
    </RecoilRoot>
  )
}
