import Header from "./Header";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

function Register(props) {
  const { values, errors, handleChange } = useValidation();

  const handleSubmit = (e) => {
    const { password, email } = values;
    e.preventDefault();
    props.onRegister(password, email);
  };

  return (
    <main>
      <Header link="/sign-in" linkName="Вход" />
      <div className="authorization">
        <h2 className="popup__title popup__title_color_white">Регистрация</h2>
        <form
          name="login"
          className="form_place_authorization popup__input-container"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            type="email"
            name="email"
            className="popup__text popup__text_color_grey email"
            placeholder="Email"
            required=""
            minLength={2}
            maxLength={40}
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="username-error error">{errors.email || ""}</span>
          <input
            id="password"
            type="password"
            name="password"
            className="popup__text popup__text_color_grey password"
            placeholder="Пароль"
            required=""
            minLength={6}
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="username-error error">{errors.password || ""}</span>
          <button className="popup__submit-btn popup__submit-btn_color_white" type="submit" aria-label="Войти">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="link authorization__link">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Register;
