/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var TweetsApp = require('./components/TweetsApp.react');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

ReactDOM.render(
  <TweetsApp tweets={initialState} />,
  document.getElementById('react-app')
);
