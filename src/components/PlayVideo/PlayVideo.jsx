import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateTimeAgo, errorHandler, showToast } from "../../helpers";
import {
  addCommentOnVideo,
  deleteCommentFromVideo,
  dislikeVideo,
  editComment,
  getAllVideoComments,
  likeVideo,
  subscribe,
  unsubscribe,
} from "../../http/http-calls";
import { useCallback, useEffect, useState } from "react";
import { getAndUpdateVideoData } from "../../redux/reducers/videoReducer";
import { EditIcon, TrashIcon } from "lucide-react";

const PlayVideo = () => {
  const { videoId } = useParams();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);

  const { videos } = useSelector((state) => state?.videosData || {});
  const { _id } = useSelector((state) => state?.userCredential.user || {});

  const dispatch = useDispatch();

  const video = videos.find((video) => video._id === videoId);

  const [videoLikes, setVideoLikes] = useState(video?.likes);
  const [videoDislikes, setVideoDislikes] = useState(video?.dislikes);

  const handleLike = async () => {
    try {
      setVideoDislikes((prev) => (prev > 0 ? prev - 1 : prev));
      setVideoLikes((prev) => prev + 1);
      const res = await likeVideo(videoId);
      if (!res.error) {
        showToast("Video liked successfully", "success");
        dispatch(getAndUpdateVideoData());
      }
    } catch (error) {
      errorHandler(error);
      setVideoLikes((prev) => prev - 1);
    }
  };

  const handleDislike = async () => {
    try {
      setVideoLikes((prev) => (prev > 0 ? prev - 1 : prev));
      setVideoDislikes((prev) => prev + 1);
      const res = await dislikeVideo(videoId);
      if (!res.error) {
        showToast("Video disliked successfully", "success");
        dispatch(getAndUpdateVideoData());
      }
    } catch (error) {
      errorHandler(error);
      setVideoDislikes((prev) => prev - 1);
    }
  };

  const handleSubscribe = async () => {
    try {
      const res = await subscribe(video?.user_id);
      if (!res.error) {
        showToast("Subscribed successfully", "success");
        setIsSubscribed(true);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const res = await unsubscribe(video?.user_id);
      if (!res.error) {
        showToast("Unsubscribed successfully", "success");
        setIsSubscribed(false);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  // fn to get all video comments
  const getAllComments = useCallback(async () => {
    try {
      const res = await getAllVideoComments(videoId);
      if (!res.error) setComments(res.commentList);
    } catch (error) {
      errorHandler(error);
    }
  }, [videoId]);

  const addOrUpdateComment = async () => {
    if (!comment.trim()) return;
    try {
      if (editCommentId) {
        const res = await editComment({
          id: editCommentId,
          payload: { commentText: comment },
        });
        if (!res.error) {
          showToast("Comment edited successfully", "success");
          setEditCommentId(null);
        }
      } else {
        const res = await addCommentOnVideo({
          id: videoId,
          payload: { commentText: comment },
        });
        if (!res.error) {
          showToast("Comment added successfully", "success");
        }
      }
      setComment("");
      getAllComments();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteCommentFromVideo(commentId);
      if (!res.error) {
        showToast("Comment deleted successfully", "success");
        getAllComments();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setComment(commentText);
    setEditCommentId(commentId);
  };

  useEffect(() => {
    getAllComments();
  }, [getAllComments]);

  return (
    <div className="play-video">
      {/* Video Player */}
      <video src={video?.videoUrl} controls autoPlay muted></video>

      {/* Video Title */}
      <h3>{video?.title}</h3>

      {/* Video Info & Interactions */}
      <div className="play-video-info">
        <p>
          {video?.views} views &bull; {calculateTimeAgo(video?.createdAt)}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" onClick={handleLike} /> {videoLikes}
          </span>
          <span>
            <img src={dislike} alt="Dislike" onClick={handleDislike} />{" "}
            {videoDislikes}
          </span>
          <span>
            <img src={share} alt="Share" /> Share
          </span>
          <span>
            <img src={save} alt="Save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Publisher Info */}
      <div className="publisher">
        <img src={jack} alt="Channel Profile" />
        <div>
          <p>{video?.channel}</p>
          <span>{video?.subscribers} Subscribers</span>
          <button onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Video Description */}
      <div className="vid-description">
        <p>{video?.description}</p>
        <hr />

        {/* Comments Section */}
        <h4>130 Comments</h4>

        {/* Add/Edit comment input box */}
        <div className="comment add-comment">
          <img className="user-profile" src={user_profile} alt="User Profile" />
          <input
            className="comment-input"
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment"
            style={{
              padding: "12px",
              border: "none",
              backgroundColor: "#eee",
              borderRadius: "8px",
              width: "100%",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            style={{
              backgroundColor: "#ff0000",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              height: "100%",
            }}
            onClick={addOrUpdateComment}
          >
            {editCommentId ? "Update" : "Publish"}
          </button>
        </div>

        {/* Comment 1 */}
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div className="comment" key={comment?._id}>
              <img src={user_profile} alt="User Profile" />
              <div>
                <p className="user-details">
                  {comment?.userId?.channelName}{" "}
                  <span>{calculateTimeAgo(comment?.createdAt)}</span>
                </p>
                <p>{comment?.commentText}</p>
                <div className="comment-action">
                  <img src={like} alt="Like" /> <span>244</span>
                  <img src={dislike} alt="Dislike" />
                  {_id === comment?.userId?._id && <TrashIcon
                    size={18}
                    className="delete-icon"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteComment(comment._id)}
                  />}
                  {_id === comment?.userId?._id && <EditIcon
                    size={18}
                    className="edit-icon"
                    style={{
                      color: "#666",
                      cursor: "pointer",
                      marginLeft: "8px",
                    }}
                    onClick={() =>
                      handleEditComment(comment._id, comment.commentText)
                    }
                  />}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            No comments yet
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
