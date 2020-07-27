import React from 'react';
import { Jumbotron, Image, Button, Popover, OverlayTrigger, Form } from 'react-bootstrap';
import logo from './professional_selfie.png';

import db from "../utils/firebase";

const jumboStyle = {
    background: 'linear-gradient(180deg, rgba(0,0,0,1) 5%, rgba(0,0,0, .4) 30%,rgba(0,0,0, .9) 60%), url(https://miro.medium.com/max/3840/1*EEUIKPkdqR2O2lggQ4fA6g.jpeg)',
    height: "500px"

}
const imageStyle = {

    width: "250px", height: "230px"
}
function Banner() {
    const [_email, joinNewsLetter] = React.useState([])
    const handleJoinNewsletter = () => {
        db.firestore().collection("newsletter").add({ email: _email })
    }

    // React.useEffect(()=> {
    // }, [])
    const popover = (
        <Popover id="popover">
            <center>
                <Popover.Title as="h3">Add your email</Popover.Title>
                <Popover.Content>
                    <Form >
                        <Form.Control
                            value={_email} onChange={(e) => joinNewsLetter(e.target.value)}
                        />
                    </Form>
                    <Button style={{ marginTop: "8px" }} onClick={handleJoinNewsletter} variant="primary"><span role="img" aria-label="email">📧</span> Submit</Button>
                </Popover.Content>
            </center>
        </Popover>
    );
    return (
        <div>
            <Jumbotron varient="dark" style={jumboStyle} fluid="true">
                <Image style={imageStyle} src={logo} roundedCircle />

                <br></br><h1 style={{ color: "white", marginTop: "20px" }}>Hello, world!</h1>
                <p style={{ color: "white" }}>
                    I made this website to help share things I've learned and to meet more poeple in the tech community.
                </p>
                <p>
                    <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
                        <Button variant="success">Join my newsletter</Button>
                    </OverlayTrigger>
                    <br></br>

                </p>
            </Jumbotron >
        </div>
    )
}
export default Banner;