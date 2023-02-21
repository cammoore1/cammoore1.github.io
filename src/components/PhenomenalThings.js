import React from "react";
import "./ProjectPages.css";
import phenomenalThings from "../public/Images/phenomenal-things.jpg";

class PhenomenalThings extends React.Component {
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
          href="http://www.realitydesign.studio/phenomenal-things.html"
        >
          Phenomenal Things
        </a>{" "}
        tells a story of different internet of things (IoT) devices interacting
        with each other in an augmented reality (AR) medium through the
        Microsoft HoloLens. Reality Design Studio members Eric Schoenborn and
        Esha Thomare primarily led development of the project.
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="project-visual-area">
            <div className="project-image-container">
              <img
                className="project-image"
                src={phenomenalThings}
                alt="Ford Fulkerson Test Code"
              ></img>
            </div>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">Phenomenal Things</h1>
            </div>
            <div className="paragraph-container">{paragraphText}</div>
          </div>
        </div>
      </>
    );
  }
}

export default PhenomenalThings;
