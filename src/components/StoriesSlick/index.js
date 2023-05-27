import {Component} from 'react'

import Slider from 'react-slick'
import './index.css'

class StoriesSlick extends Component {
  settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }

  renderSlider = () => {
    const {usersStories} = this.props

    return (
      <Slider {...this.settings}>
        {usersStories.map(eachStory => {
          const {userId, userName, storyUrl} = eachStory

          return (
            <div key={userId} className="slick-item">
              <img src={storyUrl} alt="user story" className="user-story" />
              <p className="story-user-name">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return <div className="slick-container">{this.renderSlider()}</div>
  }
}

export default StoriesSlick
