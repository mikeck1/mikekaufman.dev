import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../utils/firebase.js";
import { AuthContext } from "../utils/auth2.js";
import Header from "../components/header.js"
import { Button, Form, FormLabel } from "react-bootstrap";
const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
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
        return <Redirect to="/admin" />;

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

export default withRouter(Login);
// db.auth().signInWithPopup(GoogleSignOn).then(result => {
//     const email = result.user.email
//     if (!email || email.substr(email.lastIndexOf('@')) !== '@ucsd.edu') {
//         alert("That's not a UCSD email address!")
//         return undefined
//     }

//     return db.auth().currentUser.getIdToken()
// }).then(token => {
//     console.log("LOGGING IN" + token)
//     const expiresIn = 60 * 60 * 24 * 1000 * 14;
//     const options = { maxAge: expiresIn, httpOnly: false, secure: false };
// }).catch(error => {
//     console.log("Error Logging in!")
//     console.log(error)
// })

// import { useHistory, useLocation } from 'react-router-dom'
// const Login = () => {
//     const history = useHistory()
//     return (
//         <div>
//             Login
//             <button onClick={() => db.auth().signInWithPopup(GoogleSignOn).then(result => {
//                 const email = result.user.email
//                 if (!email || email.substr(email.lastIndexOf('@')) !== '@ucsd.edu') {
//                     alert("That's not a UCSD email address!")
//                     return undefined
//                 }

//                 return db.auth().currentUser.getIdToken()
//             }).then(token => {
//                 console.log("LOGGING IN" + token)
//                 const expiresIn = 60 * 60 * 24 * 1000 * 14;
//                 const options = { maxAge: expiresIn, httpOnly: false, secure: false };

//                 if (token) {
//                     // cookies.set('sessionCookie', token, options)
//                     history.push({ pathname: '/admin', user: { token } })
//                     return token
//                 }
//             }).catch(error => {
//                 console.log("Error Logging in!")
//                 console.log(error)
//             })}>Sign In</button>
//         </div>
//     )
// }

// export default Login;





// import Auth from '../utils/auth';

// function SplashPage() {
//     const { handleSignOn } = useContext(Auth);

//     return (
//         <div className="App" style={{ height: '100vh' }}>
//             <h1 className="Logo">TritonTalk</h1>
//             <h3 className="SubText">The Virtual Library Walk</h3>
//             <div className="vertical">
//                 <button className="button" onClick={handleSignOn}>LOGIN</button>
//             </div>
//         </div>
//     );
// }

// export default SplashPage;