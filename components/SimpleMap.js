import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div style={{border:'1px solid red', borderWidth:'10px', borderRadius:'50%'}} onClick={() => console.log("ok")}>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 17
  };
 


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '400px', width: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBzAxWvHFo9MiNTDInWvgwYVEDHLatq7GQ" }}
          defaultCenter={this.props.data}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.lat}
            lng={this.props.lon}
            text=""
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;