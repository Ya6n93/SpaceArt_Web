import React, { Component } from 'react';
import axios from 'axios'
import ReactLoading from 'react-loading'
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import Cookies from 'universal-cookie'

import Moment from 'react-moment';

class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post:'',
      fil_actu:[],
      error_fil:'',
      loader:false,
      token:'',
      id_user:'',
      fil_user:[]
    }
  }

  componentDidMount() {
    let cookies = new Cookies();
    this.setState({
      token:cookies.get("CookieSpaceArt")["jwt_token"],
      id_user:cookies.get("CookieSpaceArt")["id_user"]
    })
    this.allPost()
  }
  

  showActu = () => {
    if (this.state.fil_actu.length < 1) {
      return <div style={{textAlign:'center'}}>
        {this.state.error_fil}
      </div>
    }

    return (
      <div className="div-list">
          {this.state.fil_actu.map((item, key) =>
            <div style={{textAlign:'center'}} key={key}>
                <div className="card" style={{maxHeight:'fit-content', width:'50%', marginBottom:'2%', display:'inline-block', maxHeight:'unset'}}>
  <header className="card-header" style={{backgroundColor:'#ff3860', color:'white'}}>
      <div>
   <div className="card-header-title" style={{display:'-webkit-inline-box'}}>
        <img src={item[1].picture_url} style={{width:'5vh', height:'5vh', borderRadius:'50%'}} />
         <p style={{marginLeft:'2%', color:'white'}}>{item[1].firstname + " " + item[1].lastname}</p>
          </div>
          <Moment format="HH:mm YYYY/MM/DD" style={{fontSize:'75%', float:'right'}}>
         {item[2]}
         </Moment>
         </div>
    <a href="#" className="card-header-icon" aria-label="more options">
      <span className="icon">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div className="card-content">
    <div className="content">
      {item[0]}
      <br/>
      <br/>
    </div>
  </div>
  <footer className="card-footer">
    <a className="card-footer-item" onClick={() => this.deletePost(item[3])}>Supprimer</a>
  </footer>
</div>
</div>
          )}
      </div>
    )
  }


  render() {
    return (
      <div style={{flex:'auto'}}>
        <h1 style={{textAlign:'center', fontSize:'225%'}}> Votre fil d'actualité</h1>
        { this.props.url == this.state.id_user ? 
        <div className="control" style={{textAlign:'center', marginBottom:'5%', marginTop:'5%'}}>
          <textarea onChange={this.changePost} className="textarea has-fixed-size" style={{maxWidth:'40%', minWidth:'40%', display:'inline-block'}} placeholder="Ecrivez votre message ici"></textarea>
          <button id="btn_add" className="button" style={{verticalAlign:'bottom'}} onClick={this.addPost}>Envoyer</button>
        </div>
        : null }


        <div>
          
        {this.showActu()}

        </div>
      </div>
    );
  }

  deletePost = (idpost) => {
      var headers = {
          "Content-Type":'application/json',
          "Access-Control-Allow-Origin":'*',
          "api-token":this.props.token
      }

      axios.delete("http://www.api-jaouad93.tk/api/post/delete_post/" + idpost , {headers: headers}).then((response) => {
      for(let i = 0; this.state.fil_actu.length > i; i++) {
          this.setState({
              fil_actu: this.state.fil_actu.filter(item => item[3] != idpost)
          })
      }
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  changePost = (e) => {
    if(e.target.value.length < 1 ) {
      document.getElementById("btn_add").disabled = true
    } else {
      document.getElementById("btn_add").disabled = false
    }
    this.setState({
      post: e.target.value
    })
  }

  allPost = () => {
    var headers = {
      "Content-Type":'application/json',
      "Access-Control-Allow-Origin": '*',
    }
    axios.get(' http://www.api-jaouad93.tk/api/post/get_my_all_post/' + this.props.url, {headers: headers}).then((response) => {
    if(response.data.error == "No news.") {
        this.setState({
          loader:true
        })
        return 0;
      }

      for(let i = 0; response.data.success.length > i; i++) {
        let tab = [ response.data.success[i].news.text, response.data.success[i].user, response.data.success[i].date, response.data.success[i].news.id]
        this.setState({
          fil_actu:[...this.state.fil_actu, tab],
          loader:true
        })
      }
      
    })
    .catch((error) => {
      this.setState({
        error_fil:'Aucun poste encore sur votre profil.'
      })
    })
  }

  addPost = () => {
    const data = {
      text:this.state.post
    }

    var headers = {
      "Content-Type":'application/json',
      "Access-Control-Allow-Origin": '*',
      "api-token": this.state.token
    }

    axios.post('http://www.api-jaouad93.tk/api/post/create_post', data ,{headers: headers}).then((response) => {
      let tab = [ response.data.success.news.text, response.data.success.user, response.data.success.date, response.data.success.news.id]
        this.setState({
          fil_actu:[tab, ...this.state.fil_actu],
        })
    })
    .catch((error) => {
      console.log(error.response.data);
    }) 
}

}

export default MyPost;