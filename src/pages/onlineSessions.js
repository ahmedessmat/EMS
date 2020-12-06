import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import errorImage from '../images/ComingSoon.png';

class onlineSessions extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <section class="image-section">
          <div class="container">
            <div class="row">
              <div class="col-md-5 offset-md-4">
                <p class="section-title">Oops</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10 offset-md-1 col-sm-8 offset-sm-2 text-center">
                <img src={errorImage} class="img-fluid" />
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-10 offset-md-1 col-sm-8 offset-sm-2 text-center">
                <p class="notice-msg">
                  Don't worry we are working on it you can click{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.props.history.push('/overview')}
                  >
                    here
                  </a>{' '}
                  to return back to the overview
                </p>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
      </div>
    );
  }
}
export default withRouter(onlineSessions);
