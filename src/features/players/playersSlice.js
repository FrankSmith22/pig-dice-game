import { createSlice } from "@reduxjs/toolkit";

const initialPlayer = {
    name: "Elegos",
    score: 5,
    totalScore: 24,
}

const initialState = {
    players: [
        initialPlayer,
        {
            name: "Mononoke",
            score: 10,
            totalScore: 15
        }
    ],
    activePlayer: initialPlayer
}

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setActivePlayer: (state, action) => {
            return {
                ...state,
                activePlayer: state.players.players.find(player => player.name === action.payload)
            }
        }
    }
})

export const getActivePlayer = (state) => state.players.activePlayer

export const getAllPlayers = (state) => state.players.players

export const { setActivePlayer } = playersSlice.actions

export const playersReducer = playersSlice.reducer