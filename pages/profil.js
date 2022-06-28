import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../components/Menu'
import Loading from '../components/Loading'
import "react-image-crop/dist/ReactCrop.css"
import styles from '../styles/style.css'
import axios from 'axios'
import style from '../styles/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEye, faEyeSlash, faSave, faHeart, faHeartBroken, faBullseye } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faEye, faEyeSlash, faSave, faHeart, faHeartBroken )
import Cookies from 'universal-cookie'
import Bannier from '../components/Bannier'
import Audio from '../components/Audio'
import Video from '../components/Video'
import Unknow from '../components/Unknow'
import MyPost from "../components/MyPost"
import Private from "../components/Private"

class Profil extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      load: true,
      cookies_id_user: '',
      cookies_token: '',
      crop: {
        width: 50,
        height: 50,
        x: 0,
        y: 0
      },
      id_user: 0,
      error:false,
      data:{},
      not_found:false,
      private:0
    }
  }

  componentDidMount() {
    let cookies = new Cookies();
    if (typeof(cookies.get("CookieSpaceArt"))  === 'undefined' || cookies.get("CookieSpaceArt") == "true"){
        console.log("no cookies")
        this.setState({
          load:false
        })
     } else {
      this.setState({
        cookies_id_user: cookies.get('CookieSpaceArt')["id_user"],
        cookies_token:cookies.get('CookieSpaceArt')["jwt_token"]
      }, () => 
      this.props.url.query.id != undefined ?
        this.getProfile(this.props.url.query.id)
      :
        this.getProfile(this.state.cookies_id_user)
        )
      this.checkQuery()
    }
  }

  checkQuery = () => {
    let cookies = new Cookies();
    if (this.props.url.query.id == undefined || cookies.get("CookieSpaceArt") == "true") {
      this.setState({
        id_user: cookies.get('CookieSpaceArt')["id_user"]
      })
    } else if (this.state.error == true) {
      return <Unknow />
    }
    else {
      this.setState({
        id_user: this.props.url.query.id
      })
    }
  }



  render() {
    let cookies = new Cookies()
    if(this.state.load) {
      return <Loading />
    }

    if(this.state.not_found) {
      return <Unknow />
    }

    if(this.state.private == 1 && this.state.id_user != cookies.get('CookieSpaceArt')["id_user"]) {
      return <Private />
    }

    return (
      <div>

 {typeof(cookies.get("CookieSpaceArt"))  === 'undefined' || cookies.get("CookieSpaceArt") == "true" ?
      <div style={{textAlign:'center', marginTop:'25vh', fontSize:'150%'}}>
      <p>Vous n'êtes pas connecté donc vous ne pouvez pas avoir accès au profil des utilisateurs</p>
      <a href="/"><button className="button is-dark">S'inscrire ou se connecter</button></a>
      </div> : null
     }
        
      <div>
          <Menu style={{position:'fixed'}} />
        </div>

        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
     
        {typeof(cookies.get("CookieSpaceArt"))  === 'undefined' || cookies.get("CookieSpaceArt") == "true" ? null :
      <Bannier private={this.state.private} url={this.state.id_user} id_user={this.state.cookies_id_user} token={this.state.cookies_token} data={this.state.data} />
    }


{typeof(cookies.get("CookieSpaceArt"))  === 'undefined' || cookies.get("CookieSpaceArt") == "true" ? null :
      <div style={{display:'flex'}}>
      <div className="box upload">
      <Audio url={this.state.id_user} id_user={this.state.cookies_id_user} token={this.state.cookies_token} />
      <Video  url={this.state.id_user} id_user={this.state.cookies_id_user} token={this.state.cookies_token} />
      </div>

      <MyPost url={this.state.id_user} token={this.state.cookies_token} />
      </div>
}
      </div>
    );
  }

  getProfile = (id) => {
    var headers = {
      "Access-Control-Allow-Origin": '*'
    }
    
    axios.get('http://www.api-jaouad93.tk/api/profile/get_profile/' + id, {headers: headers}).then((response) => {
      this.setState({
        firstname:response.data["successful"]["firstname"],
        lastname:response.data["successful"]["lastname"],
        size:response.data["successful"]["size"],
        weight:response.data["successful"]["weight"],
        age: response.data["successful"]["age"],
        city:response.data["successful"]["city"],
        description:response.data["successful"]["description"],
        picture:response.data["successful"]["picture_url"],
        private:response.data["successful"]["private"],
        data:{
          'firstname':response.data["successful"]["firstname"],
          'lastname':response.data["successful"]["lastname"],
          'size':response.data["successful"]["size"],
          'weight':response.data["successful"]["weight"],
          'age': response.data["successful"]["age"],
          'city':response.data["successful"]["city"],
          'description':response.data["successful"]["description"],
          'picture':response.data["successful"]["picture_url"]
        },
        load:false
      })
    })
    .catch((error) => {
      console.log("Get Profil", error.response.data);
      this.setState({
        load:false,
        not_found:true
      })
    }) 
}



}


export default Profil;
