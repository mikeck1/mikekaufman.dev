import React from 'react'
import db from '../utils/firebase';
import ResponsiveTable from "./responsive_table";
import {
    useFirestoreConnect,
    isLoaded,
    isEmpty
} from "react-redux-firebase";
import 'firebase/firestore';
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
const companiesFirestoreQuery = {
    collection: "projects",
    orderBy: ["timestamp", "desc"],
    limit: 50
};

const Projects = () => {
    useFirestoreConnect(() => [companiesFirestoreQuery]);
    const posts = useSelector(state => state.firestore.ordered.projects);
    // Show a message while todos are loading
    if (!isLoaded(posts)) {
        return (
            <div>
                <div style={{ textAlign: "center", marginTop: "150px" }} >
                    <Image height="270px" width="480px" src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"></Image>
                </div>
            </div>
        );
    }
    // const [projects, setProjects]
    //     = React.useState([])
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const dbb = db.firestore()
    //         const data = await dbb.collection("projects").orderBy("timestamp", "desc").get()
    //         setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    //     }
    //     fetchData()
    // }, [setProjects])

    return (
        <div>
            <ResponsiveTable projects={posts} label="Project" linkLabel="projects" />
        </div >
    )
}


export default Projects;