import { createSlice } from "@reduxjs/toolkit";
import { POINT_GOAL } from "../../app/gameConstants";

const initialState = {
    players: [
        {
            name: "Elegos",
            score: 0,
            totalScore: 0,
        },
        {
            name: "Mononoke",
            score: 0,
            totalScore: 0
        }
    ],
    activePlayer: "Elegos",
    clientPlayer: "",
    winner: ""
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setActivePlayer: (state, action) => {
            return {
                ...state,
                activePlayer: action.payload.newActivePlayer
            }
        },
        setClientPlayer: (state, action) => {
            return {
                ...state,
                clientPlayer: action.payload
            }
        },
        increaseScore: (state, action) => { // TODO should rename this to adjustScore or something, and combined functionality with resetScore
            const newState = {...state}
            const newPlayers = []
            for(const player of newState.players) {
                if (player.name === action.payload.activePlayer) {
                    let newPlayer = {...player}
                    newPlayer.score += action.payload.increase
                    if (newPlayer.score + newPlayer.totalScore >= POINT_GOAL) {
                        newState.winner = newPlayer.name
                    }
                    newPlayers.push(newPlayer)
                }
                else{
                    newPlayers.push(player)
                }
            }
            newState.players = newPlayers
            return newState
        },
        increaseTotalScore: (state, action) => {
            const newState = {...state}
            const newPlayers = []
            console.log(`From playersslice, action.payload.points: ${action.payload.points}`)
            console.log(`From playersslice, action.payload.activePlayer: ${action.payload.activePlayer}`)
            for(const player of newState.players) {
                if (player.name === action.payload.activePlayer) {
                    let newPlayer = {...player}
                    newPlayer.totalScore += action.payload.points
                    newPlayers.push(newPlayer)
                }
                else {
                    newPlayers.push(player)
                }
            }
            newState.players = newPlayers
            return newState
        },
        resetScore: (state, action) => {
            const newState = {...state}
            const newPlayers = []
            for(const player of newState.players) {
                if (player.name === action.payload.activePlayer) {
                    let newPlayer = {...player}
                    newPlayer.score = 0
                    newPlayers.push(newPlayer)
                }
                else {
                    newPlayers.push(player)
                }
            }
            newState.players = newPlayers
            return newState    
        },
        setPlayers: (state, action) => {
            const newState = {...state}
            const playerNames = action.payload.playerNames
            let newPlayers = []
            for (const playerName of playerNames) {
                newPlayers.push({
                    name: playerName,
                    score: 0,
                    totalScore: 0
                })
            }
            newState.players = newPlayers
            newState.activePlayer = newState.players[0].name
            return newState
        }
    }
})

export const getActivePlayer = (state) => state.players.activePlayer

export const getClientPlayer = (state) => state.players.clientPlayer

export const getAllPlayers = (state) => state.players.players

export const getWinner = (state) => state.players.winner

export const { setActivePlayer, setClientPlayer, increaseScore, increaseTotalScore, resetScore, setPlayers } = playersSlice.actions

export const playersReducer = playersSlice.reducer