import common from '../../common/Common.module.css';
import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validator";
import {Textarea} from "../../common/FormControl";

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"newPostBody"}  component={Textarea} validate={[required,maxLength10]}/>
            <button className={common.button}>Send</button>
        </form>
    );
}

export default  reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm)


