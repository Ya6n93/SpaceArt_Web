import React, { Component } from 'react'
import DataFollower from '../components/DataFollower'
import DataFollowing from './DataFollowing'
import Follow from './Follow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSave, faShareSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faSave, faShareSquare)
import axios from 'axios'
import Modal from 'react-awesome-modal'
import Unknow from './Unknow'
import Cookies from 'universal-cookie'

export default class ChangeInfo extends Component {
        constructor(props) {
            super(props);
            this.state = {
                changeinfo: false,
                firstname: this.props.data.firstname,
                lastname: this.props.data.lastname ,
                city: this.props.data.city == 'empty' ? 'None' : this.props.data.city,
                age: this.props.data.age == 'empty' ? 'None' : this.props.data.age,
                weight: this.props.data.weight == 'empty' ? 'None' : this.props.data.weight,
                size: this.props.data.size == 'empty' ? 'None' : this.props.data.size,
                description: this.props.data.description == 'empty'  ? 'None' : this.props.data.description,
                croppedImageUrl: null,
                cookie_token: this.props.token,
                load_ok:true,
                file:null,
                files:null,
                private:'Privée',
                not_private:'Pas privée'
            }

        }

  render() {
    return (
            <div className="hero-body">
            <div className="box box">
                <h1 classNam  e="title">
                    { `${this.state.firstname} ${this.state.lastname}`} 
                  </h1>
                <h2 className="subtitle">
                Ville : {this.state.city} <br/> Age : {this.state.age} ans <br/> Poids : {this.state.weight} kg <br/> Taille : {this.state.size} cm<br/>  Description : {this.state.description}
                      <br />
                      <div style={{display:'flex', alignItems:'flex-end'}}>
                      
                    <Follow id={this.props.id} id_user={this.props.id_user} token={this.props.token} />
                    <DataFollowing id={this.props.id} token={this.props.token}/>
                    <DataFollower id={this.props.id} token={this.props.token}/>

                    </div>
                      <div style={{display:'flex', flexDirection:'row'}}>
                  <input type="file" accept="image/jpeg, image/png" name="banner" id="banner" className="banfile" onChange={this.handleChange} />
                  { this.checkId() == 1 ?
                  <button htmlFor="banner" className="button is-dark bannierfile" onClick={this.changeBan}><label htmlFor="banner" >Modifier sa bannière</label></button> : null
                  }
                  { this.checkId() == 1 ? <button className="button is-danger bannierfile" onClick={() => this.setState({
                  changeinfo:!this.state.changeinfo
                  })}>Changer ses informations</button> : null }


              {this.checkId() == 1 ? <button htmlFor="private" className="button is-danger" onClick={this.changePrivate}><label htmlFor="private">{this.props.private == 0 ? this.state.not_private : this.state.private}</label></button> : null }

                 { this.checkId() == 1 ? <span className="icon" style={{fontSize:'25px', marginLeft:'3%', marginTop:'1.5%'}} onClick={this.addProfile}>
                    <FontAwesomeIcon icon='save' />
                </span>
                : null }

                {this.checkId() == 1 ? <span className="icon" style={{fontSize:'25px', marginLeft:'3%', marginTop:'1.5%'}} onClick={this.changeBan}>
                <FontAwesomeIcon icon='share-square' />
            </span> : null }

                </div>
                </h2>
                </div>
                
                {
            this.state.changeinfo ? <section>
              <Modal visible={this.state.changeinfo} width="400" height="auto" effect="fadeInDown"  onClickAway={() => this.setState({ changeinfo:!this.state.changeinfo})}>
                
                  <h1 style={{color:'black', textAlign:'center', fontWeight:'bold', fontSize:'175%'}}>Informations</h1>
                  <hr></hr>
                  <label className="label">Prénom</label>
                  <input className="input panel_input" type="text" placeholder="Firstname" onChange={this.onChangeFirstname}/>
                  <label className="label">Nom</label>
                  <input className="input panel_input" type="text" placeholder="Lastname" onChange={this.onChangeLastname}/>
                  <label className="label" >Ville</label>
                  <input className="input panel_input" type="text" placeholder="City" onChange={this.onChangeCity}/>
                  <label className="label">Tailld</label>
                  <input className="input panel_input" type="number" placeholder="Size" onChange={this.onChangeSize}/>
                  <label className="label">Age</label>
                  <input className="input panel_input" type="number" placeholder="Age" onChange={this.onChangeAge} />
                  <label className="label">Poids</label>
                  <input className="input panel_input " type="number" placeholder="Weight" onChange={this.onChangeWeight}/>
                  <label className="label">Description</label>
                  <textarea className="textarea is-danger description" maxLength="100" placeholder="Description" onChange={this.onChangeDescription}/>
                  <br/>
                  <button className="button is-danger infobutton" onClick={() => this.changeInfo()}>Valider</button>
                  <button className="button is-dark closebutton" onClick={() => this.setState({ changeinfo:!this.state.changeinfo})}>Fermer</button>
                  
              </Modal>
            </section> : null
          }
            </div>
    );
  }

changePrivate = () => {
  let url = "http://www.api-jaouad93.tk/api/users/private_user"

  let cookies = new Cookies()

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'api-token': cookies.get("CookieSpaceArt")["jwt_token"]
          }

      axios.get(url,{headers: headers})
      .then(res => {
        console.log(res)
          this.setState({
              not_private: "Privée"
          })
          console.log("la", res.data)
      })
      .catch(err => {
          console.error(err); 
      })
}

  onChangeFirstname = e => {
    this.setState({
        firstname: e.target.value
    })
}

onChangeLastname = e => {
    this.setState({
        lastname: e.target.value
    })
}

onChangeCity = e => {
  this.setState({
    city:e.target.value
  })
}

onChangeSize = e => {
  this.setState({
    size:e.target.value
  })
}

onChangeAge = e => {
  this.setState({
    age: e.target.value
  })
}

handleChange= event => {
  this.setState({
    file: URL.createObjectURL(event.target.files[0]),
    files:event.target.files[0],
    modal1: true
  }, () => this.props.fct(this.state.file))

}

onChangeWeight = e => {
  this.setState({
    weight:e.target.value
  })
}


onChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  checkId = () => {
    if ( this.props.id == this.props.id_user ) {
      return (1);
    } else {
      return (0);
    }
}

changeInfo(){
  const changeinfo = {
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    city: this.state.city,
    weight:this.state.weight,
    age: this.state.age,
    size: this.state.size,
    description:this.state.description
  }

  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'api-token': this.state.cookie_token
  }

  axios.put('http://www.api-jaouad93.tk/api/profile/update', changeinfo, { headers: headers}).then((response) => {
    this.setState({
        changeinfo:false
    })
  })
  .catch(function (error){
    console.log(error.response.data);
  })
}

addProfile = () => {
  var bodyFormData = new FormData();
  bodyFormData.append('picture', this.props.url_img);

  var headers = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'api-token': this.state.cookie_token
  } 
 
  axios.put('http://www.api-jaouad93.tk/api/profile/update_picture', bodyFormData, {headers:headers}).then((response) => {
      console.log(response.data)
  })
  .catch((error) => {
    console.log(error.response.data);
  })
}

changeBan = () => {
var bodyFormData = new FormData();
bodyFormData.append('banner', this.state.files);

var headers = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'api-token': this.state.cookie_token
} 

axios.put('http://www.api-jaouad93.tk/api/profile/update_banner', bodyFormData, {headers:headers}).then((response) => {
  console.log(response.data.successful)
this.setState({
      file:response.data.successful.url
    }, () => this.props.fct(this.state.file))
})
.catch((error) => {
  console.log(error.response.data);
})
}


}
