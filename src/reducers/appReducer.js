import {
  QUIZZES,
  ACTIVE_QUIZZES,
  RECENT_QUIZZES,
  SET_MSG,
  GET_VIDEOS,
  GET_VIDEO,
  RECENT_HOMEWORK,
  ACTIVE_HOMEWORK,
  GRADED_QUIZZES,
  REVIEW_QUIZ,
  QUIZ_LOADING,
  ACTIVE_QUIZZES_LOADING,
  GRADED_HOMEWORKS,
  STREAMINGS,
  STREAMING_LOADING,
  ACTIVE_HOMEWORK_LOADING,
} from '../actions/types';

const initialState = {
  quiz: {},
  activeQuizzes: [],
  quizzesLoading: true,
  gradedQuizzesLoading: true,
  recentQuizzes: [],
  gradedQuizzes: [],
  gradedHomeworks: [],
  homeworkLoading: true,
  gradedHomeworkLoading: true,
  reviewQuiz: {},
  recentHomework: [],
  activeHomework: [],
  quizLoading: true,
  status: '',
  msg: '',
  videos: [],
  video: {},
  reviewQuizLoading: true,
  streamings: [],
  streamingsLoading: true,
};
export default (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case QUIZZES:
      return { ...state, quiz: action.data, quizLoading: false };
    case QUIZ_LOADING:
      return { ...state, quizLoading: action.state };
    case ACTIVE_QUIZZES:
      return { ...state, activeQuizzes: action.data, quizzesLoading: false };
    case ACTIVE_QUIZZES_LOADING:
      return { ...state, quizzesLoading: true, gradedQuizzesLoading: true };
    case ACTIVE_HOMEWORK:
      return { ...state, activeHomework: action.data, homeworkLoading: false };
    case ACTIVE_HOMEWORK_LOADING:
      return { ...state, homeworkLoading: true, gradedHomeworkLoading: true };
    case RECENT_QUIZZES:
      return { ...state, recentQuizzes: action.data };
    case GRADED_QUIZZES:
      return { ...state, gradedQuizzes: action.data, gradedQuizzesLoading: false };
    case GRADED_HOMEWORKS:
      return { ...state, gradedHomeworks: action.data, gradedHomeworkLoading: false };
    case RECENT_HOMEWORK:
      return { ...state, recentHomework: action.data };
    case REVIEW_QUIZ:
      return { ...state, reviewQuiz: action.data, reviewQuizLoading: false };
    case SET_MSG:
      return { ...state, msg: action.msg, status: action.status };
    case GET_VIDEOS:
      return { ...state, videos: action.videos };
    case GET_VIDEO:
      return { ...state, video: action.video };
    case STREAMINGS:
      return { ...state, streamings: action.data, streamingsLoading: false };
    case STREAMING_LOADING:
      return { ...state, streamingsLoading: action.state };
    default:
      return state;
  }
};
