import { Col, Row } from "reactstrap"

const PlayerLabel = ({playerNames}) => {
    return (
        <Row>
            <Col className="text-center">
                <h2>Player One</h2>
                <p>{playerNames[0]}</p>
            </Col>
            <Col className="text-center">
                <h2>Player Two</h2>
                <p>{playerNames[1]}</p>
            </Col>
        </Row>
    )
}

export default PlayerLabel