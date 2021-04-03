import s from "./Main.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from 'react';

class MainContainer extends React.Component {
    render() {
        return (
        <main className={s.main}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </main>
        )
    }
}

export default MainContainer;