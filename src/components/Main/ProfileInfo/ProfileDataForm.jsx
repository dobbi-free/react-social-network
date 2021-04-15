import React, { useContext, useState } from "react";
import s from "./ProfileInfo.module.css";
import common from "../../common/Common.module.css";
import { mainUserAPI } from "../../../api/api";
import { GlobalContext } from "../../../context/globalContext";
import { ProfileContactsInput, ProfileInput } from "../../common/FormControl";

const ProfileDataForm = (props) => {
  const { store, constants } = useContext(GlobalContext);
  const [formState, setFormState] = useState({
    fullName: store.state.main.fullName,
    lookingForAJob: store.state.main.lookingForAJob,
    lookingForAJobDescription: store.state.main.lookingForAJobDescription,
    aboutMe: store.state.main.aboutMe,
    contacts: {
      github: store.state.main.contacts.github,
      vk: store.state.main.contacts.vk,
      facebook: store.state.main.contacts.facebook,
      instagram: store.state.main.contacts.instagram,
      twitter: store.state.main.contacts.twitter,
      website: store.state.main.contacts.website,
      youtube: store.state.main.contacts.youtube,
      mainLink: store.state.main.contacts.mainLink,
    },
  });

  const getUsersMainThunkCreator = async (userId) => {
    let data = await mainUserAPI.getUserMain(userId);
    store.dispatch({ type: constants.SET_USER_MAIN, main: data });
  };

  const profileDataSaveThunkCreator = async (
    fullName,
    lookingForAJob,
    lookingForAJobDescription,
    aboutMe,
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube,
    mainLink
  ) => {
    const userId = store.state.userId;

    let response = await mainUserAPI.profileDataSave(
      fullName,
      lookingForAJob,
      lookingForAJobDescription,
      aboutMe,
      github,
      vk,
      facebook,
      instagram,
      twitter,
      website,
      youtube,
      mainLink
    );
    if (response.data.resultCode === 0) {
      store.dispatch(getUsersMainThunkCreator(userId));
      setFormState({
        ...formState,
        contacts: {
          github,
          vk,
          facebook,
          instagram,
          twitter,
          website,
          youtube,
          mainLink,
        },
      });
      //store.dispatch({type: constants.SET_USER_MAIN, main : formState})
      props.setEditMode(false);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        profileDataSaveThunkCreator(
          formState.fullName,
          formState.lookingForAJob,
          formState.lookingForAJobDescription,
          formState.aboutMe,
          formState.contacts.github,
          formState.contacts.vk,
          formState.contacts.facebook,
          formState.contacts.instagram,
          formState.contacts.twitter,
          formState.contacts.website,
          formState.contacts.youtube,
          formState.contacts.mainLink
        );
      }}
      className={s.form}
    >
      <ul className={s.list}>
        <li className={s.list_item}>
          Full name :{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
        </li>
        <li className={s.list_item}>
          Looking for a job:{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="lookingForAJob"
            type="checkbox"
          />
        </li>
        <li className={s.list_item}>
          Description:{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="lookingForAJobDescription"
            type="text"
            placeholder="My professional skills"
          />
        </li>
        <li className={s.list_item}>
          About me :{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="aboutMe"
            type="text"
            placeholder="About me"
          />
        </li>
      </ul>
      <div className={s.summory_error}>{props.error}</div>
      <div className={s.wrap_contact}>
        <div>
          {" "}
          {Object.keys(props.main.contacts).map((key) => {
            return (
              <div key={key}>
                <div className={s.wrap_input}>
                  <div className={s.contact_title}>{key}:</div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {" "}
          {Object.keys(props.main.contacts).map((key) => {
            return (
              <div key={key}>
                <div className={s.wrap_input}>
                  <ProfileContactsInput
                    formState={formState}
                    setFormState={setFormState}
                    className={s.input_form}
                    name={key}
                    type="text"
                    placeholder={key}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className={common.button} type="submit">
        Save
      </button>
    </form>
  );
};

export default ProfileDataForm;
