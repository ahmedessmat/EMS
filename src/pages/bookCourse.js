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

class bookCourse extends Component {
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
      school: '',
      location: '',
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
      form.append('school', this.state.school);
      form.append('location', this.state.location);
      this.props.bookCourse(form);
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
                <p class="section-title">Book a Course</p>
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
                        <label for="school">School</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="School"
                          value={this.state.school}
                          onChange={(text) => this.setState({ school: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="pwd">Location</label>
                        <input
                          type="text"
                          class="form-control"
                          id="pwd"
                          placeholder="Tagamoa | Naser City | Mohandessin"
                          value={this.state.location}
                          onChange={(text) => this.setState({ location: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button onClick={() => this.book()} class="submit-btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default withRouter(connect(mapStateToProps, actions)(bookCourse));
