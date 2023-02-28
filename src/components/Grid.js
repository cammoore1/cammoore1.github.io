import React from "react";
import "./Grid.css";
import Card from "./Card";
import spaceOffice from "../public/Images/space-office.png";
import fordFulkerson from "../public/Images/ford-fulkerson.png";
import vrLocomotion from "../public/Images/VR-locomotion.png";
import phenomenalThings from "../public/Images/phenomenal-things.jpg";
import bookChain from "../public/Images/bookchain.png";
import Toggle from "react-toggle";
import birds from "../public/Images/TransparentBirdLanding.png";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlighted: false };
  }

  render() {
    return (
      <>
        <div className="grid-container">
          <div className="grid-header-container-container">
            <div className="grid-header-container">
              <h1 className="grid-header">Projects</h1>
            </div>
            <div className="grid-toggle-container">
              <label className="grid-toggle-label">
                <Toggle
                  defaultChecked={false}
                  onChange={this.handleToggleChange}
                />
                <div className="grid-toggle-text">&nbsp;Show Titles</div>
              </label>
            </div>
          </div>
          <div className="grid">
            <Card
              text="Transparent Image Collage"
              img={birds}
              alt="Implementation of a transparent image collage maker."
              link="transparent-collage"
              highlighted={this.state.highlighted}
            ></Card>
            <Card
              text="Virtual Reality Locomotion"
              img={vrLocomotion}
              alt="Virtual Reality Locomotion Techniques"
              link="vr-locomotion"
              highlighted={this.state.highlighted}
            ></Card>
            <Card
              text="Phenomenal Things"
              img={phenomenalThings}
              alt="Phenomenal Things"
              link="phenomenal-things"
              highlighted={this.state.highlighted}
            ></Card>
            <Card
              text="Space Office"
              img={spaceOffice}
              alt="Space Office Game"
              link="space-office"
              highlighted={this.state.highlighted}
            ></Card>
            <Card
              text="BookChain.io"
              img={bookChain}
              alt="BookChain.io"
              link="bookchain"
              highlighted={this.state.highlighted}
            ></Card>
            <Card
              text="Ford-Fulkerson Algorithm"
              img={fordFulkerson}
              alt="Implementation of the Ford-Fulkerson Algorithm"
              link="ford-fulkerson"
              highlighted={this.state.highlighted}
            ></Card>
          </div>
        </div>
      </>
    );
  }

  handleToggleChange = () => {
    this.setState({ highlighted: !this.state.highlighted });
  };
}

export default Grid;
