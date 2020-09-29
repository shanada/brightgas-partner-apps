
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const middlewares = [];

if (__DEV__) {
    middlewares.push(createLogger());
}

const persistReducers = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistReducers,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store)