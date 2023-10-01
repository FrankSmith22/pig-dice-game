import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { playersReducer } from '../features/players/playersSlice';
import { gameReducer } from '../features/game/gameSlice';

export const store = configureStore({
    reducer: {
        players: playersReducer,
        game: gameReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
