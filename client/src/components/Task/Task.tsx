import React, { FormEvent, useState } from 'react';
import { usePost } from "../../servises/posts";
import spinner from "../../views/spinner.gif";
import styles from "./Task.module.css";


function Task() {
  const [id, setId] = useState("");
  const [input, setInput] = useState("");

  const { isFetching, error, data } = usePost(id);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId(input);
  };

  return <>
    <h3>Task</h3>
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)}/>
        <button disabled={isFetching}>Получить данные</button>
      </form>
    </div>
    {isFetching ? (
      <div><img src={spinner} alt="spinner" /></div>
    ) : error instanceof Error ? (
      <div className={styles.error}>{error.message}</div>
    ) : (
      <div>
        <b>{data?.title}</b><br/>
        {data?.body}
      </div>
    )}
  </>;
}

export default Task;