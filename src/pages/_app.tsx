import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { RecoilRoot } from 'recoil'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
