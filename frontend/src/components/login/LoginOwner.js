import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
// import { API_ENDPOINT } from "../../data/environment";
// import { Authentication } from "./../../services";
// import { OWNER_DASHBOARD, LOGIN } from '../../data';
import Navbar from "../navbar/Navbar.js";
// import './LoginTraveler.css';
import { OWNER_SIGNUP } from "../../data/";
import "./LoginOwner.css";

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

class LoginOwner extends Component {
  constructor() {
    super();
    // this.state = {
    //   email: '',
    //   password: ''
    // };

    // this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.handleEmailChange = (ev) => this.props.onChangeEmail(ev.target.value);
    this.handlePasswordChange = (ev) =>
      this.props.onChangePassword(ev.target.value);
    this.handleSubmit = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  // handleEmailChange(event) {
  //   this.setState({ email: event.target.value, message : '' });
  // }

  // handlePasswordChange(event) {
  //   this.setState({ password: event.target.value, message : '' });
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(this.state);
  //   const requestBody = {
  //     email: this.state.email,
  //     password: this.state.password,
  //     type: 'OWNER'
  //   }
  //   axios.post(API_ENDPOINT + LOGIN, requestBody)
  //     .then(response => {
  //       Authentication.setUserDetails(response.data.data);
  //       if (response.data.error === 0) {
  //         this.setState({ message: '' });
  //         Authentication.setAuthData(response.data.userId, response.data.token, 'OWNER');
  //         this.props.history.push(OWNER_DASHBOARD);
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
        <div className="login-owner-page-wrapper">
          <div className="container login-owner-body h-100">
            <div className="row">
              <div class="col-1 mx-auto"></div>
              <div class="col-4 mx-auto">
                <div class="login-owner-decorator-image">
                  <img alt="Holistay" src="/owner-login.png"></img>
                </div>
              </div>

              <div className="login-owner-wraper col-4 mx-auto">
                <div className="login-owner-form">
                  <div className="login-owner-form-heading">
                    <p className="login-owner-form-heading-title">
                      Owner login
                    </p>
                    <p>{this.props.error}</p>
                  </div>
                  <div className="login-owner-form-footer">
                    <form onSubmit={this.handleSubmit(email, password)}>
                      <div className="input-group login-owner-input-group">
                        <input
                          className="login-owner-input-text-box form-control"
                          type="text"
                          placeholder="Email address"
                          name="email"
                          value={email || ""}
                          onChange={this.handleEmailChange}
                        />
                      </div>

                      <div className="input-group login-owner-input-group">
                        <input
                          className="login-owner-input-text-box form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password || ""}
                          onChange={this.handlePasswordChange}
                        />
                      </div>

                      <div className="input-group login-owner-input-group">
                        <a className="login-owner-forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                      {/* <div className="input-group login-owner-input-group">
                        {this.state.message}
                      </div> */}

                      <div className="input-group login-owner-input-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block login-owner-button"
                        >
                          Login
                        </button>
                      </div>

                      <div className="signin-hr">
                        <span className="text-center"></span>
                      </div>
                      <div className="input-group login-owner-input-group">
                        <span>
                          New User?{" "}
                          <Link to={OWNER_SIGNUP} style={{ color: "#2a6ebb" }}>
                            {" "}
                            Sign Up
                          </Link>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 mx-auto"></div>
          </div>
        </div>
        {/* Owner Login
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <input type="submit" value="Submit" />
        </form>
        New User?  <Link to="/signup-owner">Sign Up</Link> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOwner);
