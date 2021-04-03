import s from "./Login.module.css";
import LoginForm from "./LoginForm";
import LoginReduxForm from "./LoginForm";
import {connect} from "react-redux";
import {LoginUserThunkCreator} from "../../redux/auth-reducer";
import React from 'react';
import {Redirect} from "react-router-dom";

const Login = (props) => {
    let onSubmit = (formData) => {
        props.LoginUserThunkCreator(formData.email,formData.password,formData.rememberMe,formData.captcha)
    }

    if(props.isAuth){
      return  <Redirect to={'/main'}/>
    }
    return (
        <div>
            <h1 className={s.title}>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    );

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {LoginUserThunkCreator,})(Login);