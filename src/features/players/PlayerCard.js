import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

const PlayerCard = ({ player, activePlayer }) => {

    const isActivePlayer = player.name === activePlayer

    return (
        <Card className={
            `player-card ${isActivePlayer ? "active-player" : "inactive-player"} border border-gray`
        }>
            <CardHeader>{player.name}</CardHeader>
            <CardBody>
                score: {player.score} <br />
                total score: {player.totalScore}
            </CardBody>
        </Card>
    )
}

export default PlayerCard