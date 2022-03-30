import Carousel from "react-bootstrap/Carousel";
import React, { Component } from "react";
;
export class BootstrapCarousel extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <Carousel interval={4200}>
            <Carousel.Item style={{ height: "300px" }}>
              <img
                style={{ height: "300px" }}
                className="d-block w-100"
                src={window.location.origin + "/images/background1.png"}
                alt="cover img"
              />

              <Carousel.Caption>
                <h3>Get Professional Answers</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ height: "300px"}}>
              <img
                style={{ height: "300px" }}
                className="d-block w-100"
                src={window.location.origin + "/images/background2.jpg"}
                alt="cover img"
              />
            </Carousel.Item>

            <Carousel.Item style={{ height: "300px" }}>
              <img
                style={{ height: "300px" }}
                className="d-block w-100"
                src={window.location.origin + "/images/background3.jpg"}               
                 alt="cover img"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default BootstrapCarousel;
