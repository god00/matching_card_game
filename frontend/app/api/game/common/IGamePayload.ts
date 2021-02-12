import { IGameBase } from './IGameBase'

export interface IGamePayLoad extends IGameBase {
    bestGlobalScore: number
    bestScore: number
}
