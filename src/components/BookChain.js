import React from "react";
import "./ProjectPages.css";

class BookChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    let paragraphText = (
      <p ref={this.myRef} className="project-paragraph">
        This was a project for a capstone class at Virginia Tech by a team of 4
        including myself. Our project integrated the blockchain with a book
        lending and donation service. One teammate and I worked on the front end
        using Vue.js while two other team members worked on the back end to
        integrate the book loaning and request functionality with a blockchain.
        Our team made use of the{" "}
        <a
          className="project-link"
          href="https://openlibrary.org/dev/docs/api/books"
        >
          Open Library API
        </a>{" "}
        for obtaining and caching book information.
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="project-visual-area">
            <iframe
              src="https://www.youtube-nocookie.com/embed/xaDdx1ts8sM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen;     gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">BookChain.io</h1>
            </div>
            <div className="paragraph-container">{paragraphText}</div>
          </div>
        </div>
      </>
    );
  }
}

export default BookChain;
