import s from './ProfileInfo.module.css';
import common from '../../common/Common.module.css';
import Preloader from "../../common/Preloader";
import React, {useState} from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataReduxForm from "./ProfileDataForm";


const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)


    if (!props.main) {
        return <Preloader/>
    }


    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {

            props.savePhotoThunkCreator(e.target.files[0])
        }
    }

    let onSubmit = (formData) => {
        props.profileDataSaveThunkCreator(formData).then(() => {
            setEditMode(false)
        })

    }
    return (
        <div>
            <img className={s.img_top}
                 src="https://s3.ap-south-1.amazonaws.com/clecotech/static_images/react-one.jpg"
                 alt=""/>
            <div className={s.profile}>
                <img className={s.profile__img}
                     src={props.main.photos.large || "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"}
                     alt=""/>
                <div className={s.info}>
                    <h4 className={s.name}>{editMode || props.main.fullName}</h4>
                    {editMode || <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status}/>}
                    {editMode ?
                        <ProfileDataReduxForm main={props.main} initialValues={props.main} onSubmit={onSubmit}/> :
                        <ProfileData goToEditMode={() => {
                            setEditMode(true)
                        }} isOwner={props.isOwner} main={props.main}/>}
                </div>
            </div>
            {props.isOwner ? <div className={common.file_input}>
                <div><input onChange={onMainPhotoSelected} type="file" id="file" className={common.file}></input>
                </div>
                <label className={common.label} htmlFor="file">Select file</label>
                </div> : null }

        </div>
    );
}

const ProfileData = (props) => {
    return (
        <div>
            <ul className={s.list}>
                <li className={s.list_item}>Looking for a job: {props.main.lookingForAJob ? "yes" : "no"}</li>
                {props.main.lookingForAJob ? <li className={s.list_item}>Looking for a job
                    description: {props.main.lookingForAJobDescription}</li> : null}
                <li className={s.list_item}>About me : {props.main.aboutMe}</li>
            </ul>
            <div> {Object.keys(props.main.contacts).map(key => {
                return <Contacts key={key} contactTitle={key} contactValue={props.main.contacts[key]}/>
            })}</div>
            {props.isOwner && <button className={common.button} onClick={props.goToEditMode}>Edit</button>}

        </div>
    )
}


export const Contacts = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <div className={s.contact_row}>
                {contactValue ? <div className={s.contact_title}>{contactTitle} : </div> : null}
                <a href={contactValue} className={s.contact_value}>{contactValue}</a>
            </div>

        </div>
    )


}

export default ProfileInfo;