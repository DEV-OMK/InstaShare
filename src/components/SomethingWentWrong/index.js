import './index.css'

const SomethingWentWrong = () => (
  <div className="something-went-wrong-container">
    <img
      src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1685043740/InstaShareApp/somethingWentWrongGroup_7522_y6c89r.png"
      className="something-went-wrong-image"
      alt="page not found"
    />
    <h1 className="something-went-wrong-title">
      Something went wrong. Please try again
    </h1>
    <button type="button" className="try-again-button">
      Try Again
    </button>
  </div>
)

export default SomethingWentWrong
