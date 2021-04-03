import {mainUserAPI, usersAPI} from "../api/api";
import {setIsFetching, setTotalUserCount, setUsers} from "./users-reducer";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const UPDATE_INPUT = 'UPDATE-INPUT';
const SET_USER_MAIN = 'SET_USER_MAIN';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO = 'SET_PHOTO';
let initialState = {
    posts: [
        {
            id: 1,
            message: "Wish we could turn back time To the good old days When our momma sang us to sleepBut now we're stressed out",
            likeCount: 12
        },
        {id: 2, message: "Hello there", likeCount: 14}
    ],

    main: null,
    status: "",
}
const mainReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST :
            return {
                ...state,
                posts: [...state.posts, {
                    id: 5,
                    message: action.newPostBody,
                    likeCount: 0,
                }],

            }
        case DELETE_POST :
            return {
                ...state,
                posts: state.posts.filter(post => post.id != action.postId)

            }
        case SET_USER_MAIN :
            return {
                ...state,
                main: action.main

            }
        case SET_STATUS :
            return {
                ...state,
                status: action.status

            }

        case SET_PHOTO :
            debugger;
            return {
                ...state,
                main: {...state.main, photos: action.photos}

            }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostBody) => {
    return {
        type: ADD_POST,
        newPostBody
    }
}

export const deletePostActionCreator = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const updateInputActionCreator = (text) => {
    return {
        type: UPDATE_INPUT,
        postMessage: text,
    }
}

export const setUserMain = (main) => {
    return {
        type: SET_USER_MAIN,
        main
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}


export const setPhoto = (photos) => {
    return {
        type: SET_PHOTO,
        photos
    }
}

export const setProfileData = (photos) => {
    return {
        type: SET_PHOTO,
        photos
    }
}

export const getUsersMainThunkCreator = (userId) => async (dispatch) => {
    let data = await mainUserAPI.getUserMain(userId)
    dispatch(setUserMain(data));

}

export const getStatusMainThunkCreator = (userId) => async (dispatch) => {
    let response = await mainUserAPI.getStatusUserMain(userId)
    dispatch(setStatus(response.data));
}

export const updateStatusMainThunkCreator = (status) => async (dispatch) => {

    let response = await mainUserAPI.updateStatusUserMain(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }

}

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await mainUserAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }

}
export const profileDataSaveThunkCreator = (data) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await mainUserAPI.profileDataSave(data)
    if (response.data.resultCode === 0) {
        dispatch(getUsersMainThunkCreator(userId));
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject({_error: response.data.messages[0]})
    }

}


export default mainReducer;