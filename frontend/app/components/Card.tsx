import React, { useEffect, useState } from 'react'
import { Card, CardProps } from 'antd';
import ReactCardFlip from 'react-card-flip'
import Sound from 'react-sound'

const cardAspectRatio = 1.4

interface NewCardProps extends CardProps {
    state?: 'back' | 'front';
    card: 'back' | 'front'
}
const connectCard = (Component: React.FC): React.FC<NewCardProps> => {
    const ComponentWrapper = (props: NewCardProps): JSX.Element => {
        return <Component {...props} />;
    };

    return ComponentWrapper;
};

const MyCard = connectCard(Card)

type Props = {
    width?: number,
    height?: number,
    value?: any,
    flipped?: boolean
}

const CardFlip = ({ width = 140, height, flipped = false, value: cardValue }: Props) => {
    if (height == null) {
        height = Math.floor(width * cardAspectRatio)
    }
    const [value, setValue] = useState(cardValue)
    const [prevValue, setPrevValue] = useState(0)
    const [isFlipped, setIsFlipped] = useState(flipped)
    let timeoutID: any

    useEffect(() => {
        setIsFlipped(flipped)
    }, [flipped])

    useEffect(() => {
        if (cardValue === 0) {
            setPrevValue(value)
            if (timeoutID != null) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(() => {
                setPrevValue(0)
            }, 300)
        }
        setValue(cardValue)
    }, [cardValue])

    const selectCard = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <>
            <Sound
                url={'/card-flip.mp3'}
                playStatus={isFlipped ? 'PLAYING' : 'STOPPED'}
                playFromPosition={300 /* in milliseconds */}
            />
            <ReactCardFlip
                isFlipped={isFlipped}
                cardStyles={{ front: { width, height }, back: { width, height } }}
                flipSpeedBackToFront={0.2}
                flipSpeedFrontToBack={0.2}
            >
                <div>
                    <MyCard
                        className='card'
                        card='front'
                        style={{ width, height, backgroundColor: 'ghostwhite' }}
                        hoverable
                        onClick={selectCard}
                    >
                        <img style={{ width: '100%' }} alt="card" src="/card-background.png" />
                    </MyCard>
                </div>

                <div>
                    <MyCard
                        className='card'
                        card='back'
                        state={isFlipped ? 'back' : 'front'}
                        style={{ width, height }}
                        hoverable
                    >
                        {!isFlipped ? prevValue : value}
                    </MyCard>
                </div>
            </ReactCardFlip>
        </>
    )
}

export default CardFlip