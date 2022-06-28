import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import axios from 'axios';
import Cookies from 'universal-cookie'
import Router from 'next/router'
 
class Google extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
      
    let data = {
        id_token: googleUser.Zi.id_token,
        access_token: googleUser.Zi.access_token,
        expires_in: googleUser.Zi.expires_in,
        scope: googleUser.Zi.access_token,
        token_type: googleUser.Zi.token_type,
        expires_at:googleUser.Zi.expires_at
    }
    let headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }

    axios.post('http://www.api-jaouad93.tk/api/users/google_login', data, {headers: headers}).then((response) => {
        let cookies = new Cookies();
        let data_cookie = {
        firstname: response.data["firstname"],
        lastname: response.data["lastname"],
        jwt_token: response.data["jwt_token"],
        id_user: response.data["id_user"],
        mail_validate: response.data["mail_validate"]
      }
      cookies.set('CookieSpaceArt', JSON.stringify(data_cookie), {path : '/'});
      Router.push('http://localhost:3000/home')

    }).catch((error) => {
        console.log(error.response.data);
    });
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="354503433014-dt8bat8cgaosk5ci76qquc13vgv2ofb9.apps.googleusercontent.com"
                     className="button is-white"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     />
      </div>

    );
  }

 
}
 
export default Google;