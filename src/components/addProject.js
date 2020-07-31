import React from 'react';
import { Jumbotron, Image, Form, Button } from "react-bootstrap";
import 'firebase/firestore';
import db from '../utils/firebase';
import { ProjectInput } from '../components/projectInput';
import MEDitor from "@uiw/react-md-editor";
// import RichTextEditor from 'react-rte';
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

function AddProject() {
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
    const [body, setBody] = React.useState(mkdStr);
    const [projects, setProjects] = React.useState([])

    const [project, setProject] = React.useState()
    const [localProject, _updateLocalProject] = React.useState(0)

    // // const [editorState, setEditor] = React.useState()
    // let editorState = EditorState.createEmpty()

    // const [editorValue, _setEditorValue] =
    //     React.useState(RichTextEditor.createValueFromString(localProject.body, 'html'));

    const handleChange = value => {
        setProject(value.toString("html"));
        console.log(value._cache.html)
        updateLocalPost({ ...localProject, body: value._cache.html })
    };

    const updateLocalPost = u => {
        _updateLocalProject(u)
        console.log(u)
    }

    // const setEditorValue = u => {
    //     _setEditorValue(u)
    //     console.log(u)
    // }

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
        const timestamp = Date.now();
        // this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        const dbb = db.firestore()
        console.log(localProject)
        dbb.collection('projects').add({ title: localProject.title, image: localProject.image, body: body, timestamp: timestamp, timestamp_pretty: dt_pretty })
    }

    // const onEditorStateChange = e_state => {
    //     const timestamp = Date.now();
    //     // this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    //     const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    //     // console.log({ title: "mkkj", image: "kl", body: draftToHtml(convertToRaw(editorState.getCurrentContent())), timestamp: timestamp, timestamp_pretty: dt_pretty });
    //     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    //     // console.log(draftToHtml(editorState))
    //     editorState = e_state;

    // };

    const timestamp = Date.now();
    console.log(timestamp)
    const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);

    // const date_pretty = dt_pretty.substring(0, 10);
    // const time_pretty = dt_pretty.substring(13, 23);
    return (
        <>
            <Jumbotron>
                <Form onSubmit={onCreate}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" placeholder="Enter title" value={localProject.title} onChange={e => updateLocalPost({ ...localProject, title: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formBasicBody">
                        {/* <Form.Label>Body</Form.Label>
                        <Editor
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                        /> */}
                        <div className="container">
                            <MEDitor height={200} value={body} onChange={setBody} />
                            <div style={{ padding: "50px 0 0 0" }} />
                            <MEDitor.Markdown source={body} />
                        </div>
                        {/* <RichTextEditor
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