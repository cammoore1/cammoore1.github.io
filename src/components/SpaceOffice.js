import React from "react";
import "./ProjectPages.css";

class SpaceOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    let paragraphText = (
      <p ref={this.myRef} className="project-paragraph">
        <a
          className="project-link"
          href="https://globalgamejam.org/2021/games/space-office-7"
        >
          Space Office
        </a>{" "}
        is a game created using Unity for the Global Game Jam 2021 about a
        character who has to sneakily find objects that have been "Lost" to
        Aliens in an Office building.
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="project-visual-area">
            <iframe className="iframe-youtube"
              src="https://www.youtube-nocookie.com/embed/JKIVJngLYuw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen;     gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">Space Office</h1>
            </div>
            <div className="paragraph-container">{paragraphText}</div>
          </div>
        </div>
      </>
    );
  }
}

export default SpaceOffice;
