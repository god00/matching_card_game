import Layout from '../../components/Layout'
import CardGame from '../../components/CardGame'
import { Props } from '../../types/'

const GameIndex = (pageProps: Props) => (
    <Layout page="game">
        <CardGame {...pageProps} />
    </Layout>
)

export default GameIndex
