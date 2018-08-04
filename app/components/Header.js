import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../css/App.css';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h2>CONTENT API MsgViewer</h2>
        </div>
        <p className="App-intro">
          Use this tool to get data and links associated to Drupal documents as they&#39;
          reprocessed through various stages of our platform.
          Great for triaging and debugging across our environments by so-inclined persons.
        </p>
      </div>
    );
  }
}
