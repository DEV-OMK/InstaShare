import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import Search from '../Search'
import InstaShareContext from '../../context/InstaShareContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileApiStatus: apiStatusConstants.initial,
    myProfile: {},
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({myProfileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const userProfileUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(userProfileUrl, options)
    const data = await response.json()

    if (response.ok) {
      const fetchedMyProfile = data.profile

      const updatedMyProfile = {
        id: fetchedMyProfile.id,
        userId: fetchedMyProfile.user_id,
        userName: fetchedMyProfile.user_name,
        profilePic: fetchedMyProfile.profile_pic,
        followersCount: fetchedMyProfile.followers_count,
        followingCount: fetchedMyProfile.following_count,
        userBio: fetchedMyProfile.user_bio,
        postsCount: fetchedMyProfile.posts_count,
        posts: fetchedMyProfile.posts.map(eachPost => ({
          id: eachPost.id,
          image: eachPost.image,
        })),
        stories: fetchedMyProfile.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }

      this.setState({
        myProfileApiStatus: apiStatusConstants.success,
        myProfile: updatedMyProfile,
      })
    } else {
      this.setState({
        myProfileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderMyProfileDetails = () => {
    const {myProfile} = this.state
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
    } = myProfile

    return (
      <div className="my-profile-details-container">
        <img
          src={profilePic}
          className="my-profile-details-profile-pic-lg"
          alt="my profile"
        />
        <div className="my-profile-details-data">
          <h1 className="my-profile-details-user-name">{userName}</h1>
          <div className="my-profile-details-numbers-container">
            <img
              src={profilePic}
              className="my-profile-details-profile-pic-sm"
              alt="my profile"
            />
            <p className="my-profile-details-numbers">
              <span className="bold-numbers">{postsCount}</span> posts
            </p>
            <p className="my-profile-details-numbers">
              <span className="bold-numbers">{followersCount}</span> followers
            </p>
            <p className="my-profile-details-numbers">
              <span className="bold-numbers">{followingCount}</span> following
            </p>
          </div>
          <p className="my-profile-details-user-id">{userId}</p>
          <p className="my-profile-details-user-bio">{userBio}</p>
        </div>
      </div>
    )
  }

  renderMyProfileStories = () => {
    const {myProfile} = this.state
    const {stories} = myProfile

    if (stories.length === 0) {
      return null
    }

    return (
      <ul className="my-profile-stories-container">
        {stories.map(eachStory => (
          <li key={eachStory.id} className="my-story-container">
            <img
              src={eachStory.image}
              className="my-profile-story-image"
              alt="my story"
            />
          </li>
        ))}
      </ul>
    )
  }

  renderMyProfilePosts = () => {
    const {myProfile} = this.state
    const {posts} = myProfile

    if (posts.length === 0) {
      return (
        <div className="my-profile-no-post-container">
          <div className="my-profile-no-post-icon-container">
            <BiCamera className="my-profile-no-posts-icon" />
          </div>
          <h1 className="my-profile-no-post-title">No Posts Yet</h1>
        </div>
      )
    }

    return (
      <ul className="my-profile-posts-container">
        {posts.map(eachPost => (
          <li key={eachPost.id} className="my-post-container">
            <img
              src={eachPost.image}
              className="my-profile-post-image"
              alt="my post"
            />
          </li>
        ))}
      </ul>
    )
  }

  myProfileSuccessView = () => (
    <>
      {this.renderMyProfileDetails()}
      {this.renderMyProfileStories()}
      <div className="my-profile-posts-title-container">
        <BsGrid3X3 className="my-profile-posts-icon" />
        <h1 className="my-profile-posts-title">Posts</h1>
      </div>
      {this.renderMyProfilePosts()}
    </>
  )

  renderMyProfile = () => {
    const {myProfileApiStatus} = this.state

    switch (myProfileApiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingView />
      case apiStatusConstants.failure:
        return <FailureView tryAgain={this.getMyProfile} />
      case apiStatusConstants.success:
        return this.myProfileSuccessView()
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
            <div className="my-profile-main-container">
              <div className="my-profile-responsive-container">
                <Header />
                {!showSearchOutput && this.renderMyProfile()}
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

export default MyProfile
