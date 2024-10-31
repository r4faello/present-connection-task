import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt");
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="w-[250px]">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="h-[34px] bg-third rounded-[8px] w-[86px] mr-[11px] text-[12px]"
        >
          Logout
        </button>
      ) : (
        <>
          <a href="/login">
            <button className="h-[34px] bg-third rounded-[8px] w-[86px] mr-[11px] text-[12px]">
              Login
            </button>
          </a>
          <a href="/register">
            <button className="h-[34px] bg-third rounded-[8px] w-[86px] mr-[36px] text-[12px]">
              Register
            </button>
          </a>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
