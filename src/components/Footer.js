import React, { Component } from "react";
import footerLogo from "./../assets/footerLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

class AppFooter extends Component {
  render() {
    return (
      <div className="container-fluid pt-5 bg-secondary">
        <div className="row justify-content-center">
          <div className="col-10 col-md-5">
            <img className="img-fluid" src={footerLogo}></img>
          </div>
          <div className="col-10 col-md-6">
            <div className="row">
              <div className="col-10 col-md-4">
                <h5 className="text-white">Social Media</h5>
                <div className="row">
                  <span className="fb mx-2">
                    <FontAwesomeIcon
                      className="fa-2x"
                      icon={faFacebookSquare}
                    ></FontAwesomeIcon>
                  </span>
                  <span className="twitter mx-2">
                    <FontAwesomeIcon
                      className="fa-2x"
                      icon={faTwitter}
                    ></FontAwesomeIcon>
                  </span>
                  <span className="youtube mx-2">
                    <FontAwesomeIcon
                      className="fa-2x"
                      icon={faYoutube}
                    ></FontAwesomeIcon>
                  </span>
                </div>
              </div>
              <div className="col-10 col-md-4">
                <h5 className="text-white">Help</h5>
                <div className="text-secondary-light">Help</div>
                <div className="text-secondary-light">FAQs</div>
              </div>
              <div className="col-10 col-md-4">
                <h5 className="text-white">Contact</h5>
                <div className="text-secondary-light">
                  fady-elfahdy@gmail.com
                </div>
                <div className="text-secondary-light">0127 2656811</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-secondary-light pt-4 pb-1 p-0">
            <div className="col-10 col-md-5">
                <div className="d-block d-md-inline-block m-0 mx-md-2 p-0">Privacy Policy</div>
                <div className="d-block d-md-inline-block m-0 mx-md-2 p-0">Terms & Conditions</div>
            </div>
            <div className="col-10 col-md-6">
            All member work copyright of respective owner, otherwise © 2018-2020
            </div>
        </div>
      </div>
    );
  }
}

export default AppFooter;
