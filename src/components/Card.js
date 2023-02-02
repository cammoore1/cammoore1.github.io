import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Tilt from "react-parallax-tilt";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let nonHighlightedCard = (
      <Tilt tiltReverse={true} tiltMaxAngleX={5} tiltMaxAngleY={5}>
        <Link draggable={false} to={this.props.link}>
          <div className="card-container">
            <div className="card-image-container">
              <div className="mouseover-text-container">
                <div className="mouseover-text">{this.props.text}</div>
                <div className="mouseover-text-background"></div>
              </div>
              <img
                className="card-image"
                src={this.props.img}
                alt={this.props.alt}
              />
            </div>
          </div>
        </Link>
      </Tilt>
    );

    let highlightedCard = (
      <Tilt tiltReverse={true} tiltMaxAngleX={5} tiltMaxAngleY={5}>
        <Link draggable={false} to={this.props.link}>
          <div className="card-container">
            <div className="card-image-container">
              <div className="mouseover-text-container mouseover-text-container-filtered">
                <div className="mouseover-text mouseover-text-filtered">
                  {this.props.text}
                </div>
                <div className="mouseover-text-background mouseover-text-background-filtered"></div>
              </div>
              <img
                className="card-image card-image-filtered"
                src={this.props.img}
                alt={this.props.alt}
              />
            </div>
          </div>
        </Link>
      </Tilt>
    );

    let retVal;

    if (this.props.highlighted === true) {
      retVal = highlightedCard;
    } else {
      retVal = nonHighlightedCard;
    }

    return <>{retVal}</>;
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  };
}

export default Card;
