import { userActionType } from "./UserActions";

const initUser = {
  signed: ""
};

export default function user(state = initUser, action) {
  switch (action.type) {
    case "user/logout":
      return { ...initUser };
    case "user/init":
      return {
        ...state,
        ...action.user,
        token: action.token,
        signed: true,
      };
    default:
      return state;
  }
}
