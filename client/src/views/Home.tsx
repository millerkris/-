import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../servises/api";

function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const userRequest = async () => {
      setLogged(false);
      setResult("");
      setError("");
      try {
        const response = await fetch(`${BASE_URL}/user`, {
          credentials: "include",
          method: "GET"
        });
        if (response.status !== 200) {
          const responseData = await response.json();
          throw Error(responseData.message);
        }
        const user = await response.json();
        setResult(`Добро пожаловать, ${user.login}`);
        setLogged(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    userRequest();
  }, []);

  const handleLogout = () => {
    const logoutRequest = async () => {
      try {
        await fetch(`${BASE_URL}/auth`, {
          credentials: "include",
          method: "DELETE"
        });
        setLogged(false);
        setResult("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    logoutRequest();
  };

  return <>
    <h3>Home</h3>
    Home sweet home
    {result && <div>{result}</div>}
    {error && <div>{error}</div>}
    {isLogged && <button onClick={handleLogout}>Разлогиниться</button>}
  </>;
}

export default Home;