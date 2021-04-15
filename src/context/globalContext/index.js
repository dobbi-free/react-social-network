import React, { useReducer } from "react";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";
const LOADING_ACTION = 'auth/LOADING_ACTION';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USER_MAIN = 'SET_USER_MAIN';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';
const ADD_POST = 'ADD-POST';
const SAVE_MAIN_INFO = 'SAVE_MAIN_INFO';


const GlobalContext = React.createContext([{}, () => {}]);

const GlobalProvider = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_USER_DATA:
        return {
          ...state,
          ...action.data,
        };
      case SET_CAPTCHA:
        return {
          ...state,
          captchaUrl: action.captchaUrl,
        };
      case LOADING_ACTION :
        return {
          ...state,
          loading: action.loading,
        }
      case TOGGLE_IS_FETCHING :
        return {
          ...state,
          isFetching: action.isFetching,

        }
      case SET_CURRENT_PAGE :
        return {
          ...state,
          currentPage: action.currentPage,

        }
      case SET_USERS :
        return {
          ...state,
          users: action.users

        }
      case SET_TOTAL_USER_COUNT :
        return {
          ...state,
          totalUserCount: action.totalUserCount,

        }
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
      case TOGGLE_IS_FOLLOWING :
        return {
          ...state,
          isFollowing: action.isFollowing,

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
        return {
          ...state,
          main: {...state.main, photos: action.photos}

        }
      case ADD_POST :
        return {
          ...state,
          posts: [...state.posts, {
            id: 5,
            message: action.newPostBody,
            likeCount: 0,
          }],

        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    loading: false,
    isFetching: true,
    currentPage: 1,
    users: [],
    totalUserCount: 0,
    pageSize: 5,
    isFollowing: false,
    main: null,
    status: "",
    posts: [
      {
        id: 1,
        message: "Wish we could turn back time To the good old days When our momma sang us to sleepBut now we're stressed out",
        likeCount: 12
      },
      {id: 2, message: "Hello there", likeCount: 14}
    ],
  });

  return (
    <GlobalContext.Provider
      value={{
        store: {
          state,
          dispatch,
        },
        constants: {
          SET_USER_DATA,
          SET_CAPTCHA,
          LOADING_ACTION,
          TOGGLE_IS_FETCHING,
          SET_CURRENT_PAGE,
          SET_USERS,
          SET_TOTAL_USER_COUNT,
          TOGGLE_IS_FOLLOWING,
          FOLLOW,
          UNFOLLOW,
          SET_USER_MAIN,
          SET_STATUS,
          SET_PHOTO,
          ADD_POST,
          SAVE_MAIN_INFO
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};