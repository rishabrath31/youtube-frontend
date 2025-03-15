import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { errorHandler, showToast } from "../../helpers";
import { login, registerUser } from "../../http/http-calls";
import { useDispatch } from "react-redux";
import { addUserCredential } from "../../redux/actions";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    channelName: "",
  });
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeLoginForm = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeSignUpForm = (e) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle Sign Up
      try {
        const res = await registerUser(signUpForm);
        if (!res.error) {
          showToast("Sign Up successful", "success");
          toggleForm();
        }
      } catch (error) {
        console.log(error)
        errorHandler(error);
      }
    } else {
      // Handle Login
      try {
        const res = await login(loginForm);
        const user = { ...res };
        delete user.token;
        if (!res.error) {
          showToast("Login successful", "success");
          dispatch(addUserCredential({ token: res?.token, user }));
          navigate("/");
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {isSignUp ? (
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={signUpForm.email}
              onChange={handleChangeSignUpForm}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={signUpForm.password}
              onChange={handleChangeSignUpForm}
            />
            <input
              type="text"
              name="channelName"
              placeholder="User Name"
              required
              value={signUpForm.channelName}
              onChange={handleChangeSignUpForm}
            />
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={loginForm.email}
              onChange={handleChangeLoginForm}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={loginForm.password}
              onChange={handleChangeLoginForm}
            />
            <button type="submit">Login</button>
          </form>
        )}
        <p onClick={toggleForm} className="toggle-text">
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>

        <button onClick={() => navigate("/")} className="back-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
