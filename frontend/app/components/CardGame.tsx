import React, { useEffect, useRef, useState } from 'react'
import { Button, notification, Spin, Modal } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Card from './Card'
import SideBar from './SideBar'
import { startNewGameAPI, continueGameAPI, actionGameAPI } from '../api/game'
import { IGamePayLoad } from '../api/game/common'

type Props = {
  isAuthenticated?: boolean
  userID?: number
}

const CardGame = ({ userID }: Props) => {
  const localKey = `mcg-current-game-${userID}`
  const player = useRef() as React.MutableRefObject<HTMLAudioElement>
  const [gameID, setGameID] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const [score, setScore] = useState<number | undefined>()
  const [currentState, setCurrentState] = useState<number[][]>([])
  const [bestScore, setBestScore] = useState<number | undefined>()
  const [bestGlobalScore, setBestGlobalScore] = useState<number | undefined>()
  const [isReady, setIsReady] = useState(true)

  const [congratVisibleModal, setCongratVisibleModal] = useState(false)

  useEffect(() => {
    // Update the document title using the browser API
    setGameID(localStorage.getItem(localKey))
  })

  const setData = (data: IGamePayLoad) => {
    const { score, currentState, bestScore, bestGlobalScore } = data
    setScore(score)
    setCurrentState(currentState)
    setBestScore(bestScore)
    setBestGlobalScore(bestGlobalScore)
  }

  const onClickNewGame = async () => {
    setLoading(true)
    // start a new game
    const data = await startNewGameAPI()
      .catch(err => {
        notification.error({
          message: 'Error',
          description: err.message
        })
        return
      })
    if (data) {
      const { id: gameID } = data
      // save game_id to local
      localStorage.setItem(localKey, `${gameID}`)
      setData(data)
      setIsPlaying(true)
    }
    setLoading(false)
  }
  const onClickContinueGame = async () => {
    setLoading(true)
    if (gameID) {
      // get game by gameID
      const data = await continueGameAPI(gameID)
        .catch(err => {
          notification.error({
            message: 'Error',
            description: err.message
          })
          return
        })

      if (data) {
        setData(data)
        setIsPlaying(true)

        if (data.isFinished) {
          setCongratVisibleModal(true)
        }
      }
    }
    setLoading(false)
  }

  const onSelectCard = async (row: number, col: number) => {
    if (gameID) {
      const data = await actionGameAPI(row, col, gameID)
        .catch(err => {
          notification.error({
            message: 'Error',
            description: err.message
          })
          return
        })

      if (data) {
        const { score, currentState, cardValue: currentValue } = data
        currentState[row][col] = currentValue
        setScore(score)
        if (data.lastAction && data.lastAction.matched != null) {
          const { row: lastRow, col: lastCol, matched, isEvenAction } = data.lastAction
          if (!matched && !isEvenAction && currentState[lastRow][lastCol] !== 0) {
            setIsReady(false)
            setTimeout(() => {
              const lastValue = currentState[lastRow][lastCol]
              if (currentValue !== lastValue) {
                const currentStateCopied = []
                for (const rowArr of currentState) {
                  currentStateCopied.push([...rowArr])
                }
                currentStateCopied[row][col] = 0
                currentStateCopied[lastRow][lastCol] = 0
                setCurrentState(currentStateCopied)
              } else {
                if (player.current.paused) {
                  player.current.play()
                }
              }
              setIsReady(true)
            }, 350)
          }
          //   setLastAction(data.lastAction)
        }
        setCurrentState(currentState)

        if (data.isFinished) {
          setCongratVisibleModal(true)
          if (bestScore != null && data.score < bestScore) {
            setBestScore(data.score)
          }
          if (bestGlobalScore != null && data.score < bestGlobalScore) {
            setBestGlobalScore(data.score)
          }
        }
      }
      return true
    }
    return false
  }

  const renderFirstView = () => {
    const buttons = [<Button key={`button-new-game`} size='large' onClick={onClickNewGame}>New Game</Button>]
    if (gameID) {
      buttons.push(<Button key={`button-continue-game`} type='primary' size='large' onClick={onClickContinueGame}>Continue <ArrowRightOutlined /></Button>)
    }
    return (
      <div className='start-button-layout'>
        { buttons}
      </div >
    )
  }

  return (
    <>
      { loading ?
        <div className='loading-mask'>
          <Spin />
        </div>
        :
        !isPlaying ?
          <div className='game-start-layout'>
            <div className="game-title">
              <span>Matching Card Game</span>
            </div>
            {renderFirstView()}
          </div>
          :
          <div className='game-layout'>
            <audio src='/card-matched.mp3' ref={player} />
            <Modal
              title='Congratulations!'
              visible={congratVisibleModal}
              okText='New Game'
              onOk={() => {
                setCongratVisibleModal(false)
                onClickNewGame()
              }}
              cancelText='Nope'
              onCancel={() => setCongratVisibleModal(false)}
              maskClosable={false}
              destroyOnClose={true}
            >
              {`You won, your score is ${score}`}
            </Modal>
            <SideBar
              score={score}
              bestScore={bestScore}
              bestGlobalScore={bestGlobalScore}
              onClickNewGame={onClickNewGame}
            />
            {currentState.map((rows, rowNum) =>
              <div key={`row-${rowNum}`} className='card-row'>
                {rows.map((value, colNum) =>
                  <div key={`card-col-${rowNum}-${colNum}`} className='card-col'>
                    <Card
                      key={`card-${rowNum}-${colNum}`}
                      value={value}
                      // flipped={value !== 0 && lastAction}
                      row={rowNum}
                      col={colNum}
                      isReady={isReady}
                      onSelectCard={onSelectCard}
                    ></Card>
                  </div>
                )}
              </div>
            )}
          </div>
      }
    </>
  )
}

export default CardGame
