import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

export const store = configureStore({
    reducer: { 
        rootReducer,
     },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)