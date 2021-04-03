import s from './Main.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import {updateStatusMainThunkCreator} from "../../redux/main-reducer";


function Main(props) {
    return (
        <main className={s.main}>
            <ProfileInfo profileDataSaveThunkCreator={props.profileDataSaveThunkCreator}
                         savePhotoThunkCreator={props.savePhotoThunkCreator} isOwner={props.isOwner} main={props.main}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </main>
    );
}

export default Main;