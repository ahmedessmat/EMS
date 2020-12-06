import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AppCard from "./AppCard";
import VideoCard from "./videoCard";

class AppCarousel extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      loop: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: Math.round(Math.random() * 5000) + 2000,
      slidesToShow: 4,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: true,
            autoplay: true,
            autoplaySpeed: Math.round(Math.random() * 5000) + 2000,
            infinite: true,
            loop: true,
            speed: 300,

            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-11">
            <h3 className="text-primary mt-5 mb-3">
              {this.props.carouselTitle}
            </h3>
            <Slider className="row" {...settings}>
              {this.props.cardData.map((singleCard, i) => (
                this.props.carouselTitle=="Recent Videos"?
                <VideoCard
                isVideo={this.props.isVideo}
                linkText={this.props.linkText}
                cardData={singleCard}
                quiz={singleCard} />
                :
                <AppCard
                isVideo={this.props.isVideo}
                linkText={this.props.linkText}
                cardData={singleCard}
                quiz={singleCard}
                showButton={singleCard.active}
                 />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default AppCarousel;
