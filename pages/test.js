import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import Cookies from 'universal-cookie'
import styles from '../styles/style.css'
import style from '../styles/style.scss'
import Menu from '../components/Menu'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faTimesCircle)


const socketUrl = "http://www.api-jaouad93.tk:80"
const socket = socketIOClient(socketUrl);
socket.on('connect',  () => {
  console.log("connected")
})

class App extends Component {

  constructor() {
    super();

    this.state = {
      msg:[],
      message:'',
      id_me:0,
      firstname:'',
      lastname:'',
      picture:'',
      id_you:[],
      allconv:[],
      socket:null,
      queryid:[]
    };
  }

  render() {
    
    let cookies = new Cookies();
    return (
      <div>
        <Menu/>
            
          <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
          <div class="msg1">
        <div class="list is-hoverable" style={{margin:0}}>
          
        <h1 className="subtitle is-4" style={{textAlign:'center', color:'white'}}>Récente conversation</h1>
        <hr/>
            {this.state.allconv.map((item, key) =>

              <div key={key} style={{width:'100%', backgroundColor:'#9533a3', textAlign:'center'}} onClick={() => this.messageConv(item[2], item[1])}>
                <hr style={{margin:'0'}}/>
                <a style={{color:'white'}}>{item[0].firstname + " " + item[0].lastname}</a>
                <div>
                <p style={{fontSize:'10px'}}>Dernier message : {item[0].message.length < 10 ? item[0].message : item[0].message.substr(0, 9) + "..."}</p>
                
                <FontAwesomeIcon style={{fontSize:'15px'}} icon='times-circle' onClick={() => this.leaveConv(item[2])} />
                </div>
                <hr/>
              </div>
          )}
        </div>
    
    <div className="bloc" style={{width:'100%'}}>
    <div className="msg" style={{textAlign:'center'}}>
          <div className="msg_container">
          {this.state.msg.map((data, index) => 
          <div>
          { data.id == cookies.get("CookieSpaceArt")["id_user"] ?
            <div className="msg_me" key={index}>
              <p style={{color:'white'}}>{data.message}</p>
            </div> :
            <div className="msg_you" key={index}>
              <span style={{fontSize:"110%", color:'white'}}><bold>{data.firstname + " " + data.lastname}</bold></span>
              <hr style={{margin:0}}/>
              <p style={{color:'white'}}>{data.message}</p>
            </div>
          }
          </div>
            )}
            </div>
          </div>
          <div className="input_msg" style={{width:'100%'}}>
            <div style={{width:'50%', margin:'0 auto'}}>
          <textarea className="textarea is-link description_msg" value={this.state.message} placeholder="Description" onChange={(e) => this.setState({message:e.target.value})}/>
          <button className="button is-link btnokmsg" onClick={() => this.testici()}>ENVOYER</button>
            </div>
          </div>
    </div>

    </div>
 
          </div>
    );
  }

  leaveConv = (idconv) => {
    let cookies = new Cookies();
    var headers = {
      "Access-Control-Allow-Origin": '*',
      "api-token":cookies.get("CookieSpaceArt")["jwt_token"]
    }
    
    axios.get('http://www.api-jaouad93.tk/api/message/leave_private_conversation/' + idconv, {headers: headers}).then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.response.data);
    })

  }

  messageConv = (idconv, user) => {
    this.setState({
      msg:[],
      queryid:[]
    })
    let cookies = new Cookies();
    var headers = {
      "Access-Control-Allow-Origin": '*',
      "api-token":cookies.get("CookieSpaceArt")["jwt_token"]
    }
    
    axios.get('http://www.api-jaouad93.tk/api/message/get_one_conv/' + idconv, {headers: headers}).then((response) => {
          this.setState({
            queryid:[...this.state.queryid, ...response.data.success.users],
          })
        for(let j = 0; j < response.data.success.message.length; j++) {
          this.setState({
            msg:[...this.state.msg, response.data.success.message[j]]
          })
        } 
      

    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }

  testici = () => {
    console.log("log", this.props)
    let cookies = new Cookies();
    if(this.props.url.query.id != undefined) {
      socket.emit( 'my event', {
        sender:cookies.get("CookieSpaceArt")["id_user"],
        message: this.state.message,
        users:[...this.props.url.query.id, cookies.get("CookieSpaceArt")["id_user"]]
      })
    }
    else {
      socket.emit( 'my event', {
        sender:cookies.get("CookieSpaceArt")["id_user"],
        message: this.state.message,
        users:[...this.state.queryid]
      })
    }
  }



  componentDidMount = () => {
    this.allConv()
    let cookies = new Cookies();
    socket.on( "re" + cookies.get("CookieSpaceArt")["id_user"], (msg) => {
        this.setState({msg:[...this.state.msg, msg], message:''})
    })
  }

  allConv = () => {
    let cookies = new Cookies();
    var headers = {
      "Access-Control-Allow-Origin": '*',
      "api-token":cookies.get("CookieSpaceArt")["jwt_token"]
    }
    
    axios.get('http://www.api-jaouad93.tk/api/message/get_my_private_conversation', {headers: headers}).then((response) => {
      let size = response.data.success.length
      for(let i = 0; i < size; i++) {
        let tab = [response.data.success[i].last_message, response.data.success[i].users, response.data.success[i].id]
        this.setState({
          allconv:[...this.state.allconv, tab]
        })
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }

  getProfile = (id) => {
    var headers = {
      "Access-Control-Allow-Origin": '*'
    }
    
    axios.get('http://www.api-jaouad93.tk/api/profile/get_profile/' + id, {headers: headers}).then((response) => {
      this.setState({
        firstname:response.data["successful"]["firstname"],
        lastname:response.data["successful"]["lastname"],
        picture:response.data["successful"]["picture_url"],
      })
    })
    .catch((error) => {
      console.log("Get Profil", error.response.data);
    }) 
}

}

export default App;