import React, { Component } from 'react'
import Modal from 'react-awesome-modal'
import UserFollowing from './UserFollowing'
import axios from 'axios'

class DataFollowing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_following: false,
            number_following:'0',
            user_following: []
        }
    }

    componentDidMount() {
        this.numberFollowing(this.props.id)
    }

  render() {
    return (
            <div>
                <p  onClick={() => this.setState({modal_following:!this.state.modal_following})}
                    style={{fontSize:'50%', marginLeft:'5%'}}>
                    Abonnement : {this.state.number_following}
                </p>

                {
            this.state.modal_following ? <section>
              <Modal visible={this.state.modal_following} width="400" height="300" effect="fadeInUp" onClickAway={() => this.setState({modal_following:!this.state.modal_following})}>
                <div>
                  <h1 style={{textAlign:'center'}}>Abonnement</h1>
                  <table className="table is-fullwidth is-bordered">
                      <UserFollowing user={this.state.user_following}/>
                  </table>
                  <button className="button is-dark is-outlined button-center" onClick={() => this.setState({modal_following:!this.state.modal_following})}>Fermer</button>

                </div>
              </Modal>
            </section> : null
          }


            </div>
        );
  }


  numberFollowing = (id) => {

    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*',
      'api-token': this.props.token
    }

    axios.get('http://www.api-jaouad93.tk/api/follow/all_following_user/' + id, { headers: headers}).then((response) => {
      let size = response.data.success.following.length
      let i = 0;

      for (i; i < size; i++) {
      this.setState({
        user_following:[...this.state.user_following , response.data.success.following[i]]
      })
    }
      this.setState({
        number_following:size,
      })
    })
    .catch((error) => {
        console.log(error.response.data.error)
    })

  }



}

export default DataFollowing
