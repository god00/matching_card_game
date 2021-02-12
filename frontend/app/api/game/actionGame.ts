import axios from 'axios'
import { Cookies } from 'react-cookie'
import { IGameActionPayload } from './common'

const cookies = new Cookies()

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const actionGameAPI = async (row: number, col: number, gameID: string | number): Promise<IGameActionPayload> => {
    return new Promise((resolve, reject) => {
        const token = cookies.get('token')
        axios.patch(`${API_URL}/games/action/`, { action: { row, col }, 'game_id': gameID }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((res: any) => {
                if (res && res.data) {
                    const {
                        id,
                        score,
                        current_state: currentState,
                        card_value: cardValue,
                        last_action: lastAction,
                        is_finished: isFinished,
                    } = res.data
                    const isEvenAction = lastAction.is_event_action
                    lastAction.isEvenAction = isEvenAction
                    delete lastAction.is_event_action
                    const data: IGameActionPayload = {
                        id,
                        score,
                        currentState,
                        cardValue,
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
