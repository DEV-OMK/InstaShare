import './index.css'

const SearchNotFound = () => (
  <div className="search-not-found-container">
    <img
      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1685043521/InstaShareApp/searchGroup_jigkyw.png"
      className="search-not-found-image"
      alt="search not found"
    />
    <h1 className="search-not-found-title">Search Not Found</h1>
    <p className="search-not-found-caption">
      Try different keyword or search again.
    </p>
  </div>
)

export default SearchNotFound
