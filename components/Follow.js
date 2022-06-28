import React, { Component } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
library.add(faHeart, faHeartBroken)

class Follow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow:false
        }
    }

    componentDidMount() {
        this.checkFollow(this.props.id)
    }

  render() {
    return (
        <div>
            {
                this.state.follow == false && this.checkId() == 0 ? 
                <button className="button is-success is-outlined" onClick={() => this.addFollow(this.props.id)} style={{marginTop:'5%'}}><FontAwesomeIcon icon='heart' style={{marginRight:'7.5%'}}/>Suivre</button>
                : this.state.follow == true && this.checkId() == 0 ?
                <button className="button is-success" onClick={() => this.stopFollow(this.props.id)} style={{marginTop:'5%'}}><FontAwesomeIcon icon='heart-broken' style={{marginRight:'7.5%'}}/>Ne plus suivre</button>
                : null
            }
          </div>
    )
  }

  checkId = () => {
    if ( this.props.id == this.props.id_user ) {
      return (1);
    } else {
      return (0);
    }
}

addFollow = (id) => {
    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*',
      'api-token': this.props.token
    }
    axios.get('http://www.api-jaouad93.tk/api/follow/newfollowing/' + id, {headers : headers}).then((response) => {
        this.setState({
        follow:true
      })
    })
    .catch((error) => {
      console.log(error.response.data);
    })

  }

  stopFollow(id) {

    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*',
      'api-token': this.props.token
    }

    axios.delete('http://www.api-jaouad93.tk/api/follow/unfollowing/' + id, {headers : headers}).then((response) => {
      this.setState({
        follow:false
      })
      this.numberFollower(id)
    })
    .catch((error) => {
      console.log(error.response.data);
    })

  }

  checkFollow = (id) => {
    var headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": '*',
      'api-token': this.props.token
    }
      axios.get('http://www.api-jaouad93.tk/api/follow/follow_or_not/' + id, { headers: headers}).then((response) => {
          this.setState({
          follow:(response.data == "true") ? true : false
        })
        
      })
      .catch((error) => {
        console.log(error.response.data);
      })
}


}

export default Follow;