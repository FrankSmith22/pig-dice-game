import React, { useState } from "react";
import PlayerCard from "../features/players/PlayerCard";
import { getAllPlayers, getActivePlayer, increaseScore, increaseTotalScore, getWinner, resetScore, setActivePlayer } from "../features/players/playersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

const Winner = () => {
    const winner = useSelector(getWinner)
    return (
        <span>{winner ? `The winner is ${winner}!` : ""}</span>
    )
}

const Main = () => {

    const players = useSelector(getAllPlayers)
    const activePlayer = useSelector(getActivePlayer)
    const dispatch = useDispatch()
    const [latestRoll, setLatestRoll] = useState(null)

    const handleRoll = (activePlayer) => {
        const randomNum = Math.ceil(Math.random() * 6)
        setLatestRoll(randomNum)
        if(randomNum === 1) {
            console.log("Oops you rolled a 1!")
            dispatch(resetScore({activePlayer}))
            const newActivePlayer = players.find(player => player.name !== activePlayer).name
            dispatch(setActivePlayer({newActivePlayer}))
            return
        }
        dispatch(increaseScore({
            activePlayer: activePlayer,
            increase: randomNum 
        }))
    }
    
    const handleHold = (activePlayer) => {
        dispatch(increaseTotalScore({activePlayer}))
        const newActivePlayer = players.find(player => player.name !== activePlayer).name
        dispatch(setActivePlayer({newActivePlayer}))
        setLatestRoll(null)
    }

    return (
        <>
            <Container>
                <Row>
                    {players.map((player, i) => {
                        return (
                            <Col key={i} xs="3" className="text-center mx-auto">
                                <PlayerCard player={player} activePlayer={activePlayer} />
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    <Col className="text-center mx-auto">
                        <button className="btn btn-lg mx-5 btn-success" onClick={() => handleRoll(activePlayer)}>Roll</button>
                        <button className="btn btn-lg mx-5 btn-warning" onClick={() => handleHold(activePlayer)}>Hold</button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mx-auto mt-3" style={{fontSize: "50px"}}>
                        <span style={latestRoll === 1 ? {color: "red"} : {}}>{latestRoll ? latestRoll : "___"}</span>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mx-auto mt-3" >
                        <Winner />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Main;