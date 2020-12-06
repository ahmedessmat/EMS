import axios from 'axios';

import { QUIZZES, SET_MSG, GET_VIDEOS, GET_VIDEO, ACTIVE_QUIZZES, RECENT_QUIZZES, RECENT_HOMEWORK, ACTIVE_HOMEWORK, GRADED_QUIZZES, REVIEW_QUIZ, QUIZ_LOADING, ACTIVE_QUIZZES_LOADING, GRADED_HOMEWORKS, STREAMING_LOADING, STREAMINGS, ACTIVE_HOMEWORK_LOADING} from './types';

// const url ='http://68.183.30.130/fadyelfahdy/public/api/'
const url ='https://fadyelfahdy.net/api/'


export const getSessions = (token) => {
  return async(dispatch) => {
    dispatch({type: STREAMING_LOADING,state:true })
    axios.get(url+'streamings',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: STREAMINGS,data:response.data.streamings })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")
        dispatch({type: STREAMING_LOADING,state:false })

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        dispatch({type: STREAMING_LOADING,state:false })
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}


export const getQuizzes = (token,id) => {
  return async(dispatch) => {
    axios.get(url+'sheets/'+id,{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      if(response.status===200){
        dispatch({type: QUIZZES,data:response.data.sheet })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")
        dispatch({type: QUIZ_LOADING,state:false })

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        dispatch({type: QUIZ_LOADING,state:false })
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}

export const startQuizLoading = (st)=>{
  return async(dispatch) => {
  dispatch({type: QUIZ_LOADING,state:st })
  }
}

export const activeQuizzesLoading = ()=>{
  return async(dispatch) => {
  dispatch({type: ACTIVE_QUIZZES_LOADING })
  }
}

export const activeHomworkLoading = ()=>{
  return async(dispatch) => {
  dispatch({type: ACTIVE_HOMEWORK_LOADING })
  }
}

export const getActiveQuizzes = (token) => {
  return async(dispatch) => {
    axios.get(url+'sheets?type=quiz',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      if(response.status===200){
        dispatch({type: ACTIVE_QUIZZES,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}


export const getGradedQuizzes = (token,id) => {
  return async(dispatch) => {
    axios.get(url+'student/sheets?type=quiz',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: GRADED_QUIZZES,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}



export const getGradedHomework = (token,id) => {
  return async(dispatch) => {
    axios.get(url+'student/sheets?type=homework',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: GRADED_HOMEWORKS,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}


export const getGradedQuiz = (token,id) => {
  return async(dispatch) => {
    axios.get(url+'sheets/'+id+'/student',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: REVIEW_QUIZ,data:response.data })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}

export const getRecentQuizzes = (token) => {
  return async(dispatch) => {
    // alert("1")
    axios.get(url+'sheets/recent?type=quiz',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      if(response.status===200){
        dispatch({type: RECENT_QUIZZES,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        console.log(error)
        // alert("Network Error4")
      })  
  }
}

export const getActiveHomework = (token) => {
  return async(dispatch) => {
    axios.get(url+'sheets?type=homework',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: ACTIVE_HOMEWORK,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}

export const getRecentHomework = (token) => {
  return async(dispatch) => {
    axios.get(url+'sheets/recent?type=homework',{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: RECENT_HOMEWORK,data:response.data.sheets })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        console.log(error)
        // alert("Network Error4")
      })  
  }
}


export const submitQuiz = (sheetID,data,token,props) => {
  return async(dispatch) => {
    axios.post(url+'sheets/'+sheetID,data,{headers: {'Authorization': "Bearer " + token}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        props.history.push('/SubmissionSuccess')
        // dispatch({type: QUIZZES,data:response.data.sheets.data[0] })
        // nav.dispatch(NavigationActions.navigate({ routeName: 'App' }));
      }
      else{
        // dispatch({type: USER_EXISTS})
        console.log(response)
        console.log("else")

        // dispatch({type: SET_USER,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        // dispatch({type: USER_EXISTS}
        console.log(error.response)
        // alert("Network Error4")
      })  
  }
}




export const bookCourse = (data) => {
  return async(dispatch) => {
    axios.post(url+'course_requests', data)
    .then(async function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: SET_MSG,msg:"We received your request our team will contact you soon",status:'success' })
      }
      else{
        dispatch({type: SET_MSG,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        console.log(error)
        dispatch({type: SET_MSG,msg:'There is a network error',status:'fail'})
      })  
  }
}

export const applyAssistant = (data) => {
  return async(dispatch) => {
    axios.post(url+'assistant_requests', data)
    .then(async function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: SET_MSG,msg:"We received your request our team will contact you soon",status:'success' })
      }
      else{
        dispatch({type: SET_MSG,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        console.log(error)
        dispatch({type: SET_MSG,msg:'There is a network error',status:'fail'})
      })  
  }
}

export const contact = (data) => {
  return async(dispatch) => {
    axios.post(url+'/contactus', data)
    .then(async function (response) {
      console.log(response)
      if(response.status===200){
        dispatch({type: SET_MSG,msg:"We received your request our team will contact you soon",status:'success' })
      }
      else{
        dispatch({type: SET_MSG,msg:response.data.message,status:'fail' })
      }
    })
      .catch(function (error) {
        console.log(error)
        dispatch({type: SET_MSG,msg:'There is a network error',status:'fail'})
      })  
  }
}

export const getVideos = (token) => {
  return async(dispatch) => {
  return axios.get(url+'videos',{headers: {'AUTHORIZATION': 'Bearer ' + token}})
  .then(function (response) {
    if(response.status===200){
      console.log(response.data)
      dispatch({type: GET_VIDEOS,videos:response.data.videos})
  }
})
.catch(function (error) {
  console.log(error.response)
});
  }
}

export const getVideo = (token , id) => {
  return async(dispatch) => {
  return axios.get(url+'videos/'+id,{headers: {'AUTHORIZATION': 'Bearer ' + token}})
  .then(function (response) {
    if(response.status===200){
      console.log(response.data)
      dispatch({type: GET_VIDEO,video:response.data.video})
  }
})
.catch(function (error) {
  console.log(error.response)
});
  }
}