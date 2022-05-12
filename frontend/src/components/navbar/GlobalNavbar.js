import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "../../services/authentication.js";
import "./GlobalNavbar.css";
import { OWNER_PROFILE, TRAVELER_PROFILE, LOGOUT } from "../../data/route.js";

export default class GlobalNavbar extends Component {
  render() {
    const address =
      Authentication.accountType === "OWNER" ? OWNER_PROFILE : TRAVELER_PROFILE;
    return (
      <div>
        <header className="global-navbar-header">
          <nav className="global-navbar navbar">
            <div className="container">
              <div className="row">
                <div className="col-lg-2">
                  <Link className="global-navbar-element" to="/">
                    {/* <img alt="Holistay" className="global-navbar-logo" src="/logo-blue.svg"></img> */}
                    <h2 className="global-navbar-logo">Holistay</h2>
                  </Link>
                </div>
                <div className="col-lg-5"></div>
                <div className="col-lg-2">
                  <Link to={address}>
                    <span className="global-navbar-element navbar-brand global-navbar-right-icon">
                      <svg
                        className="user-profile-picture"
                        width="81px"
                        height="81px"
                        viewBox="0 0 81 81"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="MVP"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g transform="translate(-4.000000, -4.000000)">
                            <g transform="translate(4.000000, 4.000000)">
                              <g>
                                <mask id="mask-2" fill="white">
                                  <circle cx="40.5" cy="40.5" r="40.5"></circle>
                                </mask>
                                <circle
                                  cx="40.5"
                                  cy="40.5"
                                  r="40.5"
                                  fill="#353E44"
                                ></circle>
                                <path
                                  d="M48.776466,28.3505709 C48.9673306,24.1982998 45.331637,20.9508492 41.0825823,20.9508492 C36.8326011,20.9508492 33.145022,24.2262096 33.3886987,28.3505709 C33.4368781,29.1797646 34.242957,33.2834185 34.242957,33.2834185 C34.9082037,36.846881 37.3051301,39.861149 41.0825823,39.861149 C44.8591081,39.861149 47.2087816,36.8927973 47.9212812,33.2834185 C47.9212812,33.2834185 48.7384783,29.180665 48.776466,28.3505709"
                                  fill="#FFFFFF"
                                  opacity="0.824898098"
                                  mask="url(#mask-2)"
                                ></path>
                                <path
                                  d="M57.5226562,54.4043077 C57.5226562,54.4043077 50.2762854,56.7685453 40.7302734,56.7685453 C31.1842615,56.7685453 23.9378906,54.4043077 23.9378906,54.4043077 L24.7439695,47.94722 C25.082152,45.8368723 26.8545989,44.5125031 28.7938208,44.0749481 L40.7302734,41.7971411 L52.6602404,44.0614433 C54.6328173,44.5422137 56.3774684,45.8071618 56.7156509,47.9364162 L57.5226562,54.4043077 Z"
                                  fill="#FFFFFF"
                                  opacity="0.824898098"
                                  mask="url(#mask-2)"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="user-profile-text">My Account</span>
                    </span>
                  </Link>
                </div>
                <div className="col-lg-2">
                  <a className="global-navbar-element navbar-brand global-navbar-right-icon">
                    {/* <svg width="22px" height="22px" viewBox="0 0 20 22" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="#353E44" strokeWidth="1.55" fill="none" fillRule="evenodd" strokeLinecap="square" transform="translate(-1310.000000, -19.000000)"><g transform="translate(1312.000000, 14.000000)"><g transform="translate(0.000000, 6.000000)"><path d="M10.9090909,17.2727273 C10.9090909,18.8181818 9.72727273,20 8.18181818,20 C6.63636364,20 5.45454545,18.8181818 5.45454545,17.2727273"></path><path d="M14.5454545,10.9090909 C14.5454545,8.63636364 14.5454545,6.36363636 14.5454545,6.36363636 C14.5454545,2.81818182 11.7272727,0 8.18181818,0 C4.63636364,0 1.81818182,2.81818182 1.81818182,6.36363636 C1.81818182,6.36363636 1.81818182,8.63636364 1.81818182,10.9090909 C1.81818182,14.5454545 0,17.2727273 0,17.2727273 L16.3636364,17.2727273 C16.3636364,17.2727273 14.5454545,14.5454545 14.5454545,10.9090909 Z"></path></g></g></g></svg>
                                        <svg width="22px" height="22px" viewBox="0 0 20 22" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M256 64C141.1 64 48 139.2 48 232c0 64.9 45.6 121.2 112.3 149.2-5.2 25.8-21 47-33.5 60.5-2.3 2.5.2 6.5 3.6 6.3 11.5-.8 32.9-4.4 51-12.7 21.5-9.9 40.3-30.1 46.3-36.9 9.3 1 18.8 1.6 28.5 1.6 114.9 0 208-75.2 208-168C464 139.2 370.9 64 256 64z"/></svg> */}
                    <i className="icon ion-ios-text"></i> Messages
                  </a>
                </div>
                <div className="col-lg-1">
                  <Link to={LOGOUT}>
                    <i className="global-navbar-element navbar-brand global-navbar-right-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        className="__web-inspector-hide-shortcut__"
                      >
                        <g fill="currentColor">
                          <rect x="1" y="1" width="4" height="4"></rect>
                          <rect x="9" y="1" width="4" height="4"></rect>
                          <rect x="17" y="1" width="4" height="4"></rect>
                          <rect x="1" y="9" width="4" height="4"></rect>
                          <rect x="9" y="9" width="4" height="4"></rect>
                          <rect x="17" y="9" width="4" height="4"></rect>
                          <rect x="1" y="17" width="4" height="4"></rect>
                          <rect x="9" y="17" width="4" height="4"></rect>
                          <rect x="17" y="17" width="4" height="4"></rect>
                        </g>
                      </svg>
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
