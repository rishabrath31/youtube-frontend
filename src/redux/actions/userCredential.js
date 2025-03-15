import { createAction } from "@reduxjs/toolkit";

const addUserCredential = createAction("addUserCredential");
const updateUserToken = createAction("updateUserToken");
const updateUserData = createAction("updateUserData");
const clearUserCredential = createAction("clearUserCredential");

export {
  addUserCredential,
  updateUserData,
  clearUserCredential,
  updateUserToken,
};
