import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'
// import { Container } from './styles';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notif_tab:[]
        }
    }

  render() {
    return <div>
        {
            this.props.notif.length != 0 ?
            this.props.notif.map((data, index) => 
                <div key={index}>
                    <ul>
                        {data.type == "message" ? 
                        <li onClick={() => this.props.fct(index)}>
                        <strong>{data.firstname + " " + data.lastname} </strong>vous a envoyé un message.
                        <hr/>
                        </li> : data.type == "follow" ? <li onClick={() => this.props.fct(index)}>
                        <strong>{data.firstname + " " + data.lastname} </strong>s'est abonné à vous.
                        <hr/>
                        </li> : data.type == "like" ? <li onClick={() => this.props.fct(index)}>
                        <strong>{data.firstname + " " + data.lastname} </strong>à aimé votre post.
                        <hr/>
                        </li> : null}
                    </ul>
                </div>
            )
            : <p>Aucune notification pour le moment</p>
        }
    </div>
  }
}
