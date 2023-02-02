import React from "react";
import resume from "../public/PDF/Resume.pdf";

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    return (
      <>
        <div className="height-adjuster">
          <iframe
            className="iframe-resume"
            src={resume}
            title="Resume PDF"
            frameborder="0"
            allow="fullscreen;"
          ></iframe>
        </div>
      </>
    );
  }
}

export default Resume;
