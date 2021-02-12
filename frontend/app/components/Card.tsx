import React, { useEffect, useRef, useState } from 'react'
import { Card, CardProps } from 'antd';
import ReactCardFlip from 'react-card-flip'

const cardAspectRatio = 1.4

interface NewCardProps extends CardProps {
    state?: 'back' | 'front'
    card: 'back' | 'front'
    ready?: 'true' | 'false'
}
const connectCard = (Component: React.FC): React.FC<NewCardProps> => {
    const ComponentWrapper = (props: NewCardProps): JSX.Element => {
        return <Component {...props} />;
    };

    return ComponentWrapper;
}

const MyCard = connectCard(Card)

type Props = {
    width?: number
    height?: number
    value?: any
    flipped?: boolean
    row: number
    col: number
    isReady: boolean
    onSelectCard: (row: number, col: number) => Promise<boolean>
    onFlipped?: (row?: number, col?: number) => any
}

const CardFlip = ({ width = 120, height, flipped = false, value: cardValue, row, col, isReady = true, onSelectCard, onFlipped }: Props) => {
    if (height == null) {
        height = Math.floor(width * cardAspectRatio)
    }
    const player = useRef() as React.MutableRefObject<HTMLAudioElement>
    const [value, setValue] = useState(cardValue)
    const [prevValue, setPrevValue] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    let timeoutID: any

    useEffect(() => {
        setIsFlipped(flipped)
        if (flipped !== isFlipped) {
            player.current.play()
        }
    }, [flipped])

    useEffect(() => {
        if (cardValue === 0) {
            setPrevValue(value)
            setIsFlipped(false)
            if (timeoutID != null) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(() => {
                setPrevValue(0)
            }, 300)
        } else {
            setIsFlipped(true)
        }
        setValue(cardValue)
    }, [cardValue])

    const selectCard = async () => {
        if (isReady) {
            if (!isFetching) {
                setIsFetching(true)
                const success = await onSelectCard(row, col)
                if (success) {
                    setIsFlipped(true)
                    if (!isFlipped && player.current.paused) {
                        player.current.play()
                    }
                    if (onFlipped) {
                        onFlipped(row, col)
                    }
                }
                setIsFetching(false)
            }
        }
    }

    return (
        <>
            <audio src='/card-flip.mp3' ref={player} />
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
                        ready={isReady ? 'true' : 'false'}
                        style={{ width, height, backgroundColor: 'ghostwhite' }}
                        hoverable
                        onClick={selectCard}
                    >
                        <img style={{ width: '100%', height: '100%' }} alt="card" src="/card-background.png" />
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