import React, { Component } from 'react';
import AppCarousel from '../components/AppCarousel';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AppCard from './../components/AppCard';

class ActiveHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      homeworks: [
        // {
        //   cardImg: card201,
        //   cardTitle: "Title!",
        //   cardSubtitle: "Subtitle",
        //   cardText:
        //     "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        //   cardGrade: "70/100",
        //   cardLinkText: "View Results",
        //   cardLink: "",
        //   isVideo: false,
        // },
        // {
        //   cardImg: card202,
        //   cardTitle: "Title!",
        //   cardSubtitle: "Subtitle",
        //   cardText:
        //     "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        //   cardGrade: "Expire 20/08/2020",
        //   cardLinkText: "Start Homework",
        //   cardLink: "",
        //   isVideo: false,
        // },
        // {
        //   cardImg: card203,
        //   cardTitle: "Title!",
        //   cardSubtitle: "Subtitle",
        //   cardText:
        //     "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        //   cardGrade: "50/100",
        //   cardLinkText: "View Results",
        //   cardLink: "",
        //   isVideo: false,
        // },
      ],
    };
  }

  componentDidMount() {
    this.props.activeHomworkLoading();
    if (this.props.user) {
      this.props.getActiveHomework(this.props.user);
      this.props.getGradedHomework(this.props.user);
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      this.props.getActiveHomework(token);
      this.props.getGradedHomework(token);
    } else {
      this.props.history.push('/login');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.homeworks !== prevState.homeworks) {
      update.homeworks = nextProps.homeworks;
    }
    if (nextProps.gradedHomeworks !== prevState.gradedHomeworks) {
      update.gradedHomeworks = nextProps.gradedHomeworks;
    }
    if (nextProps.gradedHomeworksLoading !== prevState.gradedHomeworksLoading) {
      update.gradedHomeworksLoading = nextProps.gradedHomeworksLoading;
    }
    if (nextProps.homeworkLoading !== prevState.homeworkLoading) {
      update.homeworkLoading = nextProps.homeworkLoading;
    }
    return update;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.gradedHomeworksLoading !== prevProps.gradedHomeworksLoading) {
      if (this.props.gradedHomeworksLoading == false && this.props.homeworkLoading == false) {
        this.setState({ loading: false });
      }
    }

    if (this.props.homeworkLoading !== prevProps.homeworkLoading) {
      if (this.props.gradedHomeworksLoading == false && this.props.homeworkLoading == false) {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="headerMargin">
            <div class="loader"></div>
          </div>
        ) : (
          <div>
            {/* <HeaderNav /> */}
            <div className="headerMargin"></div>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-11">
                  <h3 className="text-primary mt-5 mb-3">Homework</h3>
                  <div className="row justify-content-center">
                    {this.state.homeworks.map((singleCard, i) => (
                      <div key={i} className="col-12 col-lg-3">
                        <AppCard
                          showButton={true}
                          cardData={singleCard}
                          cardImg="homework"
                          linkText="Start HomeWork"
                          quiz={singleCard}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-11">
                  <h3 className="text-primary mt-5 mb-3">Graded Homework</h3>
                  <div className="row justify-content-center">
                    {this.state.gradedHomeworks.map((singleCard, i) => (
                      <div key={i} className="col-12 col-lg-3">
                        <AppCard
                          showButton={true}
                          cardData={singleCard}
                          cardImg="quiz"
                          showGrade={true}
                          linkText="Review Quiz"
                          quiz={singleCard}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <AppFooter /> */}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  homeworks: state.app.activeHomework,
  homeworkLoading: state.app.homeworkLoading,
  user: state.auth.user,
  gradedHomeworks: state.app.gradedHomeworks,
  gradedHomeworksLoading: state.app.gradedHomeworkLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, actions)(ActiveHomework);
