import toast from "react-hot-toast";
import { clearUserCredential } from "../redux/actions";
import { store } from "../redux/store";

export const logout = (navigate = null) => {
  store.dispatch(clearUserCredential());

  if (navigate) navigate("/login", { replace: true });
};

export const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const calculateTimeAgo = (createdAt) => {
  const now = new Date();
  const videoDate = new Date(createdAt);
  const timeDiff = now.getTime() - videoDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  return `${days} day${days > 1 ? "s" : ""} ago`;
};

export const showToast = (
  message,
  type = "error",
  duration = 4000,
  id,
  style
) => {
  toast[type](message, { duration, id, style });
};

export const errorHandler = (error) => {
  showToast(
    error?.reason?.length || error?.data?.reason?.length
      ? error?.reason || error?.data?.reason
      : "Something went wrong, Try again after some time."
  );
};
