import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import Errors from 'components/errors';

import { submitLogin } from './actions';
class Login extends Component {
  render() {
    const { errors, redirectToReferrer } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const token = localStorage.token;

    if (token && redirectToReferrer == true) return <Redirect to={from} />;

    return (
      <div className='login-wrapper'>
        <div className='login-container'>
          <h1>Welcome</h1>
          <Errors errors={errors} />
          <form className='login-form'>
            <input name='email' type='email' placeholder='Email' ref='email' />
            <input name='password' type='password' placeholder='Password' ref='password' />
            <button type='submit' id='login-button'
              onClick={this.onSubmit.bind(this)}>Login</button>
          </form>
        </div>

        <ul className='bg-bubbles'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.submitLogin(this.refs.email.value, this.refs.password.value);
  }
}

const mapStateToProps = (state) => ({
  errors: state.loginReducer.errors,
  redirectToReferrer: state.loginReducer.redirectToReferrer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  submitLogin
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
