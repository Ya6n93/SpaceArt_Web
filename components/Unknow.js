import React, { Component } from 'react';
import Menu from '../components/Menu'
import styles from '../styles/style.css'

class Unknow extends Component {
  render() {
    return (
        <div style={{textAlign:'center', marginTop:'25vh'}}>
          <style dangerouslySetInnerHTML={{ __html: styles }} />
          <p style={{fontWeight:'bold', fontSize:'200px', margin:'0' }}>404</p>
            <p style={{fontSize:'150%'}}> Cette utilisateur n'existe pas.</p>
            <Menu />
        </div>
    );
  }
}

export default Unknow;