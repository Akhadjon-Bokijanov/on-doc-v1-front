import USER_ACTIONS from "./user.action-types";

const INITIAL_STATE = {
    currentUser: null,
    token: null,
    cabinetData: null,
    userCompanies: [],
    selectedEsign:null,
    loadedKeyId: null,
    keyUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_ACTIONS.SET_KEY_USER:
            return { ...state, keyUser: action.payload }

        case USER_ACTIONS.SET_LOADED_KEY_ID:
            return { ...state, loadedKeyId: action.payload }

        case USER_ACTIONS.SET_USER_COMPANIES:
            return { ...state, userCompanies: action.payload }

        case USER_ACTIONS.SET_CABINET_DATA:
            return { ...state,  cabinetData: action.payload}

        case USER_ACTIONS.SET_USER_ONLY:
            return {...state, 
                currentUser:  action.payload
            }

        case USER_ACTIONS.SUCCESS_LOGIN:
            return {...state,
                currentUser: action.payload.data,
                token: action.payload.token
            }

        case USER_ACTIONS.LOG_OUT:
            return {...state, 
                currentUser: null, 
                token: null, 
                loadedKeyId: null,
                keyUser: null,
                userCompanies: []
            }

        default:
            return state;
    }

}

export default userReducer;