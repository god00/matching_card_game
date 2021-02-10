import Layout from '../../components/Layout'
import CardGame from '../../components/CardGame'
import { handleAuthSSR } from '../../utils/handleAuthSSR'


type Props = {
    isAuthenticated: boolean
}

const GameIndex = (pageProps: Props) => (
    <Layout>
        <CardGame items={[]} {...pageProps} />
    </Layout>
)

GameIndex.getInitialProps = async ({ req, res }: any) => {
    const isAuthenticated = await handleAuthSSR(req, res) || false
    return { isAuthenticated }
}

export default GameIndex
