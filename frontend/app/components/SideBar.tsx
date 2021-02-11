import React from 'react'
import { Card, Button } from 'antd';
import Draggable from 'react-draggable'

const SideBar = () => {
    return (
        <Draggable bounds="body" handle="strong" defaultClassName='draggable' defaultPosition={{ x: -128, y: 0 }}>
            <div className="box no-cursor">
                <Card
                    hoverable
                    size="small"
                    title={<strong className="cursor"><div className='drag-icon'><b>.</b><b>.</b><b>.</b></div></strong>}
                >
                    <p>Score</p>
                    <b>-</b>
                    <p style={{ marginTop: 30 }}>My best</p>
                    <b>-</b>
                    <p style={{ marginTop: 30 }}>Global Best</p>
                    <b>-</b>
                    <div className='card-footer'>
                        <Button className='new-game-button' type="primary" block>New Game</Button>
                    </div>
                </Card>
            </div>
        </Draggable>
    )
}

export default SideBar