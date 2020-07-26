import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import About from "./pages/about";
import Login from "./pages/login";
import Blog from "./pages/blog";
import Admin from "./pages/admin";
import { AuthProvider } from '../src/utils/auth2';
import PrivateRoute from "./utils/PrivateRoute";

const Router = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <div id="main-component" >
                    <Switch>
                        <Route path="/" exact component={App} />
                        <Route path="/blog" exact component={Blog} />
                        <Route path="/about" exact component={About}></Route>
                        <Route path="/login" exact component={Login}></Route>
                        <PrivateRoute path="/admin" exact component={Admin} />
                    </Switch>
                </div >
            </BrowserRouter>
        </AuthProvider >
    );
};

export default Router;