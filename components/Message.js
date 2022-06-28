import React, { Component } from "react";
import socketIOClient from "socket.io-client"
import Cookies from 'universal-cookie'
import styles from '../styles/style.css'
import style from '../styles/style.scss'

class Message extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://www.api-jaouad93.tk:80",
      msg_me:[],
      msg_you:[],
      message:'',
      id_me:0,
      id_you:[]
    };
  }
  render() {
    console.log(this.props)
    return (
      <div>
          <div className="container" style={{textAlign:'center'}}>
            
          <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        
          </div>
          <div className="msg" style={{textAlign:'center'}}>
          <div className="msg_container">
            {this.state.msg_me.map((data, index) => 
            <div className="msg_me" key={index}>
              <p>{data}</p>
            </div>
            )}

            {this.state.msg_you.map((data, index) => 
            <div className="msg_you" key={index}>
              <p>{data}</p>
            </div>
            )}
            </div>
            <textarea className="textarea is-danger description_msg" value={this.state.message} placeholder="Description" onChange={(e) => this.setState({message:e.target.value})}/>
          <button className="button is-link" onClick={() => this.testici(24)}>ENVOYER</button>
          </div>
          </div>
    );
  }

  testici = (idyou) => {
    console.log(idyou)
    let cookies = new Cookies();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', () => {
      socket.emit( 'my event', {
        sender:cookies.get("CookieSpaceArt")["id_user"],
        data: this.state.message,
        users:[...this.state.id_you, idyou]
      })})
  }

  componentDidMount = () => {
    console.log("ok", this.props)
      this.setState({
          id_you:this.props.id_clicked
      })
    let cookies = new Cookies();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on( "re" + cookies.get("CookieSpaceArt")["id_user"], (msg) => {
      if(msg.sender == cookies.get("CookieSpaceArt"["id_user"])) {
      this.setState({msg_me:[...this.state.msg_me, msg.sender], message:''})
      } else {
        this.setState({msg_you:[...this.state.msg_you, msg.sender], message:''})
      }
    })
  }
}

export default Message;