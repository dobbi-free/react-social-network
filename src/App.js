import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import FindUsersContainer from "./components/FindUsers/FindUsersContainer";
import MainContainer from "./components/Main/MainContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import Preloader from "./components/common/Preloader";
import Nav from "./components/Nav/Nav";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalProvider } from "./context/globalContext";
import { headerAuthAPI } from "./api/api";

const App = () => {
  const { store, constants } = useContext(GlobalContext);

  const getAuthUserDataThunkCreator = async () => {
    store.dispatch({ type: constants.LOADING_ACTION, loading: true });
    let response = await headerAuthAPI.getAuthUserData();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      localStorage.setItem("userId", id);
      //  dispatch(setAuthUserData(id, email, login, true));
      store.dispatch({
        type: constants.SET_USER_DATA,
        data: { userId: id, email, login, isAuth: true },
      });
    }
    store.dispatch({ type: constants.LOADING_ACTION, loading: false });
  };

  useEffect(() => {
    //initializeApp();
    getAuthUserDataThunkCreator();
  }, []);

  if (store.state.loading) {
    return <Preloader />;
  }
  return (
    <div>
      <HeaderContainer />
      <div className="container">
        <div className="wrapp">
          <div className="sidebar">
            <Nav />
          </div>
          <div className="wrapp-content">
            <Switch>
              <Route path="/main/:userId?" render={() => <MainContainer />} />
              {/*<Route path="/dialogs" render={() => <DialogsContainer />} />*/}
              <Route path="/news" render={() => <News />} />
              <Route path="/music" render={() => <Music />} />
              <Route path="/findUsers" render={() => <FindUsersContainer />} />
              <Route path="/settings" render={() => <Settings />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="*" render={() => <div>404 not found</div>} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppMain = () => {
  return (
    <BrowserRouter>
        <GlobalProvider>
          <App />
        </GlobalProvider>
    </BrowserRouter>
  );
};

export default AppMain;
