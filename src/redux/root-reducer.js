import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import facturaDraftReducer from './factura-draft/factura-draft.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'facturaDraft']
}

const rootReducer = combineReducers({
    user: userReducer,
    facturaDraft: facturaDraftReducer
})

export default persistReducer(persistConfig, rootReducer);