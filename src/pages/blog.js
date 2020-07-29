import React from 'react';
import Header from "../components/header";
import { Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import 'firebase/firestore';
import db from '../utils/firebase';
import marked from "marked";
import Highlight from "../components/Highlight"
import hljs from "highlight.js";
import "../App.css"
import 'highlight.js/styles/vs2015.css';
function Posts() {
    const [posts, setPosts, post, localPost, _updateLocalPost]
        = React.useState([])
    hljs.configure({ useBR: true });
    marked.setOptions({

        langPrefix: "hljs language-",
        highlight: function (code) {
            return hljs.highlightAuto(code, ["html", "javascript"]).value;
        }
    });

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

                                <div style={{ textAlign: "center" }}>
                                    <a href={"/blog/" + post.id}><h1>{post.title}</h1></a>
                                    <hr />
                                    <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + post.timestamp_pretty}</h5></b>
                                    <LinkContainer to={"/blog/" + post.id} ><Image src={post.image} fluid rounded /></LinkContainer><br></br>
                                </div>
                                {/* <div dangerouslySetInnerHTML={{ __html: marked(post.body) }} /> */}
                                < Highlight body={post.body} />
                                {/* <div
                                    style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                                    dangerouslySetInnerHTML={{
                                        __html: post.body
                                    }}></div> */}
                                {/* <PostInput post={post} /> */}

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
