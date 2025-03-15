import { useSelector } from "react-redux";
import "./Recommended.css";
import { Link, useParams } from "react-router-dom";

const Recommended = () => {
  const { videoId } = useParams();

  // generate recommend video from the videos data in redux randomly which should not include the current video (max 10)
  const { videos } = useSelector((state) => state.videosData || {});
  const recommendVideos = videos
    .filter((video) => video._id !== videoId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <div className="recommended">
      {recommendVideos.map((video) => (
        <div key={video._id} className="side-video-list">
          <img src={video?.thumbnailUrl} alt={`Thumbnail ${video._id}`} />
          <div className="vid-info">
            <Link to={`/video/${video?._id}`}>
              <h4>{video?.title}</h4>
            </Link>
            <p>{video?.description}</p>
            <p>{video?.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
