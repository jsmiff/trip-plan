import React from 'react';
import Router from 'react-router';
import FeedActions from '../../actions/FeedActions';
import FeedStore from '../../stores/FeedStore';
import Card from '../common/Card';
import UserStore from '../../stores/UserStore';

var getMessages = function(id){
  return {
    messages: FeedStore.getFeedsByTripId(id),
    user: UserStore.getCurrentUser().password
  }
}

var Feed = React.createClass({displayName: "Feed",

  mixins: [ Router.Navigation, Router.State ],

  getInitialState:function(){
    return getMessages(this.props.tripId);
  },
  componentDidMount:function(){
    // Listen for changes on the Feed Store
    FeedStore.addChangeListener(this._onChange, this);
  },
  componentWillUnmount:function(){
    FeedStore.removeChangeListener(this._onChange, this);
  },
  componentWillReceiveProps:function(nextProps) {
    // Grab initial messages
    FeedActions.viewMessages(nextProps.tripId);
  },
  createMessage:function(){
    FeedActions.createMessage({
      author: this.state.user.email, // TODO we need to add displayName to the profile
      messageText: this.state.messageText,
      id: null,
      tripId: this.props.tripId,
      date: Date.now()
    });

    this.setState({messageText: ""})
  },
  handleRemoveMessage:function(childComponent){
    if (this.state.user.email === childComponent.props.message.author){
      FeedActions.removeMessage(childComponent.props.message.id);
    } else {
      console.log('You aint post it - you aint deletin it');
    };
  },
  handleLikes:function(childComponent, username){
    FeedActions.likeMachine(childComponent.props.message, this.state.user.email);
  },
  messageOnChange:function(e){
    this.setState({messageText: e.target.value});
  },
  _onChange:function(){
    this.setState(getMessages(this.props.tripId));
  },
  render: function() {
    var messages = this.state.messages;
    return (
      React.createElement("div", null, 
         messages.map(function(message) {
          {/* TODO add back in profPic={ twitterObj.cachedUserProfile.profile_image_url }} */}
          return React.createElement(Card, {message: message, handleLikes:  this.handleLikes, handleRemoveMessage:  this.handleRemoveMessage})
        }, this), 
        React.createElement("div", {className: "ui action left icon input"}, 
          React.createElement("input", {type: "text", onChange:  this.messageOnChange, value:  this.state.messageText, placeholder: "Comment here..."}), 
          React.createElement("div", {className: "ui teal button", onClick:  this.createMessage}, "Add")
        )
      )
    )
  }
});

export default Feed;
