import React from 'react';
import db from '../utils/firebase';
import { Image, } from 'react-bootstrap';
import Header from "../components/header";
import MEDitor from "@uiw/react-md-editor";
import {
    useFirestoreConnect,
    isLoaded,
    isEmpty
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import 'firebase/firestore';

const BlogArticle = ({ match, location }) => {
    const projectID = match.params.projectID;
    const FirestoreQuery = {
        collection: "projects",
        doc: projectID
    };
    useFirestoreConnect(() => [FirestoreQuery]);
    const projects = useSelector(state => state.firestore.data.projects);

    if (!isLoaded(projects)) {
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
    else if (isEmpty(projects)) {
        return "Company list is empty";
    }
    return (
        <div>
            <Header />



            <div style={{ width: "95%", marginTop: "40px", paddingBottom: "40px" }}>
                <div className="row">
                    <div className="column">
                        <div style={{ position: "sticky", top: 200, textAlign: "center" }}>

                        </div>
                    </div>
                    <div className="main-article-column">
                        <div >
                            <h1 style={{ textAlign: "center" }}>{projects[projectID].title}</h1>
                            <hr />
                            <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + projects[projectID].timestamp_pretty}</h5></b>
                            <div style={{ textAlign: "center", marginBottom: "15px" }}><Image src={projects[projectID].image} fluid rounded /></div>

                            <MEDitor.Markdown source={projects[projectID].body} />

                            {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                            {/* <div
                        style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                        dangerouslySetInnerHTML={{
                            __html: projects.body
                        }}></div> */}
                            {/* <PostInput post={post} /> */}
                        </div>

                    </div>
                    <div className="column" style={{ marginTop: "200px", textAlign: "center" }}>
                        <div style={{ position: "sticky", top: 200, marginLeft: "40px" }}>
                            {/* <Image rounded width="200px" src="https://images-na.ssl-images-amazon.com/images/I/71VeUkzTJUL._SY500_.jpg"></Image> */}
                            {/* <Image rounded width="200px" src="https://riselikeair.files.wordpress.com/2017/11/244036-today-is-a-good-day-to-have-a-great-day-cute-quote.jpg?w=371&h=369"></Image> */}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default BlogArticle;