import React, { useEffect } from "react";
import s from "./FormControl.module.css";

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div>
      <textarea
        className={s.message + " " + (hasError ? s.error_textarea : "")}
        {...input}
        {...props}
      ></textarea>
      {hasError && <p className={s.message_error}>{meta.error}</p>}
    </div>
  );
};

export const InputLogin = ({ input, meta, ...props }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div>
      {hasError ? (
        <p className={s.message_error}>{meta.error}</p>
      ) : (
        <p className={s.messaege_null}>Error message</p>
      )}
      <input
        className={s.input + " " + (hasError ? s.error_textarea : "")}
        {...input}
        {...props}
      ></input>
    </div>
  );
};

export const CustomInput = (props) => {
  const {
    name,
    setFormState,
    formState,
    type,
    required = false,
    minLength = false,
    checked = false,
    locRequired = null,
    setRequired = () => {},
    locMinLength = null,
    setMinLength = () => {},
  } = props;

  // useEffect(() => {
  //   checked && required && !formState[name].length
  //     ? setRequired({ ...locRequired, [name]: "Field required" })
  //     : setRequired({ ...locRequired, [name]: null });
  //   checked && minLength && formState[name].length <= minLength
  //     ? setMinLength({ ...locMinLength, [name]: "Minimum 8 char" })
  //     : setMinLength({ ...locMinLength, [name]: null });
  //  debugger
  // }, [formState[name], checked]);

  const onChange = (e) => {
    type === "checkbox"
      ? setFormState({ ...formState, [name]: e.currentTarget.checked })
      : setFormState({
          ...formState,
          [name]: e.target.value,
        });
  };

  return (
    <>
      <input onChange={onChange} value={formState[name]} {...props} />
      {locRequired && <p>{locRequired}</p>}
      {locMinLength && <p>{locMinLength}</p>}
    </>
  );
};
