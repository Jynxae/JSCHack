import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Risk from "./pages/NASA/risk";
import InputForm from "./pages/InputForm";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/input-form" element={<InputForm />} />
      </Routes>
    </Router>
  );
}

export default App;
