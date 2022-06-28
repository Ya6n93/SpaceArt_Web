import ReactLoading from 'react-loading';
import styles from '../styles/style.css'

class Loading extends React.Component {
    render() {
        return (
            <div style={{margin:0, padding:0,display:'flex', alignItems:'center', background: 'linear-gradient(#e66465, #9198e5)', justifyContent:'center', height:'100vh'}}>
                <style dangerouslySetInnerHTML={{ __html: styles }} />
                <ReactLoading type="cylon" color="#fff" height="10%" width="10%" />
            </div>
        );
    }
}

export default Loading