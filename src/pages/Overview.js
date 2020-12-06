import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppCarousel from './../components/AppCarousel';

import card101 from './../assets/card101.png';
import card102 from './../assets/card102.png';
import card103 from './../assets/card103.png';
import card104 from './../assets/card104.png';
import card201 from './../assets/card201.png';
import card202 from './../assets/card202.png';
import card203 from './../assets/card203.png';
import card204 from './../assets/card204.png';
import card301 from './../assets/card301.png';
import card302 from './../assets/card302.png';
import card303 from './../assets/card303.png';
import card304 from './../assets/card304.png';

import * as actions from '../actions';
import { connect } from 'react-redux';
import VideoCard from '../components/videoCard';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentQuizzes: [],
      recentHomework: [],
      cardDataSection1: [],
      cardDataSection2: [],
      cardDataSection3: [],
      cardDataSection4: [],
    };
  }

  componentDidMount() {
    // this.detectDevTool()

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
    if (this.props.user) {
      this.props.getVideos(this.props.user);
      this.props.getRecentQuizzes(this.props.user);
      this.props.getRecentHomework(this.props.user);
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      this.props.getVideos(token);
      this.props.getRecentQuizzes(token);
      this.props.getRecentHomework(token);
    } else {
      this.props.history.push('/login');
    }
  }

  //   componentWillReceiveProps({videos}){
  //     this.setState({cardDataSection4:videos})
  //     console.log(videos)
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.videos !== prevState.videos) {
      update.cardDataSection4 = nextProps.videos;
    }
    if (nextProps.recentQuizzes !== prevState.recentQuizzes) {
      update.recentQuizzes = nextProps.recentQuizzes;
    }
    if (nextProps.recentHomework !== prevState.recentHomework) {
      update.recentHomework = nextProps.recentHomework;
    }
    return update;
  }

  render() {
    return (
      <div className="overview">
        <div className="headerMargin"></div>
        {/* <AppCarousel
          carouselTitle="Announcement"
          cardData={this.state.cardDataSection1}
          isVideo={false}
          linkText="Read More"
        /> */}
        {/* <AppCarousel
          carouselTitle="Recent Homework"
          cardData={this.state.recentHomework}
          isVideo={false}
          linkText="Start Homework"
        /> */}
        {/* <AppCarousel
          carouselTitle="Recent Quizzes"
          cardData={this.state.recentQuizzes}
          isVideo={false}
          linkText="Start Quizz"
        /> */}
        {/* <AppCarousel
          carouselTitle="Recent Videos"
          cardData={this.state.cardDataSection4}
          isVideo={true}
          linkText="View Video"
        /> */}
        <div className="videosContainer">
          {this.state.cardDataSection4.map((video, videoIndex) => (
            <VideoCard isVideo={true} linkText="View Video" cardData={video} quiz={video} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    videos: state.app.videos,
    recentQuizzes: state.app.recentQuizzes,
    recentHomework: state.app.recentHomework,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Overview));
