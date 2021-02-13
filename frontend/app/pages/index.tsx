import Link from 'next/link'

import Layout from '../components/Layout'

const IndexPage = () => {
  return (
    <Layout>
      <div className='game-start-layout'>
        <div className="game-title">
          <p style={{ fontSize: '17px', position: 'absolute', marginTop: '-48px', color: 'darkgray' }}>Welcome to..</p>
          <span>Matching Card Game</span>
        </div>
        <Link href="/login">
          <a style={{ fontSize: '17px' }}>Login</a>
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage
