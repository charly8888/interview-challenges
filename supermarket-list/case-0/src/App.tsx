import { useEffect, useState } from "react";
import api from "./api";
import styles from "./App.module.scss";
import type { Item } from "./types";



function App() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    api.list().then(setItems);
    document.getElementById("input").focus()
  }, []);

  function handleDelete(id: number) {
    setItems(items?.filter((item) => item.id !== id));
  }

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form>
        <input name="text" type="text" id="input"/>
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text} <button onClick={() => handleDelete(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
