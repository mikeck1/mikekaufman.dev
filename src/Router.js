import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import About from "./pages/about";
import Login from "./pages/login";
import Blog from "./pages/blog";
import { AuthProvider } from '../src/utils/auth';

const Router = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="app" id="main-component" >
                    <Switch>
                        <Route path="/" exact component={App} />
                        <Route path="/blog" exact component={Blog} />
                        <Route path="/about" exact component={About}></Route>
                        <Route path="/login" exact component={Login}></Route>
                    </Switch>
                </div >
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Router;