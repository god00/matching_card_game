import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const loginAPI = (username: string, password: string) => {
    return axios.post(`${API_URL}/login`, { username, password })
}