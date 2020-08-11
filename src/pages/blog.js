import React from 'react';
import Header from "../components/header";
import { Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import 'firebase/firestore';
import db from '../utils/firebase';
import ResponsiveTable from "../components/responsive_table";
// import marked from "marked";
// import Highlight from "../components/Highlight"
// import hljs from "highlight.js";
import MenuBar from './MenuBar'
import { useSelector } from "react-redux";
import {
    useFirestoreConnect,
    isLoaded,
    isEmpty
} from "react-redux-firebase";
import "../App.css"
import 'highlight.js/styles/vs2015.css';
const companiesFirestoreQuery = {
    collection: "posts",
    orderBy: ["timestamp", "desc"],
    limit: 50
};

function Posts() {
    useFirestoreConnect(() => [companiesFirestoreQuery]);
    const posts = useSelector(state => state.firestore.ordered.posts);
    // Show a message while todos are loading
    if (!isLoaded(posts)) {
        return (
            <div>
                <Header />
                <div style={{ textAlign: "center", marginTop: "150px" }} >
                    <Image height="270px" width="480px" src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"></Image>
                </div>
            </div>
        );
    }

    // console.log("POSTS: " + posts)
    if (posts.length > 1) {
        return (
            <div style={{ width: "100%" }}>
                <Header />

                <ResponsiveTable projects={posts} label="Post" linkLabel="blog" />
            </div >
        );
    }
    return (
        <div>
            <Header />
            <div style={{ textAlign: "center", marginTop: "150px" }} >
                <div><h3>Syncing with FireStore</h3></div>
                <Image height="270px" width="480px" src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"></Image>
            </div>
        </div>
    );

}
export default Posts;
