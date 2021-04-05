import s from "./FindUsers.module.css";
import UserItem from "./UserItem/UserItem";
import Pagintaion from "../common/Pagination/Pagintation";
import {GlobalContext} from "../../context/globalContext";
import {useContext} from "react";

const User = (props) => {
    const { store, constants } = useContext(GlobalContext);
  let userItem = store.state.users.map((user) => (
    <UserItem
      key={user.id}
      id={user.id}
      followed={user.followed}
      name={user.name}
      status={user.status}
      src={user.photos.large}
      location={user.location}
      unfollow={props.unfollow}
      follow={props.follow}
      isFollowing={store.state.isFollowing}
    />
  ));

  return (
    <div className={s.wrapp}>
      <h2 className={s.title}>Find Users</h2>
      <Pagintaion
        portionSize={10}
        onPageChanged={props.onPageChanged}
      />
      <div className={s.find_users}>{userItem}</div>
    </div>
  );
};

export default User;
