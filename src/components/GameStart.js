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

const GameStart = () => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(true)
    const [playerOneName, setPlayerOneName] = useState('')
    const [playerTwoName, setPlayerTwoName] = useState('')

    const handleGameStart = () => {
        dispatch(setPlayers({playerNames: [playerOneName, playerTwoName]}))
        setIsOpen(false)
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Welcome to Pig! The dice game.</ModalHeader>
            <ModalBody>
                <p>
                Screw the directions for now, pick a name.
                </p>
                <label htmlFor='playerOne'>Player 1</label><br/>
                <Row>
                    <Col xs='10'>
                        <input id='playerOne' value={playerOneName} className='form-control' type='text' onChange={e => setPlayerOneName(e.target.value)}/>
                    </Col>
                    <Col xs='2'>
                        <button className='btn'><i className='fa fa-random'></i></button>
                    </Col>
                </Row>
                <label className='mt-3' htmlFor='playerTwo'>Player 2</label><br/>
                <Row>
                    <Col xs='10'>
                        <input id='playerTwo' value={playerTwoName} className='form-control' type='text' onChange={e => setPlayerTwoName(e.target.value)}/>
                    </Col>
                    <Col xs='2'>
                        <button className='btn'><i className='fa fa-random'></i></button>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="text-center">
                        <button onClick={() => handleGameStart()}>Start Game</button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default GameStart