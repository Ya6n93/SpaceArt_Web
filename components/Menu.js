import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import reactsidenav from '../styles/react-sidenav.css'
import Link from 'next/link'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faAtlas, faSignInAlt,faEnvelope, faUserCircle, faPaperPlane, faSearch, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faUserCircle, faHome, faPaperPlane, faSearch, faSignOutAlt, faAtlas, faSignInAlt, faBell)
import Search from "../pages/search"
import axios from 'axios'
import Modal from 'react-awesome-modal'
import socketIOClient from "socket.io-client"
import Notifications from "./Notifications"
import ListUser from './ListUser';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie_token: '',
            no_token:0,
            endpoint: "http://www.api-jaouad93.tk:80",
            notif:[],
            showmsg:false,
            data:[]
        }
    }

    componentDidMount = () => {
        
        let cookies = new Cookies();
        
      this.getAllNotif(cookies.get("CookieSpaceArt")["jwt_token"])

        if (typeof(cookies.get("CookieSpaceArt"))  === 'undefined'){
            this.setState({
                no_token:1
            })
           } else {
        this.setState({
            cookie_token:cookies.get('CookieSpaceArt')["jwt_token"]
        })
    }

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on( "notif" + cookies.get('CookieSpaceArt')["id_user"], (msg) => {
        this.setState({
            notif:[...this.state.notif, msg]
        })
      })
  }

    render() {
        return (
            <div>

                <style dangerouslySetInnerHTML={{ __html: reactsidenav }} />
                <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
    <Link href="/home">
        <NavItem eventKey="home" id="1" alt="Accueil" title="Accueil">
            <NavIcon>
            <FontAwesomeIcon icon='home' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
            </NavIcon>
            <NavText>
                Accueil
            </NavText>
        </NavItem>
        </Link>
        <Link href="/profil">
        <NavItem eventKey="profil" id="2" alt="Profil" title="Profil">
            <NavIcon>
            <FontAwesomeIcon icon='user-circle' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
            </NavIcon>
            <NavText>
                Profil
            </NavText>
        </NavItem>
        </Link>
        <NavItem eventKey="message" id="21" alt="Message" title="Message" onClick={() => this.setState({showmsg:true})} >
            <NavIcon>
            <FontAwesomeIcon icon='envelope' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
            </NavIcon>
            <NavText>
                Message
            </NavText>
            {
            this.state.showmsg ? <section>
              <ListUser bool={this.state.showmsg} fun={this.changeBool}/>
            </section> : null
          }
        </NavItem>
            <NavItem eventKey="search" id="3" alt="Recherche" title="Recherche">
                <NavIcon>
                    <FontAwesomeIcon icon="search" style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/> 
                </NavIcon>
                <NavText>
                Recherche
                </NavText>
                <NavItem eventKey="search/input">
                    <NavText>
                        <Search/>
                    </NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="notif" id="10" alt="Notification" title="Notification">
                <NavIcon>
                    <FontAwesomeIcon icon="bell" style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/> 

                   {this.state.notif.length < 1 ? null : 
                <a style={{fontSize:'150%'}}>{this.state.notif.length}</a>}
                </NavIcon>
                <NavText>
                Notification
                </NavText>
                <NavItem eventKey="notif/input">
                    <NavText>
                        <Notifications notif={this.state.notif} fct={this.deleteNotif} data={this.state.data}/>
                    </NavText>
                </NavItem>
            </NavItem>
            <Link href="/casting">
            <NavItem eventKey="casting" id="4" alt="Casting" title="Casting">
                    <NavIcon>
                    <FontAwesomeIcon icon='atlas' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
                    </NavIcon>
                    <NavText>
                        Casting
                    </NavText>
                </NavItem>
                </Link>
                { this.state.no_token != 1 ?
                <NavItem eventKey="profil" id="4" onClick={this.logout} alt="Déconnexion" title="Déconnexion">
                    <NavIcon>
                    <FontAwesomeIcon icon='sign-out-alt' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
                    </NavIcon>
                    <NavText>
                        Déconnexion
                    </NavText>
                </NavItem>
                : null}
                {
                    this.state.no_token == 1 ?
                    <Link href="/">
                    <NavItem eventKey="login" id="4" onClick={this.logout} alt="Connexion / Inscription" title="Login / Register">
                    <NavIcon>
                    <FontAwesomeIcon icon='sign-in-alt' style={{fontSize:'150%', width:'50%' , height:'50%', margin:'0', padding:'0'}}/>
                    </NavIcon>
                    <NavText>
                        Connexion / Inscription
                    </NavText>
                </NavItem>
                </Link>
                : null 

                }
    </SideNav.Nav>
</SideNav>

            </div>
        );
    }

    changeBool = (value) => {
        console.log("ici", value)
        this.setState({
            showmsg:value
        }, () => console.log("iciici", this.state.showmsg))
    }

    deleteNotif = (index) => {
        var array = [...this.state.notif]; // make a separate copy of the array
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({notif: array});
        }
    }

    logout = () => {
        var headers = {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": '*',
            "api-token": this.state.cookie_token
          }
          
          axios.delete('http://www.api-jaouad93.tk/api/users/logout', {headers: headers}).then((response) => {
              let cookies = new Cookies();
            cookies.set("CookieSpaceArt", true, {path : '/'})
            window.location = "/"
          })
          .catch((error) => {
            console.log(error.response);
          }) 
    }

    getAllNotif = (cookie) => {

        console.log("notif", cookie)
        var headers = {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": '*',
            "api-token":cookie
          }

        axios.get("http://www.api-jaouad93.tk/api/notif/get_my_notif", {headers: headers}).then((response) => {
            this.setState({
                data:response.data.success
            })
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
}


export default Menu;