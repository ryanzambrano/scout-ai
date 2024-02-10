import logo from "./scout-logo.png";
import "./App.css";
import HomePage from "./homePage.js";
import ProfilePage from "./profilePage.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//import logo from "./scout-logo.png";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:player" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="left">
        <div className="nfl">
          <img className="logo" src={logo} alt="Description of the image" />
        </div>
      </div>
      <div className="center">
        <div className="scout">Scout AI</div>
      </div>
      <div className="right">
        <div className="nfl">NFL</div>
      </div>
    </div>
  );
}
export default App;
