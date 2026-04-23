import { useState } from "react";
import Home from "./pages";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <section id="spacer"></section>

      <Home />
    </>
  );
}

export default App;
