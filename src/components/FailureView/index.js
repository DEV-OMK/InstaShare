import './index.css'

const FailureView = props => {
  const {tryAgain} = props
  const onClickTryAgain = () => {
    tryAgain()
  }

  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/ddaimmqrr/image/upload/v1683614042/InstaShareApp/failure-Icon_ynganv.png"
        alt="failure view"
        className="failure-icon"
      />
      <p className="failure-caption">Something Went Wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
