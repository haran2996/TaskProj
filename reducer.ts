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
  news: []
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
    default:
      return state
  }
}

export default reducer
