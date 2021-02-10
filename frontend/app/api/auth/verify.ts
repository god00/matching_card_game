import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const verifyTokenAPI = (token: string) => {
    return axios.get(`${API_URL}/verify`, { headers: { 'Authorization': `Bearer ${token}` } })
}