import React, {useEffect} from "react";
import {connect} from "react-redux";
import {follow, getUsersThunkCreator, setCurrentPage, setIsFollowing, unfollow,} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowing,
    getPageSize,
    getTotalUserCount,
    getUsers
} from "../../redux/selectors/users-selectors";

const UsersContainer = (props) => {

    const {getUsersThunkCreator, currentPage,isFetching, pageSize,setCurrentPage,totalUserCount,users,unfollow,follow,isFollowing,setIsFollowing} = props;

    useEffect(() => {
        getUsersThunkCreator(currentPage,pageSize)
    }, []);


    const onPageChanged = (pageNumber) => {

       getUsersThunkCreator(pageNumber, pageSize);
       setCurrentPage(pageNumber);
    }







        return <>
            {isFetching ? <Preloader/> : null}
            <Users users={users} unfollow={unfollow} follow={follow}
                   totalUserCount={totalUserCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   isFollowing={isFollowing}
                   setIsFollowing={setIsFollowing}/>
        </>



}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
    }
}


export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        setIsFollowing,
        getUsersThunkCreator,
    }),
    withAuthRedirect,
)(UsersContainer)