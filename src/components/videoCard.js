import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

class VideoCard extends Component {
  render() {
    return (
      <div style={{cursor:'pointer'}} onClick={()=>this.props.history.push('/video/'+this.props.cardData.id)} className="p-4 text-center h-100">
        <div className="card p-3 border-primary h-100">
          <div className="cardImgWrapper">
          {this.props.linkText=='View Video'?
            <img
              className="card-img-top"
              src={'https://fadyelfahdy.net/images/'+this.props.cardData.image}
            ></img>
            :
            <img
            className="card-img-top"
            src={this.props.cardData.image}
          ></img>
    }
            {this.props.isVideo ? (
              <FontAwesomeIcon
                className="playIcon fa-4x"
                icon={faPlay}
              ></FontAwesomeIcon>
            ) : (
              ""
            )}
          </div>
          <div className="card-header align-items-center justify-content-center border-0 pb-0 " style={{backgroundColor:'white'}}>
            <h5>{this.props.cardData.title}</h5>
            <h6>{this.props.cardData.subtitle}</h6>
          </div>
          <div className="cardBodyWrapper">
            <div className="card-body align-items-center justify-content-center p-0 border-0 ">
              <p className="text-muted ">{this.props.cardData.description}</p>
            </div>
          </div>
            <div className="card-footer p-0 border-0" style={{backgroundColor:'white'}}>
              <p className="text-danger ">{this.props.cardData.cardGrade}</p>
              <a style={{cursor:'pointer'}} className="text-primary h6" onClick={()=>this.props.history.push('/video/'+this.props.cardData.id)}>
                {this.props.linkText}
                <span className="mx-1">
                  <FontAwesomeIcon className="fa-rotate-90 mx-2 align-self-center" icon={faLevelUpAlt}></FontAwesomeIcon>
                </span>
              </a>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(VideoCard);