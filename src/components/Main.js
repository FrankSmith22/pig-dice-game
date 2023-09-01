import React, { useState } from "react";
import PlayerCard from "../features/players/PlayerCard";
import { getAllPlayers, getActivePlayer, increaseScore } from "../features/players/playersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

const Main = () => {

    const players = useSelector(getAllPlayers)
    const activePlayer = useSelector(getActivePlayer)
    const dispatch = useDispatch()
    const [latestRoll, setLatestRoll] = useState(undefined)

    const handleRoll = (activePlayer) => {
        const randomNum = Math.ceil(Math.random() * 6)
        setLatestRoll(randomNum)
        dispatch(increaseScore({
            activePlayer: activePlayer,
            increase: randomNum 
        }))
        console.log("Dispatched!")
        console.log(players[0].score)
    }

    return (
        <>
            <Container>
                <Row>
                    {players.map((player, i) => {
                        return (
                            <Col key={i} xs="3" className="text-center mx-auto">
                                <PlayerCard player={player} />
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col className="text-center mx-auto">
                        <button className="btn btn-lg btn-success" onClick={() => handleRoll(activePlayer)}>Roll</button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mx-auto mt-3" style={{fontSize: "50px"}}>
                        <span>{latestRoll ? latestRoll : "___"}</span>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Main;