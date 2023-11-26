import React, { useState } from "react";
import GameStart from "./GameStart";
import PlayerCard from "../features/players/PlayerCard";
import { getAllPlayers, getActivePlayer, getClientPlayer, increaseScore, increaseTotalScore, getWinner, resetScore, setActivePlayer } from "../features/players/playersSlice";
import { getIsGameActive, setIsGameActive } from "../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { useCallback } from "react";
import { useEffect } from "react";
import { EVENTS as E } from '../app/events'

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

const Main = ({ socket }) => {

    const players = useSelector(getAllPlayers)
    const activePlayer = useSelector(getActivePlayer)
    const isGameActive = useSelector(getIsGameActive)
    const clientPlayer = useSelector(getClientPlayer)
    const dispatch = useDispatch()
    const [latestRoll, setLatestRoll] = useState(null)

    useEffect(() => {
        function onNewActivePlayer(newActivePlayer){
            console.log('received new set-active-player msg from server')
            dispatch(setActivePlayer({newActivePlayer}))
        }
        function onUpdateScore({player, updateScore}) {
            console.log('received new update-score msg from server')
            if(updateScore === 1){
                dispatch(resetScore({activePlayer: player}))
            }
            else {
                setLatestRoll(updateScore)
                dispatch(increaseScore({
                    activePlayer: player,
                    increase: updateScore
                }))
            }
        }
        function onUpdateTotalScore({player, updateTotalScore}){
            dispatch(increaseTotalScore({activePlayer: player, points: updateTotalScore}))
        }

        function onPlayerDisconnect(){
            setIsGameActive({isGameActive: false})
            // TODO: Let user know that opponent has disconnected
        }

        socket.on(E.SET_ACTIVE_PLAYER, onNewActivePlayer)
        socket.on(E.UPDATE_SCORE, onUpdateScore)
        socket.on(E.UPDATE_TOTAL_SCORE, onUpdateTotalScore)
        socket.on(E.PLAYER_DISCONNECT, onPlayerDisconnect)

        return () => {
            socket.off(E.SET_ACTIVE_PLAYER, onNewActivePlayer)
            socket.off(E.UPDATE_SCORE, onUpdateScore)
            socket.off(E.UPDATE_TOTAL_SCORE, onUpdateTotalScore)
            socket.off(E.PLAYER_DISCONNECT, onPlayerDisconnect)
        }
    }, [])

    const handleRoll = (activePlayer) => {
        console.log('calling handleRoll')
        if(!isGameActive) return;
        socket.emit(E.DO_ROLL, activePlayer)
        // const randomNum = Math.ceil(Math.random() * 6)
        // setLatestRoll(randomNum)
        // if(randomNum === 1) {
        //     console.log("Oops you rolled a 1!")
        //     dispatch(resetScore({activePlayer}))
        //     const newActivePlayer = players.find(player => player.name !== activePlayer).name // Yes, this definitely hardcodes the game to be 2 player
        //     dispatch(setActivePlayer({newActivePlayer}))
        //     return
        // }
        // dispatch(increaseScore({
        //     activePlayer: activePlayer,
        //     increase: randomNum 
        // }))
    }
    
    const handleHold = (activePlayer) => {
        console.log('calling handleHold')
        if(!isGameActive) return;
        console.log(players)
        const activePlayerObj = players.find(player => player.name === activePlayer)
        socket.emit(E.DO_HOLD, {activePlayer, points: activePlayerObj.score})
        // dispatch(increaseTotalScore({activePlayer}))
        // const newActivePlayer = players.find(player => player.name !== activePlayer).name
        // dispatch(setActivePlayer({newActivePlayer}))
    }

    // Hot key handling
    const handleKeyPress = useCallback((e) => {
        console.log(`${e.key}`)
        console.log(isGameActive)
        if(!isGameActive) return;
        switch(e.key){
            case " ": handleRoll(activePlayer); break;
            case "Enter": handleHold(activePlayer); break;
        }
    // }, [isGameActive, activePlayer, handleRoll, handleHold])
    }, [isGameActive])

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress)
        return () => {
            document.removeEventListener('keyup', handleKeyPress)
        }
    }, [handleKeyPress])

    return (
        <>
            <GameStart socket={ socket } isGameActive={isGameActive} />
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
                        <button
                            className="btn btn-lg mx-5 btn-success"
                            disabled={clientPlayer !== activePlayer}
                            onClick={() => handleRoll(activePlayer)}
                        >
                            Roll
                        </button>
                        <button
                            className="btn btn-lg mx-5 btn-warning"
                            disabled={clientPlayer !== activePlayer}
                            onClick={() => handleHold(activePlayer)}
                        >
                            Hold
                        </button>
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