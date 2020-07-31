import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const TableTile = ({ user }) => {
    // let titleLimited = user.title.substring(0, 46);
    // if (user.title.charAt(45) === " ") {
    //     titleLimited = titleLimited.substring(0, 45) + "..."
    // }
    //     else {
    //     titleLimited = titleLimited + ".."
    // }

    return (
        <div>
            <Card style={{ marginBottom: "8px", position: "flex" }}>
                <Card.Img style={{ width: "100%", height: "100%", position: "absolute", overflow: "hidden", objectFit: "cover" }} variant="top" src={user.image} />
                <Card.Body style={{ marginTop: "100px", padding: "20px" }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><Card.Title style={{ textAlign: "left", fontFamily: "monospace", height: "40px" }}><b>{user.title}</b></Card.Title></ListGroupItem>
                        <ListGroupItem>
                            <LinkContainer to={"/projects/" + user.id} ><Button variant="warning">View Project</Button></LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TableTile;