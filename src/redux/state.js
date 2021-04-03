import mainReducer from "./main-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";

let store = {
    _state: {
        friendBar: {
            friend: [
                {id: 1, name: 'Sasha', src: 'https://dota-blog.ru/wp-content/uploads/2020/01/unnamed-14.jpg'},
                {
                    id: 2,
                    name: 'Max',
                    src: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg'
                },
                {id: 3, name: 'Vlad', src: 'https://i.imgur.com/9NAj0jq.jpg'},
            ],
        },
        mainPage: {
            posts: [
                {
                    id: 1,
                    message: "Wish we could turn back time To the good old days When our momma sang us to sleepBut now we're stressed out",
                    likeCount: 12
                },
                {id: 2, message: "Hello there", likeCount: 14}
            ],

            inputPost: '',
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Sasha', src: 'https://dota-blog.ru/wp-content/uploads/2020/01/unnamed-14.jpg'},
                {
                    id: 2,
                    name: 'Max',
                    src: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg'
                },
                {id: 3, name: 'Vlad', src: 'https://i.imgur.com/9NAj0jq.jpg'},
            ],

            messages: [
                {id: 1, message: 'Hi hi Sasha', src: 'https://dota-blog.ru/wp-content/uploads/2020/01/unnamed-14.jpg'},
                {
                    id: 2,
                    message: 'Hi hi Max',
                    src: 'https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg'
                },
                {id: 3, message: 'Hi hi Vlad', src: 'https://i.imgur.com/9NAj0jq.jpg'},
            ],

            inputMessage: '',
        }

    },
    getState() {
        return this._state;
    },
    _callSubscribe() {
    },
    subscribe(observer) {
        this._callSubscribe = observer;
    },
    dispatch(action) {

        this._state.mainPage = mainReducer(this._state.mainPage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.friendBar = friendsReducer(this._state.friendBar, action);


        this._callSubscribe(this._state);

    }
}

export default store;