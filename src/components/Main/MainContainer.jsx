import React, { useContext, useEffect } from "react";
import Main from "./Main";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";
import { GlobalContext } from "../../context/globalContext";
import { mainUserAPI } from "../../api/api";

const MainContainer = (props) => {
  const {
    main,
    status,
    updateStatusMainThunkCreator,
    profileDataSaveThunkCreator,
    savePhotoThunkCreator,
  } = props;

  const { store, constants } = useContext(GlobalContext);

  const getUsersMainThunkCreator = async (userId) => {
    let data = await mainUserAPI.getUserMain(userId);

    store.dispatch({ type: constants.SET_USER_MAIN, main: data });
  };

  const getStatusMainThunkCreator = async (userId) => {
    let response = await mainUserAPI.getStatusUserMain(userId);
    store.dispatch({ type: constants.SET_STATUS, status: response.data });
  };

  const getMain = () => {
    let userId = props.match.params.userId;
    if (!userId) {
      userId = store.state.userId;
    }
    if (userId) {
      getUsersMainThunkCreator(userId);
      getStatusMainThunkCreator(userId);
    }
  };

  useEffect(() => getMain(), []);
  return (
    <Main
      profileDataSaveThunkCreator={profileDataSaveThunkCreator}
      savePhotoThunkCreator={savePhotoThunkCreator}
      updateStatus={updateStatusMainThunkCreator}
    />
  );
};

let mapStateToProps = (state) => ({
  // main: state.mainPage.main,
  // status: state.mainPage.status,
});

export default compose(
  withRouter,
  withAuthRedirect
)(MainContainer);
