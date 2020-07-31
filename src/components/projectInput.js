import React from 'react'
// import RichTextEditor from 'react-rte';
import db from "../utils/firebase"
import { Button, Jumbotron, Form } from "react-bootstrap"
import MEDitor from "@uiw/react-md-editor";

// import EditorConvertToHTML from "../components/richTextEditor"
export const ProjectInput = ({ post }) => {

    const mkdStr = `# Markdown Editor for React

**Hello world!!!**

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MEDitor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
\`\`\`
`;
    const [body, setBody] = React.useState(post.body);
    const onDelete = () => {
        db.firestore().collection("projects").doc(post.id).delete()
    }
    const [project, setProject] = React.useState(post)
    const [localProject, _updateLocalProject] = React.useState(post)


    // const [editorValue, setEditorValue] =
    //     React.useState(RichTextEditor.createValueFromString(post.body, 'html'));

    // const handleChange = value => {
    //     // setEditorValue(value);
    //     setProject(value.toString("html"));
    //     console.log(value._cache.html)
    //     updateLocalPost({ ...localProject, body: value._cache.html })
    //     console.log({ title: localProject.title, image: localProject.image, body: localProject.body })
    // };

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
        dbb.collection('projects').doc(localProject.id).set({ title: localProject.title, image: localProject.image, body: body, id: localProject.id, timestamp: timestamp, timestamp_pretty: dt_pretty })
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
                        <div className="container">
                            <MEDitor height={200} value={body} onChange={setBody} />
                            <div style={{ padding: "50px 0 0 0" }} />
                            <MEDitor.Markdown source={body} />
                        </div>
                        {/* <div style={{ backgroundColor: "white" }}>
                            <EditorConvertToHTML body={post} callback={onCreate} onChange={handleChange} />
                        </div> */}
                        {/* <RichTextEditor
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
                        /> */}
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





// import React from 'react'
// import db from "../utils/firebase"
// import { Button } from "react-bootstrap"
// export const ProjectInput = ({ project }) => {
//     const [title, setTitle] = React.useState(project.title)
//     const onUpdateTitle = () => {
//         db.firestore().collection("projects").doc(project.id).set({ ...project, title })
//     }

//     const onDelete = () => {
//         db.firestore().collection("projects").doc(project.id).delete()
//     }
//     return (
//         <>
//             <input value={title} onChange={(e) => { setTitle(e.target.value) }} />
//             <Button onClick={onUpdateTitle}>Update</Button>
//             <Button onClick={onDelete}>Delete</Button>
//         </>
//     );
// };