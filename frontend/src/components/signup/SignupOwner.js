import React, { Component } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../data/environment";

import Navbar from "../navbar/Navbar.js";
import "./SignupOwner.css";
import { LOGIN_OWNER, POST_REGISTER } from "../../data/";
import { Link } from "react-router-dom";

export default class SignupOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      phonenumber: "",
      message: "",
    };
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);

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
  handlePhoneNumberChange(event) {
    this.setState({ phonenumber: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      password: this.state.password,
      role: "owner",
    };
    axios
      .post(API_ENDPOINT + POST_REGISTER, requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          this.props.history.push(LOGIN_OWNER);
        }
        // else {
        //   this.setState({ message: response.data.data });
        // }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          message: "Account could not be created, try different Email Id",
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="signup-page-wrapper">
          <div className="container signup-body h-100">
            <div className="row">
              <div className="signup-body-title">
                <h1 className="signup-body-title-head">Sign up for Holistay</h1>
                <p className="signup-body-title-body">
                  Already have an account? <Link to={LOGIN_OWNER}>Log in</Link>
                </p>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="signup-wraper col-5 mx-auto">
                <div className="signup-form">
                  <div className="signup-form-heading">
                    <p>{this.state.message}</p>
                  </div>
                  <div className="signup-form-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col signup-input-inline-left">
                          <div className="input-group signup-input-group ">
                            <input
                              className="signup-input-text-box form-control"
                              type="text"
                              placeholder="First Name"
                              name="first"
                              value={this.state.fname || ""}
                              onChange={this.handleFnameChange}
                            />
                          </div>
                        </div>
                        <div className="col signup-input-inline-right">
                          <div className="input-group signup-input-group">
                            <input
                              className="signup-input-text-box form-control"
                              type="text"
                              placeholder="Last Name"
                              name="last"
                              value={this.state.lname || ""}
                              onChange={this.handleLnameChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-group signup-input-group">
                          <input
                            className="signup-input-text-box form-control"
                            type="text"
                            placeholder="Email address"
                            name="email"
                            value={this.state.email || ""}
                            onChange={this.handleEmailChange}
                          />
                        </div>

                        <div className="input-group signup-input-group">
                          <input
                            className="signup-input-text-box form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handlePasswordChange}
                          />
                        </div>

                        <div className="input-group signup-input-group">
                          <a className="signup-forgot-password">
                            Forgot Password?
                          </a>
                        </div>

                        <div className="input-group signup-input-group">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block signup-button"
                          >
                            Sign Me Up
                          </button>
                        </div>

                        {/* <div className="signin-hr">
                    <span className="text-center"><em>or</em></span>
                  </div>
                  <div className="social-login">
                  <FacebookLoginButton/>
                  </div>
                  <div className="social-login">
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
      //   Owner Signup
      //   <form onSubmit={this.handleSubmit}>
      //     <input type="text" value={this.state.fname} onChange={this.handleFnameChange} />
      //     <input type="text" value={this.state.lname} onChange={this.handleLnameChange} />
      //     <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
      //     <input type="text" value={this.state.phonenumber} onChange={this.handlePhoneNumberChange} />
      //     <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
      //     <input type="submit" value="Sign Up" />
      //   </form>
      //   {this.state.message}
      // </div>
    );
  }
}
