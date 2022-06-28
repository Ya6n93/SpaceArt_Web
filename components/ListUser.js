import React, { Component } from 'react';
import styles from '../styles/style.css'
import axios from 'axios'
import style from '../styles/style.scss'
import Modal from 'react-awesome-modal'
import Link from 'next/link'

export default class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal:this.props.bool,
            user:'',
            user_found:[],
            user_choice:[],
            user_choice_without_duplicate:[],
        }
    }

    list = () => {
        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }

        axios.get('http://www.api-jaouad93.tk/api/users/get_users_like/' + this.state.user, { headers: headers }).then((response) => {
        console.log(response.data)

            this.setState({
                user_found: []
            })

            if (response.data.length < 1) {
                this.setState({
                    user_found: ["Aucun utilisateur trouvé !"]
                })
            }

            for (let i = 0; i < response.data.length; i++) {

                let name = response.data[i].lastname + ' ' + response.data[i].firstname

                this.setState({
                    user_found: [...this.state.user_found, {"name": name, "id_user":response.data[i].id}]
                })
            }


        }).catch((error) => {
                this.setState({
                    user_found: ["Aucun utilisateur trouvé !"]
                })
            });
    }

    userList = () => {
        return (
            <div className="div-list">
                <a href="/test">Voir mes conversations</a>
                {this.state.user_found.map((item, key) =>

                    <div key={key} onClick={() => this.setState({
                        user_choice: [...this.state.user_choice, item.id_user],
                        user_choice_without_duplicate: Array.from(new Set(this.state.user_choice))
                        })
                        }>
                        <ul >
                            <li style={{border:'1px solid white'}}>
                                {item.name}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }

    changeText = (e) => {
        this.setState({
            user:e.target.value
        }, () => this.list())
    }

  render() {
    return <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
    {
        this.state.modal ? <section>
          <Modal visible={this.state.modal} width="400" height="auto" effect="fadeInUp">
          <div>
              <div style={{textAlign:'center'}}>
              <h1 style={{textAlign:'center', color:'black', fontSize:'175%'}}>Utilisateurs</h1>
              <input type="text" placeholder="Nom prénom" onChange={this.changeText}/>
              <table className="table is-fullwidth is-bordered">
                    {this.userList()}
              </table>
              </div>              
              
              <Link as={`/test`} href={{pathname: '/test', query: {id: this.state.user_choice_without_duplicate}}}><button className="button is-dark is-outlined button-center">Créer le groupe</button></Link>
              <button className="button is-danger is-outlined button-center" style={{marginTop:'5%'}} onClick={() => this.setState({modal:false})}>Fermer</button>


            </div>
          </Modal>
        </section> : null
      }
    </div>
  }
}
