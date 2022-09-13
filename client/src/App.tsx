import React from "react";
import type { FormEvent } from "react";
import io from "socket.io-client";

import './App.css'

// conection with socketServer
const socket = io("http://localhost:4000");

function App() {
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    // listening event "message"
    socket.on("message", (socketMessage) => console.log(socketMessage));

    return () => {
      socket.off("message", (socketMessage) => console.log(socketMessage));
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
    socket.emit('message', value);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setValue(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default App
