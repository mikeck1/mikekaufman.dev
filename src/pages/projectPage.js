import React from 'react';
import db from '../utils/firebase';
import { Image, Jumbotron } from 'react-bootstrap';
import Header from "../components/header";
import MEDitor from "@uiw/react-md-editor";
const BlogArticle = ({ match, location }) => {
    const projectID = match.params.projectID;
    const [projects, setProjects]
        = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("projects").doc(projectID).get()
            setProjects({ ...data.data(), id: data.id })
        }
        fetchData()
    }, [setProjects, projectID])
    return (
        <div>
            <Header />



            <div style={{ width: "95%", marginTop: "40px", paddingBottom: "40px" }}>
                <div class="row">
                    <div class="column">
                        <div style={{ position: "sticky", top: 200, textAlign: "center" }}>

                        </div>
                    </div>
                    <div class="main-article-column">
                        <div >
                            <h1 style={{ textAlign: "center" }}>{projects.title}</h1>
                            <hr />
                            <b><h5 style={{ textAlign: "center" }}>{"Written by Michael Kaufman on " + projects.timestamp_pretty}</h5></b>
                            <div style={{ textAlign: "center", marginBottom: "15px" }}><Image src={projects.image} fluid rounded /></div>

                            <MEDitor.Markdown source={projects.body} />

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
                    <div class="column" style={{ marginTop: "200px", textAlign: "center" }}>
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