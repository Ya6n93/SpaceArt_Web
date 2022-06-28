import React, { Component } from 'react';
import style from '../styles/style.scss'
import styles from '../styles/style.css'
import Menu from './Menu'
// import { Container } from './styles';

export default class MailIsOk extends Component {
  render() {
    return <div style={{textAlign:'center', marginTop:'40vh'}}>
      
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
        <p>Vous avez déjà confirmer votre adresse mail.</p> <br/>
        <a href="/home" className="button is-danger">Retourner sur son profil</a>
        <Menu />
    </div>
  }
}
