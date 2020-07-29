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
            <div style={{ width: "95%", marginTop: "40px" }}>
                <div class="row">
                    <div class="column">
                        <div style={{ position: "sticky", top: 200, textAlign: "center" }}>

                        </div>
                    </div>
                    <div class="main-article-column">
                        < div >

                            <div style={{ textAlign: "center" }}>
                                <h1>{posts.title}</h1>
                                <hr />
                                <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + posts.timestamp_pretty}</h5></b>
                                <Image src={posts.image} fluid rounded /><br></br>
                            </div>
                            <div
                                style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                                dangerouslySetInnerHTML={{
                                    __html: posts.body
                                }}></div>
                            {/* <PostInput post={post} /> */}

                        </div>

                    </div>
                    <div class="column" style={{ marginTop: "200px", textAlign: "center" }}>
                        <div style={{ position: "sticky", top: 200, marginLeft: "40px" }}>
                            {/* <Image rounded width="200px" src="https://images-na.ssl-images-amazon.com/images/I/71VeUkzTJUL._SY500_.jpg"></Image> */}
                            <Image rounded width="200px" src="https://riselikeair.files.wordpress.com/2017/11/244036-today-is-a-good-day-to-have-a-great-day-cute-quote.jpg?w=371&h=369"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogArticle;