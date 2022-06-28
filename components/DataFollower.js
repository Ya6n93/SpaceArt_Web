import React, { Component } from 'react';
import Modal from 'react-awesome-modal'
import UserFollower from './UserFollower'
import axios from 'axios'

class DataFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_follower: false,
            number_follower: '0',
            user_follower:[]
        }
    }

    componentDidMount() {
        this.numberFollower(this.props.id)
    }

  render() {
    return (
            <div>
                <p  onClick={() => this.setState({modal_follower:!this.state.modal_follower})} 
                    style={{fontSize:'50%'}}>
                        Abonné : {this.state.number_follower}
                </p>
                {
            this.state.modal_follower ? <section>
              <Modal visible={this.state.modal_follower} width="400" height="300" effect="fadeInUp" onClickAway={() => this.setState({modal_follower:!this.state.modal_follower})}>
              <div>
                  <h1 style={{textAlign:'center'}}>Abonnés</h1>
                  <table className="table is-fullwidth is-bordered">
                      <UserFollower user={this.state.user_follower}/>
                  </table>
                  <button className="button is-dark is-outlined button-center" onClick={() => this.setState({modal_follower:!this.state.modal_follower})}>Fermer</button>

                </div>
              </Modal>
            </section> : null
          }
            </div>
        
        );
  }

  numberFollower = (id) => {

    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*',
      'api-token': this.props.token
    }

    axios.get('http://www.api-jaouad93.tk/api/follow/all_followers_user/' + id, { headers: headers}).then((response) => {
        let size = response.data.success.followers.length
        

        for (let j = 0; j < size; j++) {
            this.setState({
              user_follower:[...this.state.user_follower , response.data.success.followers[j]]
            })
          }

        this.setState({
            number_follower:response.data.success.followers.length
        })
        return 0;
    })
    .catch((error) => {
        console.log(error.response.data.error)
    })

  }

}

export default DataFollower
