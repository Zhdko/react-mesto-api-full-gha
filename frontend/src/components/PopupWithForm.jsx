function PopupWithForm(props) {
  return (
    <div className={`popup popup_action_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className={`form ${props.name} popup__input-container`}
          noValidate=""
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-btn" type="submit" aria-label={props.textBtn}>
            {props.textBtn}
          </button>
        </form>
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

export default PopupWithForm;
