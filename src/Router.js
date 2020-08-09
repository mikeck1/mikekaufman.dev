import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';

import { AuthProvider } from '../src/utils/auth2';
import PrivateRoute from "./utils/PrivateRoute";
import ReactGA from "react-ga";

import About from "./pages/about";
import Login from "./pages/login";
import Blog from "./pages/blog";
import Admin from "./pages/admin";
import BlogArticle from "./components/blog-article";
import ProjectPage from "./pages/projectPage";
import Tracker from "./utils/tracker";

function inititalizeAnalytics() {
    ReactGA.initialize("UA-173663121-1")
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const Router = () => {

    inititalizeAnalytics()
    return (
        <AuthProvider>
            <BrowserRouter>
                <div id="main-component" >
                    <Switch>
                        <Route path="/" exact component={App} />
                        <Route path="/blog" exact component={Tracker(Blog)} />
                        <Route path="/about" exact component={Tracker(About)}></Route>
                        <Route path="/login" exact component={Tracker(Login)}></Route>
                        <Route path="/blog/:blogID" component={Tracker(BlogArticle)} />
                        <Route path="/projects/:projectID" component={Tracker(ProjectPage)} />
                        <PrivateRoute path="/admin" exact component={Admin} />
                    </Switch>
                </div >
            </BrowserRouter>
        </AuthProvider >
    );
};

export default Router;