import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";

function Card(props) {
  const card = props.card;
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${isLiked && "card__like_active"}`;

  function handleClick() {
    props.onClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="card">
      <div className="card__img-container" onClick={handleClick}>
        <img className="card__image" src={card.link} alt={`${card.name}. Автор: ${card.owner.name}`} />
      </div>
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="like">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Лайк" />
          <p className="like__counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="card__delete" aria-label="Удалить" onClick={handleDeleteClick} />}
    </li>
  );
}

export default Card;
