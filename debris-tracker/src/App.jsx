import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/navbar/footer";
import Risk from "./pages/NASA/risk";
import InputForm from "./pages/InputForm";
import About from "./pages/About";
import HomeFeed from "./pages/HomeFeed";
import Login from "./pages/login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/input-form" element={<InputForm />} />
        <Route path="/home-feed" element={<HomeFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
