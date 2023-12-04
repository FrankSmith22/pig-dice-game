import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

const PlayerCard = ({ player, activePlayer }) => {

    const isActivePlayer = player.name === activePlayer

    return (
        <Card className={
            `transparent-shadowed-container player-card ${isActivePlayer ? "active-player" : "inactive-player"}`
        }>
            <CardHeader>{player.name}</CardHeader>
            <CardBody>
                score: {player.score} <br/><br/>
                total score: {player.totalScore}
            </CardBody>
        </Card>
    )
}

export default PlayerCard