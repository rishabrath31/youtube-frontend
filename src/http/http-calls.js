import { BASE_URL } from "../config";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "./http-service";

// AUTH API CALLS
export const registerUser = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/user/signup`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const login = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/user/login`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getAllVideos = (payload) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/video/videos`, false, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const likeVideo = (id) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/video/like/${id}`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const dislikeVideo = (id) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/video/dislike/${id}`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const subscribe = (userId) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/user/subscribe/${userId}`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const unsubscribe = (userId) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/user/unsubscribe/${userId}`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const addCommentOnVideo = ({ id, payload }) => {
  return new Promise((resolve, reject) => {
    makePostRequest(`${BASE_URL}/comment/new-comment/${id}`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const deleteCommentFromVideo = (id) => {
  return new Promise((resolve, reject) => {
    makeDeleteRequest(`${BASE_URL}/comment/${id}`, true)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const getAllVideoComments = (id) => {
  return new Promise((resolve, reject) => {
    makeGetRequest(`${BASE_URL}/comment/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};

export const editComment = ({ id, payload }) => {
  return new Promise((resolve, reject) => {
    makePutRequest(`${BASE_URL}/comment/${id}`, true, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        console.log("API call error>>", e);
        reject(e);
      });
  });
};
