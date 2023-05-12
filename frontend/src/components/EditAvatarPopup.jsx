import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarInput.current.value);
  }

  function clearInput() {
    avatarInput.current.value = "";
  }

  useEffect(() => clearInput(), [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={props.textBtn}
    >
      <input
        id="avatar-link"
        type="url"
        name="link"
        className="popup__text"
        placeholder="Ссылка на картинку"
        required=""
        ref={avatarInput}
      />
      <span className="link-error error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
