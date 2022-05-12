import React, { Component } from 'react';
import './DashboardCard.css';
import { API_ENDPOINT, FETCH_PROPERTY, PROPERTY_DETAILS, IMAGE_ENDPOINT } from '../../data';
import { Link } from "react-router-dom";
import { Authentication } from '../../services';
import axios from 'axios';

export default class DashboardCard extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.property);
        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
            headers: { 'Authorization': Authentication.bearerToken }
        });
        this.state = {
            imageName : '',
            image : '',
            property: {
                headline: '',
                bathroom:0,
                bedroom:0,
                type:'',
                accomodate:0,
                price:0
            }
        }
    }
    componentDidMount(){
        if(!this.props.property) { return;}
        // console.log(this.props.property.propertyId);
        this.instance.post(FETCH_PROPERTY, { id : this.props.property._id})
        .then(
            response => {
                this.setState({property: response.data.payLoad[0]})
                if(response.data.payLoad[0].imageList){
                    const imageList = response.data.payLoad[0].imageList;
                    const listImage = imageList.split(',')[0];
                    this.setState({imageName : listImage});
                }
            }
        ).then(()=>{
            // console.log(this.state.imageName)
            // this.instance.get(PROPERTY_DOWNLOAD_IMAGE+'/'+this.state.imageName)
            // .then(response => {
            //     if (response.data) {
            //         // console.log(response)
            //         const img = 'data:image/jpg;base64,' + response.data.payLoad[0];
            //         this.setState({image : img });
                    
            //     } else {
            //         console.log("Image cannot be downloaded")
            //     }
            // }).catch(error => {
            //     console.error("[GENERIC-CARD] Error occured, redirecting to Login page.");
            // })
            this.setState({image : IMAGE_ENDPOINT+this.state.imageName });
        })
        .catch(error => {})
        // if(!this.props.property.imageList) { return;}
        // const image = this.props.property.imageList.split(',')[0];
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
                    
                                </div>
                                <div className="row">
                                    <Link to={{ pathname: PROPERTY_DETAILS, state: this.state.property }}><h5 className="card-property-title">{this.state.property.headline || ''}</h5></Link>
                                </div>
                                <div className="row">
                                    <div className="card-property-detail">
                                        <div className="card-property-type">{this.state.property.type || ''}</div>
                                        <div className="card-property-type">{this.state.property.bedroom || ''} BR</div>
                                        <div className="card-property-type">{this.state.property.bathroom || ''} BA</div>
                                        <div className="card-property-type">Sleeps {this.state.property.accomodate || ''}</div>
                                        <div className="card-property-type">{this.state.property.nightlyBaseRate || ''} Sq.Ft.</div>
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
                                            <span className="card-property-footer-price-text"><strong><span className="card-property-footer-price-value">$&nbsp;{this.state.property.nightlyBaseRate || ''}&nbsp;</span></strong><span className="card-property-footer-price-unit">per night</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
