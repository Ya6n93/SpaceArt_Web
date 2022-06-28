import React, { Component } from 'react';
import Menu from '../components/Menu'
import styles from '../styles/style.css';
import style from '../styles/style.scss'
import Actualite from '../components/Actualite'
import Cookies from "universal-cookie"



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            not_connected:''
        }
    }


    componentDidMount = () => {
        let cookies = new Cookies();
        if(typeof(cookies.get("CookieSpaceArt"))  === 'undefined' || cookies.get("CookieSpaceArt") == "true") {
            this.setState({
                not_connected:'true'
            })
        } else {
            this.setState({
                not_connected:'false'
            })
        }
    }
    

    render() {
        let cookies = new Cookies()
        return (
            <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <style dangerouslySetInnerHTML={{ __html: style }} />

            <p style={{textAlign:'center', fontSize:'250%', fontWeight:'bold'}}>Accueil</p>

            <Menu/>
            {
                this.state.not_connected === 'true' ? 
                <div style={{textAlign:'center', marginTop:'25vh', fontSize:'150%'}}>
                    <p>Vous n'êtes pas connecté donc vous n'avez pas de fil d'actualité</p>
                    <a href="/"><button className="button is-dark">S'inscrire ou se connecter</button></a>
                </div> 
                : 
                <Actualite />
            }
    </div>
        );
    }
}

export default Home