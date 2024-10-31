import { useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const HandleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:7188/user/login", {
        username,
        password,
      });

      if (response.status != 200) {
        console.log(response.data);
        return;
      }

      const token = response.data;
      Cookies.set("jwt", token, { expires: 0.5 / 24 });

      window.location.href = "/";
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setErrorMessage(
          error.response.data || "An error occurred. Please try again."
        );
        console.error(error.response.data);
      }
    }
  };

  const UsernameFieldSection = () => {
    return (
      <div className="w-[80%] mb-[24px]">
        <h2 className="font-bold text-[14px] text-second">Username</h2>
        <input
          className="h-[43px] w-[100%] bg-third rounded-[10px] border border-inputFieldBorder"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    );
  };

  const PasswordFieldSection = () => {
    return (
      <div className="w-[80%] mb-[24px]">
        <h2 className="font-bold text-[14px] text-second">Password</h2>
        <input
          className="h-[43px] w-[100%] bg-third rounded-[10px] border border-inputFieldBorder"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    );
  };

  const ButtonSection = () => {
    return (
      <button
        onClick={HandleLogin}
        className="w-[80%] h-[43px] mt-[8px] rounded-[10px] bg-fourth font-extrabold text-white"
      >
        Login
      </button>
    );
  };

  const DontHaveAnAccountSection = () => {
    return (
      <p className="mt-[20px]">
        Don't have an account?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    );
  };

  const FormSection = () => {
    return (
      <div className="h-full w-[45%] flex flex-col items-center justify-center">
        <h1 className="font-bold text-[36px] mb-[36px] text-second">
          Login to your Account
        </h1>
        <UsernameFieldSection />
        <PasswordFieldSection />
        {errorMessage && (
          <div className="text-red-500">
            <p>Error: {errorMessage}</p>
          </div>
        )}
        <ButtonSection />
        <DontHaveAnAccountSection />
      </div>
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-[1111px] h-[625px] bg-third rounded-[34px] flex overflow-hidden mb-[200px] shadow-custom">
          <div className="h-full w-[55%]"></div>
          <FormSection />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
