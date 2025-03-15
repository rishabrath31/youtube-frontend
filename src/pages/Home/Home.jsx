import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { useSelector } from "react-redux";
import { useState } from "react";

const Home = ({ sidebar }) => {
  const { videos } = useSelector((state) => state.videosData || {});
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const handleChangeCategory = (category = "All") => {
    const filteredVideos = videos.filter((video) =>
      category === "All" ? true : video.category === category
    );
    setFilteredVideos(filteredVideos);
  };
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <CategoryBar onChangeCategory={handleChangeCategory} />
        <Feed videos={filteredVideos} />
      </div>
    </>
  );
};

export default Home;
