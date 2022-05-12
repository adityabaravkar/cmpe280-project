import React, { Component } from "react";
import axios from "axios";
import {
  HOME,
  API_ENDPOINT,
  LOGIN_TRAVELER,
  CREATE_BOOKING,
  TRAVELER_DASHBOARD,
} from "../../data";
import { Authentication } from "../../services";
import GlobalNavbar from "../navbar/GlobalNavbar";
import "./PropertyDetails.css";
import PropertyDetailsImage from "./PropertyDetailsImage";
import {
  ACTION_UPDATE_FIELD_PROPERTY_DETAIL,
  ACTION_PROPERTY_DETAIL_SET,
  ACTION_PROPERTY_DETAIL_UNLOADED,
} from "../../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state.search });

const mapDispatchToProps = (dispatch) => ({
  onChangeField: (key, value) =>
    dispatch({ type: ACTION_UPDATE_FIELD_PROPERTY_DETAIL, key, value }),
  // onSubmit: (searchBody) =>
  //     dispatch({ type: ACTION_SUBMIT_PROPERTY_DETAIL, payload: agent.Search.fetch(searchBody) }),
  onUnload: () => dispatch({ type: ACTION_PROPERTY_DETAIL_UNLOADED }),
  onSet: (value) => dispatch({ type: ACTION_PROPERTY_DETAIL_SET, value }),
});
class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.state);
    if (props.location.state === undefined) {
      this.props.history.push(HOME);
    }

    this.props.onSet(props.location.state);
    // this.handleInputChange = ev => this.props.onChangeField(ev.target.name, ev.target.value);
    this.state = {
      propertyId: this.props.location.state._id,
      startDate: this.props.location.state.startDate,
      endDate: this.props.location.state.endDate,
      propertyDetails: {
        userId: this.props.location.state.ownerId,
        property_id: this.props.location.state._id,
        start_date: this.props.location.state.startDate,
        end_date: this.props.location.state.endDate,
        nightly_base_rates: this.props.location.state.nightlyBaseRate,
        image_list: this.props.location.state.imageList,
        headline: this.props.location.state.headline,
        area: this.props.location.state.area,
        accomodates: this.props.location.state.accomodate,
        bedrooms: this.props.location.state.bedroom,
        bathrooms: this.props.location.state.bathroom,
        description: this.props.location.state.description,
        type: this.props.location.state.type,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
    this.instance = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 1000,
      headers: { Authorization: Authentication.bearerToken },
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.props.onChangeField(name, value);
  }
  handleBooking() {
    var startDate = this.state.propertyDetails.start_date;
    var endDate = this.state.propertyDetails.end_date;
    if (!startDate) {
      startDate = Date.now();
    }
    if (!endDate) {
      endDate = Date.now() + 86400000;
    }
    const requestBody = {
      travellerId: Authentication.userId,
      ownerId: this.state.propertyDetails.userId,
      propertyId: this.state.propertyDetails.property_id,
      startDate: startDate,
      endDate: endDate,
      price: this.state.propertyDetails.nightly_base_rates,
    };
    console.log(requestBody);
    // if(!this.state.propertyDetails.start_date){}
    // if(!this.state.propertyDetails.end_date){}
    this.instance
      .post(CREATE_BOOKING, requestBody)
      .then((response) => {
        console.log();
        if (response.statusText === "Created") {
          this.props.history.push(TRAVELER_DASHBOARD);
        } else {
          console.log("Booking could not be created");
        }
      })
      .catch((error) => {
        console.error(
          "[PROPERTY-DETAILS] Error occured, redirecting to Login page."
        );
        Authentication.logout();
        this.props.history.push(LOGIN_TRAVELER);
      });
  }
  componentDidMount() {
    // this.instance.post(FETCH_PROPERTY_DETAILS, { propertyId: this.state.propertyId })
    //     .then(response => {
    //         if (response.data.error === 1) {
    //             console.log("Property not found");
    //         } else {
    //             this.setState({ propertyDetails: response.data.data });
    //             // console.log(response.data.data)
    //         }
    //     }).catch(error => {
    //         console.error("[PROPERTY-DETAILS] Error occured");
    //         Authentication.logout();
    //         this.props.history.push(LOGIN_TRAVELER);
    //     });
  }
  render() {
    var imageListArray = [];
    var imageSlides;
    if (this.state.propertyDetails) {
      var imageList = this.state.propertyDetails.image_list;
      if (imageList !== undefined && imageList !== null) {
        imageListArray = imageList.split(",");
        imageSlides = null;

        imageSlides = imageListArray.map((element, index) => (
          <PropertyDetailsImage
            image={element}
            key={index}
            index={index}
          ></PropertyDetailsImage>
        ));
        // for (let index = 0; index < imageListArray.length; index++) {
        //     const element = imageListArray[index];
        //     console.log(element)
        //     imageSlides = imageSlides + (<PropertyDetailsImage image={element}></PropertyDetailsImage>);
        // }
      }
    }
    return (
      <div>
        <GlobalNavbar></GlobalNavbar>
        <div className="container property-container">
          <div className="row property-details-in-page-nav">
            <ul className="nav">
              <li className="nav-item property-details-nav-item">
                <a className="nav-link active" href="#overview">
                  Overview
                </a>
              </li>
              <li className="nav-item property-details-nav-item">
                <a className="nav-link" href="#amenities">
                  Amenities
                </a>
              </li>
              <li className="nav-item property-details-nav-item">
                <a className="nav-link">Reviews</a>
              </li>
              <li className="nav-item property-details-nav-item">
                <a className="nav-link">Maps</a>
              </li>
              <li className="nav-item property-details-nav-item">
                <a className="nav-link">Photos</a>
              </li>
              <li className="nav-item property-details-nav-item">
                <a className="nav-link">Rates & Availability</a>
              </li>
            </ul>
          </div>
          <div className="row property-details-body">
            <div className="col-9 property-details-content">
              {/* Carousel */}
              <div className="property-details-content-carousel">
                <div
                  id="propertyCarousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">{imageSlides}</div>
                  <a
                    className="carousel-control-prev"
                    href="#propertyCarousel"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#propertyCarousel"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              {/* Title */}
              <div id="overview">
                <h2 className="property-detail-heading">
                  <strong>{this.state.propertyDetails.headline}</strong>
                </h2>
              </div>
              <hr className="property-line"></hr>
              {/* Details */}
              <div id="details" className="property-details-booking">
                <div className="row">
                  <div className="col-2">
                    <div className="property-summary">Details</div>
                  </div>
                  <div className="col-10">
                    <div className="amenity-details">
                      <div className="amenity-detail">
                        <div className="amenity-icon">
                          <svg
                            className="inline-svg svg-brand"
                            id="svg-house"
                            viewBox="0 0 36 36"
                            width="100%"
                            height="100%"
                          >
                            <title>svg-house</title>
                            <path d="M26.3142263,33.7636362 L10.6854895,33.7636362 C7.95790408,33.7636362 5.74985789,31.5816898 5.74985789,28.8952106 L5.74985789,13.4498064 L5.47959391,14.0263074 L18.9795939,2.79226479 L18.0201219,2.79226478 L31.5201219,14.0263074 L31.2498579,13.4498064 L31.2498579,28.8952106 C31.2498579,31.5816898 29.0418117,33.7636362 26.3142263,33.7636362 L26.3142263,33.7636362 Z M26.3142263,35.2636362 C29.8662725,35.2636362 32.7498579,32.4141357 32.7498579,28.8952106 L32.7498579,13.4498064 L32.7498579,13.098206 L32.4795939,12.8733054 L18.9795939,1.63926288 L18.4998579,1.24004992 L18.0201219,1.63926287 L4.52012187,12.8733054 L4.24985789,13.098206 L4.24985789,13.4498064 L4.24985789,28.8952106 C4.24985789,32.4141357 7.13344325,35.2636362 10.6854895,35.2636362 L26.3142263,35.2636362 L26.3142263,35.2636362 Z"></path>
                            <polygon points="15.6973684 34.5136362 15.6973684 24.6838489 14.9473684 25.4338489 22.0526316 25.4338489 21.3026316 24.6838489 21.3026316 34.5136362 22.8026316 34.5136362 22.8026316 24.6838489 22.8026316 23.9338489 22.0526316 23.9338489 14.9473684 23.9338489 14.1973684 23.9338489 14.1973684 24.6838489 14.1973684 34.5136362"></polygon>
                          </svg>
                        </div>
                        <div className="amenity-title">apartment</div>
                        <div className="amenity-value">
                          {this.state.propertyDetails.area}
                          <span className="amenity-area-units"> sq ft</span>
                        </div>
                      </div>
                      <div className="amenity-detail">
                        <div className="amenity-icon">
                          <svg
                            className="inline-svg svg-brand"
                            id="svg-sleeps"
                            viewBox="0 0 43 30"
                            width="100%"
                            height="100%"
                          >
                            <title>svg-sleeps</title>
                            <path d="M21.1725783,6.51206734 C21.3284864,3.05543297 18.4017626,0.249852632 14.83914,0.249852632 C11.2693655,0.249852632 8.30727504,3.0836659 8.50619226,6.52159592 C8.52283557,6.80709098 8.62292131,7.4434514 8.78926351,8.38179814 C8.80758336,8.48492954 8.80758336,8.48492954 8.82596657,8.58763255 C8.89438915,8.96922077 8.96763092,9.36662572 9.04086528,9.75661813 C9.08481204,9.99064627 9.11902533,10.170381 9.13865622,10.2724505 C9.72431625,13.4699292 11.8767497,15.7498526 14.83914,15.7498526 C17.7998673,15.7498526 19.9122498,13.5115836 20.5394378,10.2734141 C20.5588793,10.1737554 20.5930784,9.99644588 20.6370011,9.76530353 C20.7101922,9.38013742 20.7833909,8.98695338 20.8517787,8.6084315 C20.8721125,8.49564543 20.8721125,8.49564543 20.8923603,8.38229101 C21.0603279,7.43957943 21.1595389,6.80258641 21.1725857,6.51190209 L21.1725783,6.51206734 Z M19.6740943,6.44464527 C19.6653783,6.63883894 19.5681632,7.26301702 19.4156177,8.11917249 C19.3957052,8.23065004 19.3957052,8.23065004 19.3756766,8.34174324 C19.3081743,8.71536401 19.2357766,9.10424562 19.1633711,9.48527753 C19.119936,9.71385399 19.08619,9.88881431 19.0669973,9.98720086 C18.5640758,12.5837793 16.9917071,14.2498526 14.83914,14.2498526 C12.686657,14.2498526 11.0805046,12.5485667 10.6128841,9.99566896 C10.5924203,9.88911352 10.5586099,9.71149526 10.5150977,9.47978079 C10.4425669,9.0935355 10.3700437,8.70002899 10.3024188,8.32288989 C10.2842845,8.22157696 10.2842845,8.22157696 10.2662359,8.11997292 C10.1135803,7.25883305 10.0152823,6.63383914 10.0036688,6.43462536 C9.85671853,3.89485016 12.0988129,1.74985263 14.83914,1.74985263 C17.5751846,1.74985263 19.7900826,3.87307128 19.6741017,6.44448002 L19.6740943,6.44464527 Z"></path>
                            <path d="M28.6075364,28.25 L1.06746364,28.25 L1.81455894,29.065944 L2.28121348,23.7791019 C2.46795248,22.3094518 4.04090183,21.0409057 6.06487758,20.6520002 L14.9345667,19.4956922 L14.73918,19.4955275 L23.7494891,20.6870012 C26.0107499,21.0847237 27.4377739,22.2605264 27.5512465,24.0042812 L27.8589294,29.0456892 L28.6075364,28.25 L28.6075364,28.25 Z M28.6075364,29.75 L29.4047062,29.75 L29.3561434,28.9543108 L29.0482706,23.9098897 C28.8825511,21.3631531 26.8819443,19.7147445 23.9775126,19.2047742 L14.93582,18.0084725 L14.7404333,18.0083078 L5.82628789,19.1717815 C3.18317461,19.6782773 1.07378667,21.3794484 0.790065805,23.618892 L0.320368334,28.934056 L0.248347274,29.75 L1.06746364,29.75 L28.6075364,29.75 L28.6075364,29.75 Z"></path>
                            <path d="M35.7099632,10.1487281 C35.8392467,7.32362886 33.4243864,5.03917895 30.4932382,5.03917895 C27.5567344,5.03917895 25.1126985,7.34653158 25.2770065,10.158196 C25.2911364,10.3938534 25.3714877,10.897395 25.5060741,11.6463107 C25.5206869,11.7274598 25.5206869,11.7274598 25.535347,11.808261 C25.5902107,12.110121 25.6489235,12.4244558 25.7076287,12.7329483 C25.742858,12.9180764 25.7702917,13.0603023 25.7860501,13.1411652 C26.2666628,15.7330723 28.0447985,17.5918105 30.4932382,17.5918105 C32.9400252,17.5918105 34.6853471,15.7666192 35.2002447,13.142093 C35.2158021,13.0633955 35.2432289,12.9230758 35.2784435,12.7402198 C35.3371208,12.4355309 35.395806,12.124518 35.4506494,11.8250582 C35.46688,11.7362471 35.46688,11.7362471 35.4830463,11.6469733 C35.6192055,10.8931935 35.6988823,10.3889625 35.7099507,10.1489997 L35.7099632,10.1487281 Z M34.2115439,10.0798845 C34.2049654,10.2225055 34.1273181,10.713893 34.0069351,11.3803356 C33.9911096,11.4677278 33.9911096,11.4677278 33.9751892,11.5548409 C33.9212505,11.8493609 33.8633835,12.1560379 33.8055085,12.4565606 C33.7707917,12.6368316 33.7438275,12.7747847 33.7285119,12.8522631 C33.3395634,14.8347996 32.1375587,16.0918105 30.4932382,16.0918105 C28.8490507,16.0918105 27.6206369,14.8077131 27.2596296,12.8609564 C27.2429939,12.7754293 27.2159712,12.6353338 27.1811851,12.4525349 C27.1231979,12.1478157 27.0652183,11.8374067 27.0111691,11.5400275 C26.9967615,11.4606184 26.9967615,11.4606184 26.9824241,11.3809983 C26.8617846,10.7096915 26.7832628,10.2176146 26.7743844,10.0695503 C26.6629371,8.16243252 28.3823492,6.53917895 30.4932382,6.53917895 C32.6016656,6.53917895 34.3000502,8.14584522 34.2115314,10.0801562 L34.2115439,10.0798845 Z"></path>
                            <path d="M30.4036419,20.9026486 L37.765751,21.7780171 C39.4488424,22.077576 40.5712804,22.9942884 40.6727768,24.3109086 L40.9250796,29.0399897 L41.6740127,28.25 L33.1012855,28.25 L33.1012855,29.75 L41.6740127,29.75 L42.4651277,29.75 L42.4229458,28.9600103 L42.1694913,24.2132735 C42.0058876,22.0882759 40.3156509,20.7078335 37.9851968,20.2947735 L30.5807471,19.4131408 L30.4036419,20.9026486 L30.4036419,20.9026486 Z"></path>
                          </svg>
                        </div>
                        <div className="amenity-title">Sleeps</div>
                        <div className="amenity-value">
                          {this.state.propertyDetails.accomodates}
                        </div>
                      </div>
                      <div className="amenity-detail">
                        <div className="amenity-icon">
                          <svg
                            className="inline-svg svg-brand"
                            id="svg-bedrooms"
                            viewBox="0 0 36 30"
                            width="100%"
                            height="100%"
                          >
                            <title>svg-bedrooms</title>
                            <path d="M2.46844716,29.0612296 L3.91525567,11.3770191 L3.33332727,12.0473584 C3.37965952,12.0368711 3.47467769,12.0162789 3.61625489,11.9870195 C3.85497737,11.9376833 4.13601952,11.8825512 4.4572531,11.8230602 C5.37822102,11.6525009 6.43452199,11.4817196 7.60910976,11.3221987 C10.9683022,10.8659863 14.5972904,10.592179 18.3592426,10.592179 C22.1211948,10.592179 25.7501829,10.8659863 29.1093753,11.3221987 C30.2839631,11.4817196 31.3402641,11.6525009 32.261232,11.8230602 C32.5824656,11.8825512 32.8635077,11.9376833 33.1022302,11.9870195 C33.2438074,12.0162789 33.3388256,12.0368711 33.3851578,12.0473584 L32.8032294,11.3770191 L34.2500379,29.0612296 L35.7450429,28.9389178 L34.2982344,11.2547073 L34.2533365,10.705925 L33.716306,10.584368 C33.6609095,10.571829 33.5567089,10.5492468 33.405816,10.5180622 C33.1570884,10.4666582 32.8659065,10.409537 32.5343808,10.3481399 C31.5903221,10.1733044 30.5103198,9.99869101 29.3112374,9.83584349 C25.888515,9.37100315 22.1930351,9.09217895 18.3592426,9.09217895 C14.5254501,9.09217895 10.8299701,9.37100315 7.40724769,9.83584349 C6.20816525,9.99869101 5.12816302,10.1733044 4.18410434,10.3481399 C3.85257861,10.409537 3.5613967,10.4666582 3.31266905,10.5180622 C3.16177616,10.5492468 3.05757558,10.571829 3.00217911,10.584368 L2.46514856,10.705925 L2.42025071,11.2547073 L0.973442198,28.9389178 L2.46844716,29.0612296 L2.46844716,29.0612296 Z"></path>
                            <polygon points="34.6358383 21.7166667 2.08264681 21.7166667 2.08264681 23.2166667 34.6358383 23.2166667"></polygon>
                            <path d="M6.80840077,10.6456207 L7.53180503,2.54035757 L7.0258993,3.18386645 C7.14577757,3.14316475 7.39524072,3.06747624 7.76860107,2.96826863 C8.40030282,2.80041572 9.14460103,2.63194368 9.99581694,2.47430223 C12.4386673,2.02189707 15.2415212,1.75 18.3592426,1.75 C21.476964,1.75 24.2798178,2.02189707 26.7226682,2.47430223 C27.5738841,2.63194368 28.3181823,2.80041572 28.949884,2.96826863 C29.3232444,3.06747624 29.5727075,3.14316475 29.6925858,3.18386645 L29.18668,2.54035757 L29.9100843,10.6456207 L31.4041455,10.512274 L30.6807412,2.40701085 L30.637322,1.92052785 L30.1748354,1.76350197 C30.0234371,1.71209841 29.7416503,1.62660271 29.3350904,1.51857348 C28.6669251,1.34103165 27.8852925,1.16410895 26.9958169,0.999381978 C24.465263,0.530734508 21.5713084,0.25 18.3592426,0.25 C15.1471768,0.25 12.2532221,0.530734508 9.72266818,0.999381978 C8.83319259,1.16410895 8.05155996,1.34103165 7.38339468,1.51857347 C6.97683482,1.62660271 6.69504796,1.71209841 6.54364964,1.76350197 L6.08116309,1.92052785 L6.03774391,2.40701085 L5.31433965,10.512274 L6.80840077,10.6456207 L6.80840077,10.6456207 Z"></path>
                            <path d="M14.0454128,9.84210526 C14.0454128,8.62557628 15.0083646,7.64473684 16.1890298,7.64473684 L20.5294553,7.64473684 C21.7101205,7.64473684 22.6730723,8.62557628 22.6730723,9.84210526 L24.1730723,9.84210526 C24.1730723,7.80326581 22.5447901,6.14473684 20.5294553,6.14473684 L16.1890298,6.14473684 C14.173695,6.14473684 12.5454128,7.80326581 12.5454128,9.84210526 L14.0454128,9.84210526 L14.0454128,9.84210526 Z"></path>
                          </svg>
                        </div>
                        <div className="amenity-title">Bedrooms</div>
                        <div className="amenity-value">
                          {this.state.propertyDetails.bedrooms}
                        </div>
                      </div>
                      <div className="amenity-detail">
                        <div className="amenity-icon">
                          <svg
                            className="inline-svg svg-brand"
                            id="svg-bathrooms"
                            viewBox="0 0 43 30"
                            width="100%"
                            height="100%"
                          >
                            <title>svg-bathrooms</title>
                            <path d="M27.75,34 L27.75,9.42553191 C27.75,4.35630895 23.5945725,0.25 18.4736842,0.25 C13.3527959,0.25 9.19736842,4.35630895 9.19736842,9.42553191 L10.6973684,9.42553191 C10.6973684,5.18875487 14.1772567,1.75 18.4736842,1.75 C22.7701117,1.75 26.25,5.18875487 26.25,9.42553191 L26.25,34 L27.75,34 L27.75,34 Z"></path>
                            <path d="M17.7631579,14.2925532 L2.13157895,14.2925532 L2.88157895,15.0425532 L2.88157895,13.1734894 C2.88157895,12.180835 3.60203421,11.327759 4.59764301,11.1487849 L10.0800048,10.1637105 L9.814732,10.1637105 L15.2971531,11.1487956 C16.2922971,11.3277803 17.0131579,12.1811535 17.0131579,13.1734894 L17.0131579,15.0425532 L17.7631579,14.2925532 L17.7631579,14.2925532 Z M17.7631579,15.7925532 L18.5131579,15.7925532 L18.5131579,15.0425532 L18.5131579,13.1734894 C18.5131579,11.4519716 17.2692725,9.97942856 15.5625528,9.67246127 L10.0800048,8.68735335 L9.94736842,8.66352115 L9.814732,8.68735335 L4.33231095,9.67243846 C2.6250385,9.97934372 1.38157895,11.4516981 1.38157895,13.1734894 L1.38157895,15.0425532 L1.38157895,15.7925532 L2.13157895,15.7925532 L17.7631579,15.7925532 L17.7631579,15.7925532 Z"></path>
                            <path d="M12.7894737,19.9574468 C12.0043421,19.9574468 11.3684211,19.3290426 11.3684211,18.5531915 C11.3684211,17.7773404 12.0043421,17.1489362 12.7894737,17.1489362 C13.5746053,17.1489362 14.2105263,17.7773404 14.2105263,18.5531915 C14.2105263,19.3290426 13.5746053,19.9574468 12.7894737,19.9574468"></path>
                            <path d="M9.94736842,24.1702128 C9.16223684,24.1702128 8.52631579,23.5418085 8.52631579,22.7659574 C8.52631579,21.9901064 9.16223684,21.3617021 9.94736842,21.3617021 C10.7325,21.3617021 11.3684211,21.9901064 11.3684211,22.7659574 C11.3684211,23.5418085 10.7325,24.1702128 9.94736842,24.1702128"></path>
                            <path d="M7.10526316,19.9574468 C6.32013158,19.9574468 5.68421053,19.3290426 5.68421053,18.5531915 C5.68421053,17.7773404 6.32013158,17.1489362 7.10526316,17.1489362 C7.89039474,17.1489362 8.52631579,17.7773404 8.52631579,18.5531915 C8.52631579,19.3290426 7.89039474,19.9574468 7.10526316,19.9574468"></path>
                            <path d="M15.6315789,24.1702128 C14.8464474,24.1702128 14.2105263,23.5418085 14.2105263,22.7659574 C14.2105263,21.9901064 14.8464474,21.3617021 15.6315789,21.3617021 C16.4167105,21.3617021 17.0526316,21.9901064 17.0526316,22.7659574 C17.0526316,23.5418085 16.4167105,24.1702128 15.6315789,24.1702128"></path>
                            <path d="M4.26315789,24.1702128 C3.47802632,24.1702128 2.84210526,23.5418085 2.84210526,22.7659574 C2.84210526,21.9901064 3.47802632,21.3617021 4.26315789,21.3617021 C5.04828947,21.3617021 5.68421053,21.9901064 5.68421053,22.7659574 C5.68421053,23.5418085 5.04828947,24.1702128 4.26315789,24.1702128"></path>
                            <path d="M7.10526316,28.3829787 C6.32013158,28.3829787 5.68421053,27.7545745 5.68421053,26.9787234 C5.68421053,26.2028723 6.32013158,25.5744681 7.10526316,25.5744681 C7.89039474,25.5744681 8.52631579,26.2028723 8.52631579,26.9787234 C8.52631579,27.7545745 7.89039474,28.3829787 7.10526316,28.3829787"></path>
                            <path d="M12.7894737,28.3829787 C12.0043421,28.3829787 11.3684211,27.7545745 11.3684211,26.9787234 C11.3684211,26.2028723 12.0043421,25.5744681 12.7894737,25.5744681 C13.5746053,25.5744681 14.2105263,26.2028723 14.2105263,26.9787234 C14.2105263,27.7545745 13.5746053,28.3829787 12.7894737,28.3829787"></path>
                            <path d="M18.4736842,28.3829787 C17.6885526,28.3829787 17.0526316,27.7545745 17.0526316,26.9787234 C17.0526316,26.2028723 17.6885526,25.5744681 18.4736842,25.5744681 C19.2588158,25.5744681 19.8947368,26.2028723 19.8947368,26.9787234 C19.8947368,27.7545745 19.2588158,28.3829787 18.4736842,28.3829787"></path>
                            <path d="M1.42105263,28.3829787 C0.635921053,28.3829787 0,27.7545745 0,26.9787234 C0,26.2028723 0.635921053,25.5744681 1.42105263,25.5744681 C2.20618421,25.5744681 2.84210526,26.2028723 2.84210526,26.9787234 C2.84210526,27.7545745 2.20618421,28.3829787 1.42105263,28.3829787"></path>
                          </svg>
                        </div>
                        <div className="amenity-title">Bathrooms</div>
                        <div className="amenity-value">
                          {this.state.propertyDetails.bathrooms}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="property-line"></hr>
              {/* Description */}
              <div id="about">
                <div className="row">
                  <div className="col-2">
                    <div className="property-summary">About the property</div>
                  </div>
                  <div className="col-10">
                    <div className="property-description">
                      <p align="justify">
                        {this.state.propertyDetails.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="property-line"></hr>
              <div id="amenities">
                <h2>
                  <strong>Amenities</strong>
                </h2>
                <table className="table amenity-table table-striped">
                  <tbody>
                    <tr>
                      <td align="center">
                        <strong>Property Type :</strong>
                      </td>
                      <td align="left">{this.state.propertyDetails.type}</td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Building Type :</strong>
                      </td>
                      <td align="left">house</td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Meals :</strong>
                      </td>
                      <td align="left">Guests provide their own meals</td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Floor Area :</strong>
                      </td>
                      <td align="left">
                        Fireplace<br></br>Heating<br></br>Internet<br></br>
                        Linens Provided
                      </td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Bathrooms :</strong>
                      </td>
                      <td align="left">
                        {this.state.propertyDetails.bathrooms} Bathroom
                      </td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Bedrooms :</strong>
                      </td>
                      <td align="left">
                        {this.state.propertyDetails.bedrooms} Bedroom, Sleeps{" "}
                        {this.state.propertyDetails.accomodates}
                      </td>
                      <td align="left"></td>
                    </tr>
                    <tr>
                      <td align="center">
                        <strong>Outside :</strong>
                      </td>
                      <td align="left">Deck / Patio</td>
                      <td align="left"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-3 property-pricing-booking">
              <div className="property-booking-assistance">
                Book Online or call Holistay Booking Assistance 888-829-7076
              </div>
              <div className="property-booking-block affix-top">
                <div className="property-booking-block-container">
                  <div className="property-booking-block-price-calculator">
                    <div className="property-booking-block-price-text">
                      <h1 className="pbbptt">
                        ${this.state.propertyDetails.nightly_base_rates}
                      </h1>
                      <h6 className="pbbptt">per night</h6>
                    </div>
                    <div>
                      Your dates are&nbsp;
                      <span style={{ color: "green" }}>Available!</span>
                    </div>
                    <form className="pbbp-form">
                      <div className="row pbbpc-row">
                        <div className="col pbbpc-col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Start Date"
                            name="startDate"
                            value={this.state.startDate || ""}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col pbbpc-col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="End Date"
                            name="endDate"
                            value={this.state.endDate || ""}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row pbbpc-col">
                        <div className="col pbbpc2-col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Guests"
                          />
                        </div>
                      </div>
                    </form>
                    <div className="pbbpc-total">
                      <h4>
                        Total : ${this.state.propertyDetails.nightly_base_rates}
                      </h4>
                    </div>
                    <button
                      onClick={this.handleBooking}
                      className="btn pbbpc-button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //     <p>{JSON.stringify(this.state.propertyDetails)}</p>
      //     <input
      //         name='startDate'
      //         type='text'
      //         value={this.state.startDate || ''}
      //         onChange={this.handleInputChange} />
      //     <input
      //         name='endDate'
      //         type='text'
      //         value={this.state.endDate || ''}
      //         onChange={this.handleInputChange} />
      //     <button onClick={this.handleBooking}>Confirm Booking</button>
      // </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
