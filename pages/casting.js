import axios from 'axios';
import React, { Component } from 'react'
import Menu from '../components/Menu'
import styles from '../styles/style.css'
import style from '../styles/style.scss'
import styletoggle from "../styles/style_toggle.css"
import Loading from '../components/Loading'
import CreateCasting from '../components/CreateCasting'
import Cookies from 'universal-cookie'
import Modal from 'react-awesome-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCheck, faTimes, faPauseCircle)
import SimpleMap from '../components/SimpleMap'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import notif from '../styles/notifications.css'
import Toggle from 'react-toggle'


class Casting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            casting:[],
            load:true,
            id_user:99999,
            modal:false,
            user_candidate:[],
            user_error:'',
            file:'https://static.jobat.be//uploadedImages/grandprofilfb.jpg',
            reload:0,
            clicked:false,
            lat:0,
            lon:0,
            modal2:false,
            motivation:'',
            modal3:false,
            token:'',
            baconIsReady:true
        }
    }

    handleBaconChange = () => {
        this.setState({
            baconIsReady:!this.state.baconIsReady
        })
    }

  render() {
      let cookies = new Cookies()
    if(this.state.load) {
        return <Loading />
      }
    return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      
      <style dangerouslySetInnerHTML={{ __html: notif }} />
      <style dangerouslySetInnerHTML={{ __html: styletoggle }} />
      <div>
        <Menu />
        </div>
        <div style={{textAlign:'center'}}>
            <h1 className="title is-1">Casting</h1>
            <hr />
            <label>
  <Toggle
    defaultChecked={this.state.baconIsReady}
    onChange={this.handleBaconChange} />
  {this.state.baconIsReady ? <span>Producteur</span> : <span>Annonceur</span>}
</label>
        {
            typeof(cookies.get("CookieSpaceArt"))  === 'undefined' ? null : null
        }
            


            { !this.state.baconIsReady ?
                this.state.casting.map((data, key) => {
                    return (
                        <div key={key}>
                        <article className="message" style={{width:'75%', margin:'0 auto'}}>  
                            <div className="message-header">
                                <p style={{margin:'unset'}}>{data[0].title}</p>
                                <a href={"/profil/" + data[0].user_id}><img style={{width:'5vh', height:'5vh', borderRadius:'50%'}} src={data[1].picture_url} alt="user" /></a>
                            </div>
                            <div className="message-body">
                                {data[0].description}
                            </div>
                            {
                    data[0].user_id === this.state.id_user ? 
                    <button className="button is-success" onClick={() => this.doubleFunction(data[0].id)}>
                        Voir les candidats
                    </button> : 
                        <div>
                            <button className="button is-dark" onClick={() => this.showAdresse(data[0].address)}>Voir la map</button>
                            {
                                typeof(cookies.get("CookieSpaceArt")) == 'undefined' || cookies.get("CookieSpaceArt") == "true" ? console.log("okokokokok") : 
                                <button className="button is-success" onClick={() => this.setState({ modal3:!this.state.modal3 })}>Postuler</button>
                            }
                            { this.state.modal3 ?
                                <section>
                                <Modal visible={this.state.modal3} width="400" height="auto" effect="fadeInDown"  onClickAway={() => this.setState({ modal3:!this.state.modal3})}>
                                    <div style={{textAlign:'center'}}>
                                    <h1 className="title is-1">Postuler ici</h1>
                                    <hr/>
                                    <label className="label">Motivation</label>
                                    <textarea className="textarea is-danger description" maxLength="100" placeholder="Description" onChange={this.onMotivation}/>
                                    <button className="button is-dark" style={{marginTop:"5%"}} onClick={() => this.postuleHere(data[0].id)}>Je postule</button>
                                    </div>
                                </Modal>
                                </section> : null
                        }
                        </div>
                        
                            }    
                        </article>
                        </div>
                    )
                })
                : <CreateCasting />
            }
            {this.state.clicked ? 
            <section>
                            <Modal visible={this.state.modal2} width="400" height="400" effect="fadeInDown"  onClickAway={() => this.setState({ modal2:!this.state.modal2})}>
                <SimpleMap data={{lat:parseFloat(this.state.lat, 10), lng:parseFloat(this.state.lon, 10)}} lat={this.state.lat} lon={this.state.lon} /> </Modal></section>
                             : null
                             }
        </div>
        {
            this.state.modal ? <section>
                <Modal visible={this.state.modal} width="400" height="auto" effect="fadeInDown"  onClickAway={() => this.setState({ modal:!this.state.modal})}>
                {
                    this.state.user_candidate.length > 0 ?
                   this.state.user_candidate.map((item, key) => 
                   <div key={key}>
                   <tr>
                     { (item.picture_url != 'empty') ?
                     <th><img className="circle_following" src={item.picture_url}/></th>
                     : <th><img className="circle_following" src={this.state.file}/></th>
                     }
                     <td><a href={"/profil/" + item[1].user_id}> {item[2].firstname + " " + item[2].lastname} </a><br/>
                       </td>
                   </tr>
                    
                   <p>Motivation : {item[0].motivate}</p>
                   <div style={{textAlign:'center'}}> 
                       {
                           item[0].accepted === 1 ? <button className="button is-success" onClick={() => this.changeResult2(item[0].cast_id, item[0].user_id)}><FontAwesomeIcon icon='check' /></button>
                            : item[0].accepted === 2 ? <button className="button is-danger" onClick={() => this.changeResult(item[0].cast_id, item[0].user_id)}><FontAwesomeIcon icon='times' /></button> : null
                       }
                   <hr />
                   </div>
                    </div>
                    ) : <div><p style={{textAlign:'center'}}>{this.state.user_error}</p> <hr /> </div>
                }
                    <button style={{display:'flex', margin:'0 auto'}} className="button is-dark" onClick={() => this.setState({ modal:!this.state.modal})}>Fermer</button>
                </Modal>
            </section>
            : null
        }   

        <NotificationContainer/>
    </div>
    )
  }

  componentDidMount = () => {
      
    let cookies = new Cookies();
    if (typeof(cookies.get("CookieSpaceArt"))  === 'undefined'){
        this.allCasting()
       } else {
        this.allCasting()
        this.setState({
            id_user:cookies.get("CookieSpaceArt")["id_user"],
            token:cookies.get("CookieSpaceArt")["jwt_token"]
        })
       }
  }

  postuleHere = (id) => {
      this.setState({
          modal3:!this.state.modal3
      })
      let url = "http://www.api-jaouad93.tk/api/cast/candidate_cast/" + id

        var headers = {
            "api-token": this.state.token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }

        let data = {
            motivate:this.state.motivation
        }

      axios.post(url,data, {headers: headers})
      .then(res => {
        NotificationManager.success('', 'Vous venez de postuler');
      })
      .catch(err => {
        NotificationManager.error('', 'Vous avez déjà postulé');
      })
  }

  onMotivation = (e) => {
    this.setState({
        motivation:e.target.value
    })
  }

  changeResult = (cast_id, id_user) => {
    let url = "http://www.api-jaouad93.tk/api/cast/accepted_candidate_or_not/" + cast_id + "/" + id_user ;

    let cookies = new Cookies()

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'api-token': cookies.get("CookieSpaceArt")["jwt_token"]
          }

      axios.get(url,{headers: headers})
      .then(res => {
          this.setState({
              modal: false
          })
          console.log(res.data)
      })
      .catch(err => {
          console.error(err); 
      })
  }

  changeResult2 = (cast_id, id_user) => {
    let url = "http://www.api-jaouad93.tk/api/cast/refuse_candidate_or_not/" + cast_id + "/" + id_user ;

    let cookies = new Cookies()

        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'api-token': cookies.get("CookieSpaceArt")["jwt_token"]
          }

      axios.get(url,{headers: headers})
      .then(res => {
          this.setState({
              modal: false
          })
          console.log(res.data)
      })
      .catch(err => {
          console.error(err); 
      })
  }

  doubleFunction = (id) => {
      console.log(id)
      this.allCandidate(id)
      this.setState({
          modal:!this.state.modal
      })
  }

  allCandidate = (id) => {
    let url = "http://www.api-jaouad93.tk/api/cast/all_candidate_in_one_cast/" + id

    this.setState({
        user_candidate:[]
    })

      axios.get(url)
      .then(res => {
          console.log(res.data)
          let size = res.data.success.length
          let i = 0
          for (i; i < size; i++) {
              this.setState({
                  user_candidate:[...this.state.user_candidate, [res.data.success[i].candidate, res.data.success[i].profile, res.data.success[i].user]],
                  accept:res.data.success[i].candidate.accepted
              })
          }
      })
      .catch(err => {
            this.setState({
                user_error:"Aucun candidat."
            })
            console.error(err); 

      })
  }

  allCasting = () => {
      let url = "http://www.api-jaouad93.tk/api/cast/get_all_cast"

      axios.get(url)
      .then(res => {
        let size = res.data.success.length
        let i = 0
        for (i; i < size; i++) {
            this.setState({
                casting: [...this.state.casting, [res.data.success[i].cast, res.data.success[i].profile]],
                load:false
            })
        }
      })
      .catch(err => {
          console.error(err);
          this.setState({
              casting:[...this.state.casting, ["Aucun casting disponible"]],
              load:false
          })
      })
  }

  showAdresse = (addr) => {
    this.setState({
        lat:0,
        lon:0,
        modal2:false
    })
      axios.get('https://nominatim.openstreetmap.org/search?q=%27+' + addr + '&format=json')
      .then(res => {
          this.setState({
              clicked:!this.state.clicked,
              modal2:true,
              lat:res.data[0].lat,
              lon:res.data[0].lon
          })
      })
      .catch(err => {
          console.error(err); 
      })
  }

}

export default Casting;