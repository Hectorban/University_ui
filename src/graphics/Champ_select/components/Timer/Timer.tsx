import React, { useState, useEffect } from 'react'
import useCountDown from 'react-countdown-hook'
import { Action, Timer } from '../../../../types/champSelect'

interface Props {
    actions: Array<Action[]>;
    timer: Timer 
}

const finalizationTime = 60 * 1000
const pickTime = 27 * 1000 // Secs
const interval = 1 * 100 // Also secs

const Timer = ({actions, timer}: Props) => {
    const [timeLeft, {start, reset}] = useCountDown(pickTime, interval)
    const [length, setlength] = useState(actions.length)
    const [finalizationstate, setfinalizationstate] = useState("FINALIZATION")
    const [redConst, setRedConst] = useState(.37)

    useEffect(() => {
        start();
    }, []);
    if(length === 0) {
        reset()
    }
    useEffect(() => {
        if(length === 0) {
            return () => {
                setfinalizationstate("FINALIZATION")
                setRedConst(.37037037)
            }
        }    
        return
    }, [length])
    if(length != actions.length) {
        setlength(actions.length)
        start(pickTime)
    }
    if(timer.phase === finalizationstate) {
        setfinalizationstate("FINALIZED")
        setRedConst(.16666666)
        start(finalizationTime)
    }
    return (
        <div className='timer'>
            <div className='timer-bar' style={{width:`${(timeLeft/100)*redConst}%`}}/>
        </div>
    )
}

export default Timer