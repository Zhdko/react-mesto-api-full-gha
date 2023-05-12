function InfoToolTip(props) {
  const message = props.message;
  return (
    <div className={`popup ${message && "popup_opened"}`}>
      <div className="popup__container popup_action_info">
        <div
          className={`popup__image ${
            message?.isSuccessfully ? "popup__image_type_success" : "popup__image_type_error"
          }`}
        />
        <h2 className="popup__title popup__title_type_info">{message?.text}</h2>
        <button
          type="button"
          className="button-icon button-icon_action_close"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoToolTip;
