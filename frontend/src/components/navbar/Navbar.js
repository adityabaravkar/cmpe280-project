import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { LOGOUT } from "../../data";

export default class Navbar extends Component {
  // constructor(props) {
  //     super(props);
  // }
  render() {
    return (
      <div>
        <header class="generic-navbar-header">
          <nav class="generic-navbar navbar navbar-expand-lg navbar-light bg-white">
            <Link class="generic-navbar-element" to="/">
              {/* <img alt="Holistay" src="/logo-blue.svg"></img> */}
              <h2>Holistay</h2>
            </Link>
            <Link
              class="generic-navbar-element navbar-brand ml-auto"
              to={LOGOUT}
            >
              <img alt="Holistay" src="/birdhouse-blue.svg"></img>
            </Link>
          </nav>
        </header>
      </div>
    );
  }
}
