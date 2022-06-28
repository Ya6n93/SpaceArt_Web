import Link from 'next/link'
import axios from 'axios'
import style from '../styles/style.scss'
import styles from '../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
library.add(faEnvelope, faLock)
import CookieConsent from "react-cookie-consent"
import Cookies from 'universal-cookie'
import Google from '../components/Google'
import Confirmation from './confirmation'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.log = this.log.bind(this);
    this.state = {
      email: '',
      password: '',
      cookies: Cookies,
      cookienull: false,
      id_user:'',
      emailError:'',
      passwordError:'',
      redirect:false,
      datacookie:''
    }
  }

  componentDidMount = () => {
    let cookies = new Cookies()
    this.setState({
      datacookie:cookies.get('CookieSpaceArt')
    }, () => console.log(this.state.datacookie))
  }


  render() {
    let cookies = new Cookies();

    if(this.state.redirect) {
      return <Redirect to= {{query: '/home'}} />
    }

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <img src="https://media04.meinbezirk.at/event/2018/06/08/6/54606_XXL.jpg" style={{ width: '55%', height: "100vh" }} align="left" />
        {
        this.state.datacookie ?
        <div className="divlog">
          <div className="field">
            <p class="title is-1 is-spaced">Connexion</p>
            <div className="butt">
              <Link><button className="button is-danger active">Connexion</button></Link>
              <Link href="/register"><button className="button is-danger">Inscription</button></Link>
            </div>
            {this.state.emailError}
            {this.state.passwordError}

            <p className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}></input>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon='envelope' />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Mot de passe" value={this.state.password} onChange={this.onChangePassword}></input>
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon='lock' />
              </span>
            </p>
          </div>
        <div style={{display:'flex'}}>
          <a className="button is-danger" onClick={this.log}>Valider</a>
          <Google />
          </div>
        </div>
        :
        <div className="divlog">
          <div><strong>Accepter les cookies pour pouvoir accéder au site.</strong></div> 
            <div className="fleche"></div>
        </div>
        }

        <CookieConsent
          onAccept={() => this.setState({cookienull:true})}
          enableDeclineButton
          declineButtonText="Decline"
          onDecline={() => {alert("nay!")}}
          cookieName="CookieSpaceArt"
        >
          Le site utilise les cookies pour que l'utilisateur est une meilleure expérience{" "}
        </CookieConsent>

      </div>
    )
  }

  confirm_mail = () => {
    return <Confirmation />
  }

  log = e => {
    e.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    }
    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
    axios.post('http://www.api-jaouad93.tk/api/users/login', login, { headers: headers }).then((response) => {
      if (response.data.mail_validate == "0") {
       window.location = "/confirmation"
      let cookies = new Cookies();
      let data_cookie = {
        firstname: response.data["firstname"],
        lastname: response.data["lastname"],
        jwt_token: response.data["jwt_token"],
        id_user: response.data["id_user"],
        redirect:true
      }

      let data_mail = {
        mail_validate: response.data["mail_validate"]
      }

      cookies.set('CookieSpaceArt', JSON.stringify(data_cookie), {path : '/'});
      cookies.set('CookieMail', JSON.stringify(data_mail), {path : '/'});
    } else {
      window.location = "/home"
      let cookies = new Cookies();
      let data_cookie = {
        firstname: response.data["firstname"],
        lastname: response.data["lastname"],
        jwt_token: response.data["jwt_token"],
        id_user: response.data["id_user"],
        mail_validate: response.data["mail_validate"],
        redirect:true
      }
      cookies.set('CookieSpaceArt', JSON.stringify(data_cookie), {path : '/'}); 
    }
    })
      .catch((error) => {
         if (error.response.data.email) {
            this.setState({
              emailError:'L\'email n\'est pas valide.',
              passwordError:''
            }, () => this.state.emailError)
        } else {
            this.setState({
              passwordError:'Le mot de passe n\'est pas le bon',
              emailError:''
            })
        } 
      });

  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

}


export default Login;