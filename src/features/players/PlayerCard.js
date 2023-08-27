import { useSelector } from "react-redux";
import { getActivePlayer } from "./playersSlice";
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

const PlayerCard = () => {

    const activePlayer = useSelector(getActivePlayer)

    return (
        <Card>
            <CardHeader>{activePlayer.name}</CardHeader>
            <CardBody>
                score: {activePlayer.score} <br />
                total score: {activePlayer.totalScore}
            </CardBody>
        </Card>
    )
}

export default PlayerCard