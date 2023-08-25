import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
	reducer: {
		items: itemsReducer,
		cart: persistedReducer,
		modal: modalReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export let persistor = persistStore(store)

// Code if redux-persist is not needed.
// export default configureStore({
// 	reducer: {
// 		items: itemsReducer,
// 		cart: cartReducer
// 	}
// });