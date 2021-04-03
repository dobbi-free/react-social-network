import s from './MyPosts.module.css';
import Posts from "./Posts/Posts";
import React from 'react';
import {addPostActionCreator, updateInputActionCreator} from "../../../redux/main-reducer";
import AddPostFormRedux from "./AddPostForm.jsx";


const MyPosts = React.memo(props => {

    let postsElements = props.posts.map(posts => <Posts key={posts.id} message={posts.message} likeCount={posts.likeCount}/>)

    let addNewPost = (formData) => {
        props.addPost(formData.newPostBody);
    }

    return (
        <div className={s.posts}>
            <h3 className={s.title}>My Posts</h3>
            <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts_list}>
                {postsElements}
            </div>
        </div>
    );
});

export default MyPosts;