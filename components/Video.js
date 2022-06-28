import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEyeSlash, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faEyeSlash, faEye, faTrash)
import axios from 'axios'
import Cookies from 'universal-cookie'
import ReactPlayer from 'react-player'

// import { Container } from './styles';

export default class Video extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();

        this.state = {
            filevideo: null,
            idvideo:null,
            playervideo:null,
            showvideo:false,
            arrayvideo:[],
            cookie_id_user: this.props.id_user,
            cookie_token: this.props.token,
            videodescription: '',
            videotitle: '',
            mp4: null,
            empty:''
        }
    }

    componentDidMount() {
      
      this.getDataVideo(this.props.url);
    }

  render() {
    return (
<div className="profilpage">
          {this.checkId() == 1 ? <h1 className="title files" onClick={() => this.fileVideo()}>Choisir sa vidéo</h1> : null }
          {
            this.state.filevideo ?
            <div>
          <input type="file" name="video" id="video" className="choicevideo" accept=".mp4" onChange={(e) => this.choiceVideo(e)} />
          <label htmlFor="video" className="videochoice">Choisissez votre vidéo</label>
          <span className="spaninput">
          <input type="text" placeholder="Title" className="input is-dark" onChange={(e) => this.changeTitleV(e)}></input>
          <input type="text" placeholder="Description" className="input is-dark" onChange={(e) => this.changeDescriptionV(e)}></input>
          </span>
          <button className="button is-dark" onClick={() => this.addVideo()}>Ajouter vidéo</button> </div>
          : null }
          <div className="audio_div" style={{ backgroundColor: 'white' }}>
            <ul style={{ fontSize: '100%' }}>
              {
                this.showDataVideo(this.state.arrayvideo)
              }
            </ul>
          </div>
          <button className="trash" onClick={() => this.showVideo()}>{this.state.showvideo ? <a className="button is-danger is-outlined">
    <span className="icon">
    <FontAwesomeIcon icon='eye-slash' />
    </span>
    <span>Fermer ses vidéos</span>
  </a> : <a className="button is-danger">
    <span className="icon">
    <FontAwesomeIcon icon='eye' />
    </span>
    <span>Voir ses vidéos</span>
  </a>}</button>
        </div>
    );
  }

  checkId = () => {
    if ( this.props.url == this.state.cookie_id_user ) {
      return (1);
    } else {
      return (0);
    }
}


onChangeVideo = (e) => {
    this.setState({
      mp4: e.target.files[0]
    })
  }

changeTitleV = (e) => {
    this.setState({
      videotitle: e.target.value
    })
  }

  changeDescriptionV = (e) => {
    this.setState({
      videodescription: e.target.value
    })
  }

  showVideo = () => {
    if(this.state.showvideo == false) {
      this.setState({
        showvideo:true,
      })
    } else {
      this.setState({
        showvideo: false
      })
    }
  }

  closeVideo = (id) => {
    this.setState({
      playervideo:false,
      idvideo:id
    })
  }

  fileVideo = () => {
      this.setState({
          filevideo:!this.state.filevideo
      })
  }

  choiceVideo = e => {
    this.setState({
      mp4: e.target.files[0]
    })
  }

  addVideo = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('video', this.state.mp4);
    bodyFormData.append('titre', this.state.videotitle);
    bodyFormData.append('description', this.state.videodescription);


    var headers = {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*",
      'api-token': this.state.cookie_token
    }
    axios.post('http://www.api-jaouad93.tk/api/video/upload_video', bodyFormData, { headers: headers }).then((response) => {
      this.state.arrayvideo.push(response.data["successful"])
      this.setState({
        arrayvideo: this.state.arrayvideo
      });
    })
      .catch((error) => {
        console.log(error.response.data)
      });
  }


  playerVideo = (id) => {
    if(this.state.playervideo === false) {
    this.setState({
      playervideo:true,
      idvideo: id
    }) }
     else {
      this.setState({
        playervideo:true,
        idvideo: id
      })
    }
  }

  deleteVideo = (id) => {

    var headers = {
      "Access-Control-Allow-Origin": "*",
      'api-token': this.state.cookie_token
    }
    axios.delete('http://www.api-jaouad93.tk/api/video/delete_video/' + id, { headers: headers }).then((response) => {
      this.setState({
        arrayvideo: this.state.arrayvideo.filter(item => item.id !== id)
      });
      console.log(response.data);
    })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  getDataVideo = (id) => {
      var headers = {
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
      }

      axios.get('http://www.api-jaouad93.tk/api/video/get_all_video/' + id, { headers: headers }).then((response) => {
        let size = response.data["successful"].length

        let i = 0;
        for (i; i < size; i++) {
          this.setState({
            arrayvideo: [...this.state.arrayvideo, response.data["successful"][i]]
          });
        }
      })
        .catch((error) => {
          this.setState({
            empty:"Aucune vidéo disponible."
          }, () => console.log("ij", this.state.empty))
        });


}


  showDataVideo = () => {
    
    if (this.state.arrayvideo < 1) {
      return (
        <div>
          {this.state.empty}
        </div>
      )
    }

    if (this.state.arrayvideo !== undefined) {
      return this.state.arrayvideo.map((video, index) => {
        return (
          <div key={index}>
          {
            this.state.showvideo ?
          
          <div className="box" >
            <li className="title is-4" onClick={() => {
              let id_video = video["id"]
              this.playerVideo(id_video);
            }}>{video["titre"]}
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ? 
              <ReactPlayer url={video["url"]} playing controls/>
              : null 
            }</li>
            <button className="button is-danger is-outlined" onClick={() => {
              let idvideo = video["id"]
              this.deleteVideo(idvideo)
            }
            }><span className="icon is-small is-left">

            <FontAwesomeIcon icon='trash' />
        </span></button>
            {
              ((this.state.playervideo) && (video["id"] === this.state.idvideo)) ?
            <button className="delete is-large" onClick={() => {
              let idvideo = video["id"]
              this.closeVideo(idvideo)
            }}></button> : null
          }
          </div>
          : null
        }
        </div>
        )
      });
      
    }
  }

}
