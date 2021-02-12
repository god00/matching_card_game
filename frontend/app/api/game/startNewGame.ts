import axios from 'axios'
import { Cookies } from 'react-cookie'
import { IGamePayLoad } from './common'

const cookies = new Cookies()

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const startNewGameAPI = async (): Promise<IGamePayLoad> => {
    return new Promise((resolve, reject) => {
        const token = cookies.get('token')
        axios.post(`${API_URL}/games/start/`, null, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res: any) => {
                if (res && res.data) {
                    const {
                        id,
                        score,
                        current_state: currentState,
                        best_global_score: bestGlobalScore,
                        best_score: bestScore,
                        is_finished: isFinished,
                    } = res.data
                    const data: IGamePayLoad = {
                        id,
                        score,
                        currentState,
                        bestGlobalScore,
                        bestScore,
                        isFinished
                    }
                    resolve(data)
                } else {
                    reject(new Error('Something went wrong'))
                }
            })
            .catch(err => {
                if (err && err.data && err.data.detail) {
                    reject({ message: err.data.detail })
                } else {
                    reject(new Error('Something went wrong'))
                }
            })
    })
}
