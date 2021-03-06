import USER_ACTIONS from "./user.action-types";

export const setLoadedKeyId = id => ({
    type: USER_ACTIONS.SET_LOADED_KEY_ID,
    payload: id
})

export const succesLogIn = data => ({
    type: USER_ACTIONS.SUCCESS_LOGIN,
    payload: data,
})

export const setUserProducts = data=>({
    type: USER_ACTIONS.SET_USER_PRODUCTS,
    payload: data
})

export const logOut = () => ({
    type: USER_ACTIONS.LOG_OUT
})

export const setUser = user=>({
    type: USER_ACTIONS.SET_USER_ONLY,
    payload: user
})

export const setCabinetData = data=>({
    type: USER_ACTIONS.SET_CABINET_DATA,
    payload: data
})

export const setUserCompanies = data=>({
    type: USER_ACTIONS.SET_USER_COMPANIES,
    payload: data
})

export const setKeyUser = data =>({
    type: USER_ACTIONS.SET_KEY_USER,
    payload: data
})

export const setIsAferta = bool =>({
    type: USER_ACTIONS.SET_IS_AFERTA,
    payload: bool
})
export const setIsRouming = bool => ({
    type: USER_ACTIONS.SET_IS_ROUMING,
    payload: bool
})