import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col
} from 'reactstrap'
import { setPlayers, setClientPlayer } from '../features/players/playersSlice'
import { setIsGameActive } from '../features/game/gameSlice'
import { NAMES } from '../app/nameGeneration/names'
import { ADJECTIVES } from '../app/nameGeneration/adjectives'
import { useEffect } from 'react'

const GameStart = ({ socket, isGameActive }) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(true)
    const [playerName, setPlayerName] = useState('')
    const [connStatus, setConnStatus] = useState({})

    useEffect(() => {
        function onAttemptPlayResponse(response) {
            switch(response.msg){
                case 'waiting':
                    console.log("...Connected waiting for other player...")
                    setConnStatus({msg: "...Connected, waiting for other player...", bsColor: "warning"})
                    dispatch(setClientPlayer(playerName))
                    break;
                case 'starting':
                    setConnStatus({msg: "...Connected! Starting game...", bsColor: "success"})
                    dispatch(setClientPlayer(playerName))
                    dispatch(setIsGameActive({isGameActive: true}))
                    dispatch(setPlayers({playerNames: response.playerNames}))
                    setIsOpen(false)
                    break;
                case 'full':
                    console.log('Sorry, lobby is full! Try again later.')
                    setConnStatus({msg: 'Sorry, lobby is full! Try again later.', bsColor: "danger"})
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
        if(!playerName){
            alert("Please make sure player name is filled in")
            return
        }
        socket.emit('attempt-play', playerName)
    }
    console.log("isGameActive ? " + isGameActive)

    const randomizeName = () => {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)]
        let randomAdjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]

        randomAdjective = randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1)

        setPlayerName(`${randomAdjective} ${randomName}`)
    }

    const createConnStatusRow = (connStatus) => {

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
            <ModalHeader className='bg-success-light'>Welcome to Pig! The dice game.</ModalHeader>
            <ModalBody>
                <p>
                Screw the directions for now, pick a name.
                </p>
                <label htmlFor='playerName'>Player name</label><br/>
                <Row>
                    <Col xs='10'>
                        <input id='playerName' value={playerName} className='form-control' type='text' onChange={e => setPlayerName(e.target.value)}/>
                    </Col>
                    <Col xs='2'>
                        <button className='btn' onClick={() => randomizeName()}><i className='fa fa-random'></i></button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="text-center">
                        <button onClick={() => handleGameStart()}>Start Game</button>
                    </Col>
                </Row>
                {createConnStatusRow(connStatus)}
            </ModalBody>
        </Modal>
    )
}

export default GameStart