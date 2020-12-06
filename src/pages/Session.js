import React, { Component } from 'react'
import { connect} from 'react-redux';
import * as actions from '../actions';
import { Jutsu } from 'react-jutsu'



class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:'xx',
            roomName:'',
            password:'',
            call:false,
            session:{}   ,
            userData:{}         
        }
    }

    componentDidMount(){
      this.setState({session:this.props.location.state.session})
        // console.log(sessionStorage.getItem('userData'))
            if(this.props.user){
            //   this.props.getGradedQuiz(this.props.user,this.props.location.state.quiz.id);
              console.log(this.props.user)

            }
            else if(sessionStorage.getItem('user')){
              var token = sessionStorage.getItem('user')
              this.props.updateToken(token)
              console.log(token)
            //   this.props.getGradedQuiz(token,this.props.location.state.quiz.id);
          
            }
            else{
              this.props.history.push('/login')
            }

    }
    handleClick = event => {
      event.preventDefault()
      if (this.state.roomName && this.state.displayName) 
      this.setState({call:true})
    }
    

    static getDerivedStateFromProps(nextProps, prevState){
      let update={}
      if(nextProps.userData!==prevState.userData){
          update.userData= nextProps.userData;
      }
      return update;
    }
    render() {
        return (
            <div>
                          <div className="headerMargin"/>


    {this.state.session.name && this.props.userData?
     //  <iframe allow="camera; microphone; display-capture" src={"https://meet.jit.si/"+this.state.session.name+"#jitsi_meet_external_api_id=0" }name="jitsiConferenceFrame0" id="jitsiConferenceFrame0" allowfullscreen="true" style={{height:'80vh',width:'100%'}}></iframe> 

    // <Jitsi
    //     roomName={'kkklllggg2'}
    //     displayName={this.state.displayName}
    //     password={this.state.session.password}
    //     containerStyle={{height:'80vh',width:'100%'}}
    //     onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
    //   />
    // null
    <div style={{width:'100%',marginTop:'10rem',marginBottom:'30rem'}}>
    <Jutsu
    roomName={this.state.session.name}
    password={this.state.session.password}
    displayName={this.state.userData.name}
    jitsiContainerStyles={{position:'absolute',height:'85%',width:'100%',marginLeft:'auto',marginRight:'auto'}}
    onMeetingEnd={() => console.log('Meeting has ended')}
    loadingComponent={<p>loading ...</p>} />
    </div>
      :null}


            </div>
        )
    }
}

const mapStateToProps = state => ({
    quiz:state.app.quiz,
    quizLoading:state.app.quizLoading,
    user:state.auth.user,
    userData:state.auth.userData,
  })
  
  export default connect(mapStateToProps, actions)(Session);