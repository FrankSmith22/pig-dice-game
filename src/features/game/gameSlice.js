import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGameActive: false,
    prevRoll: null,
    latestRoll: null,
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setIsGameActive: (state, action) => {
            return {
                ...state,
                isGameActive: action.payload.isGameActive
            }
        },
        setPrevRoll: (state, action) => {
            return {
                ...state,
                prevRoll: action.payload
            }
        },
        setLatestRoll: (state, action) => {
            return {
                ...state,
                latestRoll: action.payload
            }
        },
    }
})

export const getIsGameActive = (state) => state.game.isGameActive

export const getPrevRoll = (state) => state.game.prevRoll

export const getLatestRoll = (state) => state.game.latestRoll

export const { setIsGameActive, setPrevRoll, setLatestRoll } = gameSlice.actions

export const gameReducer = gameSlice.reducer