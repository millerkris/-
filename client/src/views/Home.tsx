import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../servises/posts";

function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userRequest = async () => {
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
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    userRequest();
  }, []);

  return <>
    <h3>Home</h3>
    Home sweet home
    {result && <div>{result}</div>}
    {error && <div>{error}</div>}
  </>;
}

export default Home;