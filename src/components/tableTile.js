import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const TableTile = ({ user }) => {

    return (
        <div>
            <Card style={{ marginBottom: "8px", position: "flex" }}>
                <Card.Img style={{ width: "100%", height: "100%", position: "absolute", overflow: "hidden", objectFit: "cover" }} variant="top" src={user.image} />
                <Card.Body style={{ paddingTop: "200px" }}>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><Card.Title>{user.title}</Card.Title></ListGroupItem>
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