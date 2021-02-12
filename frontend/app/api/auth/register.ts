import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const registerAPI = (username: string, password: string) => {
    return axios.post(`${API_URL}/users/create/`, { username, password })
}