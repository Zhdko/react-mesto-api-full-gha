import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }
  return (
    <header className="header">
      <a href="./index.html" className="link">
        <img src={logo} alt="Место.Россия." className="logo logo_place_header" />
      </a>
      <div className="header__container">
        <p className="header__email">{props.email}</p>
        <Link
          onClick={signOut}
          className={`header__link link ${props.email !== "" && "header__link_place_main"}`}
          to={props.link}
        >
          {props.linkName}
        </Link>
      </div>
    </header>
  );
}
export default Header;
