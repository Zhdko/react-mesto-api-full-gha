import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={props.textBtn}
      isFormValid={true}
    />
  );
}

export default PopupWithConfirm;
