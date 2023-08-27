import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players: [
        {
            name: "Elegos",
            score: 5,
            totalScore: 24,
        }
    ],
    activePlayer: {
        name: "Elegos",
        score: 5,
        totalScore: 24,
    }
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

export const { setActivePlayer } = playersSlice.actions

export const playersReducer = playersSlice.reducer