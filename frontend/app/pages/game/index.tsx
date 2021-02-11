import Layout from '../../components/Layout'
import CardGame from '../../components/CardGame'

type Props = {
    isAuthenticated: boolean
    userID?: number
}

const GameIndex = (pageProps: Props) => (
    <Layout>
        <CardGame {...pageProps} />
    </Layout>
)

export default GameIndex
