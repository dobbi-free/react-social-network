import React, { useReducer } from "react";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";
const LOADING_ACTION = 'auth/LOADING_ACTION';

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
    loading: false
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
          LOADING_ACTION
        },
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};