import React from "react";
import "./AboutMe.css";
import hike from "../public/Images/Hike.jpg";
import me from "../public/Images/me.jpg";

class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      txt: "Hi, I'm Cameron. When I'm not playing League of Legends, I'm either hanging out with friends, playing with my dachshund Strawberry, or learning something new with Unity.",
      speed: 20 /* The speed/duration of the effect in milliseconds */,
      hasMounted: false,
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("load", this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    const node = this.myRef.current;
    node.innerHTML = "";
    this.typeWriter(); //  $ is available here
  };

  render() {
    let paragraphText =
      "Hi, I'm Cameron. When I'm not playing League of Legends, I'm either hanging out with friends, playing with my dachshund Strawberry, or learning something new with Unity.";
    let aboutMeParagraph = (
      <p ref={this.myRef} className="about-me-paragraph">
        {paragraphText}
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div className="flex-center">
            <img
              draggable={false}
              className="background"
              src={hike}
              alt="Bald Knob, Virginia"
            />
            <div className="headshot-container css-selector">
              <div className="circle-image-container">
                <img
                  draggable={false}
                  className="circle-image"
                  src={me}
                  alt="Me, Cameron"
                ></img>
              </div>
            </div>
          </div>
          <div className="content-container">
            <div className="header-container">
              <h1 className="about-me-header">ABOUT ME</h1>
            </div>
            <div className="about-me-paragraph-container">
              {aboutMeParagraph}
            </div>
          </div>
        </div>
      </>
    );
  }

  typeWriter = () => {
    const node = this.myRef.current;
    if (this.state.i < this.state.txt.length) {
      node.innerHTML += this.state.txt.charAt(this.state.i);
      this.setState({ i: this.state.i + 1 }, () => {
        setTimeout(this.typeWriter, this.state.speed);
      });
    } else {
      this.setState({ hasMounted: true });
    }
  };
}

export default AboutMe;
