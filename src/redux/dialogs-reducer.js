const ADD_MESSAGE = 'ADD-MESSAGE';
let initialState = {
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


}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: 5,
                    message: action.newMessageBody,
                    src: 'https://dota-blog.ru/wp-content/uploads/2020/01/unnamed-14.jpg',
                }],
                inputMessage: '',
            }
        default:
            return state;
    }

}


export const addMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }
}


export default dialogsReducer;