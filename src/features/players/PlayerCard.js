import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

const PlayerCard = ({ player }) => {

    return (
        <Card>
            <CardHeader>{player.name}</CardHeader>
            <CardBody>
                score: {player.score} <br />
                total score: {player.totalScore}
            </CardBody>
        </Card>
    )
}

export default PlayerCard