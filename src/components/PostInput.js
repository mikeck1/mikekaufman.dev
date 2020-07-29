import React from 'react'
import RichTextEditor from 'react-rte';
import db from "../utils/firebase"
import { Button, Jumbotron, Form } from "react-bootstrap"
export const PostInput = ({ post }) => {
    // const [title, setTitle] = React.useState(post.title)
    // const onUpdate = () => {
    //     db.firestore().collection("posts").doc(post.id).set({ ...post, title })
    // }

    const onDelete = () => {
        db.firestore().collection("posts").doc(post.id).delete()
    }
    const [project, setProject] = React.useState(post)
    const [localProject, _updateLocalProject] = React.useState(post)


    const [editorValue, setEditorValue] =
        React.useState(RichTextEditor.createValueFromString(post.body, 'html'));

    const handleChange = value => {
        setEditorValue(value);
        setProject(value.toString("html"));
        console.log(value._cache.html)
        updateLocalPost({ ...localProject, body: value._cache.html })
        console.log({ title: localProject.title, image: localProject.image, body: localProject.body })
    };

    const updateLocalPost = u => {
        _updateLocalProject(u)
        console.log(u)
    }
    if (localProject === null) {
        if (project !== null)
            updateLocalPost(project)
    }

    const onCreate = () => {
        const dbb = db.firestore()
        console.log(localProject)
        dbb.collection('posts').doc(localProject.id).set({ title: localProject.title, image: localProject.image, body: localProject.body, id: localProject.id, timestamp: timestamp, timestamp_pretty: dt_pretty })
    }

    const timestamp = Date.now();
    console.log(timestamp)
    const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);


    return (
        <>
            <div style={{ textAlign: "right", marginTop: "8px" }}>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </div>
            <Jumbotron>
                <Form onSubmit={onCreate}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" defaultValue={post.title} placeholder="Enter title" value={localProject.title} onChange={e => updateLocalPost({ ...localProject, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formBasicBody">
                        <Form.Label>Body</Form.Label>
                        <RichTextEditor
                            defaultValue={post.body}
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
                        {/* <Form.Control as="textarea" type="body" rows="10" defaultValue={post.body} value={localProject.body} onChange={e => updateLocalPost({ ...localProject, body: e.target.value })} />
                        <Form.Text className="text-muted">
                            This takes HTML
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="title" defaultValue={post.image} value={localProject.image} onChange={e => updateLocalPost({ ...localProject, image: e.target.value })} />
                        <Form.Text className="text-muted">
                            This takes an http:// ... .png, .jpg, etc.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="save" onClick={onCreate}>
                        Submit
                                    </Button>
                </Form>
            </Jumbotron>
        </>
    );
};