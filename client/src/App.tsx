import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage.tsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}
