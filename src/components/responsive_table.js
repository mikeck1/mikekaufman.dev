import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap'
import TableTile from "./tableTile";
// import Filter from './filter';


function Responsive_table(props) {
    const projects = props.projects;
    const [curProjects, setCurProjects] = React.useState(projects)

    const search = (search_term) => {
        const nextProjects = projects.map((p) => {
            if (p.body.toLowerCase().includes(search_term.toLowerCase())) {
                return p
            }
        }).filter(function (x) {
            return x !== undefined
        });
        setCurProjects(nextProjects)
    }


    return (
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
            <br></br>
            <div>
                {props.label === "Post" ? (<Form>
                    <Form.Group controlId="search.input">
                        <Form.Label>Search</Form.Label>
                        <Form.Control type="search" placeholder="Enter a search.." value={curProjects.search} onChange={e => search(e.target.value)} />
                    </Form.Group>
                </Form>) : (<div></div>)}
                {/* <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <Button variant="outline-primary">Primary</Button>{' '}
                    <Button variant="outline-secondary">Secondary</Button>{' '}
                    <Button variant="outline-success">Success</Button>{' '}
                    <Button variant="outline-warning">Warning</Button>{' '}
                    <Button variant="outline-danger">Danger</Button>{' '}
                    <Button variant="outline-info">Info</Button>{' '}
                    <Button variant="outline-dark">Dark</Button>
                </div> */}
            </div>
            {/* <Filter props={projects} /> */}
            <table className="table" >
                <tbody >
                    <Row gutter={40}>
                        {curProjects.map(note => {
                            return (
                                <Col
                                    xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}
                                    lg={{ span: 6 }} xl={{ span: 4 }} key={note.id}>
                                    <TableTile user={note} label={props.label} linkLabel={props.linkLabel} key={note.id} />
                                </Col>
                            );
                        })}
                    </Row>
                </tbody>
            </table>
        </div>
    );
};

Responsive_table.propTypes = {
    friends: PropTypes.array,
    onDeleteFriend: PropTypes.func,
    onOpenEditFriendModal: PropTypes.func
};

export default Responsive_table;