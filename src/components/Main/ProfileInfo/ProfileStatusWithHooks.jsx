import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    let activateEditMode = () => {
        setEditMode(true)
    }

    let disabledEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(props.status)
    },[props.status])
    return (
        <div>
            {!editMode &&
            <p className={s.status} onClick={activateEditMode}
            >Status : {props.status ? props.status : "Status:"}</p>
            }
            {editMode &&
            <input className={s.status_input} autoFocus={true} onBlur={disabledEditMode}
                   value={status} onChange={onStatusChange} type="textarea"/>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;