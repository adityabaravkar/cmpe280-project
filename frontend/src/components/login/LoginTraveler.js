import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// import { API_ENDPOINT } from "../../data/environment";
// import { Authentication } from "./../../services";
// import { LOGIN, HOME } from '../../data';
import Navbar from "../navbar/Navbar.js";
import "./LoginTraveler.css";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { TRAVELER_SIGNUP } from "../../data/";

import agent from "../../agent";
import { connect } from "react-redux";
import {
  ACTION_UPDATE_FIELD_AUTH,
  ACTION_LOGIN,
  ACTION_LOGIN_PAGE_UNLOADED,
} from "../../actions";

const mapStateToProps = (state) => ({ ...state.authentication });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: ACTION_UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: ACTION_UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({
      type: ACTION_LOGIN,
      payload: agent.Auth.login(email, password),
    }),
  onUnload: () => dispatch({ type: ACTION_LOGIN_PAGE_UNLOADED }),
});

class LoginTraveler extends Component {
  constructor() {
    super();

    this.handleEmailChange = (ev) => this.props.onChangeEmail(ev.target.value);
    this.handlePasswordChange = (ev) =>
      this.props.onChangePassword(ev.target.value);
    this.handleSubmit = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(this.state);
  //   const requestBody = {
  //     email: this.state.email,
  //     password: this.state.password,
  //     type: 'TRAVELER'
  //   }
  //   axios.post(API_ENDPOINT + LOGIN, requestBody)
  //     .then(response => {
  //       if (response.data.error === 0) {
  //         Authentication.setUserDetails(response.data.data);
  //         this.setState({ message: '' });
  //         Authentication.setAuthData(response.data.userId, response.data.token, 'TRAVELER');
  //         this.props.history.push(HOME);
  //       } else {
  //         this.setState({ message: response.data.data });
  //       }
  //     });
  // }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div>
        <Navbar></Navbar>
        <div className="login-page-wrapper">
          <div className="container login-body h-100">
            <div className="row">
              <div className="login-body-title">
                <h1 className="login-body-title-head">Log in to Holistay</h1>
                <p className="login-body-title-body">
                  Need an account? <Link to={TRAVELER_SIGNUP}>Sign Up</Link>
                </p>
              </div>
            </div>
            <div className="row align-items-center h-100">
              <div className="login-wraper col-4 mx-auto">
                <div className="login-form">
                  <div className="login-form-heading">
                    <p className="login-form-heading-title">Account login</p>
                  </div>
                  <div className="login-form-footer">
                    <form onSubmit={this.handleSubmit(email, password)}>
                      <div className="input-group login-input-group">
                        <input
                          className="login-input-text-box form-control"
                          type="text"
                          placeholder="Email address"
                          name="email"
                          value={email || ""}
                          onChange={this.handleEmailChange}
                        />
                      </div>

                      <div className="input-group login-input-group">
                        <input
                          className="login-input-text-box form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password || ""}
                          onChange={this.handlePasswordChange}
                        />
                      </div>

                      <div className="input-group login-input-group">
                        <a className="login-forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                      {/* <div className="input-group login-input-group">
                        {this.state.message}
                      </div> */}
                      <div className="input-group login-input-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block login-button"
                        >
                          Login
                        </button>
                      </div>

                      {/* <div className="signin-hr">
                        <span className="text-center">
                          <em>or</em>
                        </span>
                      </div>
                      <div className="social-login">
                        <FacebookLoginButton />
                      </div>
                      <div className="social-login">
                        <GoogleLoginButton />
                      </div> */}
                    </form>
                    {/* {this.state.message} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginTraveler);
