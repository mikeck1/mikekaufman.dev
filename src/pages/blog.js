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
            <Jumbotron>
                {posts.map(post => (
                    <LinkContainer to={"/blog/" + post.id} >
                        < div style={{ textAlign: "center", marginTop: "50px" }}>
                            <Image src={post.image} fluid rounded /><br></br>
                            {post.id}<br></br>
                            {post.title}

                            {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.body
                                }}></div>
                            {/* <PostInput post={post} /> */}
                        </div></LinkContainer>

                ))
                }
            </Jumbotron >

        </>
    );
}
export default Posts;