import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { playersReducer } from '../features/players/playersSlice';

export const store = configureStore({
    reducer: {
        players: playersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});
