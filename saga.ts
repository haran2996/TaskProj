import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { actionTypes, userLogin, UserData, LoginData, loginSuccess, getAllNewsSuccess, createNotification, removeNotification } from './actions'



function* rootSaga() {
  yield all([
    takeLatest(actionTypes.USER_LOGIN, logginInUser),
    takeLatest(actionTypes.USER_REGISTER, registerUser),
    takeLatest(actionTypes.GET_USER_DETAILS, copyUserSessionToState),
    takeLatest(actionTypes.USER_LOGOUT,logoutUser),
    takeLatest(actionTypes.ADD_NEW_NEWSITEM,addNewNewsItem),
    takeLatest(actionTypes.GET_ALL_NEWS,getAllNews),
    takeLatest(actionTypes.GET_NEWSITEM,getNewsItem),
    takeLatest(actionTypes.UPDATE_NEWSITEM,updateNewsItem),
    takeLatest(actionTypes.DELETE_NEWSITEM,deleteNewsItem),
  ])
}

const callDeleteNewsItem = (newsId) => {
    return fetch(`http://localhost:3000/api/news/${newsId}`,{
        method:'delete'
    })
    .then(resp=>resp.json()).catch(error=>error);
}

const callGetNewsItem = (newsId) => {
    return fetch(`http://localhost:3000/api/news/${newsId}`)
    .then(resp=>resp.json()).catch(error=>error);
}

const callGetAllNews = () => {
    return fetch('http://localhost:3000/api/news')
        .then(resp=>resp.json()).catch(error=>error);
}

function* getNewsItem(action){
    const response = yield call(callGetNewsItem, action.payload);
    if(action.resolve)
        action.resolve(response);
}

function* getAllNews(){
    const response = yield call(callGetAllNews);
    if(response.success)
        yield put(getAllNewsSuccess(response.news))
}

function* deleteNewsItem(action) {
    const response = yield call(callDeleteNewsItem, action.payload);
    if(action.resolve){
        action.resolve(response);
        yield put(createNotification({
            title: 'Success',
            message: 'News has been Deleted'
        }))
    }
    
}

function* registerUser(action) {
    const response = yield call(callRegisterUser, action.payload);
    if(action.resolve){
        action.resolve(response);
        yield put(createNotification({
            title: 'Success',
            message: 'User is registered'
        }))
    }
    
}


function* updateNewsItem (action) {
    const response = yield call(callUpdateNewsItem,action.payload,action.newsId);
    if(response.success){
        yield put(createNotification({
            title: 'Success',
            message: 'News has been Updated'
        }))
    }
}

function* addNewNewsItem (action) {
    const response = yield call(callAddNewsItem,action.payload);
    if(action.resolve){
        action.resolve(response);
        yield put(createNotification({
            title: 'Success',
            message: 'News has been Published'
        }))
    }

}

function* logoutUser() {
    sessionStorage.clear();
}

function* logginInUser(action) {
    const response = yield call(signInUser, action.payload);
    if(action.resolve)
        action.resolve(response);
    if(response.success){
        window.sessionStorage.setItem('currentUser',response.user.userId);
        yield put(loginSuccess(response.user));
    }
}

function* copyUserSessionToState(action) {
    const response = yield call(callGetUserInfo, action.payload);
    yield put(loginSuccess(response.user))
}

const callAddNewsItem = (newsData)=> {
    return fetch('http://localhost:3000/api/news',{
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            newsData
        })
    }).then(resp=>resp.json()).catch(error=>error);
}

const callUpdateNewsItem = (newsData,newsId)=> {
    return fetch(`http://localhost:3000/api/news/${newsId}`,{
        method: 'put',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            newsData
        })
    }).then(resp=>resp.json()).catch(error=>error);
}

const callGetUserInfo = (userId) => {
    return fetch(`http://localhost:3000/api/users/${userId}`)
        .then(resp=>resp.json())
        .catch(error=>error);
}
const callRegisterUser = (userData: UserData) => {
    return fetch('http://localhost:3000/api/users',{
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            userData: userData
        }),
    }).then(resp=>resp.json()).catch(error=>error);
}
const signInUser = (loginData: LoginData) => {
    return fetch('http://localhost:3000/api/login',{
        method: 'post',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            userData: loginData
        }),
    }).then(resp=>resp.json()).catch(error=>error);
}



export default rootSaga
