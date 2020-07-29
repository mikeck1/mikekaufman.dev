import React from 'react'
import db from '../utils/firebase';
import ResponsiveTable from "./responsive_table";

const Projects = (props) => {
    const [projects, setProjects]
        = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("projects").orderBy("timestamp", "desc").get()
            setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [setProjects])

    return (
        <div>
            <ResponsiveTable projects={projects} />
        </div >
    )
}


export default Projects;