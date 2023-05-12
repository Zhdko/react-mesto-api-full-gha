const content = document.querySelector(".content");
export const buttonEdit = content.querySelector(".button-icon_action_edit");
export const username = content.querySelector(".profile__username");
export const userAbout = content.querySelector(".profile__userjob");
export const avatar = content.querySelector(".profile__img");
export const formEdit = document.querySelector(".edit-profile");
export const inputUsername = formEdit.querySelector(".username");
export const inputUserJob = formEdit.querySelector(".about");
export const buttonAdd = content.querySelector(".button-icon_action_add");
export const formAdd = document.querySelector(".add-place");
export const btnEditAvatar = document.querySelector(".profile__edit-avatar");
export const formEditAvatar = document.querySelector(".edit-avatar");

export const config = {
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_invalid",
  inputErrorClass: "popup__text_invalid",
  errorClass: "popup__error_visible",
};
