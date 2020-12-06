import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
  },
};

class welcomeLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mail: '',
      pass: '',
      remember: false,
    };
  }

  ValidateEmail(inputText) {
    if (!inputText) {
      return true;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  componentWillReceiveProps({ msg, status, active }) {
    console.log(status);
    if (status == 'success') {
      if (active == 0) {
        this.props.history.push('/initial-pass');
      } else {
        this.props.history.push('/overview');
      }
    } else {
      this.setState({ fail: true, miss: true });
    }
    this.setState({ msg: msg });
  }

  login() {
    if (!this.ValidateEmail(this.state.mail)) {
      this.setState({ fail: true, msg: 'You have entered an invalid email address!' });
    } else {
      var form = new FormData();
      form.append('email', this.state.mail);
      form.append('password', this.state.pass);
      console.log(this.state.remember);
      this.props.registerUser(form, this.state.remember);
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.fail}
          onRequestClose={() => {
            this.setState({ fail: false });
          }}
          style={customStyles}
          ariaHideApp={false}
        >
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Failed !!</h4>
              </div>
              <div class="modal-body">
                <p class="text-center">{this.state.msg}</p>
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => {
                    this.setState({ fail: false });
                  }}
                  style={{ backgroundColor: '#ee3535' }}
                  class="btn btn-success btn-block"
                  data-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <br />
        <br />
        <br />
        <br />
        <section class="form-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <p class="section-title">Welcome Back</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="booking-form">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Type your email"
                          value={this.state.mail}
                          onChange={(text) => this.setState({ mail: text.target.value })}
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="pwd">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          value={this.state.pass}
                          onChange={(text) => this.setState({ pass: text.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <a
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.props.history.push('/forget-pass')}
                      >
                        <p class="form-notice">Forget Password?</p>
                      </a>
                    </div>
                    <div className="col-md-3">
                      <input
                        style={{ marginRight: 10 }}
                        type="checkbox"
                        checked={this.state.remember}
                        name="lsRememberMe"
                        onChange={() => {
                          this.setState({ remember: !this.state.remember });
                        }}
                      />
                      <label>Remember me</label>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button onClick={() => this.login()} class="submit-btn">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
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

const mapStateToProps = (state) => {
  return {
    // user:state.auth.user,
    msg: state.auth.msg,
    status: state.auth.status,
    active: state.auth.active,
  };
};

export default withRouter(connect(mapStateToProps, actions)(welcomeLogin));
