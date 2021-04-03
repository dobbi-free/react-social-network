import s from "./FindUsers.module.css";
import UserItem from "./UserItem/UserItem";
import Pagintaion from "../common/Pagination/Pagintation";

const User = (props) => {
    let userItem = props.users.map(user => <UserItem key={user.id} id={user.id} followed={user.followed}
                                                     name={user.name}
                                                     status={user.status} src={user.photos.large}
                                                     location={user.location}
                                                     unfollow={props.unfollow} follow={props.follow}
                                                     isFollowing={props.isFollowing}
                                                     setIsFollowing={props.setIsFollowing}/>)

    return (
        <div className={s.wrapp}>
            <h2 className={s.title}>Find Users</h2>
            <Pagintaion currentPage={props.currentPage} portionSize={10}  totalItemsCount={props.totalUserCount} pageSize={props.pageSize}
                        onPageChanged={props.onPageChanged}/>
            <div className={s.find_users}>
                {userItem}
            </div>
        </div>
    )
}

export default User;