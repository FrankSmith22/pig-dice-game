import React from "react";
import PlayerCard from "../features/players/PlayerCard";
import { Col, Container, Row } from "reactstrap";

const Main = () => {


    return (
        <>
            <Container>
                <Row>
                    <Col xs="3" className="text-center mx-auto">
                        <PlayerCard />
                        <button>Roll</button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Main;