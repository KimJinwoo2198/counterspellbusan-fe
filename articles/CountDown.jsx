export default () => {
  return (
    <article id="count-down">
      <h1>we start in...</h1>
      <div id="timer">
        <div className="timer-item">
          <span>00</span>
          <p>days</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>00</span>
          <p>hours</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>00</span>
          <p>minutes</p>
        </div>
        <p>:</p>
        <div className="timer-item">
          <span>00</span>
          <p>seconds</p>
        </div>
      </div>
    </article>
  )
}
