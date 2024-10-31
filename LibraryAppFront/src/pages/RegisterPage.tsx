import { useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const HandleRegister = async () => {
    if (password != repeatedPassword) {
      console.log("Passwords do not match");
      return;
    }
    // TODO: Username validation

    try {
      const response = await axios.post(
        "https://localhost:7188/user/register",
        {
          username,
          password,
        }
      );

      if (response.status != 200) {
        console.log(response.data);
        return;
      }

      const token = response.data;
      Cookies.set("jwt", token, { expires: 1 });

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

  const ConfirmPasswordSection = () => {
    return (
      <div className="w-[80%] mb-[24px]">
        <h2 className="font-bold text-[14px] text-second">Confirm password</h2>
        <input
          className="h-[43px] w-[100%] bg-third rounded-[10px] border border-inputFieldBorder"
          type="password"
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
      </div>
    );
  };

  const RegisterButtonSection = () => {
    return (
      <button
        onClick={HandleRegister}
        className="w-[80%] h-[43px] mt-[8px] rounded-[10px] bg-fourth font-extrabold text-white"
      >
        Register
      </button>
    );
  };

  const AlreadyAnUserSection = () => {
    return (
      <p className="mt-[20px]">
        Already an user?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    );
  };

  const FormSection = () => {
    return (
      <div className="h-full w-[45%] flex flex-col items-center justify-center">
        <h1 className="font-bold text-[36px] mb-[36px] text-second">
          Register your Account
        </h1>
        <UsernameFieldSection />
        <PasswordFieldSection />
        <ConfirmPasswordSection />
        {errorMessage && (
          <div className="text-red-500">
            <p>Error: {errorMessage}</p>
          </div>
        )}
        <RegisterButtonSection />
        <AlreadyAnUserSection />
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

export default RegisterPage;
