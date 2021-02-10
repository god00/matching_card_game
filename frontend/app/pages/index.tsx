import Link from 'next/link'

import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout>
    <h1>Welcome to Matching Card Game</h1>
    <Link href="/login">
      <a>Login</a>
    </Link>
  </Layout>
)

export default IndexPage
