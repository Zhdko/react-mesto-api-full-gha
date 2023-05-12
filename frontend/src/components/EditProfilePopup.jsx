import { useContext, useEffect } from "react";
import useValidation from "../hooks/useValidation";
import CurrentUserContext from "./contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, handleChange, defaultValues } = useValidation();

  useEffect(() => {
    defaultValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={props.textBtn}
    >
      <input
        id="username"
        type="text"
        name="name"
        className="popup__text username"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="username-error error">{errors.name || ""}</span>
      <input
        id="job"
        type="text"
        name="about"
        className="popup__text about"
        placeholder="О себе"
        required=""
        minLength={2}
        maxLength={200}
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="about-error error">{errors.about || ""}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
