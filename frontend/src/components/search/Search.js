import React, { Component } from 'react'
// import { Authentication } from '../../services';
// import axios from 'axios';
// import { PROPERTY_DETAILS } from '../../data';
import GlobalNavbar from '../navbar/GlobalNavbar.js'
import './Search.css';
import Card from './Card';

import agent from '../../agent';
import { connect } from 'react-redux';
import _ from 'lodash';

import { ACTION_UPDATE_FIELD_SEARCH, ACTION_SUBMIT_SEARCH, ACTION_SEARCH_UNLOADED } from '../../actions';

const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch => ({
    onChangeField: (key, value) =>
        dispatch({ type: ACTION_UPDATE_FIELD_SEARCH, key, value }),
    onSubmit: (searchBody) =>
        dispatch({ type: ACTION_SUBMIT_SEARCH, payload: agent.Search.fetch(searchBody) }),
    onUnload: () =>
        dispatch({ type: ACTION_SEARCH_UNLOADED })
});

class Search extends Component {

    constructor() {
        super()
        this.handleInputChange = ev => this.props.onChangeField(ev.target.name, ev.target.value);
    }

    handleSubmit = ev => {
        if (ev) { ev.preventDefault(); }
        if (this.props.searchData) {
            // console.log(this.props.searchData);
            const { place, startDate, endDate, guest, bedroom, priceFrom, priceTo } = this.props.searchData;
            this.search({ place, startDate, endDate, guest, bedroom, priceFrom, priceTo});
        }
    }

    handlePageChange = page => {
        if (this.props.pager) {
            if (this.props.pager.pages < page || page < 1) { return }
        }
        if (this.props.searchData) {
            // console.log(this.props.searchData);
            // const { address: place, startDate, endDate, accomodate: guest } = this.props.searchData;
            // this.search({ place, startDate, endDate, guest, page });
            const { place, startDate, endDate, guest, bedroom, priceFrom, priceTo } = this.props.searchData;
            this.search({ place, startDate, endDate, guest, bedroom, priceFrom, priceTo, page});
        }
    }

    search = query => {
        const searchQuery = {};
        if (query.address) {
            searchQuery.address = query.address
        } else if (query.place) {
            searchQuery.address = query.place
        }
        if (query.startDate) {
            const sd = Date.parse(query.startDate)
            if (isNaN(sd) === false) {
                searchQuery.startDate  = new Date(sd).getTime()
           }
        }
        if (query.endDate) {
            const ed = Date.parse(query.endDate)
            if (isNaN(ed) === false) {
                searchQuery.endDate  = new Date(ed).getTime()
           }
        }
       if (query.guest) {
            searchQuery.accomodate = query.guest
        } else if (query.accomodate) {
            searchQuery.accomodate = query.accomodate
        }
        if (query.page) {
            searchQuery.page = query.page
        }
        if(query.bedroom){
            searchQuery.bedroom = query.bedroom
        }
        if(query.priceFrom){
            searchQuery.priceFrom = query.priceFrom
        }
        if(query.priceTo){
            searchQuery.priceTo = query.priceTo
        }
        this.props.onSubmit(searchQuery);
    }


    componentDidMount() {
        this.handleSubmit()
    }
    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        // console.log(this.props.searchData)
        const details = _.map(this.props.searchResult, property => {
            property['startDate'] = this.props.startDate;
            property['endDate'] = this.props.endDate;
            return (
                <Card property={property} key={property['_id']}></Card>
            )
        });

        const pagination = () => {
            if (!this.props) return;
            if (!this.props.pager) return;
            if (!this.props.pager.page) return;

            const page = this.props.pager.page
            const pages = this.props.pager.pages
            return (
                <div><nav aria-label="...">
                    <ul className="pagination">

                        {page <= 1 || pages === 1 ? (
                            <li className="page-item disabled">
                                <span className="page-link">Previous</span>
                            </li>
                        ) : (
                                <li className="page-item">
                                    <a className="page-link" onClick={()=>this.handlePageChange(page - 1)}>Previous</a>
                                </li>)}

                        {page === pages || pages === 1 ? (
                            <li className="page-item disabled">
                                <span className="page-link">Next</span>
                            </li>
                        ) : (
                                <li className="page-item">
                                    <a className="page-link" onClick={()=>this.handlePageChange(page + 1)}>Next</a>
                                </li>)}
                    </ul>
                </nav></div>
            )
        }
        // console.log(this.props)

        return (<div>
            <GlobalNavbar></GlobalNavbar>
            <div className="container search">
                <div className="search-wrapper">
                    <div className="row search-box justify-content-start">
                        <div className="col-lg-3 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-map"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='place'
                                        type='text'
                                        placeholder="Address"
                                        value={this.props.searchData.place || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-calendar"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='startDate'
                                        type='date'
                                        placeholder="Arrive"
                                        value={this.props.searchData.startDate || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-calendar"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='endDate'
                                        type='date'
                                        placeholder="Depart"
                                        value={this.props.searchData.endDate || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-people"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='guest'
                                        type='number'
                                        placeholder="Guests"
                                        value={this.props.searchData.guest || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-1 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <button type="submit" className="btn btn-primary search-box-button" onClick={this.handleSubmit}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row search-box justify-content-start">
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-cash"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='priceFrom'
                                        type='number'
                                        placeholder="Price From"
                                        value={this.props.searchData.priceFrom || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-cash"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='priceTo'
                                        type='number'
                                        placeholder="Price to"
                                        value={this.props.searchData.priceTo || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 search-box-col">
                            <div className="search-box-fields">
                                <div className="input-group search-box-input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search-box-input-group-text-icon border-right-0" id="basic-addon3"><i className="icon ion-ios-bed"></i></span>
                                    </div>
                                    <input className="search-box-input-text-box form-control border-left-0"
                                        name='bedroom'
                                        type='number'
                                        placeholder="Bedrooms"
                                        value={this.props.searchData.bedroom || ''}
                                        onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row add-property-rows">
                        <div className="col-8">
                            <div>{details}</div>
                            <div className="search-pagination">{pagination()}</div>
                        </div>
                        <div className="col-4">
                            <div>
                                <img src="/map.png" alt="Map"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);