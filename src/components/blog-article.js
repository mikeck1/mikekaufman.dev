import React from 'react';
import db from '../utils/firebase';
import { Image } from 'react-bootstrap';
import Header from "../components/header";
import MEDitor from "@uiw/react-md-editor";
import { Helmet } from "react-helmet";
import {
    useFirestoreConnect,
    isLoaded,
    isEmpty
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import 'firebase/firestore';

function BlogArticle({ match, location }) {
    const blogID = match.params.blogID;
    const FirestoreQuery = {
        collection: "posts",
        doc: blogID
    };
    useFirestoreConnect(() => [FirestoreQuery]);
    // const posts = useSelector(state => state.firestore.ordered.posts);
    const posts = useSelector(state => state.firestore.data.posts);

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
    // Show a message if there are no todos
    else if (isEmpty(posts)) {
        return "Company list is empty";
    }
    window.scrollTo(0, 0)
    return (

        <div style={{ marginBottom: "40px" }}>

            <Helmet htmlAttributes>
                <html lang="en" />
                <title>{posts[blogID].title}</title>
                <meta name={posts[blogID].title} content={posts.title} />
            </Helmet>
            <div className={posts[blogID].title}>
                <div style={{ width: "100%" }}>
                    <Header />
                    <div style={{ width: "95%", marginTop: "40px" }}>
                        <div className="row">
                            <div className="column">
                                <div style={{ position: "sticky", top: 200 }}>

                                </div>
                            </div>
                            <div className="main-article-column">
                                < div >

                                    <div style={{}}>
                                        <h1>{posts[blogID].title}</h1>
                                        <hr />
                                        <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + posts[blogID].timestamp_pretty}</h5></b>
                                        <Image src={posts[blogID].image} fluid rounded /><br></br>
                                    </div>
                                    <MEDitor.Markdown source={posts[blogID].body} />
                                </div>

                            </div>
                            <div className="column" style={{ marginTop: "200px", textAlign: "center" }}>
                                <div style={{ position: "sticky", top: 200, marginLeft: "40px" }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>

    )
}

export default BlogArticle;