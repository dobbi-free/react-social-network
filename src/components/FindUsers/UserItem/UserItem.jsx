import s from "./../FindUsers.module.css";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../../context/globalContext";
import { usersAPI } from "../../../api/api";
import {
  followSucces,
  setIsFollowing,
  unfollowSucces,
} from "../../../redux/users-reducer";
import { useContext, useState } from "react";

const UserItem = (props) => {
  const { store, constants } = useContext(GlobalContext);

  const follow = async (userId) => {
    if (followed) {
      let response = await usersAPI.unfollow(userId);

      if (response.data.resultCode === 0) {
        store.dispatch({ types: constants.UNFOLLOW, userId: userId });
        setFollowed(false);
      }
    } else {
      let response = await usersAPI.follow(userId);

      if (response.data.resultCode === 0) {
        store.dispatch({ types: constants.FOLLOW, userId: userId });
        setFollowed(true);
      }
    }
  };

  const [followed, setFollowed] = useState(props.followed);

  return (
    <div className={s.user_item}>
      <div className={s.img_block}>
        <NavLink to={"/main/" + props.id}>
          {" "}
          <img
            className={s.img}
            src={
              props.src ||
              "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
            }
            alt=""
          />
        </NavLink>
        <button
          disabled={props.isFollowing}
          onClick={() => {
            follow(props.id);
          }}
          className={s.button_follow}
        >
          {followed ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className={s.info_block}>
        <div className={s.left_block}>
          <h4 className={s.name}>{props.name}</h4>
          <p className={s.status}>Status: {props.status}</p>
        </div>
        <div className={s.right_block}>
          <p className={s.location}>City: {"props.location.city"}</p>
          <p className={s.location}>Country: {"props.location.country"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
