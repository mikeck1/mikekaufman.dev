import React from 'react';
import Header from "../components/header";
import { Jumbotron, Image } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import 'firebase/firestore';
import db from '../utils/firebase';

function Posts() {
    const [posts, setPosts, post, localPost, _updateLocalPost]
        = React.useState([])

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
            const data = await dbb.collection("posts").get()
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [setPosts])

    return (
        <>
            <Header />
            {posts.map(post => (
                <Jumbotron>
                    < div style={{ marginTop: "50px" }}>
                        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
                        <div style={{ textAlign: "center" }}>
                            <LinkContainer to={"/blog/" + post.id} ><Image src={post.image} fluid rounded /></LinkContainer><br></br>
                        </div>
                        <div
                            style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                            dangerouslySetInnerHTML={{
                                __html: post.body
                            }}></div>
                        {/* <PostInput post={post} /> */}

                    </div>
                </Jumbotron >
            ))
            }


        </>
    );
}
export default Posts;