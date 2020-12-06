import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUpAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import quiz from "../assets/images/quiz.jpeg"
import homework from "../assets/images/homework.jpeg"
class AppCard extends Component {
  render() {
    return (
      <div className="p-4 text-center h-100">
        <div className="card p-3 border-primary h-100">
          <div className="cardImgWrapper">
          
            <img
            className="card-img-top"
            
            src={this.props.cardImg=="quiz"?quiz:homework}
          ></img>
    
          </div>
          <div className=" align-items-center justify-content-center border-0 pb-0 " style={{backgroundColor:'white'}}>
            <h5 className="cardText">{this.props.cardData.name}</h5>
            {/* <h6>{this.props.cardData.subtitle}</h6> */}
          </div>
          <div className="cardBodyWrapper">
            <div className="card-body align-items-center justify-content-center p-0 border-0 ">
              <p className="text-muted ">{this.props.cardData.description}</p>
            </div>
          </div>
            <div className="p-0 border-0" style={{backgroundColor:'white'}}>
              {this.props.showGrade?
              <div >
              <p style={{fontFamily: 'helv',fontSize:'1.2rem',color:'#c19d5d'}} >{parseFloat(this.props.cardData.pivot.grade).toString()}/{parseFloat(this.props.cardData.grade).toString()}</p>
              </div>
              :null}
              {this.props.showButton?
              <div>
              <a style={{cursor:'pointer'}} className="text-primary h6" onClick={()=>this.props.linkText=="Start Quiz"?this.props.history.push({pathname:'/quiz',state: { quiz: this.props.quiz }}):this.props.linkText=="Review Quiz"?this.props.history.push({pathname:'/quiz/review',state: { quiz: this.props.quiz }}):this.props.history.push({pathname:'/quiz',state: { quiz: this.props.quiz }})}>
                {this.props.linkText}
                <span className="mx-1">
                  <FontAwesomeIcon className="fa-rotate-90 mx-2 align-self-center" icon={faLevelUpAlt}></FontAwesomeIcon>
                </span>
              </a>
              </div>
              :null}
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AppCard);