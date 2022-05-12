import React, { Component } from 'react';
import './Card.css';
import { PROPERTY_DETAILS, API_ENDPOINT, IMAGE_ENDPOINT } from '../../data';
import { Link } from "react-router-dom";
import { Authentication } from '../../services';
import axios from 'axios';

export default class Card extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.property);
        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
            headers: { 'Authorization': Authentication.bearerToken }
        });
        this.state = {
            image : ''
        }
    }
    componentDidMount(){
        if(!this.props.property) { return;}
        if(!this.props.property.imageList) { return;}
        const image = this.props.property.imageList.split(',')[0];
        // this.instance.get(PROPERTY_DOWNLOAD_IMAGE+'/'+image)
        //     .then(response => {
        //         // console.log(response)
        //         if (response.data) {
        //             console.log(response)
        //             const img = 'data:image/jpg;base64,' + response.data.payLoad[0];
        //             this.setState({image : img });
                    
        //         } else {
        //             console.log("Image cannot be downloaded")
        //         }
        //     }).catch(error => {
        //         console.error("[GENERIC-CARD] Error occured, redirecting to Login page.");
        //         // Authentication.logout();
        //         // this.props.history.push(HOME);
        //     });
        this.setState({image : IMAGE_ENDPOINT+image });
    }
    render() {
        return (
            <div>
                <div className="property-card sugar-card card">
                    <div className="row card-row">
                        <div className="col-md-4 card-thumbnail">
                            <img src={this.state.image} alt="Property" className="w-100 h-100" />
                        </div>
                        <div className="col-md-8 px-3">
                            <div className="card-block property-card-wrapper px-3">
                                <div className="row card-hype">
                                    <small>
                                        <div className="card-hype-popular">Popular</div>Viewed {Math.round(Math.random()*500)+50} times in the last 48 hours
                                    </small>
                                </div>
                                <div className="row">
                                    <Link to={{ pathname: PROPERTY_DETAILS, state: this.props.property }}><h5 className="card-property-title">{this.props.property.headline}</h5></Link>
                                </div>
                                <div className="row">
                                    <div className="card-property-detail">
                                        <div className="card-property-type">{this.props.property.type}</div>
                                        <div className="card-property-type">{this.props.property.bedroom} BR</div>
                                        <div className="card-property-type">{this.props.property.bathroom} BA</div>
                                        <div className="card-property-type">Sleeps {this.props.property.accomodate}</div>
                                        <div className="card-property-type">{this.props.property.nightlyBaseRate} Sq.Ft.</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card-property-distance">
                                        <i className="icon ion-md-locate"></i>
                                        <span className="card-property-distance-text">{parseFloat((Math.random()*9)+1).toFixed(2)} mi to San Jose center</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="card-property-footer">
                                        <span className="card-property-footer-rating"><strong>Wonderful!</strong>&nbsp;&nbsp;<span>4.8/5</span></span>
                                        <div className="card-property-footer-price">
                                            <span className="card-property-footer-price-text"><strong><span className="card-property-footer-price-value">$&nbsp;{this.props.property.nightlyBaseRate}&nbsp;</span></strong><span className="card-property-footer-price-unit">per night</span></span>
                                        </div>
                                    </div>
                                </div>
                                {/* <h4 className="card-title">Lorem ipsum dolor sit amet</h4>
                                    <p className="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                    <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                                {/* <a href="#" className="btn btn-primary">Read More</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
