import logo from "./scout-logo.png";
import "./App.css";
import HomePage from "./homePage.js";
import ProfilePage from "./profilePage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import logo from "./scout-logo.png";

function App() {
  return (
    <Router>
      <div className="App">
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

export default App;
