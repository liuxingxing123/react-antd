import actionTypes from "../actions/actionsTypes";
const isLogin =
  Boolean(window.localStorage.getItem("authToken")) ||
  Boolean(window.sessionStorage.getItem("authToken"));
const userInfo =
  JSON.parse(window.localStorage.getItem("userInfo")) ||
  JSON.parse(window.sessionStorage.getItem("userInfo"));
const initState = {
  ...userInfo,
  isLogin,
  isLoading: false
};
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLogin: true,
        isLoading: false
      };
    case actionTypes.LOGIN_FAILED:
      return {
        id: "",
        displayName: "",
        avator: "",
        role:"",
        isLogin: false,
        isLoading: false
      };
      case actionTypes.CHANGE_AVATOR:
          return {
              ...state,
                avator:action.payload.avatorUrl
          }
    default:
      return state;
  }
};
