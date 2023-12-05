import { getWinner } from "../features/players/playersSlice";
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { setIsGameActive } from "../features/game/gameSlice";
import { EVENTS as E } from '../app/events'

const Winner = ({ socket }) => {
    const winner = useSelector(getWinner)
    const dispatch = useDispatch()

    const handleRematch = () => {
        socket.emit(E.ATTEMPT_REMATCH)
    }

    if(winner){
        dispatch(setIsGameActive({isGameActive: false}))
    }

    return winner ? (
        <>
            <span>{`The winner is ${winner}!`}</span>
            <br/>
            <Button className="transparent-shadowed-container active-player" onClick={()=>{handleRematch()}}>Rematch</Button>
        </>
    ) : (
        <>
        </>
    )
}

export default Winner