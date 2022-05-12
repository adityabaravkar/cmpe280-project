import React, { Component } from 'react';
import './MiniCard.css';
export default class MiniCard extends Component {
    constructor(props){
        super(props);
        console.log(this.props.property);
    }
    render() {
        return (
            <div>
                <div class="property-card mini-sugar-card card">
                    <div class="row mini-card-row">
                        <div class="col-md-4 mini-card-thumbnail">
                            <img src="/sample.jpg" alt="Property" class="w-100 h-100" />
                        </div>
                        <div class="col-md-8 px-3">
                            <div class="mini-card-block property-mini-card-wrapper px-3">
                                <div className="row mini-card-hype">
                                    <small>
                                        <div class="mini-card-hype-popular">Popular</div>Viewed {Math.round(Math.random()*500)+50} times in the last 48 hours
                                    </small>
                                </div>
                                <div className="row">
                                    <h5 class="mini-card-property-title">{this.props.property.headline.split(' ').splice(0, 4).join(' ')}</h5>
                                </div>
                                <div className="row">
                                    <div class="mini-card-property-detail">
                                        <div class="mini-card-property-type">House</div>
                                        <div class="mini-card-property-type">{this.props.property.bedrooms} BR</div>
                                        <div class="mini-card-property-type">{this.props.property.bathrooms} BA</div>
                                        <div class="mini-card-property-type">Sleeps {this.props.property.accomodates}</div>
                                        <div class="mini-card-property-type">{this.props.property.price} Sq.Ft.</div>
                                    </div>
                                </div>
                                   <div className="row">
                                    <div class="mini-card-property-footer">
                                        <div class="mini-card-property-footer-price">
                                            <span class="mini-card-property-footer-price-text"><strong><span class="mini-card-property-footer-price-value">$&nbsp;{this.props.property.price}&nbsp;</span></strong><span class="mini-card-property-footer-price-unit">per night</span></span>
                                        </div>
                                    </div>
                                </div>
                                {/* <h4 class="mini-card-title">Lorem ipsum dolor sit amet</h4>
                                    <p class="mini-card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                    <p class="mini-card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                                {/* <a href="#" class="btn btn-primary">Read More</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
