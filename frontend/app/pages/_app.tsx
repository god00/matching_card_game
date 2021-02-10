import App from "next/app"
import type { AppProps, AppContext } from 'next/app'
import '../styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp