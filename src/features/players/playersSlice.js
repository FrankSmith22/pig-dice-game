import { createSlice } from "@reduxjs/toolkit";

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
    activePlayer: "Elegos"
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setActivePlayer: (state, action) => {
            return {
                ...state,
                activePlayer: action.payload
            }
        },
        increaseScore: (state, action) => {
            const newState = {...state}
            const newPlayers = []
            for(const player of newState.players) {
                if (player.name === action.payload.activePlayer) {
                    let newPlayer = {...player}
                    newPlayer.score += action.payload.increase
                    newPlayers.push(newPlayer)
                }
                else{
                    newPlayers.push(player)
                }
            }
            newState.players = newPlayers
            return newState
        }
    }
})

export const getActivePlayer = (state) => state.players.activePlayer

export const getAllPlayers = (state) => state.players.players

export const { setActivePlayer, increaseScore } = playersSlice.actions

export const playersReducer = playersSlice.reducer