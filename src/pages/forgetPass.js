import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class forgetPass extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <section class="form-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p class="section-title">Forget Password</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <form class="booking-form">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Type your email"
                        />
                      </div>
                      <p class="form-notice">Will send an email open the link</p>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button
                        onClick={() => this.props.history.push('/reset-pass')}
                        class="submit-btn"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default withRouter(forgetPass);
