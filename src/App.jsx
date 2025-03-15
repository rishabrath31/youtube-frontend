import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getAndUpdateVideoData } from "./redux/reducers/videoReducer";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import LoginPage from "./pages/Login/LoginPage";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAndUpdateVideoData());
  }, [dispatch]);

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            color: "#666",
            fontSize: 14,
            letterSpacing: 0.3,
            // add the font-family to be used in the project here
            fontFamily: "Poppins",
          },
        }}
      />
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
