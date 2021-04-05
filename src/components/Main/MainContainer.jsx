import React, {useContext, useEffect} from "react";
import {
  getStatusMainThunkCreator,
  getUsersMainThunkCreator,
  profileDataSaveThunkCreator,
  savePhotoThunkCreator,
  setUserMain,
  updateStatusMainThunkCreator,
} from "../../redux/main-reducer";
import { connect } from "react-redux";
import Main from "./Main";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";
import {GlobalContext} from "../../context/globalContext";

const MainContainer = (props) => {
  const {
    main,
    status,
    updateStatusMainThunkCreator,
    getUsersMainThunkCreator,
    getStatusMainThunkCreator,
    profileDataSaveThunkCreator,
    savePhotoThunkCreator,
  } = props;
  let userId = props.match.params.userId;
  const { store } = useContext(GlobalContext);
  const refreshMain = () => {
    if (!userId) {
      userId = store.state.userId;
    }
    getUsersMainThunkCreator(userId);
    getStatusMainThunkCreator(userId);
  };

  useEffect(() => refreshMain(), [userId]);

  return (
    <Main
      {...props}
      profileDataSaveThunkCreator={profileDataSaveThunkCreator}
      savePhotoThunkCreator={savePhotoThunkCreator}
      main={main}
      status={status}
      updateStatus={updateStatusMainThunkCreator}
      isOwner={!userId}
    />
  );
};

let mapStateToProps = (state) => ({
  main: state.mainPage.main,
  status: state.mainPage.status,
});

export default compose(
  connect(mapStateToProps, {
    setUserMain,
    getUsersMainThunkCreator,
    getStatusMainThunkCreator,
    updateStatusMainThunkCreator,
    savePhotoThunkCreator,
    profileDataSaveThunkCreator,
  }),
  withRouter,
  withAuthRedirect
)(MainContainer);
