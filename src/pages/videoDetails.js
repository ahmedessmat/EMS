import React, { Component } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import * as actions from '../actions';
import { connect } from 'react-redux';

class videoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      var videoID = this.props.location.pathname.replace('/video/', '');
      this.props.getVideo(this.props.user, videoID);
    } else if (sessionStorage.getItem('user')) {
      var token = sessionStorage.getItem('user');
      this.props.updateToken(token);
      var videoID = this.props.location.pathname.replace('/video/', '');
      this.props.getVideo(token, videoID);
    } else {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps({ video }) {
    this.setState({ video: video });
    console.log(video);
  }
  render() {
    return (
      <div>
        {/* <p>{"https://player.vimeo.com/video/"+JSON.stringify(this.state.video.link.split('/')[this.state.video.link.split('/').length-1])}</p> */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <Vimeo
                    video="453374766"
                    style={{width:900,height:900}}
                    // autoplay
                /> */}
        {this.state.video ? (
          <div style={{ width: '80%', marginLeft: '10%' }}>
            <div style={{ background: 'black', marginBottom: '50px' }}>
              <iframe
                src={
                  'https://player.vimeo.com/video/' +
                  this.state.video.link.split('/')[this.state.video.link.split('/').length - 2]
                }
                width="100%"
                height="450px"
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen=""
                data-ready="true"
              ></iframe>
            </div>
            <p>
              <big>{this.state.video.title}</big> - <small> {this.state.video.subtitle}</small>
            </p>
            <p>{this.state.video.description}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    video: state.app.video,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, actions)(videoDetails);
