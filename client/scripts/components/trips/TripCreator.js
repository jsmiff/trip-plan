import React from 'react';
import Router from 'react-router';
import TripActions from '../../actions/TripActions';

var { Route, RouteHandler, Link, DefaultRoute } = Router;

var TripCreator = React.createClass({displayName: "TripCreator",

  mixins: [ Router.Navigation, Router.State ],

  getInitialState: function() {
    return {
      destination: "",
      travelDates: ""
    };
  },
  destinationOnChange: function(e){
    this.setState({destination: e.target.value});
  },
  travelDatesOnChange: function(e){
    this.setState({travelDates: e.target.value});
  },
  createTrip: function(e) {
    e.preventDefault();

    this.validateForm().then(function(result) {

      TripActions.createTrip({
        destination: this.state.destination,
        travelDates: this.state.travelDates
      }, function (trip) {

        console.log(trip);

        this.transitionTo('trip', { id: trip.id });
      }.bind(this));

      // TODO need to jump to trip details after creation

      this.resetForm();

    }.bind(this), function(err) {
      this.setState({formError: "Fill in something!"});
    }.bind(this));

  },
  validateForm: function() {

    // TODO implement this method on keydown of input fields

    return new Promise(function(resolve,reject) {

      if (this.state.destination &&
          this.state.destination.trim().length !== 0 &&
          this.state.travelDates &&
          this.state.travelDates.trim().length !== 0) {

        resolve();

      } else {
        reject();
      }

    }.bind(this));

  },
  resetForm: function(){
    this.setState({destination: "",travelDates: "",formError: ""});
  },
  render: function(){
    return(
      React.createElement("form", {className: "ui form", onSubmit:  this.createTrip}, 
        React.createElement("div", {className: "field"}, 
          React.createElement("label", null, "Describe the trip"), 
          React.createElement("textarea", {placeholder: "Consider yourself a salesperson for this trip"})
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("label", null, "OK, give this trip a name"), 
          React.createElement("input", {placeholder: "Last chance to make this trip sound cool", type: "text"})
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("label", null, "Where to"), 
          React.createElement("input", {onChange:  this.destinationOnChange, value:  this.state.destination, placeholder: "Enter destination"})
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("label", null, "When"), 
          React.createElement("input", {onChange:  this.travelDatesOnChange, value:  this.state.travelDates, placeholder: "Enter travel dates"})
        ), 
        React.createElement("div", {className: "ui error message"}, 
          React.createElement("div", {className: "header"}, this.state.formError)
        ), 
        React.createElement("button", {className: "ui submit button", type: "submit"}, "Add")
      )
    );
  }
});

export default TripCreator;