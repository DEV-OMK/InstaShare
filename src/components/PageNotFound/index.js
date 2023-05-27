import {Link} from 'react-router-dom'

import './index.css'

const PageNotFound = () => (
  <div className="page-not-found-container">
    <img
      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1685041520/InstaShareApp/erroring_2_yjnhrs.png"
      className="page-not-found-image"
      alt="page not found"
    />
    <h1 className="page-not-found-title">Page Not Found</h1>
    <p className="page-not-found-caption">
      we are sorry, the page you requested could not be found.
    </p>
    <p className="page-not-found-caption">Please go back to the homepage.</p>
    <Link to="/">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
