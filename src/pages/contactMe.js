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

class contactMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      fail: false,
      msg: '',
      firstName: '',
      lastName: '',
      phone: '',
      mail: '',
      message: '',
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

  ValidateMobile(inputtxt) {
    if (!inputtxt) {
      return true;
    }
    var phoneno = /^\d{11}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }

  componentWillReceiveProps({ msg, status }) {
    console.log(status);
    if (status == 'success') {
      this.setState({ success: true });
    } else {
      this.setState({ fail: true, miss: true });
    }
    this.setState({ msg: msg });
  }

  book() {
    if (!this.ValidateEmail(this.state.mail)) {
      this.setState({ fail: true, msg: 'You have entered an invalid email address!' });
    } else if (!this.ValidateMobile(this.state.phone)) {
      this.setState({ fail: true, msg: 'You have entered an invalid mobile number!' });
    } else {
      var form = new FormData();
      form.append('first_name', this.state.firstName);
      form.append('last_name', this.state.lastName);
      form.append('email', this.state.mail);
      form.append('mobile', this.state.phone);
      form.append('message', this.state.message);
      this.props.contact(form);
    }
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.success}
          onRequestClose={() => {
            this.setState({ success: false });
          }}
          style={customStyles}
          ariaHideApp={false}
        >
          <div class="modal-dialog modal-confirm">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Awesome !!</h4>
              </div>
              <div class="modal-body">
                <p class="text-center">{this.state.msg}</p>
              </div>
              <div class="modal-footer">
                <button
                  onClick={() => {
                    this.setState({ fail: false });
                    this.props.history.push('/');
                  }}
                  class="btn btn-success btn-block"
                  data-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </Modal>

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
                <p class="section-title">Contact Me</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="booking-form">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="usr">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="usr"
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={(text) => this.setState({ firstName: text.target.value })}
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="last-usr">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="last-usr"
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={(text) => this.setState({ lastName: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input
                          type="text"
                          class="form-control"
                          id="phone"
                          placeholder="Phone"
                          value={this.state.phone}
                          onChange={(text) => this.setState({ phone: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Email"
                          value={this.state.mail}
                          onChange={(text) => this.setState({ mail: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="message">Your Message</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          id="message"
                          placeholder="message"
                          value={this.state.message}
                          onChange={(text) => this.setState({ message: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button onClick={() => this.book()} class="submit-btn">
                        Send
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
    msg: state.app.msg,
    status: state.app.status,
  };
};

export default withRouter(connect(mapStateToProps, actions)(contactMe));
