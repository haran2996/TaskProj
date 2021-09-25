export const actionTypes = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_REGISTER: 'USER_REGISTER',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    GET_USER_DETAILS: 'GET_USER_DETAILS',
    USER_LOGOUT: 'USER_LOGOUT',
    ADD_NEW_NEWSITEM: 'ADD_NEW_NEWSITEM',
    ADD_NEWSITEM_SUCCESS: 'ADD_NEWSITEM_SUCCESS',
    GET_ALL_NEWS: 'GET_ALL_NEWS',
    GET_ALL_NEWS_SUCCESS: 'GET_ALL_NEWS_SUCCESS',
    GET_NEWSITEM: 'GET_NEWSITEM',
    UPDATE_NEWSITEM:'UPDATE_NEWSITEM',
    DELETE_NEWSITEM: 'DELETE_NEWSITEM',
    CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
  };

export type LoginData = {
    email: String;
    password: String;
}
export type NotificationObject = {
  title: string;
  message: string;
}

export type UserData = {
    fname: String;
    lname: String;
    password: String;
    email: String;
}

export type NewsItem = {
  title: String;
  story: String;
}

export const getNewsItem = (newsId,resolve)=>{
  return {
    type: actionTypes.GET_NEWSITEM,
    payload: newsId,
    resolve
  }
}

export const createNotification = (notificationObj:NotificationObject) => {
  return {
    type: actionTypes.CREATE_NOTIFICATION,
    payload: notificationObj
  }
}

export const removeNotification = () => {
  return {
    type: actionTypes.REMOVE_NOTIFICATION,
  }
}

export const getAllNews = () => {
  return {
    type: actionTypes.GET_ALL_NEWS,
  }
}

export const getAllNewsSuccess = (news) => {
  return {
    type: actionTypes.GET_ALL_NEWS_SUCCESS,
    payload: news
  }
}

export const deleteNewsItem = (newsId:string, resolve: any) => {
  return {
    type: actionTypes.DELETE_NEWSITEM,
    payload: newsId,
    resolve
  }
}

export const updateNewsItem = (newsItem:NewsItem, newsId:string) => {
  return {
    type: actionTypes.UPDATE_NEWSITEM,
    payload: newsItem,
    newsId
  }
}

export const addNewNewsItem = (newsItem:NewsItem, resolve:any) => {
  return {
    type: actionTypes.ADD_NEW_NEWSITEM,
    payload: newsItem,
    resolve
  }
}

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  }
}

export const userLogin = (userData: LoginData, resolve: any) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload: userData,
    resolve
  }
}

export const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: userInfo
  }
}

export const fetchUserDetail = (userId: string) => {
  return {
    type: actionTypes.GET_USER_DETAILS,
    payload: userId
  }
}

export const userRegister = (userData: UserData,resolve: any) => {
  return {
    type: actionTypes.USER_REGISTER,
    payload: userData,
    resolve
  }
}
