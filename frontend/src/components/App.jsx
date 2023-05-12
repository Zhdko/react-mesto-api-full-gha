import "../index.css";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import CurrentUserContext from "./contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurentUser] = useState({});
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          setMessage({ isSuccessfully: true, text: err.message || "Что-то пошло не так! Попробуйте ещё раз." });
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (
      isEditProfilePopupOpen ||
      isEditAvatarPopupOpen ||
      isAddPlacePopupOpen ||
      isDeleteCardPopupOpen ||
      isImagePopupOpen ||
      message
    ) {
      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isImagePopupOpen,
    isDeleteCardPopupOpen,
    message,
  ]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardButtonClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
    setMessage(null);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((res) => setCurentUser(res))
      .catch((err) => {
        setMessage({
          isSuccessfully: true,
          text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => setCurentUser(res))
      .catch((err) => {
        setMessage({
          isSuccessfully: true,
          text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setMessage({
          isSuccessfully: true,
          text: "Вы успешно зарегистрировались!",
        });
        setTimeout(() => setMessage(null), 1500);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err.error);
        setMessage({
          isSuccessfully: false,
          text: err.message || "Что-то пошло не так!",
        });
      });
  }

  function handleLogin(password, email, defaultValues) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          defaultValues();
          setLoggedIn(true);
          navigate("/", { replace: true });
          setEmail(email);
        }
      })
      .catch((err) =>
        setMessage({
          isSuccessfully: false,
          text: err.message || "Что-то пошло не так!",
        })
      );
  }

  function handleAddPlace(newCard) {
    setIsLoading(true);
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        setMessage({
          isSuccessfully: true,
          text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        setMessage({
          isSuccessfully: true,
          text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        setMessage({
          isSuccessfully: true,
          text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          setMessage({
            isSuccessfully: true,
            text: err.message || "Что-то пошло не так! Попробуйте ещё раз.",
          });
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardButtonClick}
                email={email}
                cards={cards}
                element={Main}
              />
            }
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          textBtn={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          textBtn={isLoading ? "Создание..." : "Создать"}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          textBtn={isLoading ? "Сохранение..." : "Сохранить"}
        />
        <PopupWithConfirm
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          textBtn={isLoading ? "Удаление..." : "Да"}
        />
        <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip message={message} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
