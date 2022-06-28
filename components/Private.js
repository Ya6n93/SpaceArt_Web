import React, { Component } from 'react';
import Menu from '../components/Menu'
import styles from '../styles/style.css'

export default class Private extends Component {
  render() {
    return <div style={{textAlign:'center', marginTop:'25vh'}}>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
      <p style={{fontSize:'150%'}}> Le profil de l'utilisateur est en privée !</p>
      <Menu />
  </div>
  }
}
