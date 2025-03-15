import { useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaMicrophone, FaBell, FaPlus } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo1.png";
import { useSelector } from "react-redux";
import { logout } from "../../helpers";

const Navbar = ({ setSidebar }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userCredential.user);

  return (
    <nav className="flex-div">
      {/* Left: Menu + Logo */}
      <div className="nav-left flex-div">
        <FaBars
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
        />
        <img
          className="logo"
          src={logo}
          alt="YouTube Logo"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Middle: Search Bar + Mic */}
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <FaSearch />
        </div>
        <FaMicrophone className="mic-icon" />
      </div>

      {/* Right: Create Button + Bell + Profile */}
      <div className="nav-right flex-div">
        <button className="create-btn">
          <FaPlus className="plus-icon" /> Create
        </button>
        <FaBell className="bell-icon" />

        {/* login button */}
        {user?.channelName ? <div style={{display:"flex",alignItems:"center", gap:".5rem"}}><p>{user?.channelName}</p><button className="login-btn" onClick={()=> logout(navigate)} >Logout</button></div> :  (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
