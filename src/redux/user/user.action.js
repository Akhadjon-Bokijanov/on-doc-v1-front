import USER_ACTIONS from "./user.action-types";


export const succesLogIn = data => ({
    type: USER_ACTIONS.SUCCESS_LOGIN,
    payload: data,
})

export const logOut = () => ({
    type: USER_ACTIONS.LOG_OUT
})

export const setUser = user=>({
    type: USER_ACTIONS.SET_USER_ONLY,
    payload: user
})