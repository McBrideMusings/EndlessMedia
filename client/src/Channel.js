import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        console.log(this.state);
        return (
            <div className="App">
                <Header />
                <header className="App-header">
                    <video muted autoPlay crossOrigin="anonymous">
                        <source src={`http://localhost:4000/channel/${this.state.videoId}`} type="video/mp4"></source>
                        <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${this.state.videoId}/caption`} default></track>
                    </video>
                    <h1>{ this.state.videoData.name }</h1>
                </header>
                <Footer />
            </div>
        )
    }
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

export default withParams(Player);