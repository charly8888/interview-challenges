import { useEffect, useState } from "react";
import api from "./api";
import styles from "./App.module.scss";
import type { Item } from "./types";



interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [valueText, setValueText] = useState("");

  function handleToggle(id: Item["id"]) {
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)),
    );
  }

  function handleAdd(event: React.ChangeEvent<Form>) {
    event.preventDefault();
    if (event.target[0].value) {
      const newItem: Item = {
        completed: false,
        id: items.length + 1,
        text: event.target[0].value,
      };

      setItems([...items, newItem]);
      setValueText("");
    } else {
      console.log("Escribe algo");
    }
  }
  function handleChangeText(e) {
    setValueText(e.target.value);
  }
  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input name="text" type="text" value={valueText} onChange={handleChangeText} />
        <button>Add</button>
      </form>
      {items.length === 0 ? (
        <h1>Cargando</h1>
      ) : (
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={item.completed ? styles.completed : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
