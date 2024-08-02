import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "/src/components/Home.jsx"
import Create from "/src/components/Create.jsx"
import Update from "/src/components/Update.jsx"
import SmoothieProfile from "/src/components/SmoothieProfile.jsx";
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="nav">
          <div className="logo">
            <h1>
              <Link to="/" aria-label="Home">Smoothie Book</Link>
            </h1>
          </div>
          <div className="nav-links">
            <Link to="/" aria-label="Home">
              <i className="material-icons" aria-hidden="true">
                <HomeIcon />
              </i>
              <span>Home</span>
            </Link>
            <Link to="/Create" aria-label="Add Smoothie">
              <i className="material-icons" aria-hidden="true">
                <AddBoxIcon />
              </i>
              <span>Add</span>
            </Link>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/profile/:id" element={<SmoothieProfile />} />
      </Routes>
      
      <footer>
        <div className="container">
          <div className="links">
            <Link>
            <span>About</span>
            </Link>
            <Link>
              <span>Accessibility</span>
            </Link>
            <Link>
              <span>Help Center</span>
            </Link>
            <Link>
              <span>Privacy & Terms</span>
            </Link>
            <Link>
              <span>Advertising</span>
            </Link>
          </div>
          <div className="copyright">
            Smoothie Book Corporation &copy; 2024
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
