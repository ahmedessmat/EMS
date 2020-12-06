import React, { Component } from 'react'
import AppCarousel from "../components/AppCarousel";
import { connect} from 'react-redux';
import * as actions from '../actions';
import AppCard from "./../components/AppCard";

class ActiveQuizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
            loading:true,
            gradedQuizzes:[],
    }
}


componentDidMount(){
  this.props.activeQuizzesLoading();
    if(this.props.user){
      this.props.getActiveQuizzes(this.props.user)
      this.props.getGradedQuizzes(this.props.user);
    }
    else if(sessionStorage.getItem('user')){
      var token = sessionStorage.getItem('user')
      this.props.updateToken(token)
      this.props.getActiveQuizzes(token);
      this.props.getGradedQuizzes(token);
    }
    else{
      this.props.history.push('/login')
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    let update={}
    if(nextProps.quizzes!==prevState.quizzes){
      update.quizzes= nextProps.quizzes;
    }
    if(nextProps.gradedQuizzes!==prevState.gradedQuizzes){
      update.gradedQuizzes= nextProps.gradedQuizzes;
    }
    if(nextProps.gradedQuizzesLoading!==prevState.gradedQuizzesLoading){
      update.gradedQuizzesLoading= nextProps.gradedQuizzesLoading;
    }
    if(nextProps.quizzesLoading!==prevState.quizzesLoading){
      update.quizzesLoading= nextProps.quizzesLoading;
    }
    return update;
}
componentDidUpdate(prevProps, prevState) {
  if(this.props.gradedQuizzesLoading !==prevProps.gradedQuizzesLoading){
    if (this.props.gradedQuizzesLoading==false && this.props.quizzesLoading==false) {
      this.setState({loading:false})
  }
  }

  if(this.props.quizzesLoading !==prevProps.quizzesLoading){
    if (this.props.gradedQuizzesLoading==false && this.props.quizzesLoading==false) {
      this.setState({loading:false})
  }
  }

}

    render() {
        return (
          <div>
        {this.state.loading?
         <div className="headerMargin">
         <div class="loader"></div>
         </div>
         :
         <div>
        <div className="headerMargin"></div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-11">
              <h3 className="text-primary mt-5 mb-3">Quizzes</h3>
              <div className="row justify-content-center">
                {this.state.quizzes.map((singleCard, i) => (
                  <div key={i} className="col-12 col-lg-3">
                    <AppCard  showButton={true} cardData={singleCard} cardImg= "quiz" linkText="Start Quiz" quiz={singleCard}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-11">
              <h3 className="text-primary mt-5 mb-3">Graded Quizzes</h3>
              <div className="row justify-content-center">
                {this.state.gradedQuizzes.map((singleCard, i) => (
                  <div key={i} className="col-12 col-lg-3">
                    <AppCard  showButton={true} cardData={singleCard} cardImg= "quiz" showGrade={true} linkText="Review Quiz" quiz={singleCard}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    }
    </div>
        )
    }
}

const mapStateToProps = state => ({
  quizzes:state.app.activeQuizzes,
  quizzesLoading:state.app.quizzesLoading,
  gradedQuizzes:state.app.gradedQuizzes,
  gradedQuizzesLoading:state.app.gradedQuizzesLoading,
  user:state.auth.user,
  })
  
  export default connect(mapStateToProps, actions)(ActiveQuizzes);