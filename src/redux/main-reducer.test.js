import mainReducer, {addPostActionCreator, deletePostActionCreator} from "./main-reducer";
let state = {
    posts: [
        {
            id: 1,
            message: "Wish we could turn back time To the good old days When our momma sang us to sleepBut now we're stressed out",
            likeCount: 12
        },
        {id: 2, message: "Hello there", likeCount: 14}
    ],
}
test('length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator('Hey hoy')

    //2. action
    let newState = mainReducer(state, action)

    //3. expectaion
    expect (newState.posts.length).toBe(3)
});

test('message of post should be correct', () => {
    //1. test data
    let action = addPostActionCreator('Hey hoy')

    //2. action
    let newState = mainReducer(state, action)

    //3. expectaion
    expect (newState.posts[2].message).toBe('Hey hoy')
});

test('length of posts should be decrement after deleting', () => {
    //1. test data
    let action = deletePostActionCreator(1)

    //2. action
    let newState = mainReducer(state, action)

    //3. expectaion
    expect (newState.posts.length).toBe(1)
});


