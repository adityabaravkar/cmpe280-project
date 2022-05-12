import React, { Component } from 'react'
import { Authentication } from '../../services';
import axios from 'axios';
import { API_ENDPOINT, UPDATE_USER, FETCH_USER_DETAILS, LOGIN_TRAVELER, LOGIN_OWNER } from '../../data';
import GlobalNavbar from '../navbar/GlobalNavbar.js';
import './Profile.css'
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: Authentication.userId,
            profilePicture: '',
            fname: '',
            lname: '',
            email: '',
            phoneNumber: '',
            aboutMe: '',
            city: '',
            country: '',
            company: '',
            school: '',
            hometown: '',
            language: '',
            gender: '',
            displayMessage: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProfileUpload = this.handleProfileUpload.bind(this);
        this.instance = axios.create({
            baseURL: API_ENDPOINT,
            timeout: 1000,
            headers: { 'Authorization': Authentication.bearerToken }
        });
    }

    componentDidMount() {
        this.instance.get(FETCH_USER_DETAILS + '/' + Authentication.userId)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const userDetails = response.data;
                    this.setState({
                        // profilePicture: userDetails.profile_picture,
                        fname: userDetails.fname,
                        lname: userDetails.lname,
                        email: userDetails.email,
                        phoneNumber: userDetails.phoneNumber,
                        aboutMe: userDetails.aboutMe,
                        city: userDetails.city,
                        country: userDetails.country,
                        company: userDetails.company,
                        school: userDetails.school,
                        hometown: userDetails.hometown,
                        language: userDetails.language,
                        gender: userDetails.gender,
                    })
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(error => {
                console.error("[PROFILE] Error occured, redirecting to Login page.");
                if (Authentication.type === 'OWNER') {
                    Authentication.logout();
                    this.props.history.push(LOGIN_OWNER);
                } else {
                    Authentication.logout();
                    this.props.history.push(LOGIN_TRAVELER)
                }
            })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            displayMessage: ''
        });

    }

    handleSubmit() {
        const requestBody = this.state;
        // requestBody.imageList = this.state.imageList.toString();
        this.instance.post(UPDATE_USER, requestBody)
            .then(response => {
                console.log(response)
                if (response.status === 202 || response.status === 200) {
                    console.log("User updated successfully");
                    this.setState({ 'displayMessage': 'User details updated successfully.' });
                } else {
                }
            }).catch(error => {
                console.error("[PROFILE] Error occured, redirecting to Login page.");
                if (Authentication.type === 'OWNER') {
                    Authentication.logout();
                    this.props.history.push(LOGIN_OWNER);
                } else {
                    Authentication.logout();
                    this.props.history.push(LOGIN_TRAVELER)
                }
            });
    }

    handleProfileUpload = (e) => {
        // if (e.target.name === 'propertyImages') {
        //     let formData = new FormData();
        //     for (let index = 0; index < e.target.files.length; index++) {
        //         const element = e.target.files[index];
        //         formData.append('photos', element, element.name);
        //     }
        //     this.instance.post(PROPERTY_UPLOAD_IMAGE, formData)
        //         .then((result) => {
        //             if (result.data.data) {
        //                 this.setState({ profilePicture: result.data.data });
        //             }
        //         });
        // }
    }

    render() {
        return (
            <div>
                <GlobalNavbar></GlobalNavbar>
                <div className="container profile">
                    <div className="profile-wrapper">
                        <div className="row profile-header">
                            <div className="col-12">
                                <div className="profile-content-contianer">
                                    <div className="profile-content-contianer-wrapper">
                                        <div class="profile-content-contianer-header">
                                            <h3><span className="profile-content-container-header-title"><strong>Profile Details</strong></span></h3>
                                            <hr></hr>
                                        </div>
                                        <div className="profile-content-contianer-body">
                                            {/* First Name and Last Name */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="First name"
                                                                name='fname'
                                                                value={this.state.fname || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Last name"
                                                                name='lname'
                                                                value={this.state.lname || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Email and Phone Number */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Email"
                                                                name='email'
                                                                value={this.state.email || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Phone Number"
                                                                name='phoneNumber'
                                                                value={this.state.phoneNumber || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* About me and City */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="About me"
                                                                name='aboutMe'
                                                                value={this.state.aboutMe || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="City"
                                                                name='city'
                                                                value={this.state.city || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Country and Company */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Country"
                                                                name='country'
                                                                value={this.state.country || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Company"
                                                                name='company'
                                                                value={this.state.company || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* School and Hometown */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="School"
                                                                name='school'
                                                                value={this.state.school || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Hometown"
                                                                name='hometown'
                                                                value={this.state.hometown || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Languages and Gender */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Languages"
                                                                name='language'
                                                                value={this.state.language || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div class="profile-fields">
                                                        <div className="input-group profile-content-input-group">
                                                            <input className="profile-content-input-text-box form-control"
                                                                type="text"
                                                                placeholder="Gender"
                                                                name='gender'
                                                                value={this.state.gender || ''}
                                                                onChange={this.handleInputChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr></hr>
                                        </div>
                                        <div className="profile-content-contianer-footer">
                                            <div class="row">
                                                <div class="col-6">
                                                    <span class="profile-content-contianer-footer-text">{this.state.displayMessage}</span>
                                                </div>
                                                <div class="col-6"><button onClick={this.handleSubmit} class="btn btn-default profile-content-contianer-footer-button" label="Update"><span class="profile-content-contianer-footer-button-text">Update Profile</span></button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            //     <div>
            //         <input
            //             name='fname'
            //             type='text'
            //             value={this.state.fname || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='lname'
            //             type='text'
            //             value={this.state.lname || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='email'
            //             type='text'
            //             value={this.state.email || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='phoneNumber'
            //             type='text'
            //             value={this.state.phoneNumber || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='aboutMe'
            //             type='text'
            //             value={this.state.aboutMe || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='city'
            //             type='text'
            //             value={this.state.city || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='country'
            //             type='text'
            //             value={this.state.country || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='company'
            //             type='text'
            //             value={this.state.company || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='school'
            //             type='text'
            //             value={this.state.school || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='hometown'
            //             type='text'
            //             value={this.state.hometown || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='language'
            //             type='text'
            //             value={this.state.language || ''}
            //             onChange={this.handleInputChange} />
            //         <input
            //             name='gender'
            //             type='text'
            //             value={this.state.gender || ''}
            //             onChange={this.handleInputChange} />

            //         <button onClick={this.handleSubmit}>Update user details</button>
            //     </div>
            //
        )
    }
}
