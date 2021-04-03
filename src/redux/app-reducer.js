import {headerAuthAPI, usersAPI} from "../api/api";
import {setIsFetching, setTotalUserCount, setUsers} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {setAuthUserData} from "./auth-reducer";

const INITALIZED_SUCCESS = 'INITALIZED_SUCCESS';

let initialState = {
    initialized: false,

}
const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case INITALIZED_SUCCESS :
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => {
    return {
        type: INITALIZED_SUCCESS,

    }
}

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(setAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        })

}


export default appReducer;