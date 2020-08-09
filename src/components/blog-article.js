import React from 'react';
import db from '../utils/firebase';
import { Image } from 'react-bootstrap';
import Header from "../components/header";
import MEDitor from "@uiw/react-md-editor";
import { Helmet } from "react-helmet";

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
        <div style={{ marginBottom: "40px" }}>
            <Helmet htmlAttributes>
                <html lang="en" />
                <title>{posts.title}</title>
                <meta name={posts.title} content={posts.title} />
            </Helmet>
            <div className={posts.title}>
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
                                        <h1>{posts.title}</h1>
                                        <hr />
                                        <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + posts.timestamp_pretty}</h5></b>
                                        <Image src={posts.image} fluid rounded /><br></br>
                                    </div>
                                    <MEDitor.Markdown source={posts.body} />
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