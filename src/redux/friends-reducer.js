let initialState = {
    friend: [
        {id: 1, name: 'Sasha', src: 'https://dota-blog.ru/wp-content/uploads/2020/01/unnamed-14.jpg'},
        {
            id: 2,
            name: 'Max',
            src: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg'
        },
        {id: 3, name: 'Vlad', src: 'https://i.imgur.com/9NAj0jq.jpg'},
    ],
}
const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        default :
            return state;
    }


}

export default friendsReducer;