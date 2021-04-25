import { /* requestPost, */ requestGet } from "../../services/network";
import  { apiUrl }  from "../../libs/consts";
import { handleError } from "../error/ErrorActions";
import { setItem } from "../../services/utils";

export const userActionType = {
  init: "user/init",
  logout: "user/logout",
};

export const userInit = (token) => async (dispatch) => {
  try {
    if (!token) {
      return;
    }
    const user = await requestGet({
      url: apiUrl + "/admins/token/" + token,
    });
    dispatch({ type: userActionType.init, token, user });
  } catch (error) {
    dispatch(handleError({ error, open: false }));
  }
};
export const userSignOut = (history) => (dispatch) => {
  setItem("token", "");
  dispatch({
    type: userActionType.logout,
  });
  history.replace("/");
};
