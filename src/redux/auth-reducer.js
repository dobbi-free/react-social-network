import {headerAuthAPI, securityAPI, usersAPI} from "../api/api";
import {setIsFetching, setTotalUserCount, setUsers} from "./users-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA :
            return {
                ...state,
                ...action.data,
            }
        case SET_CAPTCHA :
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default:
            return state;


    }
}


export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login, isAuth}

    }
}

export const setCaptcha = (captchaUrl) => {

    return {
        type: SET_CAPTCHA,
        captchaUrl

    }
}

export const getAuthUserDataThunkCreator = () => async (dispatch) => {

    let response = await headerAuthAPI.getAuthUserData()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const LoginUserThunkCreator = (email, password, rememberMe,captcha) => async (dispatch) => {

    let response = await headerAuthAPI.loginUser(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
    } else {
        if(response.data.resultCode === 1){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "E-mail or password is wrong"
        dispatch(stopSubmit("login", {_error: message}));
    }

}

export const LogoutUserThunkCreator = () => async (dispatch) => {

    let response = await headerAuthAPI.logoutUser()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}



export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUserCount(data.totalCount));

        })
    }
}

export const getCaptchaUrl = () => async (dispatch) => {

    const response = await securityAPI.getCaptchaUrl()
    dispatch(setCaptcha(response.data.url))
}

export default authReducer;