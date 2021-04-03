import React from "react";
import s from "./ProfileInfo.module.css";
import common from '../../common/Common.module.css';
import {Field, reduxForm} from "redux-form";
import {Contacts} from "./ProfileInfo";

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <ul className={s.list}>
                <li className={s.list_item}>Full name : <Field className={s.input_form} validate={[]} name="fullName" component={"input"}
                                       type="text" placeholder={"Full Name"}/></li>
                <li className={s.list_item}>Looking for a job: <Field className={s.input_form} validate={[]} name="lookingForAJob"
                                              component={"input"} type="checkbox"/></li>
                <li className={s.list_item}>Description: <Field className={s.input_form} validate={[]} name="lookingForAJobDescription"
                                        component={"input"} type="text" placeholder={"My professional skills"}/></li>
                <li className={s.list_item}>About me : <Field className={s.input_form} validate={[]} name="aboutMe" component={"input"}
                                      type="text" placeholder={"About me"}/></li>
            </ul>
            <div className={s.summory_error}>
                {props.error}
            </div>
            <div className={s.wrap_contact}>
                <div> {Object.keys(props.main.contacts).map(key => {
                    return <div key={key}>
                        <div className={s.wrap_input}>
                            <div className={s.contact_title}>{key}:
                            </div>
                        </div>
                    </div>
                })}</div>
                <div> {Object.keys(props.main.contacts).map(key => {
                    return <div key={key}>
                        <div className={s.wrap_input}>
                            <Field className={s.input_form} validate={[]} name={"contacts." + key} component={"input"}
                                   type="text" placeholder={key}/>
                        </div>
                    </div>
                })}</div>
            </div>
            <button className={common.button} type="submit">Save</button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({

    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataReduxForm;

