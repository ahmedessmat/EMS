import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SubmissionSuccess extends Component {
  componentDidMount() {
    if (this.props.user) {
      //   this.props.getQuizzes(this.props.user,this.props.location.state.quiz.id)
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      //   this.props.getQuizzes(token);
    } else {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        <div className="headerMargin" style={{ textAlign: 'center' }}>
          <h2 style={{ marginTop: '15rem', marginBottom: '15rem' }}>
            Your answers have been submitted Successfully!
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.app.quiz,
  user: state.auth.user,
});

export default connect(mapStateToProps, actions)(SubmissionSuccess);
