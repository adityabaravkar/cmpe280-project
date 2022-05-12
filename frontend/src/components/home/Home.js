import React, { Component } from "react";
import { Authentication } from "../../services";
import {
  LOGIN_TRAVELER,
  LOGIN_OWNER,
  OWNER_LIST_PROPERTY,
  LOGOUT,
  TRAVELER_DASHBOARD,
  OWNER_DASHBOARD,
} from "../../data";
import {
  ACTION_UPDATE_FIELD_HOME,
  ACTION_SUBMIT_HOME,
  ACTION_HOME_UNLOADED,
} from "../../actions";
import { Link } from "react-router-dom";
import "./Home.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state.home });

const mapDispatchToProps = (dispatch) => ({
  onChangeField: (key, value) =>
    dispatch({ type: ACTION_UPDATE_FIELD_HOME, key, value }),
  onSubmit: (value) => dispatch({ type: ACTION_SUBMIT_HOME, value }),
  onUnload: () => dispatch({ type: ACTION_HOME_UNLOADED }),
});

class Home extends Component {
  constructor() {
    super();
    this.handleInputChange = (ev) =>
      this.props.onChangeField(ev.target.name, ev.target.value);
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   this.props.onChangeField(value,name)
  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleSubmit = (ev) => {
    ev.preventDefault();
    // this.props.history.push(TRAVELER_PROPERTY_SEARCH, this.props);
    const { place, startDate, endDate, guest } = this.props;
    this.props.onSubmit({ place, startDate, endDate, guest });
  };

  componentDidMount() {
    document.title = "Holistay: Vacation Rentals, Beach Houses, Cabins & More";
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const authData = JSON.parse(Authentication.getUserDetails);
    // console.log('authData', Authentication.getUserDetails)
    var userName = null;
    if (authData) {
      if (authData.fname && authData.lname) {
        userName = authData.fname + " " + authData.lname;
      }
    }

    const login_code = (
      <li className="nav-item dropdown nav-non-btn">
        <a
          className="nav-link custom-nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to={LOGIN_TRAVELER}>
            Traveler Login
          </Link>
          <Link className="dropdown-item" to={LOGIN_OWNER}>
            Owner Login
          </Link>
        </div>
      </li>
    );

    const user_code = (
      // <Link to={TRAVELER_PROFILE}>
      <li className="nav-item nav-non-btn">
        <Link
          className="nav-link custom-nav-link"
          to={
            Authentication.isUserLoggedIntoTravelerMode()
              ? TRAVELER_DASHBOARD
              : OWNER_DASHBOARD
          }
        >
          {userName}
        </Link>
      </li>
    );
    // </Link>);

    return (
      <div>
        <header>
          <div className="banner box-shadow">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/">
                <h2>Holistay</h2>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active nav-non-btn">
                    <span className="flag-icon flag-icon-us flag-icon-squared"></span>
                  </li>
                  <li className="nav-item nav-non-btn">
                    <Link
                      className="nav-link custom-nav-link"
                      to={
                        Authentication.isUserLoggedIntoTravelerMode()
                          ? TRAVELER_DASHBOARD
                          : OWNER_DASHBOARD
                      }
                    >
                      Trip Boards
                    </Link>
                  </li>
                  {userName === "" ||
                  userName === undefined ||
                  userName === null
                    ? login_code
                    : user_code}
                  <li className="nav-item dropdown nav-non-btn">
                    <a className="nav-link custom-nav-link disabled dropdown-toggle">
                      Help
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      role="button"
                      className="nav-link custom-nav-link btn btn-default btn-custom"
                      to={OWNER_LIST_PROPERTY}
                    >
                      <span className="btn-text">List your property</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <Link className="navbar-brand float-right" to={LOGOUT}>
                <img alt="Holistay" src="/birdhouse.svg"></img>
              </Link>
            </nav>
            <div className="container-fluid">
              <div className="Poster">
                <div className="PosterCover">
                  <div className="PosterData">
                    <h1 className="Title">
                      <span className="Title">Book beach houses, cabins,</span>
                      <span className="Title">condos and more, worldwide</span>
                    </h1>

                    <div className="row searchEngine">
                      <form className="searchEngineForm form-inline">
                        <div className="search-engine-input col-lg-4">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon1"
                              >
                                <i className="icon ion-ios-map"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              placeholder="Where do you want to go?"
                              type="text"
                              name="place"
                              value={this.props.place || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-2">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0 "
                                id="basic-addon2"
                              >
                                <i className="icon ion-ios-calendar"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              name="startDate"
                              type="text"
                              value={this.props.startDate || ""}
                              placeholder="Arrive"
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-2">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon3"
                              >
                                <i className="icon ion-ios-calendar"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              name="endDate"
                              type="text"
                              placeholder="Depart"
                              value={this.props.endDate || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-2">
                          <div className="input-group ">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text border-right-0"
                                id="basic-addon4"
                              >
                                <i className="icon ion-ios-people"></i>
                              </span>
                            </div>
                            <input
                              className="search-engine-input-text-box form-control border-left-0"
                              name="guest"
                              type="text"
                              placeholder="Guests"
                              value={this.props.guest || ""}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="search-engine-input col-lg-2 ">
                          <button
                            type="submit"
                            className="btn btn-primary search-engine-button"
                            onClick={this.handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="Feature">
                    <ul className="Feature">
                      <li className="Feature">
                        <strong className="Feature">
                          Your whole vacation starts here
                        </strong>
                        <span className="Feature">
                          Choose a rental from the world's best selection
                        </span>
                      </li>
                      <li className="Feature">
                        <strong className="Feature">
                          Book and stay with confidence
                        </strong>
                        <span className="Feature">
                          Secure payments, peace of mind
                        </span>
                      </li>
                      <li className="Feature">
                        <strong className="Feature">
                          Your vacation your way
                        </strong>
                        <span className="Feature">
                          More space, more privacy, no compromises
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
