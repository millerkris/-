import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginForm, { LoginFormData } from "../components/LoginForm/LoginForm";
import { BASE_URL } from "../servises/api";

const LoginView = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (data: LoginFormData) => {
    const authRequest = async () => {
      setResult("");
      setError("");
      try {
        const response = await fetch(`${BASE_URL}/auth`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.status !== 200) {
          const responseData = await response.json();
          throw Error(responseData.message);
        }
        setResult("Пользователь успешно вошел!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    authRequest();
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit}/>
      {result && <>{result}</>}
      {error && <>{error}</>}
    </div>
  );
};

export default LoginView;