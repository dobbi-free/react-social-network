import React from "react";
import {connect} from "react-redux";
import {follow, getUsersThunkCreator, setCurrentPage, setIsFollowing, unfollow,} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    currentPage, getCurrentPage, getIsFetching, getIsFollowing,
    getPageSize, getTotalUserCount,
    getUsers,
    isFetching,
    isFollowing,
    totalUserCount
} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {

        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber);
    }




    render() {


        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users} unfollow={this.props.unfollow} follow={this.props.follow}
                   totalUserCount={this.props.totalUserCount}
                   pageSize={this.props.pageSize}
                   onPageChanged={this.onPageChanged}
                   currentPage={this.props.currentPage}
                   isFollowing={this.props.isFollowing}
                   setIsFollowing={this.props.setIsFollowing}/>
        </>
    }


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