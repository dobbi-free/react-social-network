import React from 'react';
import {
    getStatusMainThunkCreator,
    getUsersMainThunkCreator, profileDataSaveThunkCreator, savePhotoThunkCreator,
    setUserMain,
    updateStatusMainThunkCreator
} from "../../redux/main-reducer";
import {connect} from "react-redux";
import Main from "./Main";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";

class MainContainer extends React.Component {

    refreshMain() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUsersMainThunkCreator(userId)
        this.props.getStatusMainThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshMain()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshMain()
    }

    render() {
        return (
            <Main  {...this.props} profileDataSaveThunkCreator={this.props.profileDataSaveThunkCreator}
                   savePhotoThunkCreator={this.props.savePhotoThunkCreator} main={this.props.main}
                   status={this.props.status}
                   updateStatus={this.props.updateStatusMainThunkCreator} isOwner={!this.props.match.params.userId}/>
        )
    }
}

let mapStateToProps = (state) => ({
    main: state.mainPage.main,
    status: state.mainPage.status,
    authorizedUserId: state.auth.userId,
})

export default compose(
    connect(mapStateToProps, {
        setUserMain,
        getUsersMainThunkCreator,
        getStatusMainThunkCreator,
        updateStatusMainThunkCreator,
        savePhotoThunkCreator,
        profileDataSaveThunkCreator
    }),
    withRouter,
    withAuthRedirect,
)(MainContainer)


