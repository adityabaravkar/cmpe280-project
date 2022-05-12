import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";

import Navbar from "../navbar/Navbar.js";
import "./SignupTraveler.css";
// import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { LOGIN_TRAVELER } from "../../data/";
import { Link } from "react-router-dom";

export default class SignupTraveler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      message: "",
    };
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFnameChange(event) {
    this.setState({ fname: event.target.value });
  }

  handleLnameChange(event) {
    this.setState({ lname: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      role: "traveler",
    };
    axios
      .post(API_ENDPOINT + "/auth/register", requestBody)
      .then((response) => {
        if (response.data.error === 0) {
          this.setState({ message: response.data.data });
        } else {
          this.setState({ message: response.data.data });
        }
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div class="signup-page-wrapper">
          <div class="container signup-body h-100">
            <div class="row">
              <div class="signup-body-title">
                <h1 class="signup-body-title-head">Sign up for Holistay</h1>
                <p class="signup-body-title-body">
                  Already have an account?{" "}
                  <Link to={LOGIN_TRAVELER}>Log in</Link>
                </p>
              </div>
            </div>
            <div class="row align-items-center">
              <div class="signup-wraper col-5 mx-auto">
                <div class="signup-form">
                  {/* <div class="signup-form-heading">
                <p class="signup-form-heading-title">Account login</p>
              </div> */}
                  <div class="signup-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div class="row">
                        <div class="col signup-input-inline-left">
                          <div class="input-group signup-input-group ">
                            <input
                              class="signup-input-text-box form-control"
                              type="text"
                              placeholder="First Name"
                              name="first"
                              value={this.state.fname || ""}
                              onChange={this.handleFnameChange}
                            />
                          </div>
                        </div>
                        <div class="col signup-input-inline-right">
                          <div class="input-group signup-input-group">
                            <input
                              class="signup-input-text-box form-control"
                              type="text"
                              placeholder="Last Name"
                              name="last"
                              value={this.state.lname || ""}
                              onChange={this.handleLnameChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="input-group signup-input-group">
                          <input
                            class="signup-input-text-box form-control"
                            type="text"
                            placeholder="Email address"
                            name="email"
                            value={this.state.email || ""}
                            onChange={this.handleEmailChange}
                          />
                        </div>

                        <div class="input-group signup-input-group">
                          <input
                            class="signup-input-text-box form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handlePasswordChange}
                          />
                        </div>

                        <div class="input-group signup-input-group">
                          <a class="signup-forgot-password">Forgot Password?</a>
                        </div>

                        <div class="input-group signup-input-group">
                          <button
                            type="submit"
                            class="btn btn-primary btn-lg btn-block signup-button"
                          >
                            Sign Me Up
                          </button>
                        </div>

                        {/* <div class="signin-hr">
                    <span class="text-center"><em>or</em></span>
                  </div>
                  <div class="social-login">
                  <FacebookLoginButton/>
                  </div>
                  <div class="social-login">
                  <GoogleLoginButton/>
                  </div>
                  */}
                      </div>
                    </form>
                    {this.state.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   Traveler Signup
      //   <form onSubmit={this.handleSubmit}>
      //     <input type="text" value={this.state.fname} onChange={this.handleFnameChange} />
      //     <input type="text" value={this.state.lname} onChange={this.handleLnameChange} />
      //     <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
      //     <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
      //     <input type="submit" value="Sign Up" />
      //   </form>
      //   {this.state.message}
      // </div>
    );
  }
}
