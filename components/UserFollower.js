import React, { Component } from 'react';

// import { Container } from './styles';

class UserFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file:'https://static.jobat.be//uploadedImages/grandprofilfb.jpg'
        }    
    }
    
  render() {
      console.log(this.props.user)
      return this.props.user.map((following, key) => {
            return (
                <tbody key={key}>
                        <tr>
                          { (following.picture_url != 'empty') ?
                          <th><img className="circle_following" src={following.picture_url}/></th>
                          : <th><img className="circle_following" src={this.state.file}/></th>
                          }
                          <td> {following.firstname + " " + following.lastname} <br/>
                            </td>
                        </tr>
                </tbody>
            );
        })
    }
}
export default UserFollower
