import React from "react";
import PlayerCard from "../features/players/PlayerCard";
import { getAllPlayers } from "../features/players/playersSlice";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

const Main = () => {

    const players = useSelector(getAllPlayers)

    return (
        <>
            <Container>
                <Row>
                    {players.map(player => {
                        return (
                            <Col xs="3" className="text-center mx-auto">
                                <PlayerCard player={player} />
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col className="text-center mx-auto">
                        <button className="btn btn-lg btn-success">Roll</button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Main;