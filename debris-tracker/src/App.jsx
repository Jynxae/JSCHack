import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Risk from "./pages/NASA/risk";
import InputForm from "./pages/InputForm";
import About from "./pages/About";
import HomeFeed from "./pages/HomeFeed";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/home-feed" element={<HomeFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
