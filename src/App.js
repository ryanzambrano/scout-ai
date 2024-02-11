import logo from "./scout-logo.png";
import "./App.css";
import HomePage from "./homePage.js";
import ProfilePage from "./profilePage.js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import logo from "./scout-logo.png";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile/:player1/:positionFilter"
            element={<ProfilePage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function Header() {
  function goToProfile() {
    navigate("/");
  }
  let navigate = useNavigate();
  return (
    <div className="header">
      <div className="left">
        <button className="nfl" onClick={goToProfile}>
          <img className="logo" src={logo} alt="Description of the image" />
        </button>
      </div>
      <div className="center">
        <div className="scout">Scout Global</div>
      </div>
      <div className="right">
        <div className="nfl">NBA</div>
      </div>
    </div>
  );
}
export default App;
