import React from 'react';
import { EyesMovemetGhost } from "../components/Ghost";
// import "../styles/paste.css";  // 기존 CSS 파일 import

const NotFoundPage = () => {
  return (
    <>
      <header>
        <nav>
          <a href="/" className="btn">Go Home</a>
        </nav>
      </header>

      <main>
        <article id="introduce">
          <div>
            <div id="main-text">
              <h1>404</h1>
              <div>
                <h2>Page Not Found</h2>
                <i>in space</i>
              </div>
            </div>

            <p id="event-details">
              찾으시는 페이지가 <b>외계인에게 납치</b>되었어요
            </p>

            <div id="btns">
              <EyesMovemetGhost id="ghost-1" size={160} color="#FFA800"/>
              <div>
                <a href="/">Return Home</a>
                <a href="javascript:history.back()">Go Back</a>
              </div>
              <EyesMovemetGhost id="ghost-2" size={200} color="#41DDFF"/>
            </div>
          </div>
        </article>

        <article id="count-down">
          <h1>LOST IN SPACE</h1>
          <div className="timer">
            <div className="timer-item">
              <span>4</span>
              <p>OOPS</p>
            </div>
            <div className="timer-item">
              <span>0</span>
              <p>SOMETHING</p>
            </div>
            <div className="timer-item">
              <span>4</span>
              <p>WENT WRONG</p>
            </div>
          </div>
        </article>

        <article id="info">
          <div>
            <h1>LOOKING FOR</h1>
            <h2>SOMETHING?</h2>
            <p>
              Don't worry! Our alien friends are <b>searching the galaxy</b><br/>
              to find what you're looking for.
            </p>
          </div>
        </article>

        <article id="faq">
          <h1>NEED HELP?</h1>
          <section>
            <div className="faqCard">
              <h1>What happened?</h1>
              <p>The page you requested could not be found on our servers.</p>
            </div>
            <div className="faqCard">
              <h1>Why am I seeing this?</h1>
              <p>The link might be broken, or the page may have been moved or deleted.</p>
            </div>
            <div className="faqCard">
              <h1>What can I do?</h1>
              <p>Try going back to the previous page or head to our homepage.</p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default NotFoundPage;