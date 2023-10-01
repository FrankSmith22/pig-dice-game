import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGameActive: false
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
        }
    }
})

export const getIsGameActive = (state) => state.game.isGameActive

export const { setIsGameActive } = gameSlice.actions

export const gameReducer = gameSlice.reducer