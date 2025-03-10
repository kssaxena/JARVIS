import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute top-0  h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-x-hidden antialiased selection:bg-cyan-500 selection:text-cyan-900 font-Fredoka">
      <div className="text-black">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
