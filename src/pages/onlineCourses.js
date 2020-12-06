import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppCarousel from './../components/AppCarousel';

import * as actions from '../actions';
import { connect } from 'react-redux';

class onlineCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardDataSection4: [],
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getVideos(this.props.user);
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      this.props.getVideos(token);
    } else {
      this.props.history.push('/login');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.videos !== prevState.videos) {
      update.cardDataSection4 = nextProps.videos;
    }
    return update;
  }
  render() {
    return (
      <div className="overview">
        <div className="headerMargin"></div>
        <AppCarousel
          carouselTitle="Recent Videos"
          cardData={this.state.cardDataSection4}
          isVideo={true}
          linkText="View Video"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    videos: state.app.videos,
  };
};

export default withRouter(connect(mapStateToProps, actions)(onlineCourses));
