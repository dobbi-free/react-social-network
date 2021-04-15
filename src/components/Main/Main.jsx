import s from "./Main.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";

function Main(props) {
  return (
    <main className={s.main}>
      <ProfileInfo
        profileDataSaveThunkCreator={props.profileDataSaveThunkCreator}
        savePhotoThunkCreator={props.savePhotoThunkCreator}
        updateStatus={props.updateStatus}
      />
      <MyPosts />
    </main>
  );
}

export default Main;