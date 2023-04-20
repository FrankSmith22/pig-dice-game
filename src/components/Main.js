import React, { useState } from "react";
import { Button, Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import PlayerLabel from "./PlayerLabel";
import DieFace from "./DieFace";

const Main = () => {

    const [startModal, setStartModal] = useState(true)
    const [playerNames, setPlayerNames] = useState({ playerOne: "", playerTwo: "" })

    const toggleModal = () => setStartModal(!startModal)

    const handleNameFields = (playerNum, text) => {
        switch(playerNum){
            case 1: setPlayerNames({...playerNames, playerOne: text})
                    break
            case 2: setPlayerNames({...playerNames, playerTwo: text})
        }
    } 

    return (
        <>
            <Modal isOpen={startModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Welcome to Pig!</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <p className="pb-3">
                                <b>How the game works:</b><br />
                                Two players take turns rolling a dice. Whatever number shows is added to that players <b>turn total</b>.
                                That player can then decide to roll again, or hold their points to add to the <b>overall total</b> and switch the turn back to the other player.
                                Why hold points? If the dice rolls a 1, your turn ends and you lose your <b>turn total</b> points!
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label for="playerOneField">Player One</label><br />
                            <input 
                                id="playerOneField" 
                                value={playerNames.playerOne} 
                                type="text" 
                                onChange={(e)=>{handleNameFields(1, e.target.value)}}
                                className="mb-4"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label for="playerTwoField">Player Two</label><br />
                            <input 
                                id="playerTwoField" 
                                value={playerNames.playerTwo} 
                                type="text" 
                                onChange={(e)=>{handleNameFields(2, e.target.value)}}
                                className="mb-4"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={() => setStartModal(false)}>Start Game</Button>
                        </Col>
                    </Row>

                </ModalBody>
            </Modal>
            <Container>
                <PlayerLabel playerNames={playerNames} />
                <DieFace faceNum={3}/>
            </Container>
        </>
    )
}

export default Main;