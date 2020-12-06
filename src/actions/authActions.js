import axios from 'axios';
import Cookies from 'universal-cookie';

import { LOG_IN, TOKEN, INIT_PASS, LOG_OUT } from './types';

const cookies = new Cookies();

// export const loginLoading = () => {
//   return async(dispatch) => {

//   dispatch({type: LOGIN_LOADING,loadingStatus:true })
//   }
// }
const url ='https://fadyelfahdy.net/api/'
// const url ='http://68.183.30.130/fadyelfahdy/public/api/'


export const registerUser = (data,remember) => {
  return async(dispatch) => {
    axios.post(url+'login', data)
    .then(async function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: LOG_IN,user:response.data.success.token,userData:response.data.user,active:response.data.is_active,msg:response.data.message,status:'success' })
        sessionStorage.setItem('user',response.data.success.token)
        sessionStorage.setItem('userData',JSON.stringify(response.data.user))
        console.log(remember)
        if(remember){
          console.log("I will never forget you")
          cookies.set('user', response.data.success.token, { path: '/' });
          cookies.set('userData', response.data.user, { path: '/' });
        }
      }
      else{
        dispatch({type: LOG_IN,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        console.log(error)
        console.log(error.response)
        dispatch({type: LOG_IN,msg:'Sorry, Wrong Email or Password',status:'fail' })
      })  
  }
}

export const logout = () => {
  return async(dispatch) => {
    dispatch({type: LOG_OUT,user:''})
    sessionStorage.removeItem('user')
    cookies.remove('user', { path: '/' });
    cookies.remove('userData', { path: '/' });
  }
}

export const initialReset = (token, data) => {
  console.log("func")
  return async(dispatch) => {
    axios.post(url+'password', data, {headers: {'AUTHORIZATION': 'Bearer ' + token}})
    .then(async function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: INIT_PASS,msg:response.data.message,status:'success-init' })
      }
      else{
        dispatch({type: INIT_PASS,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        console.log(error)
        dispatch({type: INIT_PASS,msg:'Sorry, there is a network error',status:'fail' })
      })  
  }
}

export const updateToken = (token) => {
  return async(dispatch) => {
    let userData=cookies.get('userData')
    dispatch({type: TOKEN,user:token,userData :userData})
    sessionStorage.setItem('user',token)
    sessionStorage.setItem('userData',userData)
  }
}