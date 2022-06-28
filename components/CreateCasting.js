import React, { Component } from 'react';
import Modal from 'react-awesome-modal'
import axios from 'axios'
import Cookies from 'universal-cookie'


// import { Container } from './styles';

export default class CreateCasting extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();
        this.state = {
            modal: false,
            title:'',
            description:'',
            address:'',
            online:1,
            cookie_token:cookies.get("CookieSpaceArt")["jwt_token"]
        }
    }

  render() {
    return (
        <div style={{width:'75%', margin:'0 auto'}}>
                   <h1 style={{color:'black', textAlign:'center', fontWeight:'bold', fontSize:'175%'}}>Informations</h1>
                  <hr></hr>
                  <label className="label">Titre</label>
                  <input className="input panel_input" type="text" placeholder="Title" onChange={this.onChangeTitle}/>
                  <label className="label">Description</label>
                  <input className="input panel_input" type="text" placeholder="Description" onChange={this.onChangeDescription}/>
                  
                  { this.state.online === 1 ?
                  <div>
                  <label className="label" >Adresse</label> 
                  <input className="input panel_input" type="text" placeholder="Adresse" onChange={this.onChangeAddresse}/>
                  </div>
                  : null
                  }

                  <div class="control" style={{textAlign:'center'}}>
                    <label class="radio">
                        <input type="radio" name="info" onChange={() => this.setState({ online:0})} />
                        En ligne
                    </label>
                    <label class="radio">
                        <input type="radio" name="info" onChange={() => this.setState({online:1})}/>
                        Au locaux
                    </label>
                  </div>
                  <br/>
                  <button className="button is-danger infobutton" onClick={() => this.createCasting()}>Valider</button> 
        </div>
    )
  }

  onChangeTitle = (e) => {
      this.setState({
          title:e.target.value
      })
  }

  onChangeAddresse = (e) => {
        this.setState({
            address:e.target.value
        })
    }

onChangeDescription = (e) => {
        this.setState({
            description:e.target.value
        })
    }

  createCasting = () => {
      let url = "http://www.api-jaouad93.tk/api/cast/create_cast"

      var headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'api-token': this.state.cookie_token
      }

      const params = {
        title:this.state.title,
        description:this.state.description,
        address:this.state.address,
        online:this.state.online
      }

      axios.post(url,params, {headers: headers})
      .then(res => {
          this.setState({
              modal:false
          })
      })
      .catch(err => {
          console.error(err); 
      })
  }

}
