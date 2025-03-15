import "./Feed.css";
import { Link } from "react-router-dom";
import { calculateTimeAgo } from "../../helpers";

const Feed = ({ videos }) => {
  return (
    <div className="feed">
      {videos?.map((video) => (
        <Link key={video?._id} to={`/video/${video._id}`} className="card">
          <figure>
            <img src={video?.thumbnailUrl} alt={video?.title} />
          </figure>
          <h2>{video?.title}</h2>
          <h3>{video.channel}</h3>
          <p>
            {video?.views} views . {calculateTimeAgo(video?.createdAt)}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
