import React from 'react'
import { Card, Button } from 'antd';
import Draggable from 'react-draggable'

type Props = {
    score?: number
    bestScore?: number
    bestGlobalScore?: number
    onClickNewGame: () => {}
}

const SideBar = (props: Props) => {
    const { score, bestScore, bestGlobalScore, onClickNewGame = () => { } } = props
    return (
        <Draggable bounds="body" handle="strong" defaultClassName='draggable' defaultPosition={{ x: -50, y: 64 }}>
            <div className="box no-cursor">
                <Card
                    hoverable
                    size="small"
                    title={<strong className="cursor"><div className='drag-icon'><b>.</b><b>.</b><b>.</b></div></strong>}
                >
                    <p>Score</p>
                    <b>{score || '-'}</b>
                    <p style={{ marginTop: 30 }}>My best</p>
                    <b>{bestScore || '-'}</b>
                    <p style={{ marginTop: 30 }}>Global Best</p>
                    <b>{bestGlobalScore || '-'}</b>
                    <div className='card-footer'>
                        <Button className='new-game-button' type="primary" block onClick={onClickNewGame}>New Game</Button>
                    </div>
                </Card>
            </div>
        </Draggable>
    )
}

export default SideBar