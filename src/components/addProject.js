import React from 'react';
import Header from "../components/header";
import { Jumbotron, Image, Form, Button, Toast, Accordion, Card } from "react-bootstrap";
import 'firebase/firestore';
import db from '../utils/firebase';
import { ProjectInput } from '../components/projectInput';
import RichTextEditor from 'react-rte';

function AddProject() {
    const [projects, setProjects] = React.useState([])

    const [project, setProject] = React.useState()
    const [localProject, _updateLocalProject] = React.useState(0)


    const [editorValue, setEditorValue] =
        React.useState(RichTextEditor.createValueFromString(localProject.body, 'html'));

    const handleChange = value => {
        setEditorValue(value);
        setProject(value.toString("html"));
        console.log(value._cache.html)
        updateLocalPost({ ...localProject, body: value._cache.html })
    };

    const updateLocalPost = u => {
        _updateLocalProject(u)
        console.log(u)
    }

    if (localProject === null) {
        if (project !== null)
            updateLocalPost(project)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("projects").get()
            setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])

    const onCreate = () => {
        const dbb = db.firestore()
        console.log(localProject)
        dbb.collection('projects').add({ title: localProject.title, image: localProject.image, body: localProject.body })
    }

    return (
        <>
            <Jumbotron>
                <Form onSubmit={onCreate}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" placeholder="Enter title" value={localProject.title} onChange={e => updateLocalPost({ ...localProject, title: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formBasicBody">
                        <Form.Label>Body</Form.Label>
                        <RichTextEditor
                            value={editorValue}
                            onChange={handleChange}
                            required
                            id="body-text"
                            name="bodyText"
                            type="string"
                            multiline
                            variant="filled"
                            style={{ minHeight: 410 }}
                        />
                        {/* <Form.Control as="textarea" type="body" rows="10" placeholder="Body of Post" value={localPost.body} onChange={e => updateLocalPost({ ...localPost, body: e.target.value })} />
                                        <Form.Text className="text-muted">
                                            This takes HTML
                                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="title" placeholder="Enter image URL" value={localProject.image} onChange={e => updateLocalPost({ ...localProject, image: e.target.value })} />
                        <Form.Text className="text-muted">
                            This takes an http:// ... .png, .jpg, etc.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="save" onClick={onCreate}>
                        Submit
                    </Button>

                </Form>
                {/* <input /> */}
                <hr />
                {projects.map(project => (
                    <div style={{ marginTop: "50px" }}>
                        <Image src={project.image} fluid rounded /><br></br>
                        <ProjectInput post={project} />
                        <hr />
                    </div>

                ))}
            </Jumbotron>


        </>
    );
}
export default AddProject;