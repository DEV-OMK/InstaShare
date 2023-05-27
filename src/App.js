import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import InstaShareContext from './context/InstaShareContext'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './components/PageNotFound'

import './App.css'

class App extends Component {
  state = {
    searchCaptionInput: '',
    showSearchOutput: false,
  }

  changeSearchCaptionInput = searchInput => {
    this.setState({
      searchCaptionInput: searchInput,
      showSearchOutput: false,
    })
  }

  toggleSearchOutput = toggleValue => {
    if (!toggleValue) {
      this.setState({
        searchCaptionInput: '',
      })
    }
    this.setState({showSearchOutput: toggleValue})
  }

  render() {
    const {searchCaptionInput, showSearchOutput} = this.state

    return (
      <InstaShareContext.Provider
        value={{
          searchCaptionInput,
          showSearchOutput,
          changeSearchCaptionInput: this.changeSearchCaptionInput,
          toggleSearchOutput: this.toggleSearchOutput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/bad-path" component={PageNotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
