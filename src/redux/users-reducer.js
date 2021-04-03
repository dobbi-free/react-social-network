import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';
let initialState = {
    users: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowing: false,
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;

                })

            }
        case UNFOLLOW :
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;

                })

            }
        case SET_USERS :
            return {
                ...state,
                users: action.users

            }
        case SET_CURRENT_PAGE :
            return {
                ...state,
                currentPage: action.currentPage,

            }
        case SET_TOTAL_USER_COUNT :
            return {
                ...state,
                totalUserCount: action.totalCount,

            }
        case TOGGLE_IS_FETCHING :
            return {
                ...state,
                isFetching: action.isFetching,

            }
        case TOGGLE_IS_FOLLOWING :
            return {
                ...state,
                isFollowing: action.isFollowing,

            }


        default:
            return state;
    }
}


export const followSucces = (userId) => {
    return {
        type: FOLLOW,
        userId,
    }
}

export const unfollowSucces = (userId) => {
    return {
        type: UNFOLLOW,
        userId,
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    }
}
export const setTotalUserCount = (totalCount) => {
    return {
        type: SET_TOTAL_USER_COUNT,
        totalCount,
    }
}

export const setIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    }
}

export const setIsFollowing = (isFollowing) => {
    return {
        type: TOGGLE_IS_FOLLOWING,
        isFollowing,
    }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));


    }
}
export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        let response = await usersAPI.follow(userId)

        if (response.data.resultCode === 0) {
            dispatch(followSucces(userId))
        }
        dispatch(setIsFollowing(false, userId));
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        dispatch(setIsFollowing(true, userId));
        let response = await usersAPI.unfollow(userId)

        if (response.data.resultCode === 0) {
            dispatch(unfollowSucces(userId))
        }
        dispatch(setIsFollowing(false, userId));

    }
}


export default usersReducer;