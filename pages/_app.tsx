import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import styled from '@emotion/styled'
// import { useChatStore } from "../utils/store";
import { ThemeProvider } from '@emotion/react'
import { lightTheme, darkTheme } from '../styles/theme'
import { useStore } from '../utils/store'
import AppBar from '../components/AppBar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as ga from '../lib/gtag'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode } = useStore()
  const theme = darkMode ? darkTheme : lightTheme

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${ga.GA_TRACKING_ID}`}
      />
      <Script
        id='myscript'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ThemeProvider theme={theme}>
        <MobileContainer>
          <AppBar />
          <div className='backdrop' />
          <div className='inner'>
            <Component {...pageProps} />
          </div>
        </MobileContainer>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp

const MobileContainer = styled.div`
  font-family: Pretendard;
  width: 100%;
  // background: ${({ theme }) => theme.bgColor};
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  transition: 3s ease;

  .inner {
    width: 900px;
    min-height: 100vh;
    transition: 3s ease;
    z-index: 1;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .backdrop {
    background: ${({ theme }) => theme.bgColor + '88'};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
  }
`
