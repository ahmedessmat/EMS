import React, { Component } from 'react'
import { connect} from 'react-redux';
import * as actions from '../actions';

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamings:[] ,
            streamingsLoading:true     
        }
    }
    

    componentDidMount(){
            if(this.props.user){
              this.props.getSessions(this.props.user);

            }
            else if(sessionStorage.getItem('user')){
              var token = sessionStorage.getItem('user')
              this.props.updateToken(token)
              this.props.getSessions(token);
          
            }
            else{
              this.props.history.push('/login')
            }
    }


    static getDerivedStateFromProps(nextProps, prevState){
        let update={}
        if(nextProps.streamings!==prevState.streamings){
            update.streamings= nextProps.streamings;
        }
        if(nextProps.streamingsLoading!==prevState.streamingsLoading){
          console.log(nextProps.streamingsLoading)
            update.streamingsLoading= nextProps.streamingsLoading;
        }
        return update;
      }

    render() {
        return (
            <div>
        <div className="headerMargin"/>
        <div className="container">
        {this.state.streamingsLoading?
          <div className="headerMargin">
        <div class="loader"></div>
        </div>
        :
        <div className="streamingsContainer">
            {this.state.streamings.map((streaming,index)=>
            <div className="streamingCard">
                <p className="title">{streaming.title}</p>
                <p>{streaming.description}</p>
                <p>{streaming.date}</p>
               {streaming.active?
                <div  className='nextQuestion' style={{marginRight:'auto'}} onClick={()=>this.props.history.push({pathname:'/Session',state: { session: streaming }})}>
                        <p className='btnText'>Join Session</p>
                  </div>
                  :null}
                
            </div>
            )}
       </div>
        }
        </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    streamings:state.app.streamings,
    streamingsLoading:state.app.streamingsLoading,
    user:state.auth.user,
  })
  
  export default connect(mapStateToProps, actions)(Sessions);