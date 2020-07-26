import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../utils/firebase.js";
import { AuthContext } from "../utils/auth2.js";
import Header from "../components/header.js"
import { Button, Form, FormLabel } from "react-bootstrap";
const TestBlog = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await 
                const app.database().ref().child('posts')

                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        console.log(currentUser)
        return <Redirect to="/blog" />;

    }

    return (
        <div>
            <Header />
            <center>
                <Form onSubmit={handleLogin} style={{ marginTop: "50px" }}>
                    <h1>Admin Panel</h1>
                    <FormLabel>
                        Email
                        <input name="email" type="email" placeholder="Email" />
                    </FormLabel>
                    <FormLabel>
                        Password
                            <input name="password" type="password" placeholder="Password" />
                    </FormLabel>
                    <Button size="sm" style={{ marginLeft: "3px" }} type="submit">Log in</Button>
                </Form>
            </center>
        </div >
    );
};

export default withRouter(TestBlog);