import React from 'react';
import logo from './logo.svg';
// import './style.css';
import './assets/css/style.css';
import './style.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import welcomeLogin from './pages/welcomeLogin';
import forgetPass from './pages/forgetPass';
import resetPass from './pages/resetPass';
import initialReset from './pages/initialReset';
import contactMe from './pages/contactMe';
import bookCourse from './pages/bookCourse';
import aboutMe from './pages/aboutMe';
import applyAssistance from './pages/applyAssistance';
import Homework from './pages/Homework';
import activeHomework from './pages/ActiveHomwork';
import Overview from './pages/Overview';
import Quizzes from './pages/Quizzes';
import ActiveQuizzes from './pages/ActiveQuizzes';
import error from './pages/error';
import index from './pages/index';
import videoDetails from './pages/videoDetails';
import SubmissionSuccess from './pages/SubmissionSuccess';
import ReviewQuiz from './pages/ReviewQuiz';
import onlineSessions from './pages/onlineSessions';
import onlineCourses from './pages/onlineCourses';
import Session from './pages/Session';
import Sessions from './pages/Sessions';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={index}></Route>
            <Route exact path="/overview" component={Overview}></Route>
            <Route exact path="/login" component={welcomeLogin}></Route>
            <Route exact path="/forget-pass" component={forgetPass}></Route>
            <Route exact path="/reset-pass" component={resetPass}></Route>
            <Route exact path="/initial-pass" component={initialReset}></Route>
            <Route exact path="/contact" component={contactMe}></Route>
            <Route exact path="/book" component={bookCourse}></Route>
            <Route exact path="/about" component={aboutMe}></Route>
            <Route exact path="/apply" component={applyAssistance}></Route>
            <Route exact path="/homework" component={Homework}></Route>
            <Route exact path="/online-sessions" component={onlineSessions}></Route>
            <Route exact path="/online-courses" component={onlineCourses}></Route>
            <Route exact path="/activeHomework" component={activeHomework}></Route>
            <Route exact path="/quiz" component={Quizzes}></Route>
            <Route exact path="/activeQuizzes" component={ActiveQuizzes}></Route>
            <Route exact path="/quiz/review" component={ReviewQuiz}></Route>
            <Route path="/video" component={videoDetails}></Route>
            <Route path="/SubmissionSuccess" component={SubmissionSuccess}></Route>
            <Route path="/session" component={Session}></Route>
            <Route path="/Sessions" component={Sessions}></Route>
            <Route component={error} />
          </Switch>
          <Footer />
        </React.Fragment>
      </CookiesProvider>
    </Provider>
  );
}

export default App;
