import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, ButtonGroup, Badge } from 'react-bootstrap'
import TableTile from "./tableTile";
// import Filter from './filter';


function Responsive_table(props) {
    const projects = props.projects;
    const [curProjects, setCurProjects] = React.useState(projects)

    const search = (search_term) => {
        setTabs(initalTabs)
        const nextProjects = projects.map((p) => {
            if (p.body.toLowerCase().includes(search_term.toLowerCase())) {
                return p
            }
        }).filter(function (x) {
            return x !== undefined
        });
        setCurProjects(nextProjects)
    }

    const searchT = () => {
        let IN_ALL_TABS = true
        const nextProjects = projects.map((p) => {
            IN_ALL_TABS = true
            let ADDED_TAB = false
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].state) {
                    if (p.body.toLowerCase().includes(tabs[i].value.toLowerCase())) {
                        ADDED_TAB = true

                    }
                    else {
                        IN_ALL_TABS = false
                    }
                }
                // if (ADDED_TAB === true) {
                //     break;
                // }
            }
            if (IN_ALL_TABS) {
                return p
            }
        }).filter(function (x) {
            return x !== undefined
        });
        if (IN_ALL_TABS === true) {
            setCurProjects(projects)
        }
        else {
            setCurProjects(nextProjects)
        }
    }
    const initalTabs = [{ state: false, value: "Python" }, { state: false, value: "Swift" }, { state: false, value: "React" }, { state: false, value: "Redux" }, { state: false, value: "Firebase" }, { state: false, value: "C/C++" }, { state: false, value: "Hardware" }]
    const [tabs, setTabs] = React.useState(initalTabs);

    function handleTabs(change) {
        var newTabs = tabs
        newTabs[change].state = !(tabs[change].state)
        setTabs(newTabs)
        searchT()
    }
    return (
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>

            <br></br>
            {props.label === "Project" ? (<h2><b> <Badge variant="dark"><Badge variant="light">{projects.length} </Badge> Projects</Badge></b></h2>) : (<div></div>)}
            <div>
                {props.label === "Post" ? (
                    <div style={{ textAlign: "center" }}>
                        <Form>
                            <Form.Group controlId="search.input">
                                <Form.Label><h3>Search</h3></Form.Label>
                                <Form.Control type="search" placeholder="Enter a search.." value={curProjects.search} onChange={e => search(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <>
                            {tabs.map((tab, index) => {
                                return (<Button active={tab.state} onClick={e => handleTabs(index)} variant="light"><b>{tab.value} </b></Button>);
                            })}
                        </>
                    </div>
                ) : (<div></div>)}
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                </div>
            </div>
            {/* <Filter props={projects} /> */}
            <table className="table" >
                <tbody >
                    <Row gutter={40}>
                        {curProjects.map(note => {
                            return (
                                <Col
                                    xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 6 }}
                                    lg={{ span: 4 }} xl={{ span: 3 }} key={note.id}>
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