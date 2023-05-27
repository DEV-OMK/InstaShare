import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileApiStatus: apiStatusConstants.initial,
    userProfile: {},
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userProfileApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const userProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(userProfileUrl, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedUserProfile = data.user_details

      const updatedUserProfile = {
        id: fetchedUserProfile.id,
        userId: fetchedUserProfile.user_id,
        userName: fetchedUserProfile.user_name,
        profilePic: fetchedUserProfile.profile_pic,
        followersCount: fetchedUserProfile.followers_count,
        followingCount: fetchedUserProfile.following_count,
        userBio: fetchedUserProfile.user_bio,
        postsCount: fetchedUserProfile.posts_count,
        posts: fetchedUserProfile.posts.map(eachPost => ({
          id: eachPost.id,
          image: eachPost.image,
        })),
        stories: fetchedUserProfile.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }

      this.setState({
        userProfileApiStatus: apiStatusConstants.success,
        userProfile: updatedUserProfile,
      })
    } else {
      this.setState({
        userProfileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUserProfileDetails = () => {
    const {userProfile} = this.state
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
    } = userProfile

    return (
      <div className="user-profile-details-container">
        <img
          src={profilePic}
          className="user-profile-details-profile-pic-lg"
          alt="user profile"
        />
        <div className="user-profile-details-data">
          <h1 className="user-profile-details-user-name">{userName}</h1>
          <div className="user-profile-details-numbers-container">
            <img
              src={profilePic}
              className="user-profile-details-profile-pic-sm"
              alt="user profile"
            />
            <p className="user-profile-details-numbers">
              <span className="bold-numbers">{postsCount}</span> posts
            </p>
            <p className="user-profile-details-numbers">
              <span className="bold-numbers">{followersCount}</span> followers
            </p>
            <p className="user-profile-details-numbers">
              <span className="bold-numbers">{followingCount}</span> following
            </p>
          </div>
          <p className="user-profile-details-user-id">{userId}</p>
          <p className="user-profile-details-user-bio">{userBio}</p>
        </div>
      </div>
    )
  }

  renderUserProfileStories = () => {
    const {userProfile} = this.state
    const {stories} = userProfile

    if (stories.length === 0) {
      return null
    }

    return (
      <ul className="user-profile-stories-container">
        {stories.map(eachStory => (
          <li key={eachStory.id} className="user-story-container">
            <img
              src={eachStory.image}
              className="user-profile-story-image"
              alt="user story"
            />
          </li>
        ))}
      </ul>
    )
  }

  renderUserProfilePosts = () => {
    const {userProfile} = this.state
    const {posts} = userProfile

    if (posts.length === 0) {
      return (
        <div className="user-profile-no-post-container">
          <div className="user-profile-no-post-icon-container">
            <BiCamera className="user-profile-no-posts-icon" />
          </div>
          <h1 className="user-profile-no-post-title">No Posts Yet</h1>
        </div>
      )
    }

    return (
      <ul className="user-profile-posts-container">
        {posts.map(eachPost => (
          <li key={eachPost.id} className="user-post-container">
            <img
              src={eachPost.image}
              className="user-profile-post-image"
              alt="user post"
            />
          </li>
        ))}
      </ul>
    )
  }

  userProfileSuccessView = () => (
    <>
      {this.renderUserProfileDetails()}
      {this.renderUserProfileStories()}
      <div className="user-profile-posts-title-container">
        <BsGrid3X3 className="user-profile-posts-icon" />
        <h1 className="user-profile-posts-title">Posts</h1>
      </div>
      {this.renderUserProfilePosts()}
    </>
  )

  renderUserProfile = () => {
    const {userProfileApiStatus} = this.state

    switch (userProfileApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView tryAgain={this.getUserProfile} />
      case apiStatusConstants.success:
        return this.userProfileSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-main-container">
        <div className="user-profile-responsive-container">
          <Header />
          {this.renderUserProfile()}
        </div>
      </div>
    )
  }
}

export default UserProfile
