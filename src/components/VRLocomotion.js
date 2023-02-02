import React from "react";
import "./ProjectPages.css";

class VRLocomotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    let paragraphText = (
      <p ref={this.myRef} className="project-paragraph">
        Research into virtual reality locomotion was conducted Virginia Tech as
        part of the{" "}
        <a
          className="project-link"
          href="http://www.realitydesign.studio/vrlocomotion.html"
        >
          Reality Design Studio
        </a>
        . The project made use of Unity to create and implement 9 different
        techniques in a game-like environment which made use of a repurposed
        Unity first-person-shooter microgame. The project culminated in a study
        of 27 participants and the team is currently targetting CHI PLAY 2023
        for publishing.
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="project-visual-area">
            <iframe
              className="iframe-youtube"
              src="https://www.youtube-nocookie.com/embed/kaGAu5THEnI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen;     gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">Virtual Reality Locomotion</h1>
            </div>
            <div className="paragraph-container">{paragraphText}</div>
          </div>
        </div>
      </>
    );
  }
}

export default VRLocomotion;
