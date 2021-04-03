import s from './../FindUsers.module.css';
import {NavLink} from "react-router-dom";

const UserItem = (props) => {
    return (
        <div className={s.user_item}>
            <div className={s.img_block}>
                <NavLink to={'/main/' + props.id}> <img className={s.img}
                                                        src={props.src || "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"}
                                                        alt=""/></NavLink>
                {props.followed ?
                    <button disabled={props.isFollowing} onClick={() => {
                        props.unfollow(props.id)
                    }} className={s.button_follow}>Unfollow</button>

                    : <button onClick={() => {
                        props.follow(props.id)
                    }} className={s.button_follow}>Follow</button>}
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
}

export default UserItem;