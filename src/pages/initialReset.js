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

class initialReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: '',
      confPass: '',
      msg: '',
      fail: false,
    };
  }

  componentWillReceiveProps({ msg, status }) {
    console.log(status);
    if (status == 'success-init') {
      this.props.history.push('/overview');
    } else {
      this.setState({ fail: true, miss: true });
    }
    this.setState({ msg: msg });
  }

  reset() {
    if (this.props.user) {
      if (this.state.pass == this.state.confPass) {
        var form = new FormData();
        form.append('password', this.state.pass);
        form.append('confirm_password', this.state.confPass);
        this.props.initialReset(this.props.user, form);
      }
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
                <p class="section-title">Enter Your First Password</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="booking-form">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="pwd">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="pwd"
                          placeholder="Password"
                          value={this.state.pass}
                          onChange={(text) => this.setState({ pass: text.target.value })}
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
                          value={this.state.confPass}
                          onChange={(text) => this.setState({ confPass: text.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div class="row">
                    <div class="col-md-12 text-center">
                      <button onClick={() => this.reset()} class="submit-btn">
                        Submit
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
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    status: state.auth.status,
  };
};

export default withRouter(connect(mapStateToProps, actions)(initialReset));
