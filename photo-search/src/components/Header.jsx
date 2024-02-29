import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Constants } from "./Constants";
import { exchangeAuthCode } from "./ApiCalls";
import "../styles/header.css";

export const Header = (props) => {
  const navigate = useNavigate();
  let searchInputValue = useRef("");
  const authorizationCode = new URLSearchParams(window.location.search).get(
    "code"
  );
  const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code&scope=${Constants.unsplashScope}`;
  const accessTokenAuth = sessionStorage.getItem("accessToken");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const exchangeAuthorizationCode = async (authorizationCode) => {
    const response = await exchangeAuthCode(authorizationCode);

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      sessionStorage.setItem("accessToken", accessToken);
      props.setTriggerRandomImages((prev) => !prev);
      navigate("/");
    } else {
      handleLogin();
      console.error(
        "Error exchanging authorization code for access token:",
        response.statusText
      );
    }
  };

  const handleLogin = () => {
    window.location.href = authorizationUrl;
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");

    window.location.reload();
  };

  useEffect(() => {
    if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode);
    }
  }, []);

  return (
    <>
      <div className="header">
        <Link to={"/"} className="header-title-name">
          Photo Search
        </Link>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            className="header-input"
            placeholder="Type Something To Search"
            ref={searchInputValue}
          />
        </form>
        {accessTokenAuth ? (
          <div className="logged-in-user">
            <button className="user-profile">
              {" "}
              <a href="/profile-page">User Profile</a>
            </button>
            <button className="logout-button" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        ) : (
          <button className="login-button">
            <a onClick={handleLogin}>Login</a>
          </button>
        )}
      </div>
    </>
  );
};
