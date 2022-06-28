import React, { Component } from 'react';
import axios from 'axios'
import ListUser from '../components/ListUser'
import Cookies from 'universal-cookie'

// import { Container } from './styles';

export default class testok extends Component {
  
  
  constructor() {
    super();
    this.state = {
      test:''
    };
  }

  componentDidMount = () => {
    let cookies = new Cookies();
    var headers = {
      "Access-Control-Allow-Origin": '*',
      "api-token":cookies.get("CookieSpaceArt")["jwt_token"]
    }
    
    axios.get('http://www.api-jaouad93.tk/api/message/get_my_private_conversation', {headers: headers}).then((response) => {
      console.log(response.data.success[0])
      this.setState({
        test:response.data.success[0].last_message.firstname
      })
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }

  render() {
    return <div>
      {this.state.test}
        <ListUser />
    </div>
  }
}
