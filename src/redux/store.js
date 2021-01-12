import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import creatSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleWare = creatSagaMiddleware();

const middleWares = [sagaMiddleWare];

middleWares.push(logger);

// if(process.env.NODE_ENV ==='development'){
//     middleWares.push(logger);
// }

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleWare.run(rootSaga)

export const persistor = persistStore(store);

export default { store, persistor };