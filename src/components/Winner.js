import { getWinner } from "../features/players/playersSlice";
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { setIsGameActive } from "../features/game/gameSlice";
import { EVENTS as E } from '../app/events'
import { useEffect } from "react";

const Winner = ({ socket, clientPlayer, rematchPlayer }) => {
    const winner = useSelector(getWinner)
    const dispatch = useDispatch()

    const handleRematch = () => {
        socket.emit(E.ATTEMPT_REMATCH)
    }

    useEffect(() =>{
        if(winner){
            dispatch(setIsGameActive({isGameActive: false}))
        }
    }, [winner])

    return winner ? (
        <>
            <span>{`The winner is ${winner}!`}</span>
            <br/>
            <Button disabled={rematchPlayer === clientPlayer} className="transparent-shadowed-container active-player" onClick={()=>{handleRematch()}}>Rematch</Button>
            <br/><br/>
            {rematchPlayer ? <span>{rematchPlayer} would like to play again!</span> : <></>}
        </>
    ) : (
        <>
        </>
    )
}

export default Winner