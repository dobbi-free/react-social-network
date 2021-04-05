import React, {useContext, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {GlobalContext} from "../context/globalContext";

export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        const { store } = useContext(GlobalContext);
        const isAuthLocalStorage = localStorage.getItem('userId');
        if (!store.state.isAuth && !isAuthLocalStorage) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    return RedirectComponent;
}