import Layout from '../../components/Layout'
import Login from '../../components/Login'

const LoginIndex = () => (
  <Layout>
    <div className='game-start-layout'>
      <div className="game-title">
        <span>Matching Card Game</span>
      </div>
      <Login />
    </div>
  </Layout>
)

export default LoginIndex
