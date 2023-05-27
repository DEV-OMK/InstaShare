import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({
        showError: true,
        errorMsg,
      })
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="login-input"
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderLoginCard = () => {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-card">
        <img
          className="login-logo"
          src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683530986/InstaShareApp/insta-share-logo_nrawpi.png"
          alt="website logo"
        />
        <h1 className="login-title">Insta Share</h1>
        <form className="login-form" onSubmit={this.onSubmitLogin}>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {showError && <p className="error-msg">{errorMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="login-main-container">
        <div className="login-responsive-container">
          <img
            className="login-image"
            src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683537467/InstaShareApp/website-login_s2scss.png"
            alt="website login"
          />
          {this.renderLoginCard()}
        </div>
      </div>
    )
  }
}

export default Login
