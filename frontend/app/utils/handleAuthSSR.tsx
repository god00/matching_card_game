import { IncomingMessage, ServerResponse } from 'http';
import { Cookies } from 'react-cookie';
import { verifyTokenAPI } from '../api/auth/verify'

const cookies = new Cookies();

export async function handleAuthSSR(req: IncomingMessage, res: ServerResponse) {
    let token = null;

    if (req && req.headers && req.headers.cookie) {
        token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }
    else {
        token = cookies.get('token')
    }

    try {
        if (!token) {
            throw new Error('Permission Denied')
        }
        await verifyTokenAPI(token)
        return true
        // dont really care about response, as long as it not an error
    } catch (err) {
        // redirect to login
        res.writeHead(302, {
            Location: '/login'
        })
        res.end()
    }
}