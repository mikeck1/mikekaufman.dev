import React from 'react';
import db from '../utils/firebase';
import { Image, Jumbotron } from 'react-bootstrap';
import Header from "../components/header";
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

            <div >
                <Jumbotron fluid>
                    <h1 style={{ textAlign: "center" }}>{projects.title}</h1>
                    <div style={{ textAlign: "center", marginBottom: "15px" }}><Image src={projects.image} fluid rounded /></div>



                    {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                    <div
                        style={{ width: "100%", height: "100%", overflow: "hidden", objectFit: "cover" }}
                        dangerouslySetInnerHTML={{
                            __html: projects.body
                        }}></div>
                    {/* <PostInput post={post} /> */}
                </Jumbotron>
            </div>

        </div>
    )
}

export default BlogArticle;