
import Link from 'next/link'
import axios from 'axios'
import style from '../styles/style.scss'
import styles from '../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faLockOpen, faUser, faUserCircle,faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'
library.add(faEnvelope, faLock, faLockOpen, faUser, faUserCircle, faInfoCircle, faGoogle )
import { NotificationContainer, NotificationManager } from 'react-notifications';
import notif from '../styles/notifications.css'
import { timingSafeEqual } from 'crypto';
import Google from '../components/Google';
import { Router, browserHistory } from 'react-router';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConf = this.onChangePasswordConf.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            sexe:'',
            passwordconf: '',
            emailError: '',
            passwordError:'',
            length:'',
            showHelp:false
        }
    }

    validator = () => {
        let length = '';
        let passwordError = '';
        let emailError = '';

        if(this.state.email < 1 || this.state.firstname < 1 || this.state.lastname < 1 || this.state.password < 1 || this.state.passwordconf < 1 || this.state.sexe < 1) {
            length = 'Remplissez tous les champs.'
        }

        else if (this.state.password.localeCompare(this.state.passwordconf)) {
            passwordError = 'Mot de passe différent.'
            this.setState({
                passwordconf:''
            })
        }

        else if(this.state.password.length < 8 || !/([A-Z]+)/g.test(this.state.passwordconf) || !/([0-9]+)/g.test(this.state.passwordconf) || !/([a-z]+)/g.test(this.state.passwordconf)) {
            passwordError = "Le mot de passe n\'est pas sécurisé";
            this.setState({
                showHelp: true,
                password:'',
                passwordconf:''
            })
        }

        else if(!this.state.email.includes("@")) {
            emailError = 'L\'email n\'est pas valide.'
            this.setState({
                email:''
            })
        } 
        if (length || passwordError || emailError) {
            this.setState({
                length, passwordError, emailError
            });
            return false;
        }
        return true

    }

    render() {
        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: style }} />
                <style dangerouslySetInnerHTML={{ __html: styles }} />

                <style dangerouslySetInnerHTML={{ __html: notif }} />

                <img src="https://media04.meinbezirk.at/event/2018/06/08/6/54606_XXL.jpg" style={{ width: '55%', height: "100vh" }} align="left" />

                <div className="divreg">
                    <div className="field">
                        <p className="title is-1 is-spaced">Inscription</p>
                        <div className="butt">
                            <Link href="/"><button className="button is-danger">Connexion</button></Link>
                            <Link href="/register" ><button className="button is-danger active">Inscription</button></Link>
                        </div>

                        <div style={{fontWeight:'bold', color:''}}>
                    {this.state.length}
                    {this.state.passwordError}
                    {this.state.showHelp ? 
                <span className="icon is-small is-right" style={{flex:'no-wrap'}} >
                <div className="tooltip"><FontAwesomeIcon icon="info-circle" />
                    <span className="tooltiptext" >1 lettre majuscule, 1 nombre et minimum 8 lettres.</span>
                </div>
                </span>
                : null }
                    {this.state.emailError}
                    </div>

                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Email"></input>

                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='envelope' />
                            </span>
                        </p>


                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" value={this.state.firstname} onChange={this.onChangeFirstname} placeholder="Prénom"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='user' />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" value={this.state.lastname} onChange={this.onChangeLastname} placeholder="Nom de famille"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='user-circle' />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" id="pass" type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Mot de passe"></input>
                            <span className="icon is-small is-left">

                                <FontAwesomeIcon icon='lock-open' />
                            </span>
                        
                        </p>
                    </div>

                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" value={this.state.passwordconf} onChange={this.onChangePasswordConf} placeholder="Confirmation"></input>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon='lock' />
                            </span>
                        </p>
                    </div>
                    
                    <div className="field">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="sexe" onChange={() => this.setState({
                                sexe:'homme'
                            })}/>
                            Homme
                        </label>
                        <label class="radio">
                            <input type="radio" name="sexe" onChange={() => this.setState({
                                sexe:'femme'
                            })}/>
                            Femme
                        </label>
                    </div>
                    </div>
                    
                        
        <div style={{display:'flex'}}>
                    <a className="button is-danger" onClick={this.register}>Validate</a>
                    <Google  />
                    </div>
                </div>
                
        <NotificationContainer/>
            </div>
        );
    }

    register(e) {
        let valid = this.validator()

        if(valid) {
        e.preventDefault();
        let self = this;
        const register = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordconf: this.state.passwordconf,
            sex:this.state.sexe
        }
        var headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        axios.post('http://www.api-jaouad93.tk/api/users/create', register, { headers: headers }).then(function (response) {
            NotificationManager.success('Vous allez être redirigé ...', 'Inscription réussie');
            setTimeout(function () {
                window.location = '/'
             }, 2500);
        }).catch((error) => {
            this.setState({
                emailError:'L\'email est déjà utilisé'
            })
        });
    }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangePassword(e) {
        if (e.target.value.length <= 7) 
            document.getElementById('pass').style.backgroundColor = "#e82e2e"    
        if(e.target.value.length >= 8)
            document.getElementById('pass').style.backgroundColor = "orange"
        if ((/([A-Z]+)/g.test(e.target.value) && /([0-9]+)/g.test(e.target.value)) && (/([0-9]+)/g.test(e.target.value) && /([a-z]+)/g.test(e.target.value)) && (/([a-z]+)/g.test(e.target.value) && /([A-Z]+)/g.test(e.target.value) && /([a-z]+)/g.test(e.target.value)) )
            document.getElementById('pass').style.backgroundColor = "limegreen" 
        if (e.target.value.length < 1) 
            document.getElementById('pass').style.backgroundColor = "white"

        this.setState({
            password: e.target.value
        })
    }

    onChangePasswordConf(e) {
        this.setState({
            passwordconf: e.target.value
        })
    }

}

export default Register;