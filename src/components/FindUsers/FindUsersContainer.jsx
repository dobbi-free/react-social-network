import React, { useContext, useEffect } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";
import { GlobalContext } from "../../context/globalContext";
import { usersAPI } from "../../api/api";

const UsersContainer = (props) => {
  // const {
  //   getUsersThunkCreator,
  //   currentPage,
  //   isFetching,
  //   pageSize,
  //   setCurrentPage,
  //   totalUserCount,
  //   users,
  //   unfollow,
  //   follow,
  //   isFollowing,
  //   setIsFollowing,
  // } = props;

  const { store, constants } = useContext(GlobalContext);

  const getUsersThunkCreator = async (currentPage) => {
    store.dispatch({ type: constants.TOGGLE_IS_FETCHING, isFetching: true });
    store.dispatch({
      type: constants.SET_CURRENT_PAGE,
      currentPage: currentPage || store.state.currentPage,
    });
    let data = await usersAPI.getUsers(currentPage, store.state.pageSize);

    store.dispatch({ type: constants.TOGGLE_IS_FETCHING, isFetching: false });
    store.dispatch({ type: constants.SET_USERS, users: data.items });
    store.dispatch({
      type: constants.SET_TOTAL_USER_COUNT,
      totalUserCount: data.totalCount,
    });
  };

  useEffect(() => {
    getUsersThunkCreator(store.state.currentPage);
  }, []);

  const onPageChanged = (currentPage) => {
    getUsersThunkCreator(currentPage);
  };

  return (
    <>
      {store.state.isFetching ? <Preloader /> : null}

      <Users
        onPageChanged={onPageChanged}
        isFollowing={store.state.isFollowing}
      />
    </>
  );
};
let mapStateToProps = (state) => {
  return {
    // users: getUsers(state),
    // pageSize: getPageSize(state),
    // totalUserCount: getTotalUserCount(state),
    // currentPage: getCurrentPage(state),
    // // isFetching: getIsFetching(state),
    // isFollowing: getIsFollowing(state),
  };
};

export default compose(
    // follow,
    // unfollow,
    // setIsFollowing,
  withAuthRedirect
)(UsersContainer);
