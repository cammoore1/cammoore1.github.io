import React from "react";
import "./ProjectPages.css";
import fordFulkerson from "../public/Images/ford-fulkerson.png";

class FordFulkerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    let paragraphText = (
      <p ref={this.myRef} className="project-paragraph">
        The{" "}
        <a
          className="project-link"
          href="https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm"
        >
          Ford-Fulkerson Algorithm
        </a>{" "}
        is a method to find the maximum flow of a directed graph-based network.
        My implementation of the algorithm and graph-related data structures in
        Java can be found{" "}
        <a
          className="project-link"
          href="https://github.com/cammoore1/Ford-Fulkerson-Implementation"
        >
          here
        </a>
        .
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="project-visual-area">
            <div className="project-image-container">
              <img
                className="project-image"
                src={fordFulkerson}
                alt="Ford Fulkerson Test Code"
              ></img>
            </div>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">Ford-Fulkerson Algorithm</h1>
            </div>
            <div className="paragraph-container">{paragraphText}</div>
          </div>
        </div>
      </>
    );
  }
}

export default FordFulkerson;
