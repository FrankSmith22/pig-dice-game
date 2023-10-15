import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col
} from 'reactstrap'
import { setPlayers } from '../features/players/playersSlice'
import { setIsGameActive } from '../features/game/gameSlice'
import { NAMES } from '../app/nameGeneration/names'
import { ADJECTIVES } from '../app/nameGeneration/adjectives'
import { useEffect } from 'react'

const GameStart = ({ socket, isGameActive }) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(true)
    const [playerOneName, setPlayerOneName] = useState('')
    const [playerTwoName, setPlayerTwoName] = useState('')
    const [connectionStatus, setConnectionStatus] = useState({})

    useEffect(() => {
        function onAttemptPlayResponse(response) {
            switch(response.msg){
                case 'waiting':
                    console.log("...Connected waiting for other player...")
                    setConnectionStatus({msg: "...Connected, waiting for other player...", bsColor: "warning"})
                    break;
                case 'starting':
                    setConnectionStatus({msg: "...Connected! Starting game...", bsColor: "success"})
                    dispatch(setIsGameActive({isGameActive: true}))
                    dispatch(setPlayers({playerNames: response.playerNames}))
                    setIsOpen(false)
                    break;
                case 'full':
                    console.log('Sorry, lobby is full! Try again later.')
                    setConnectionStatus({msg: 'Sorry, lobby is full! Try again later.', bsColor: "danger"})
                    break;
                default:
                    break;
            }
        }

        socket.on('attempt-play-response', onAttemptPlayResponse)

        return () => {
            socket.off('attempt-play-response', onAttemptPlayResponse)
        }
    })

    const handleGameStart = () => {
        if(!playerOneName){
            alert("Please make sure player name is filled in")
            return
        }
        socket.emit('attempt-play', playerOneName)
    }
    console.log("isGameActive ? " + isGameActive)

    const randomizeName = (playerNum) => {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)]
        let randomAdjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]

        randomAdjective = randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1)

        switch(playerNum){
            case 1: setPlayerOneName(`${randomAdjective} ${randomName}`); break;
            case 2: setPlayerTwoName(`${randomAdjective} ${randomName}`); break;
        }
    }

    const createConnectionStatusRow = (connStatus) => {

        const connStatusIsEmpty = Object.keys(connStatus).length === 0

        const connStatusMsg = connStatusIsEmpty ? "" : connStatus.msg
        const connStatusColor = connStatusIsEmpty ? "" : connStatus.bsColor
        return connStatusIsEmpty ? (<></>) : (
            <Row className="mt-5">
                <Col className="text-center">
                    <span
                        id="conn-status-span"
                        className={`text-${connStatusColor}`}>{connStatusMsg}</span>
                </Col>
            </Row>
        )
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Welcome to Pig! The dice game.</ModalHeader>
            <ModalBody>
                <p>
                Screw the directions for now, pick a name.
                </p>
                <label htmlFor='playerOne'>Player name</label><br/>
                <Row>
                    <Col xs='10'>
                        <input id='playerOne' value={playerOneName} className='form-control' type='text' onChange={e => setPlayerOneName(e.target.value)}/>
                    </Col>
                    <Col xs='2'>
                        <button className='btn' onClick={() => randomizeName(1)}><i className='fa fa-random'></i></button>
                    </Col>
                </Row>
                {/* <label className='mt-3' htmlFor='playerTwo'>Player 2</label><br/>
                <Row>
                    <Col xs='10'>
                        <input id='playerTwo' value={playerTwoName} className='form-control' type='text' onChange={e => setPlayerTwoName(e.target.value)}/>
                    </Col>
                    <Col xs='2'>
                        <button className='btn' onClick={() => randomizeName(2)}><i className='fa fa-random'></i></button>
                    </Col>
                </Row> */}
                <Row className="mt-5">
                    <Col className="text-center">
                        <button onClick={() => handleGameStart()}>Start Game</button>
                    </Col>
                </Row>
                {createConnectionStatusRow(connectionStatus)}
            </ModalBody>
        </Modal>
    )
}

export default GameStart