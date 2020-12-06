import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class resetPass extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
                <p class="section-title">Reset Password</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <form class="booking-form">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="pwd">Code</label>
                        <input class="form-control" id="pwd" placeholder="Code" />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="pwd">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="pwd"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="confirmPwd">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="confirmPwd"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button onClick={() => this.props.history.push('/')} class="submit-btn">
                        Submit
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
export default withRouter(resetPass);
