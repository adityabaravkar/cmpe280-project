import React, { Component } from "react";
import axios from "axios";
import { Authentication } from "./../../services";
import {
  API_ENDPOINT,
  LIST_PROPERTY,
  PROPERTY_UPLOAD_IMAGE,
  OWNER_DASHBOARD,
} from "../../data";
import GlobalNavbar from "../navbar/GlobalNavbar.js";
import "./ListProperty.css";
export default class ListProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: Authentication.userId,
      address: "",
      headline: "",
      description: "",
      type: "",
      bedroom: "",
      accomodate: "",
      bathroom: "",
      amenities: "",
      area: "",
      imageList: [],
      startDate: "",
      endDate: "",
      currency: "",
      minimumStayingNight: "",
      nightlyBaseRate: "",
      percentComplete: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    var count = 0;
    for (var member in this.state) {
      if (this.state[member] !== "") count++;
    }
    var percentDone = Math.floor((4 * (count - 2)) / 15) * 25;
    if (
      (count - 2 < 15 || this.state.imageList.length === 0) &&
      percentDone === 100
    ) {
      percentDone = 75;
    }
    this.setState({
      [name]: value,
      percentComplete: percentDone,
    });
  }
  handleSubmit() {
    const requestBody = this.state;
    requestBody.imageList = this.state.imageList.toString();
    // const startDate = new Date(this.state.startDate);
    var startDate = Date.parse(this.state.startDate);
    if (isNaN(startDate) === false) {
      requestBody.startDate = new Date(startDate).getTime();
    } else {
      requestBody.startDate = new Date().getTime();
    }
    var endDate = Date.parse(this.state.endDate);
    if (isNaN(endDate) === false) {
      requestBody.endDate = new Date(endDate).getTime();
    } else {
      requestBody.endDate = new Date().getTime() + 2592000000;
    }
    // const endDate = new Date(this.state.endDate);

    this.instance
      .post(LIST_PROPERTY, requestBody)
      .then((response) => {
        console.log(response);
        if (response.statusText === "Created") {
          console.log("Property created successfully");
          this.props.history.push(OWNER_DASHBOARD);
        } else {
          console.log("Property could not be created");
        }
      })
      .catch((error) => {
        console.error(
          "[LIST-PROPERTY] Error occured, redirecting to Login page."
        );
        // Authentication.logout();
        // this.props.history.push(LOGIN_OWNER);
      });
  }

  handleFileUpload = (e) => {
    if (e.target.name === "propertyImages") {
      let formData = new FormData();
      for (let index = 0; index < e.target.files.length; index++) {
        const element = e.target.files[index];
        formData.append("photos", element, element.name);
      }
      this.instance
        .post(PROPERTY_UPLOAD_IMAGE, formData)
        .then((result) => {
          if (result.data.payLoad) {
            const responseImageList = [];
            for (let index = 0; index < result.data.payLoad.length; index++) {
              const element = result.data.payLoad[index];
              responseImageList.push(element);
            }
            var count = 0;
            for (var member in this.state) {
              if (this.state[member] !== "") count++;
            }
            var percentDone = Math.floor((4 * (count - 2)) / 15) * 25;
            if (
              (count - 2 < 15 || this.state.imageList.length === 0) &&
              percentDone === 100
            ) {
              percentDone = 75;
            }
            this.setState({
              imageList: responseImageList,
              percentComplete: percentDone,
            });
          } else {
            console.error(result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <GlobalNavbar></GlobalNavbar>
        <div className="container add-property-body">
          <div className="add-property-wrapper">
            <div className="row progress-row">
              <div className="col-lg-12">
                <span>Progress</span>
                <div class="progress  custom-progress-bar">
                  <div
                    className={"progress-bar w-" + this.state.percentComplete}
                    role="progressbar"
                  ></div>
                </div>
              </div>
            </div>
            <div className="row add-property-rows">
              <div className="col-3">
                <div
                  class="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a class="nav-link" role="tab">
                    Welcome
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-location-tab"
                    data-toggle="pill"
                    href="#v-pills-location"
                    role="tab"
                  >
                    Location
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-details-tab"
                    data-toggle="pill"
                    href="#v-pills-details"
                    role="tab"
                  >
                    Details
                  </a>
                  {/* <a class="nav-link no-cursor" href="#ignore" role="tab">Booking options</a> */}
                  <a
                    class="nav-link"
                    id="v-pills-photos-tab"
                    data-toggle="pill"
                    href="#v-pills-photos"
                    role="tab"
                  >
                    Photos
                  </a>
                  {/* <a class="nav-link no-cursor" href="#ignore" role="tab">Security</a>
                                    <a class="nav-link no-cursor" href="#ignore" role="tab">Payments</a> */}
                  <a
                    class="nav-link"
                    id="v-pills-pricing-tab"
                    data-toggle="pill"
                    href="#v-pills-availability"
                    role="tab"
                  >
                    Availability
                  </a>
                  <a
                    class="nav-link"
                    id="v-pills-pricing-tab"
                    data-toggle="pill"
                    href="#v-pills-pricing"
                    role="tab"
                  >
                    Pricing
                  </a>
                </div>
              </div>
              <div className="col-8">
                <div class="tab-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-welcome"
                    role="tabpanel"
                  >
                    <h2>
                      <strong>
                        Welcome! Verify the<br></br>location of your rental
                      </strong>
                    </h2>
                    <h6>Just 5 steps remaining.</h6>
                  </div>
                  {/* Location Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-location"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>
                                Verify the location of your rental
                              </strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div class="address">
                            <div class="list-property-content-contianer-body-title">
                              <span>Address:</span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="eg. Morrison Dr, San Jose"
                                  name="address"
                                  value={this.state.address || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              {/* <button class="btn btn-default list-property-content-contianer-footer-button" label="Back"><span class="list-property-content-contianer-footer-button-text">Back</span></button> */}
                            </div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Details Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-details"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>Describe your property</strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description">
                              <span>
                                Start out with a descriptive headline and a
                                detailed summary of your property.
                              </span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Headline"
                                  name="headline"
                                  value={this.state.headline || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Description"
                                  name="description"
                                  value={this.state.description || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Property type"
                                  name="type"
                                  value={this.state.type || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="Accomodates"
                                  name="accomodate"
                                  value={this.state.accomodate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="bedroom"
                                  name="bedroom"
                                  value={this.state.bedroom || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="Bathrooms"
                                  name="bathroom"
                                  value={this.state.bathroom || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Amenities"
                                  name="amenities"
                                  value={this.state.amenities || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="Area (sq. fts.)"
                                  name="area"
                                  value={this.state.area || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Photos Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-photos"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>
                                Add up to 5 photos of your property
                              </strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description-photo">
                              <span>
                                Showcase your property’s best features (no pets
                                or people, please). Requirements: JPEG, at least
                                1920 x 1080 pixels, less than 20MB file size, 6
                                photos minimum. Need photos? Hire a
                                professional.
                              </span>
                            </div>
                            <div class="drop-zone-border">
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box-photo form-control"
                                  type="file"
                                  name="propertyImages"
                                  multiple
                                  onChange={this.handleFileUpload}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Availability Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-availability"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>How much do you want to charge?</strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description">
                              <span>
                                Select a start data and end date for renting out
                                the property.
                              </span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Start Date (MM/DD/YYYY)"
                                  name="startDate"
                                  value={this.state.startDate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="End Date (MM/DD/YYYY)"
                                  name="endDate"
                                  value={this.state.endDate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Next
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pricing Block */}
                  <div
                    class="tab-pane fade"
                    id="v-pills-pricing"
                    role="tabpanel"
                  >
                    <div className="list-property-content-contianer">
                      <div className="list-property-content-contianer-wrapper">
                        <div class="list-property-content-contianer-header">
                          <h3>
                            <span className="list-property-content-container-header-title">
                              <strong>How much do you want to charge?</strong>
                            </span>
                          </h3>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-body">
                          <div>
                            <div class="list-property-content-contianer-body-title-description">
                              <span>
                                We recommend starting with a low price to get a
                                few bookings and earn some initial guest
                                reviews. You can update your rates at any time.
                              </span>
                            </div>
                            <div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="text"
                                  placeholder="Currency"
                                  name="currency"
                                  value={this.state.currency || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="Nightly Base Rate"
                                  name="nightlyBaseRate"
                                  value={this.state.nightlyBaseRate || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                              <div className="input-group list-property-content-input-group">
                                <input
                                  className="list-property-content-input-text-box form-control"
                                  type="number"
                                  placeholder="Minimum Stay"
                                  name="minimumStayingNight"
                                  value={this.state.minimumStayingNight || ""}
                                  onChange={this.handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </div>
                        <div className="list-property-content-contianer-footer">
                          <div class="row">
                            <div class="col-6">
                              <button
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Back"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Back
                                </span>
                              </button>
                            </div>
                            <div class="col-6">
                              <button
                                onClick={this.handleSubmit}
                                class="btn btn-default list-property-content-contianer-footer-button"
                                label="Next"
                              >
                                <span class="list-property-content-contianer-footer-button-text">
                                  Submit
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
