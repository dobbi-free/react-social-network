import React from "react"
import s from './FormControl.module.css';

export const Textarea = ({input,meta,...props}) =>{
    const hasError = meta.error && meta.touched
    return(
        <div>
            <textarea className={s.message + " " + (hasError ? s.error_textarea : "") } {...input} {...props} ></textarea>
            {hasError && <p className={s.message_error}>{meta.error}</p>}
        </div>
    )
}

export const InputLogin = ({input,meta,...props}) =>{
    const hasError = meta.error && meta.touched
    return(
        <div>
            {hasError ? <p className={s.message_error}>{meta.error}</p> : <p className={s.messaege_null}>Error message</p>}
            <input className={s.input + " " + (hasError ? s.error_textarea : "") } {...input} {...props} ></input>

        </div>
    )
}