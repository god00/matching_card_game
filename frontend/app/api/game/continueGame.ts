import axios from 'axios'
import { Cookies } from 'react-cookie'
import { IGamePayLoad } from './common'

const cookies = new Cookies()

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const continueGameAPI = async (gameID: string): Promise<IGamePayLoad> => {
    return new Promise((resolve, reject) => {
        const token = cookies.get('token')
        axios.get(`${API_URL}/games/${gameID}/`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res: any) => {
                if (res && res.data) {
                    const {
                        id,
                        score,
                        current_state: currentState,
                        best_global_score: bestGlobalScore,
                        best_score: bestScore,
                        last_action: lastAction,
                        is_finished: isFinished,
                    } = res.data
                    const isEvenAction = lastAction.is_event_action
                    lastAction.isEvenAction = isEvenAction
                    delete lastAction.is_event_action
                    const data: IGamePayLoad = {
                        id,
                        score,
                        currentState,
                        bestGlobalScore,
                        bestScore,
                        isFinished,
                        lastAction,
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