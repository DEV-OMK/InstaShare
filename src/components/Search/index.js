import {Component} from 'react'
import Cookies from 'js-cookie'

import HomePostItem from '../HomePostItem'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import SearchNotFound from '../SearchNotFound'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    searchApiStatus: apiStatusConstants.initial,
    searchResults: [],
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({searchApiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(searchUrl, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const fetchedPosts = fetchedData.posts
      const updatedPosts = fetchedPosts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        postDetails: {
          imageUrl: eachPost.post_details.image_url,
          caption: eachPost.post_details.caption,
        },
        likesCount: eachPost.likes_count,
        comments: eachPost.comments.map(eachComment => ({
          userId: eachComment.user_id,
          userName: eachComment.user_name,
          comment: eachComment.comment,
        })),
        createdAt: eachPost.created_at,
      }))

      this.setState({
        searchApiStatus: apiStatusConstants.success,
        searchResults: updatedPosts,
      })
    } else {
      this.setState({
        searchApiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchSuccessView = () => {
    const {searchResults} = this.state

    if (searchResults.length === 0) {
      return <SearchNotFound />
    }

    return (
      <div className="search-results-container">
        <h1 className="search-results">Search Results</h1>
        <ul className="search-posts-container">
          {searchResults.map(eachPost => (
            <HomePostItem key={eachPost.postId} post={eachPost} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchResults = () => {
    const {searchApiStatus} = this.state

    switch (searchApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView tryAgain={this.getSearchResults} />
      case apiStatusConstants.success:
        return this.searchSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderSearchResults()}</>
  }
}

export default Search
