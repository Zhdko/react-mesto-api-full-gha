import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "./contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cards = props.cards;

  return (
    <div>
      <Header link="/sign-in" linkName="Выйти" email={props.email} />
      <main className="content page__content">
        <section className="profile">
          <div className="profile__avatar">
            <button
              type="button"
              aria-label="Редактировать профиль."
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            />
            <img alt="Фото профиля." className="profile__img" src={currentUser.avatar} />
          </div>
          <div className="profile__container">
            <div className="profile__info">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                type="button"
                className="button-icon button-icon_action_edit"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}
              />
              <p className="profile__userjob">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="button-icon button-icon_action_add"
              aria-label="Добавить новое фото"
              onClick={props.onAddPlace}
            />
          </div>
        </section>
        <section className="gallery">
          <ul className="gallery__list list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
