import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import Friends from "./components/Friends/Friends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FindUsersContainer from "./components/FindUsers/FindUsersContainer";
import MainContainer from "./components/Main/MainContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";
import store from "./redux/redux-store";
import Nav from "./components/Nav/Nav";
import {useEffect} from "react";
import {getAuthUserDataThunkCreator} from "./redux/auth-reducer";

const App = (props) => {

    const {initialized, initializeApp, } = props;

    useEffect(() => {
        initializeApp();
            }, []);

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div>
            <HeaderContainer/>
            <div className="container">
                <div className="wrapp">
                    <div className="sidebar">
                        <Nav/>
                        <Friends state={props.state.friendBar}/>
                    </div>
                    <div className="wrapp-content">
                        <Switch>
                            <Route path='/main/:userId?' render={() => <MainContainer/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/findUsers' render={() => <FindUsersContainer/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='*' render={() => <div>404 not found</div>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, {initializeApp,getAuthUserDataThunkCreator})(App);

const AppMain = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer state={store.getState()}/>
        </Provider>
    </BrowserRouter>
}

export default AppMain;