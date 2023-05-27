import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GoThreeBars} from 'react-icons/go'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

class Header extends Component {
  state = {
    showHamburger: false,
    activeTabId: 'home',
    showSearchBar: false,
  }

  componentDidMount() {
    this.setActiveTabId()
  }

  setActiveTabId = () => {
    const {location} = this.props
    switch (location.pathname) {
      case '/':
        this.setState({activeTabId: 'home'})
        break
      case '/my-profile':
        this.setState({activeTabId: 'profile'})
        break
      default:
        this.setState({activeTabId: ''})
        break
    }
  }

  toggleHamburger = () => {
    this.setState({showSearchBar: false})
    this.setState(prevState => ({
      showHamburger: !prevState.showHamburger,
    }))
  }

  toggleSearchBar = () => {
    this.setState({showSearchBar: true, showHamburger: false})
  }

  onClickCloseHamburger = () => {
    this.setState({showHamburger: false})
  }

  onClickCloseSearchbar = () => {
    this.setState({showSearchBar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderSearchBarSmall = () => (
    <InstaShareContext.Consumer>
      {value => {
        const {
          searchCaptionInput,
          changeSearchCaptionInput,
          toggleSearchOutput,
        } = value
        return (
          <ul className="search-bar-container-sm">
            <li className="search-bar search-bar-sm">
              <input
                type="search"
                placeholder="Search Caption"
                className="search-input search-input-sm"
                value={searchCaptionInput}
                onChange={event => {
                  changeSearchCaptionInput(event.target.value)
                }}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchIcon"
                onClick={() => {
                  toggleSearchOutput(true)
                }}
              >
                <FaSearch />
              </button>
            </li>
            <li onClick={this.onClickCloseSearchbar}>
              <img
                src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683605256/InstaShareApp/Solid_dhbjax.png"
                alt="cross"
                className="hamburger-cross"
              />
            </li>
          </ul>
        )
      }}
    </InstaShareContext.Consumer>
  )

  renderSearchBarLarge = () => (
    <InstaShareContext.Consumer>
      {value => {
        const {
          searchCaptionInput,
          changeSearchCaptionInput,
          toggleSearchOutput,
        } = value
        return (
          <li className="search-bar">
            <input
              type="search"
              placeholder="Search Caption"
              className="search-input"
              value={searchCaptionInput}
              onChange={event => {
                changeSearchCaptionInput(event.target.value)
              }}
            />
            <button
              type="button"
              className="search-button"
              data-testid="searchIcon"
              onClick={() => {
                toggleSearchOutput(true)
              }}
            >
              <FaSearch />
            </button>
          </li>
        )
      }}
    </InstaShareContext.Consumer>
  )

  renderHeader = () => {
    const {showHamburger, activeTabId, showSearchBar} = this.state

    return (
      <InstaShareContext.Consumer>
        {value => {
          const {toggleSearchOutput} = value

          return (
            <nav className="navbar">
              <div className="logo-and-hamburger-container">
                <div className="logo-container">
                  <Link
                    to="/"
                    className="link-item"
                    onClick={() => {
                      toggleSearchOutput(false)
                    }}
                  >
                    <img
                      className="header-logo"
                      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683530986/InstaShareApp/insta-share-logo_nrawpi.png"
                      alt="website logo"
                    />
                  </Link>
                  <h1 className="header-title">Insta Share</h1>
                </div>
                <button
                  type="button"
                  className="hamburger-icon-button"
                  onClick={this.toggleHamburger}
                >
                  <GoThreeBars />
                </button>
              </div>
              {showHamburger && (
                <ul className="links-container-sm">
                  <li
                    className="link-tabs"
                    style={{color: activeTabId === 'home' ? '#4094ef' : ''}}
                    onClick={() => {
                      toggleSearchOutput(false)
                    }}
                  >
                    <Link to="/" className="link-item">
                      Home
                    </Link>
                  </li>
                  <li className="link-tabs" onClick={this.toggleSearchBar}>
                    Search
                  </li>
                  <li
                    className="link-tabs"
                    style={{color: activeTabId === 'profile' ? '#4094ef' : ''}}
                    onClick={() => {
                      toggleSearchOutput(false)
                    }}
                  >
                    <Link to="/my-profile" className="link-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="logout-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li onClick={this.onClickCloseHamburger}>
                    <img
                      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683605256/InstaShareApp/Solid_dhbjax.png"
                      alt="cross"
                      className="hamburger-cross"
                    />
                  </li>
                </ul>
              )}
              {showSearchBar && this.renderSearchBarSmall()}
              <ul className="links-container-lg">
                {this.renderSearchBarLarge()}
                <li
                  className="link-tabs"
                  style={{color: activeTabId === 'home' ? '#4094ef' : ''}}
                  onClick={() => {
                    toggleSearchOutput(false)
                  }}
                >
                  <Link to="/" className="link-item">
                    Home
                  </Link>
                </li>
                <li
                  className="link-tabs"
                  style={{color: activeTabId === 'profile' ? '#4094ef' : ''}}
                  onClick={() => {
                    toggleSearchOutput(false)
                  }}
                >
                  <Link to="/my-profile" className="link-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="logout-button"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }

  render() {
    return <>{this.renderHeader()}</>
  }
}

export default withRouter(Header)
