import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateForRedirectToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}
export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        const isAuthLocalStorage = localStorage.getItem('userId');
        if (!props.isAuth && !isAuthLocalStorage) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    return connect(mapStateForRedirectToProps)(RedirectComponent);
}