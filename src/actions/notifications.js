import { getNotifications } from "../requests";
import actionType from "./actionsTypes";

export const markNotificationsAsReadById = id => {
  return dispatch => {
    dispatch(startMarkAsRead());
    setTimeout(() => {
      dispatch({
        type: actionType.MARK_NOTIFICATIONS_AS_READ_BY_ID,
        payload: { id }
      });
      dispatch(finishMarkAsRead());
    }, 2000);
  };
};

export const markAllNotificationsRead = () => {
  return dispatch => {
    dispatch(startMarkAsRead());
    setTimeout(() => {
      dispatch({
        type: actionType.MAEK_ALL_NOTIFICATIONS_AS_READ
      });
      dispatch(finishMarkAsRead());
    }, 2000);
  };
};

export const getNotificationsList = () => {
  return dispatch => {
    dispatch(startMarkAsRead());
    getNotifications().then(resp => {
        dispatch({
            type:actionType.RECEVIED_NOTIFICATIONS,
            payload:{
                list:resp.list
            }
        })
      dispatch(finishMarkAsRead());
      
    });
  };
};

export const startMarkAsRead = () => {
  return {
    type: actionType.START_MARK_AS_READ
  };
};
export const finishMarkAsRead = () => {
  return {
    type: actionType.FINISH_MARK_AS_READ
  };
};
