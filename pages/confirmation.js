import React, { Component } from 'react';
import styles from '../styles/style.css'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Loading from '../components/Loading'
import MailIsOk from '../components/MailIsOk'
import style from '../styles/style.scss'

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      final_code: '',
      mail_validate:'',
      loader:true,
      mail_ok:'0',
      error:false
    }
  }

  componentDidMount() {
    let cookies = new Cookies();
    let mail_validate = cookies.get("CookieMail")['mail_validate']
    this.setState({
      mail_validate:mail_validate,
      loader:false
    })
    
  }


  render() {
    if (this.state.loader) {
      return <Loading />
    }
    if(this.state.mail_validate == "Code valide") {
      return <MailIsOk />
    }

    return (
      <div style={{background: 'linear-gradient(#e66465, #9198e5)', height:'100vh', width:'100%', position:'absolute'}}>
        <div style={{textAlign:'center', marginTop:'25vh'}}>
          <h1 style={{color:'white', fontSize:'40px'}}>Confirmation de votre e-mail</h1>
          <br />
          <br/>
          
        <style dangerouslySetInnerHTML={{ __html: style }} />
          <style dangerouslySetInnerHTML={{ __html: styles }} />
            <input className="code code1 input is-danger" type="number" placeholder="0" value={this.state.input1} onChange={this.onChangeOne}/>
            <input className="code code2 input is-danger" type="number" placeholder="0" value={this.state.input2} onChange={this.onChangeTwo}/>
            <input className="code code3 input is-danger" type="number" placeholder="0" value={this.state.input3} onChange={this.onChangeThree}/>
            <input className="code code4 input is-danger" type="number" placeholder="0" value={this.state.input4} onChange={this.onChangeFour}/>

            <a class="button is-dark is-outlined" onClick={this.confirmMail} style={{display:'flex', maxWidth:'fit-content', margin:'5% auto'}}>Valider</a>
            
            {this.state.error ? <p style={{textDecoration:'underline'}}>Le code n'est pas bon !</p> : null}
        </div>

        </div>
    )
  }

  confirmMail = () => {

    let cookies = new Cookies();
    var headers = {
      "Access-Control-Allow-Origin": '*',
      "api-token": cookies.get('CookieSpaceArt')['jwt_token'] 
    }

    const data = {
      key_mail:this.state.final_code
    }
    
    axios.post('http://www.api-jaouad93.tk/api/users/mail_validate', data, {headers: headers}).then((response) => {
      let mail_conf = {
        mail_validate: "Code valide",
      }
      cookies.set('CookieMail', JSON.stringify(mail_conf), {path : '/'});
      window.location = "/home"
    })
    .catch((error) => {
      this.setState({
        error:true,
        input1:'',
        input2:'',
        input3:'',
        input4:''
      })
    }) 
  }

  onChangeOne = (e) => {
    if (e.target.value.length <= 1) {
      this.setState({
        input1:e.target.value
      })
      document.querySelectorAll("input")[1].focus()
    }
  }

  onChangeTwo = (e) => {
    if (e.target.value.length <= 1)
      this.setState({
        input2:e.target.value
      })
      document.querySelectorAll("input")[2].focus()
  }

  onChangeThree = (e) => {
    if(e.target.value.length <= 1)
      this.setState({
        input3:e.target.value
      })
      document.querySelectorAll("input")[3].focus()
  }

  onChangeFour = (e) => {
    if(e.target.value.length <= 1)
      this.setState({
        input4:e.target.value,
      }, () => this.setState({
        final_code:this.state.input1 + this.state.input2 + this.state.input3 + this.state.input4
      }))
  }

}
