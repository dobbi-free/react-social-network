import s from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validator";
import {InputLogin} from "../common/FormControl";

const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit} className={s.form}>
                <Field validate={[required]}  name="email" component={InputLogin} type="text" placeholder={"E-mail"}/>
                <Field validate={[required]}  name="password" component={InputLogin} type="password" placeholder={"Password"}/>
                {props.captchaUrl && <img src={props.captchaUrl} alt=""/>}
                {props.captchaUrl && <Field validate={[required]}  name="captcha" component={InputLogin} type="text" placeholder={"Symbols"}/>}
                <div className={s.summory_error}>
                    {props.error}
                </div>
                <label  className={s.label}>
                    Remember me
                    <Field type="checkbox" name="rememberMe" component={"input"}/>
                </label>
                <button type="submit" className={s.button}>Login</button>
            </form>
    );
}

const LoginReduxForm = reduxForm({

    form: 'login'
})(LoginForm)

export default LoginReduxForm;