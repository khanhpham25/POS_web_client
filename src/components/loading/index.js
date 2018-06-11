import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    if (!this.props.loading) return null;
    return (
      <div id='preloader'>
        <div id='loader'></div>
      </div>
    );
  }
}
