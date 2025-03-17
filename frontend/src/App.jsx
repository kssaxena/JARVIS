import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Register } from "./components/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#22242B] h-screen w-screen overflow-hidden text-neutral-400 ">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Register />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
