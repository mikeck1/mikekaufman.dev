import React from 'react';
import { Jumbotron, Image, Button } from 'react-bootstrap';
import logo from './professional_selfie.png';

const jumboStyle = {
    background: 'linear-gradient(180deg, rgba(0,0,0,1) 5%, rgba(0,0,0, .4) 30%,rgba(0,0,0, .9) 60%), url(https://miro.medium.com/max/3840/1*EEUIKPkdqR2O2lggQ4fA6g.jpeg)',
    height: "500px"

}
const imageStyle = {
    webkitBoxShadow: "1px 3px 1px #9E9E9E",
    mozBoxShadow: "1px 3px 1px #9E9E9E",
    boxShadow: "1px 3px 1px #9E9E9E",
    width: "250px", height: "230px"
}
const Banner = () => {
    return (
        <div>
            <Jumbotron varient="dark" style={jumboStyle} fluid="true">
                <Image style={imageStyle} src={logo} roundedCircle />

                <br></br><h1 style={{ color: "white", marginTop: "20px" }}>Hello, world!</h1>
                <p style={{ color: "white" }}>
                    I made this website to help share things I've learned and to meet more poeple in the tech community.
                </p>
                <p>
                    <Button variant="primary"><span role="img" aria-label="email">📧</span> Join my newsetter</Button>
                </p>
            </Jumbotron >
        </div>
    )
}
export default Banner;