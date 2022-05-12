import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../home/Home.js'
import LoginOwner from "../login/LoginOwner.js";
import LoginTraveler from "../login/LoginTraveler.js";
import SignupOwner from "../signup/SignupOwner.js";
import SignupTraveler from "../signup/SignupTraveler.js";
import DashboardOwner from "../dashboard/DashboardOwner.js";
import DashboardTraveler from "../dashboard/DashboardTraveler.js";
import ListProperty from "../property/ListProperty.js"
import { Authentication } from "../../services";
import Profile from '../profile/Profile.js';
import Search from '../search/Search.js';
import PropertyDetails from '../property/PropertyDetails.js';
import {LOGIN_OWNER, LOGIN_TRAVELER} from '../../data'

import GlobalNavbar from '../navbar/GlobalNavbar.js'
import Card from '../search/Card.js';
import Logout from '../logout/Logout.js';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { store } from '../../store';
import { push } from 'react-router-redux';
import  {ACTION_REDIRECT} from '../../actions';
import Chat from '../chat/chat.js';



const mapStateToProps = state => { return { redirectTo: state.common.redirectTo }};
const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: ACTION_REDIRECT })
});

class Main extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
          // this.context.router.replace(nextProps.redirectTo);
          //   console.log(nextProps)
          // TODO : Find an effcient approach   
          store.dispatch(push(nextProps.redirectTo));
          this.props.history.push(nextProps.redirectTo);
          this.props.onRedirect();
        }
      }
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/login-owner" component={LoginOwner} />
                    <Route path="/login-traveler" component={LoginTraveler} />
                    <Route path="/signup-owner" component={SignupOwner} />
                    <Route path="/signup-traveler" component={SignupTraveler} />

                    <OwnerPrivateRoute path="/owner/dashboard" component={DashboardOwner} />
                    <OwnerPrivateRoute path="/owner/property/add" component={ListProperty} />
                    <OwnerPrivateRoute path="/owner/profile" component={Profile} />
                    
                    <TravelerPrivateRoute path="/traveler/search" component={Search} />
                    <TravelerPrivateRoute path="/traveler/dashboard" component={DashboardTraveler} />
                    <TravelerPrivateRoute path="/traveler/profile" component={Profile} />
                    {/* <TravelerPrivateRoute path="/property/:id" component={PropertyDetails} /> */}
                    <TravelerPrivateRoute path="/property" component={PropertyDetails} />

                    <Route exact path="/navbar" component={GlobalNavbar}></Route>
                    <Route exact path="/card" component={Card}></Route>

                    <Route exact path="/logout" component={Logout}></Route>

                    <Route path="/chat" component={Chat} />

                </Switch>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/delete" component={Delete} />
                <Route path="/create" component={Create} /> */}
            </div>
        )
    }
}
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Main));

const OwnerPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (Authentication.isUserLoggedIntoOwnerMode()) // boolean expression inside it will determine if the route is allowed or not 
                ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN_OWNER,
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const TravelerPrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (Authentication.isUserLoggedIntoTravelerMode()) // boolean expression inside it will determine if the route is allowed or not 
                ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN_TRAVELER,
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);