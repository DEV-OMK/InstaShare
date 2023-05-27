import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class HomePostItem extends Component {
  constructor(props) {
    super(props)
    const {post} = this.props
    const {likesCount} = post
    this.state = {
      likeStatus: false,
      likesCount,
    }
  }

  onClickLikeButton = () => {
    this.setState(
      prevState => ({
        likeStatus: !prevState.likeStatus,
        likesCount: prevState.likesCount + 1,
      }),
      this.postLikeApi,
    )
  }

  onClickUnlikeButton = () => {
    this.setState(
      prevState => ({
        likeStatus: !prevState.likeStatus,
        likesCount: prevState.likesCount - 1,
      }),
      this.postLikeApi,
    )
  }

  postLikeApi = async () => {
    const {likeStatus} = this.state
    const {post} = this.props
    const {postId} = post
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likeStatus}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
  }

  renderPostItem = () => {
    const {likeStatus, likesCount} = this.state
    const {post} = this.props
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      comments,
      createdAt,
    } = post
    const {imageUrl, caption} = postDetails

    return (
      <li className="post-item">
        <div className="post-header">
          <div className="post-profile-pic-container">
            <img
              src={profilePic}
              className="post-profile-pic"
              alt="post author profile"
            />
          </div>
          <p className="post-username">
            <Link to={`/users/${userId}`} className="link-item">
              {userName}
            </Link>
          </p>
        </div>
        <img src={imageUrl} className="post-image" alt="post" />
        <div className="post-details-container">
          <div className="post-buttons-container">
            {likeStatus && (
              <button
                type="button"
                className="post-button"
                data-testid="unLikeIcon"
                onClick={this.onClickUnlikeButton}
              >
                <FcLike />
              </button>
            )}
            {!likeStatus && (
              <button
                type="button"
                className="post-button"
                data-testid="likeIcon"
                onClick={this.onClickLikeButton}
              >
                <BsHeart />
              </button>
            )}
            <button type="button" className="post-button">
              <FaRegComment />
            </button>
            <button type="button" className="post-button">
              <BiShareAlt />
            </button>
          </div>
          <p className="post-likes-count">{likesCount} likes</p>
          <p className="post-caption">{caption}</p>
          <ul className="comments-container">
            {comments.map(eachComment => (
              <li key={eachComment.userId}>
                <p className="post-comment">
                  <span className="post-comment-username">
                    {eachComment.userName}
                  </span>{' '}
                  {eachComment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post-created-at">{createdAt}</p>
        </div>
      </li>
    )
  }

  render() {
    return this.renderPostItem()
  }
}

export default HomePostItem
