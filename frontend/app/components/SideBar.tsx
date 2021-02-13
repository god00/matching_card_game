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
        <>
            { window.innerWidth > 575 ?
                <Draggable bounds="body" handle="strong" defaultClassName='draggable' defaultPosition={{ x: -50, y: 64 }}>
                    <div className="box no-cursor">
                        <Card
                            hoverable
                            size="small"
                            title={<strong className="cursor"><div className='drag-icon'><b>.</b><b>.</b><b>.</b></div></strong>}
                        >
                            <p>Score</p>
                            <div className='score-text'>
                                <b style={{ color: 'palevioletred' }}>{score || '-'}</b>
                            </div>
                            <p style={{ marginTop: 30 }}>My Best</p>
                            <div className='score-text'>
                                <b>{bestScore || '-'}</b>
                            </div>
                            <p style={{ marginTop: 30 }}>Global Best</p>
                            <div className='score-text'>
                                <b>{bestGlobalScore || '-'}</b>
                            </div>
                            <div className='card-footer'>
                                <Button size='large' className='new-game-button' type="primary" block onClick={onClickNewGame}>New Game</Button>
                            </div>
                        </Card>
                    </div>
                </Draggable>
                :
                <div className="score-bar">
                    <div className='score-item'>
                        <p>Score</p>
                        <b style={{ color: 'palevioletred' }}>{score || '-'}</b>
                    </div>
                    <div className='score-item'>
                        <p>My Best</p>
                        <b>{bestScore || '-'}</b>
                    </div>
                    <div className='score-item'>
                        <p>Global Best</p>
                        <b>{bestGlobalScore || '-'}</b>
                    </div>

                    <Button size='small' className='new-game-button' type="primary" block onClick={onClickNewGame}>New Game</Button>

                </div>
            }
        </>

    )
}

export default SideBar