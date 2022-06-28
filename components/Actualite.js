import React, { Component } from 'react';
import axios from 'axios'
import ReactLoading from 'react-loading'
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import Cookies from 'universal-cookie'

import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { throws } from 'assert';
library.add(faHeart)

class Actualite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post:'',
      fil_actu:[],
      error_fil:'',
      loader:false,
      token:'',
      id_user:'',
      fil_user:[],
      data_undefined:false,
      like:"J'aime"
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
      return <div style={{textAlign:'center', marginTop:'5%'}}>
        {
            this.state.data_undefined ? <div><p style={{color:"black"}}>Vous avez aucun post dans votre fil d'actualité</p></div> : null
          }
      </div>
    }
    return (
      <div className="div-list">

          {this.state.fil_actu.map((item, key) =>
          <div key={key}>
            {item[4] == "post" ? 
            <div style={{textAlign:'center'}}>
                <div className="card" style={{maxHeight:'fit-content', width:'50%', marginBottom:'2%', display:'inline-block', maxHeight:'unset'}}>
  <header className="card-header" style={{backgroundColor:'#ff3860', color:'white'}}>
  <div>
   <div className="card-header-title" style={{display:'-webkit-inline-box'}}>
        <img src={item[1].picture_url} style={{width:'5vh', height:'5vh', borderRadius:'50%', }} />
         <p style={{color:'white'}}>{item[1].firstname + " " + item[1].lastname}</p>
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
            { item[1].id_user == this.state.id_user ? 
             <footer className="card-footer">
             <a className="card-footer-item" onClick={() => this.deletePost(item[3])}>Supprimer</a>
           </footer>
           : <footer className="card-footer">
             <a className="card-footer-item" style={{color:'#23d160'}} onClick={() => this.likePost(item[3])}>{this.state.like}</a>
           </footer>

            }
</div>
</div>
           : 
           <div style={{textAlign:'center'}}>
             {console.log("like", item)}
             <p><strong>{item[3].firstname + " " + item[3].lastname}</strong> aime ce post.</p>
                <div className="card" style={{maxHeight:'fit-content', width:'50%', marginBottom:'2%', display:'inline-block', maxHeight:'unset'}}>
  <header className="card-header" style={{backgroundColor:'#ff3860', color:'white'}}>
  <div>
   <div className="card-header-title" style={{display:'-webkit-inline-box'}}>
        <img src={item[0].picture_url} style={{width:'5vh', height:'5vh', borderRadius:'50%', }} />
         <p style={{color:'white'}}>{item[0].firstname + " " + item[0].lastname}</p>
          </div>
          <Moment format="HH:mm YYYY/MM/DD" style={{fontSize:'75%', float:'right'}}>
            {item[1].date}
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
      {item[1].news.text}
      <br/>
      <br/>
    </div>
  </div>
            { item[1].id_user == this.state.id_user ? 
             <footer className="card-footer">
             <a className="card-footer-item" onClick={() => this.deletePost(item[1].news.id)}>Supprimer</a>
           </footer> : null

            }
</div>
</div>
          }
</div>
          )}
          </div>

    )
  }

  likePost = (idpost) => {
    var headers = {
      "Access-Control-Allow-Origin":'*',
      "api-token":this.state.token
  }

  axios.get("http://www.api-jaouad93.tk/api/like/like_post/" + idpost , {headers: headers}).then((response) => {
    if(response.data.success === 1) {this.setState({
      like:"Je n'aime plus"
    })
  } else {
    this.setState({
      like:"J'aime"
    })
  }
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error.response)
  })
  }

  deletePost = (idpost) => {
    var headers = {
        "Content-Type":'application/json',
        "Access-Control-Allow-Origin":'*',
        "api-token":this.state.token
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

  render() {
    if (!this.state.loader) {
      return <ReactLoading style={{ margin:'0 auto', position:'relative', width:'15vh'}}/>
    }
    return (
        <div>
          
        {this.showActu()}

        </div>
    );
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
    let cookies = new Cookies();

    var headers = {
      "Content-Type":'application/json',
      "Access-Control-Allow-Origin": '*'
    }
    axios.get(' http://www.api-jaouad93.tk/api/post/all_post/' + cookies.get("CookieSpaceArt")["id_user"], {headers: headers}).then((response) => { 
    if(response.data.success.length < 1) {
        this.setState({
          loader:true,
          data_undefined:true
        })
      }
      for(let i = 0; response.data.success.length > i; i++) {
        if(response.data.success[i].type != "like") {
        let tab = [ response.data.success[i].news.text, response.data.success[i].user, response.data.success[i].date, response.data.success[i].news.id, response.data.success[i].type]
        this.setState({
          fil_actu:[...this.state.fil_actu, tab],
          loader:true
        })
        } else {
          let tableau = [ response.data.success[i].info_user_liked, response.data.success[i].info_post_liked, response.data.success[i].type, response.data.success[i].user]
          this.setState({
            fil_actu:[...this.state.fil_actu, tableau],
            loader:true
          })
        }
      }
    
    })
    .catch((error) => {
      this.setState({
        error_fil:'Aucun poste encore sur votre profil.',
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
      console.log(response.data)
        this.setState({
          fil_actu:[response.data.success.text, ...this.state.fil_actu],
        })
    })
    .catch((error) => {
      console.log(error.response.data);
    }) 
}

}

export default Actualite;