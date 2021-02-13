import { ILastAction } from './ILastAction'

export interface IGameBase {
    id: number
    score: number
    currentState: number[][]
    isFinished: boolean
    lastAction?: ILastAction
}