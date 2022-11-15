import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RegistrationForm, { RegistrationFormData } from "../components/RegistrationForm/RegistrationForm";
import { BASE_URL } from "../servises/api";

const RegistrationView = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (data: RegistrationFormData) => {
    // fetch
    const registrationRequest = async () => {
      setResult("");
      setError("");
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.status !== 200) {
          const responseData = await response.json();
          throw Error(responseData.message);
        }
        setResult("Пользователь успешно создан!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    registrationRequest();
  };

  return (
    <div>
      <RegistrationForm onSubmit={onSubmit}/>
      {result && <>{result}</>}
      {error && <>{error}</>}
    </div>
  );
};

export default RegistrationView;