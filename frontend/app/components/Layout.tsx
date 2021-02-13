import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Matching Card Game' }: Props) => (
  <div className='layout-main'>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <footer>
      <span style={{ whiteSpace: 'nowrap', color: 'darkgray' }}>Powered by Phosawat Ongmorakot</span>
    </footer>
  </div>
)

export default Layout
