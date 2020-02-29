import actionsTypes from "../actions/actionsTypes";
const initState = {
    isLoading: false,
  list: [
    {
      id: 1,
      title: "Ant Design, a design language for background11111",
      desc:
        "11111Lorem ip把Google Play商店的缓存和数据清除,然后再登录谷歌账号。使用SmartHosts切换host文件。打开设置～移动网络～接入点名称(apn)～cmwap(移动)。用re管理器读写模式进入system/etc文件夹下删除hosts。到google账户管理页面去撤消访问权限。",
      hasRead: false
    },
    {
      id: 2,
      title: "Ant Design, a design language for background22222",
      desc:
        "22222Lorem ip把Google Play商店的缓存和数据清除,然后再登录谷歌账号。使用SmartHosts切换host文件。打开设置～移动网络～接入点名称(apn)～cmwap(移动)。用re管理器读写模式进入system/etc文件夹下删除hosts。到google账户管理页面去撤消访问权限。",
      hasRead: true
    }
  ]
};
export default (state = initState, action) => {
  switch (action.type) {
    case actionsTypes.RECEVIED_NOTIFICATIONS:
        return {
          ...state,
          list: action.payload.list
        };
    case actionsTypes.START_MARK_AS_READ:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.FINISH_MARK_AS_READ:
      return {
        ...state,
        isLoading: false
      };
    case actionsTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true;
        }
        return item;
      });
      return {
        ...state,
        list: newList
      };
    case actionsTypes.MAEK_ALL_NOTIFICATIONS_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true;
          return item;
        })
      };

    default:
      return state;
  }
};
