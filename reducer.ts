import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  isUserLoggedIn: false,
  userInfo: {
    fname:'',
    lname:'',
    email:'',
    userId:''
  },
  news: [],
  notify:false
}

function reducer(state= initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoggedIn:true,
        ...{ userInfo: action.payload },
      }
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
        userInfo:initialState.userInfo,
      }
    case actionTypes.GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        news:action.payload
      }
    case actionTypes.CREATE_NOTIFICATION:
      return {
        ...state,
        notify: action.payload
      }
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notify: false
      }
    default:
      return state
  }
}

export default reducer
