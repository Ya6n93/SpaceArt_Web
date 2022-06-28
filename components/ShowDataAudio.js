import React, { Component } from 'react';

// import { Container } from './styles';

export default class ShowDataAudio extends Component {
  render() {
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
