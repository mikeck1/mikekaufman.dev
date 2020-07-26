import React from 'react';
import db from '../utils/firebase';
import { Image } from 'react-bootstrap';
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
        <div>
            <Header />

            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Image src={posts.image} fluid rounded /><br></br>
                {posts.id}<br></br>
                {posts.title}

                {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                <div
                    dangerouslySetInnerHTML={{
                        __html: posts.body
                    }}></div>
                {/* <PostInput post={post} /> */}
            </div>

        </div>
    )
}

export default BlogArticle;