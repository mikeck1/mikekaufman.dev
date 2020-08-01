import React from 'react';
import Header from "../components/header";
import { Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import 'firebase/firestore';
import db from '../utils/firebase';
// import marked from "marked";
// import Highlight from "../components/Highlight"
// import hljs from "highlight.js";
import "../App.css"
import 'highlight.js/styles/vs2015.css';
import MEDitor from "@uiw/react-md-editor";
function Posts() {
    const [posts, setPosts, post, localPost, _updateLocalPost]
        = React.useState([])
    // hljs.configure({ useBR: true });
    // marked.setOptions({

    //     langPrefix: "hljs language-",
    //     highlight: function (code) {
    //         return hljs.highlightAuto(code, ["html", "javascript"]).value;
    //     }
    // });

    const updateLocalPost = u => {
        _updateLocalPost(u)
        console.log(u)
    }

    if (localPost === null) {
        if (post !== null)
            updateLocalPost(post)

    }


    React.useEffect(() => {

        const fetchData = async () => {
            const dbb = db.firestore()

            const data = await dbb.collection("posts").orderBy("timestamp", "desc").get()

            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }


        fetchData()
    }, [setPosts])



    return (
        <div style={{ width: "100%" }}>
            <Header />
            <div style={{ width: "95%" }}>
                <div class="row">
                    <div class="column">

                    </div>
                    <div class="main-column">
                        {posts.map(post => (
                            < div >

                                <div style={{ marginBottom: "100px", marginTop: "60px" }}>
                                    <a href={"/blog/" + post.id}><h2>{post.title}</h2></a>
                                    <hr />
                                    <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + post.timestamp_pretty}</h5></b>
                                    <LinkContainer to={"/blog/" + post.id} ><Image src={post.image} fluid rounded /></LinkContainer><br></br>
                                </div>
                                {/* <MEDitor.Markdown source={post.body} /> */}

                            </div>
                        ))
                        }
                    </div>
                    <div class="column">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Posts;
