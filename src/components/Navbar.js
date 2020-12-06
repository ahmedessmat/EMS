import React, { Component } from "react";
import logo from "./../assets/logo.png";
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import * as actions from '../actions';
import { connect} from 'react-redux';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class HeaderNav extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      user:null,
      page:'',
    }
  }

  componentDidMount(){
    if(cookies.get('user')){
      // console.log(cookies.get('user'))
      this.props.updateToken(cookies.get('user'))
      sessionStorage.setItem('userData',cookies.get('userData'))
      this.props.history.push('/overview');
      this.setState({page:'/overview'})
		}
    this.setState({page:this.props.history.location.pathname})
  }

  componentWillReceiveProps({user,status}){
    this.setState({user: user});
    if(status == 'success'){
      this.setState({page:this.props.history.location.pathname})
      console.log("PROPS")
		}
  }
  
  logout(){
    this.props.logout();
    this.props.history.push('/');
    this.setState({page:'/'})
  }

  render() {
    return (
        <div className="container-fluid fixed-top bg-white">
          <div className="row">
            <div className="col-12">
              <nav className="navbar  navbar-expand-lg">
                <a className="navbar-brand col-4 col-md-2" onClick={()=>this.props.history.push('/')}>
                  <img className="img-fluid" src={logo}></img>
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon text-primary"><FontAwesomeIcon icon={faBars} /></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                {this.state.user?
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-2 active">
                      <a style={{cursor:'pointer'}} className={this.state.page=='/overview'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/overview');this.setState({page:'/overview'})}}>
                        Overview
                      </a>
                    </li>
                    <li className="nav-item mx-2">
                      <a style={{cursor:'pointer'}} className={this.state.page=='/activeHomework'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/activeHomework');this.setState({page:'/activeHomework'})}}>

                        Homework
                      </a>
                    </li>
                    <li className="nav-item mx-2">
                      <a style={{cursor:'pointer'}} className={this.state.page=='/activeQuizzes'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/activeQuizzes');this.setState({page:'/activeQuizzes'})}}>

                        Quizzes
                      </a>
                    </li>
                    <li className="nav-item mx-2">
                      <a style={{cursor:'pointer'}} className={this.state.page=='/online-courses'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/online-courses');this.setState({page:'/online-courses'})}}>
                        Online Courses
                      </a>
                    </li>
                    <li className="nav-item mx-2">
                      <a style={{cursor:'pointer'}} className={this.state.page=='/Sessions'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/Sessions');this.setState({page:'/Sessions'})}}>
                        Online Sessions
                      </a>
                    </li>
                    <li className="nav-item mx-2">

                    <a style={{cursor:'pointer'}} className="nav-link text-white btn bg-primary px-5 " onClick={()=>this.logout()}>
                        Logout
                      </a>
                    </li>
                  </ul>
                  :
                  <ul className="navbar-nav ml-auto">
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className={this.state.page=='/'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/');this.setState({page:'/'})}}>
                      Home
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className={this.state.page=='/about'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/about');this.setState({page:'/about'})}}>
                      About Me
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className={this.state.page=='/book'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/book');this.setState({page:'/book'})}}>
                      Book a Course
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className={this.state.page=='/apply'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/apply');this.setState({page:'/apply'})}}>
                    Apply as an Assistant
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className={this.state.page=='/contact'? "nav-link text-dark active" : "nav-link text-dark"} onClick={()=>{this.props.history.push('/contact');this.setState({page:'/contact'})}}>
                    Contact Me
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a href="https://fadyelfahdy.net/login" target="_blank" style={{cursor:'pointer'}} className={"nav-link text-dark"} >
                    Parent Login
                    </a>
                  </li>
                  <li className="nav-item mx-2">
                    <a style={{cursor:'pointer'}} className="nav-link text-white btn bg-primary px-5 " onClick={()=>{this.props.history.push('/login');this.setState({page:'/login'})}}>
                    Student Login
                  </a>
                  </li>
                </ul>
                  }
                </div>
              </nav>
            </div>
          </div>
          
        </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		user:state.auth.user,
		// msg:state.auth.msg,
		status:state.auth.status,
	}
}
export default withRouter(connect(mapStateToProps, actions)(HeaderNav));