import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEyeSlash, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faEyeSlash, faEye, faTrash)
import axios from 'axios'
import ReactPlayer from 'react-player'

export default class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayaudio: [],
            showaudio: false,
            fileaudio: false,
            cookie_id_user: this.props.id_user,
            cookie_token: this.props.token,
            idaudio:null,
            playeraudio:null,
            audiodescription: '',
            audiotitle: '',
            mp3: null,
            empty:''
        }
    }

    componentDidMount() {
        this.getData(this.props.url);
    }


  render() {
        return (
        <div className="profilpage">
          { this.checkId() == 1 ? <h1 className="title files" onClick={() => this.fileAudio()}>Choisir un audio</h1> : null }
          {
            this.state.fileaudio ? 
            <div>
          <input type="file" name="audio" id="audio" className="choiceaudio" accept=".mp3" onChange={(e) => this.choiceAudio(e)} />
          <label htmlFor="audio" className="audiochoice">Choisissez votre audio</label>
          <span className="spaninput">
          <input type="text" placeholder="Title" className="input is-dark" onChange={(e) => this.changeTitle(e)}></input>
          <input type="text" placeholder="Description" className="input is-dark" onChange={(e) => this.changeDescription(e)}></input>
          </span>
          <button  className="button is-dark" onClick={() => this.addAudio()}>Ajouter l'audio</button> </div>
          : null }
          <div className="audio_div" style={{ backgroundColor: 'white' }}>
            <ul style={{ fontSize: '100%' }}>

              {
                this.showDataAudio(this.state.arrayaudio)
              }

            </ul>
          </div>
          <button className="trash" onClick={() => this.showAudio()}>{this.state.showaudio ? <a className="button is-danger is-outlined">
    <span className="icon">
    <FontAwesomeIcon icon='eye-slash' />
    </span>
    <span>Fermer audio</span>
  </a> : <a className="button is-danger">
    <span className="icon">
    <FontAwesomeIcon icon='eye' />
    </span>
    <span>Voir audio</span>
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

      choiceAudio(e) {
        this.setState({
          mp3: e.target.files[0]
        })
      }
      
      changeTitle = (e) => {
          console.log(e.target.value)
        this.setState({
          audiotitle: e.target.value
        })
      }
    
      changeDescription = (e) => {
          console.log(e.target.value)
        this.setState({
          audiodescription: e.target.value
        })
      }

      showAudio() {
        if(this.state.showaudio == false) {
        this.setState({
          showaudio:true,
        }) } else {
          this.setState({
            showaudio:false
          })
        }
      }

      closeAudio = (id) => {
        this.setState({
          playeraudio:false,
          idaudio:id
        })
      }

      fileAudio() {
        this.setState({
            fileaudio:!this.state.fileaudio
        })
      }

      addAudio(){
        console.log("ok")
        var bodyFormData = new FormData();
        bodyFormData.append('audio', this.state.mp3);
        bodyFormData.append('titre', this.state.audiotitle);
        bodyFormData.append('description', this.state.audiodescription);
    
    
        var headers = {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          'api-token': this.state.cookie_token
        }
        axios.post('http://www.api-jaouad93.tk/api/audio/upload_audio', bodyFormData, { headers: headers }).then((response) => {
          console.log(response.data)
          this.state.arrayaudio.push(response.data["successful"])
          this.setState({
            arrayaudio: this.state.arrayaudio
          });
        })
          .catch(function (error) {
            console.log("Add audio ", error.response.data);
          });
      }

      playerAudio = (id) => {
        if(this.state.playeraudio === false) {
          this.setState({
            playeraudio:true,
            idaudio:id
          })
        } else {
          this.setState({
            playeraudio:true,
            idaudio: id
          })
        }
      }

      deleteAudio = (id) => {

        let cookies = new Cookies();
        var headers = {
          "Access-Control-Allow-Origin": "*",
          'api-token': this.props.token
        }
        axios.delete('http://www.api-jaouad93.tk/api/audio/delete_audio/' + id, { headers: headers }).then((response) => {
          this.setState({
            arrayaudio: this.state.arrayaudio.filter(item => item.id !== id)
          });
        })
          .catch(function (error) {
            console.log("Audio delete ", error.response.data);
          });
      }

      getData(id) {
    
          var headers = {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
          }
          axios.get('http://www.api-jaouad93.tk/api/audio/get_all_audio/' + id, { headers: headers }).then((response) => {
            let size = response.data["successful"].length
    
            let i = 0;
            for (i; i < size; i++) {
              this.setState({
                arrayaudio: [...this.state.arrayaudio, response.data["successful"][i]]
              });
            }
            
          })
            .catch((error) => {
                this.setState({
                  empty:"Aucun audio disponible."
                })    
            
            });
      }

      showDataAudio() {
        if(this.state.arrayaudio.length < 1) {
          return (
            <div>
            {this.state.empty}
            </div>
          )
        }

        if (this.state.arrayaudio !== undefined) {
          
          return this.state.arrayaudio.map((audio, key) => {
            return (
              <div key={key}>
              {
                this.state.showaudio ?
              <div className="box">
                <li className="title is-4" onClick={() => {
                  let id_audio = audio["id"]
                  this.playerAudio(id_audio)
                }}><strong>{audio["titre"]}</strong>
                {
                  ((this.state.playeraudio) && (audio["id"] === this.state.idaudio)) ? 
                  <ReactPlayer width='25%' height='100px' url={audio["url"]} playing controls/>
                  : null 
                }
                  </li>
                <button className="button is-danger is-outlined" onClick={() => {
                  let idaudio = audio["id"]
                  this.deleteAudio(idaudio)
                }
                }><span className="icon is-small is-left">
    
                <FontAwesomeIcon icon='trash' />
            </span></button>
                {
                  ((this.state.playeraudio) && (audio["id"] === this.state.idaudio)) ?
                <button   className="delete is-large" onClick={() => {
                  let idaudio = audio["id"]
                  this.closeAudio(idaudio)
                }}></button> : null
              }
              </div>
              : null
            }
            </div>
            )
          });
        } else {
          return (
            <div>
              <p> Pas d'audio</p>
            </div>
          )
        }
      }
    

}
