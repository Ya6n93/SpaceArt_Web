import React, { Component } from 'react';
import axios from 'axios'
import Link from 'next/link'
import Modal from 'react-awesome-modal'
import Message from "../components/Message"
import { faRoute } from '@fortawesome/free-solid-svg-icons';

// import { Container } from './styles';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            focus: false,
            user_found: ["Aucun utilisateur trouvé !"],
            id_user_search: '',
            showMessage:false,
            id_message:0
        }
    }

    onSearch = (e) => {

        if (e.target.value.length < 1) {
            this.setState({
                user_found: []
            })
        }


        this.setState({
            search: e.target.value
        }, () => this.searchUsers(this.state.search))
    }


    onFocus = () => {
        this.setState({
            focus: true
        })
    }

    searchUsers = (user) => {   
        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }

        axios.get('http://www.api-jaouad93.tk/api/users/get_users_like/' + user, { headers: headers }).then((response) => {

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


        })
            .catch((error) => {
                this.setState({
                    user_found: ["Aucun utilisateur trouvé !"]
                })
            });
    }

    userList = () => {
        return (
            <div className="div-list">
                {this.state.user_found.map((item, key) =>

                    <div>
                        <a  key={key} className="list-a"
                        style={{textAlign:'center', color:'white'}}
                        href={`/profil/${item.id_user}`}>
                        <ul key={key}>
                            <li style={{border:'1px solid white'}}>
                                {item.name}
                            </li>
                        </ul>
                    </a>
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Recherche" onChange={this.onSearch} onClick={this.onFocus} />
                {
                    this.state.focus ?
                        <div style={{backgroundColor:'#cc2d4d', width: '100%' }}>
                            {this.userList()}
                        </div>
                        : null
                }

            </div>
        )
    }
}

export default Search;