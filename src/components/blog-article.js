import React from 'react';
import db from '../utils/firebase';
import { Image, Jumbotron } from 'react-bootstrap';
import Header from "../components/header";
const BlogArticle = ({ match, location }) => {
    const blogID = match.params.blogID;
    const [posts, setPosts]
        = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("posts").doc(blogID).get()
            setPosts({ ...data.data(), id: data.id })
        }
        fetchData()
    }, [setPosts, blogID])
    return (
        <div style={{ width: "100%" }}>
            <Header />
            <Jumbotron>
                <div style={{ marginTop: "20px" }}>
                    <hr />
                    <h1 style={{ textAlign: "center" }}>{posts.title}</h1>
                    <hr />
                    <div style={{ textAlign: "center" }}>
                        <Image style={{ textAlign: "center" }} src={posts.image} fluid rounded />
                    </div><br></br>
                    {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                    <div style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                        dangerouslySetInnerHTML={{
                            __html: posts.body
                        }}></div>
                    {/* <PostInput post={post} /> */}
                </div>
            </Jumbotron>


        </div>
    )
}

export default BlogArticle;