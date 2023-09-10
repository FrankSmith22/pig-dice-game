import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

const PlayerCard = ({ player, activePlayer }) => {

    return (
        <Card>
            <CardHeader className={player.name === activePlayer ? "bg-success" : ""}>{player.name}</CardHeader>
            <CardBody className={player.name === activePlayer ? "bg-success-light" : ""}>
                score: {player.score} <br />
                total score: {player.totalScore}
            </CardBody>
        </Card>
    )
}

export default PlayerCard