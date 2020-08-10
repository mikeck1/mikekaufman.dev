import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const TableTile = ({ user, label, linkLabel }) => {

    return (
        <div>
            <Card style={{ marginBottom: "8px", position: "flex" }}>
                <Card.Img style={{ width: "100%", height: "100%", position: "absolute", overflow: "hidden", objectFit: "cover" }} variant="top" src={user.image} />
                <Card.Body style={{ marginTop: "100px", padding: "20px", opacity: .85 }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><Card.Title style={{ textAlign: "left", height: "40px", opacity: 1 }}><b>{user.title}</b></Card.Title></ListGroupItem>
                        <ListGroupItem>
                            <LinkContainer to={"/" + linkLabel + "/" + user.id} ><Button variant="warning">View {label}</Button></LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TableTile;