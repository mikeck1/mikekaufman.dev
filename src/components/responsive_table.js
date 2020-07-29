import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap'
import TableTile from "./tableTile";
// import Filter from './filter';


const Responsive_table = (props) => {
    const projects = props.projects;
    const FriendTable = projects.map(note => {
        return (
            <Col
                xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }}
                lg={{ span: 6 }} xl={{ span: 4 }} key={note.id}>
                <TableTile user={note} />
            </Col>
        );
    });


    return (
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
            <br></br>
            {/* <Filter props={projects} /> */}
            <table className="table" >
                <tbody >
                    <Row gutter={40}>
                        {FriendTable}
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