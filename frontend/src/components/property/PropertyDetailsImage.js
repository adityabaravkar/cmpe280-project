import React, { Component } from 'react';
import { API_ENDPOINT, IMAGE_ENDPOINT } from '../../data';
import { Authentication } from '../../services';
import axios from 'axios';

export default class PropertyDetailsImage extends Component {
    constructor(props){
        super(props);
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
        if(!this.props.image) { return;}
        const image = this.props.image;
        // this.instance.get(PROPERTY_DOWNLOAD_IMAGE+'/'+image)
        //     .then(response => {
        //         if (response.data) {
        //             const img = 'data:image/jpg;base64,' + response.data.payLoad["0"];
        //             this.setState({image : img });
        //         } else {
        //             console.log("Image cannot be downloaded")
        //         }
        //     }).catch(error => {
        //         console.error("[PROPERTY-DETAILS-IMAGE] Error occured, redirecting to Login page.");
        //         // Authentication.logout();
        //         // this.props.history.push(HOME);
        //     });

            this.setState({image : IMAGE_ENDPOINT+image });
    }

    
  render() {
    let divClass = "carousel-item ";
    if(this.props.index === 0){
        divClass = divClass + "active";
    }
    return (
    <div className={divClass}>
        <img className="d-block w-100" src={this.state.image} alt="First slide" />
    </div>
    )
  }
}
