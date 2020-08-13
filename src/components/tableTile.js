import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const TableTile = ({ user, label, linkLabel }) => {

    return (
        <div>
            <Card style={{ marginBottom: "8px", position: "flex", textAlign: "center" }}>
                <Card.Img style={{ width: "100%", height: "100%", position: "absolute", overflow: "hidden", objectFit: "cover" }} variant="top" src={user.image} />
                <Card.Body style={{ marginTop: "200px", paddingLeft: "20px", paddingRight: "20px" }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem style={{ backgroundColor: "rgba(255, 255, 255, 0.83)" }}><Card.Title style={{ textAlign: "left", height: "69px", opacity: 1, overflow: "hidden" }}><b><LinkContainer style={{ color: "black" }} to={"/" + linkLabel + "/" + user.id}><a style={{ color: "black" }} href={"/" + linkLabel + "/" + user.id}>{user.title}</a></LinkContainer></b></Card.Title></ListGroupItem>
                        <ListGroupItem style={{ backgroundColor: "transparent" }}>
                            <LinkContainer to={"/" + linkLabel + "/" + user.id} ><Button size="lg" variant="warning">View {label}</Button></LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TableTile;