import React, { useState } from "react";
import GameStart from "./GameStart";
import PlayerCard from "../features/players/PlayerCard";
import { getAllPlayers, getActivePlayer, increaseScore, increaseTotalScore, getWinner, resetScore, setActivePlayer } from "../features/players/playersSlice";
import { getIsGameActive, setIsGameActive } from "../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { useCallback } from "react";
import { useEffect } from "react";

const Winner = () => {
    const winner = useSelector(getWinner)
    const dispatch = useDispatch()

    if(winner){
        dispatch(setIsGameActive({isGameActive: false}))
    }

    return (
        <span>{winner ? `The winner is ${winner}!` : ""}</span>
    )
}

const Main = ({ isConnected }) => {

    const players = useSelector(getAllPlayers)
    const activePlayer = useSelector(getActivePlayer)
    const isGameActive = useSelector(getIsGameActive)
    const dispatch = useDispatch()
    const [latestRoll, setLatestRoll] = useState(null)

    console.log(isConnected)

    const handleRoll = (activePlayer) => {
        if(!isGameActive) return;
        const randomNum = Math.ceil(Math.random() * 6)
        setLatestRoll(randomNum)
        if(randomNum === 1) {
            console.log("Oops you rolled a 1!")
            dispatch(resetScore({activePlayer}))
            const newActivePlayer = players.find(player => player.name !== activePlayer).name // Yes, this definitely hardcodes the game to be 2 player
            dispatch(setActivePlayer({newActivePlayer}))
            return
        }
        dispatch(increaseScore({
            activePlayer: activePlayer,
            increase: randomNum 
        }))
    }
    
    const handleHold = (activePlayer) => {
        if(!isGameActive) return;
        dispatch(increaseTotalScore({activePlayer}))
        const newActivePlayer = players.find(player => player.name !== activePlayer).name
        dispatch(setActivePlayer({newActivePlayer}))
        setLatestRoll(null)
    }

    // Hot key handling
    const handleKeyPress = useCallback((e) => {
        // console.log(`${e.key}`)
        switch(e.key){
            case " ": handleRoll(activePlayer); break;
            case "Enter": handleHold(activePlayer); break;
        }
    }, [isGameActive, activePlayer])

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress)
        return () => {
            document.removeEventListener('keyup', handleKeyPress)
        }
    }, [handleKeyPress])

    return (
        <>
            <GameStart />
            <Container className="mt-5">
                <Row>
                    {players.map((player, i) => {
                        return (
                            <Col key={i} xs="6" md="4" className="text-center mx-auto">
                                <PlayerCard player={player} activePlayer={activePlayer} />
                            </Col>
                        )
                    })}
                </Row>
                <Row className="mt-3">
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