import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Card from './Card'
import SideBar from './SideBar'

type Props = {
  isAuthenticated?: boolean
  userID?: number
}

const CardGame = ({ userID }: Props) => {
  const localKey = `mcg-current-game-${userID}`
  const [value, setValue] = useState(0)
  const [gameID, setGameID] = useState<string | null>()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Update the document title using the browser API
    setGameID(localStorage.getItem(localKey))
  })

  const onClickNewGame = () => {
    // start a new game
    // save game_id to local
  }
  const onClickContinueGame = () => {
    // get game by gameID
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
      { !isPlaying ?
        <div className='game-start-layout'>
          <div className="game-title">
            <span>Matching Card Game</span>
          </div>
          {renderFirstView()}
        </div>
        :
        <div className='game-layout'>
          <SideBar />
          <Card value={value} flipped={value !== 0}></Card>
        </div>
      }
    </>

  )
}

export default CardGame
