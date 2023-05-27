import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'
import StoriesSlick from '../StoriesSlick'
import HomePostItem from '../HomePostItem'
import Search from '../Search'
import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    usersStoriesApiStatus: apiStatusConstants.initial,
    postsApiStatus: apiStatusConstants.initial,
    usersStories: [],
    posts: [],
  }

  componentDidMount() {
    this.getUsersStories()
    this.getPosts()
  }

  getUsersStories = async () => {
    this.setState({usersStoriesApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const usersStoriesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(usersStoriesUrl, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedUsersStories = data.users_stories
      const updatedUsersStories = fetchedUsersStories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))

      this.setState({
        usersStoriesApiStatus: apiStatusConstants.success,
        usersStories: updatedUsersStories,
      })
    } else {
      this.setState({
        usersStoriesApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getPosts = async () => {
    this.setState({postsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const postsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(postsUrl, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedPosts = data.posts
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
        postsApiStatus: apiStatusConstants.success,
        posts: updatedPosts,
      })
    } else {
      this.setState({
        postsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  userStoriesSuccessView = () => {
    const {usersStories} = this.state

    return <StoriesSlick usersStories={usersStories} />
  }

  renderUsersStories = () => {
    const {usersStoriesApiStatus} = this.state

    switch (usersStoriesApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView tryAgain={this.getUsersStories} />
      case apiStatusConstants.success:
        return this.userStoriesSuccessView()
      default:
        return null
    }
  }

  postsSuccessView = () => {
    const {posts} = this.state

    return (
      <ul className="home-posts-container">
        {posts.map(eachPost => (
          <HomePostItem key={eachPost.postId} post={eachPost} />
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {postsApiStatus} = this.state

    switch (postsApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView tryAgain={this.getPosts} />
      case apiStatusConstants.success:
        return this.postsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {searchCaptionInput, showSearchOutput} = value

          return (
            <div className="home-main-container">
              <div className="home-responsive-container">
                <Header />
                {!showSearchOutput && this.renderUsersStories()}
                {!showSearchOutput && this.renderPosts()}
                {showSearchOutput && (
                  <Search searchInput={searchCaptionInput} />
                )}
              </div>
            </div>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default Home
