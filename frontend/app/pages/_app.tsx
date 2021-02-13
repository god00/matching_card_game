import App from "next/app"
import type { AppProps, AppContext } from 'next/app'
import '../styles.scss'

import { handleAuthSSR } from "../utils/handleAuthSSR"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext
  const { res, req, pathname } = ctx
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const result = await handleAuthSSR(req, res, pathname)
  if (result.isAuthenticated && pathname === '/') {
    if (res && res.writeHead) {
      res.writeHead(302, {
        Location: '/game'
      })
      res.end()
    }
  }
  appProps.pageProps = { ...appProps.pageProps, isAuthenticated: result.isAuthenticated, userID: result.userID }
  // await IndexPage.getInitialProps(result.isAuthenticated)

  return appProps
}

export default MyApp