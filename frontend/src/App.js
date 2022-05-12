import React, { Component } from 'react';
import './App.css';
import Main from './components/main/Main';
import { BrowserRouter } from 'react-router-dom'



export default class App extends Component {
   

render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}


