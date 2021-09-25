import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { actionTypes, userLogin, UserData, LoginData, loginSuccess, getAllNewsSuccess } from './actions'



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
    console.log(response);
    if(response.success)
        yield put(getAllNewsSuccess(response.news))
}

function* deleteNewsItem(action) {
    const response = yield call(callDeleteNewsItem, action.payload);
    if(action.resolve)
        action.resolve(response);
}

function* registerUser(action) {
    const response = yield call(callRegisterUser, action.payload);
    console.log('checkinggggg',response)
    if(action.resolve)
        action.resolve(response);
}


function* updateNewsItem (action) {
    console.log('checking action',action)
    const response = yield call(callUpdateNewsItem,action.payload,action.newsId);
    console.log(response);
}

function* addNewNewsItem (action) {
    const response = yield call(callAddNewsItem,action.payload);
    if(action.resolve)
        action.resolve(response);
}

function* logoutUser() {
    sessionStorage.clear();
}

function* logginInUser(action) {
    const response = yield call(signInUser, action.payload);
    console.log(response);
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
