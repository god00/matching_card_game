import { IncomingMessage, ServerResponse } from 'http'
import { Cookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

import { verifyTokenAPI } from '../api/auth/verify'

const cookies = new Cookies()
interface ITokenPayload {
    id: number
}

export interface IHandleAuthSSRResult {
    isAuthenticated?: boolean,
    userID?: number
}

export const handleAuthSSR = async (req?: IncomingMessage, res?: ServerResponse, pathname?: string): Promise<IHandleAuthSSRResult> => {
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
        const decoded = jwtDecode(token) as ITokenPayload
        return { isAuthenticated: true, userID: decoded && decoded.id }
    } catch (err) {
        // redirect to login
        if (res && res.writeHead && pathname !== '/login' && pathname !== '/') {
            res.writeHead(302, {
                Location: '/login'
            })
            res.end()
        }
        return {}
    }
}