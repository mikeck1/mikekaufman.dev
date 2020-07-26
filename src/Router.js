import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';

import { AuthProvider } from '../src/utils/auth2';
import PrivateRoute from "./utils/PrivateRoute";

import About from "./pages/about";
import Login from "./pages/login";
import Blog from "./pages/blog";
import Admin from "./pages/admin";
import BlogArticle from "./components/blog-article";

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
                        <Route path="/blog/:blogID" component={BlogArticle} />
                        <PrivateRoute path="/admin" exact component={Admin} />
                    </Switch>
                </div >
            </BrowserRouter>
        </AuthProvider >
    );
};

export default Router;