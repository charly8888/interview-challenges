import { useEffect, useState } from "react";
import api from "./api";
import styles from "./App.module.scss";
import type { Item } from "./types";



interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);

  function handleToggle(id: Item["id"]) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    if (event.target.text.value === "") return;

    setItems(
      items.concat({
        id: +new Date(),
        completed: false,
        text: event.target.text.value,
      }),
    );

    event.target.text.value = "";
  }
  function handleRemove(id: Item["id"], e) {
    e.stopPropagation();
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" />
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text} <button onClick={(e) => handleRemove(item.id, e)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
