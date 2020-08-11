import React from 'react';
import Header from "../components/header";
import { Jumbotron, Image, Form, Button, Accordion, Card } from "react-bootstrap";
import 'firebase/firestore';
import db from '../utils/firebase';
import { PostInput } from '../components/PostInput';
import AddProject from "../components/addProject"
// import RichTextEditor from 'react-rte';
import MEDitor from "@uiw/react-md-editor";

function Admin() {
    const [posts, setPosts] = React.useState([])

    const [post] = React.useState()
    const [localPost, _updateLocalPost] = React.useState(0)
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
    // const [editorValue, setEditorValue] =
    //     React.useState(RichTextEditor.createValueFromString(localPost.body, 'html'));

    // const handleChange = value => {
    //     setEditorValue(value);
    //     setPost(value.toString("html"));
    //     console.log(value._cache.html)
    //     _updateLocalPost({ ...localPost, body: value._cache.html })
    // };

    const updateLocalPost = u => {
        _updateLocalPost(u)
        // console.log(u)
    }

    if (localPost === null) {
        if (post !== null)
            updateLocalPost(post)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("posts").orderBy("timestamp", "desc").get()
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])

    const onCreate = () => {
        const dbb = db.firestore()
        // console.log(localPost)
        dbb.collection('posts').add({ title: localPost.title, image: localPost.image, body: body, timestamp: timestamp, timestamp_pretty: dt_pretty })
    }

    const timestamp = Date.now();
    // console.log(timestamp)
    const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);

    return (
        <>
            <Header />



            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Add a new Post
                </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Jumbotron>
                                <Form onSubmit={onCreate}>
                                    <Form.Group controlId="formBasicTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="title" placeholder="Enter title" value={localPost.title} onChange={e => updateLocalPost({ ...localPost, title: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicBody">
                                        <Form.Label>Body</Form.Label>
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
                                        {/* <Form.Control as="textarea" type="body" rows="10" placeholder="Body of Post" value={localPost.body} onChange={e => updateLocalPost({ ...localPost, body: e.target.value })} /> */}
                                        <Form.Text className="text-muted">
                                            This takes HTML
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicTitle">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control type="title" placeholder="Enter image URL" value={localPost.image} onChange={e => updateLocalPost({ ...localPost, image: e.target.value })} />
                                        <Form.Text className="text-muted">
                                            This takes an http:// ... .png, .jpg, etc.
                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" className="save" onClick={onCreate}>
                                        Submit
                                    </Button>
                                </Form>
                            </Jumbotron>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Add a new Project
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <AddProject />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>


            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Edit a Blog Post
      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Jumbotron>

                                {/* <input /> */}
                                {posts.map(post => (
                                    <div style={{ marginTop: "50px" }}>
                                        <Image src={post.image} fluid rounded /><br></br>
                                        <PostInput post={post} />
                                        <hr />
                                    </div>
                                ))}
                            </Jumbotron>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>

            <hr />
            <div style={{ textAlign: "right" }}>
                <Button variant="secondary" style={{ marginRight: "15px" }} size="sm" onClick={() => db.auth().signOut()}>Sign out</Button>
            </div>
            <hr />


        </>
    );
}
export default Admin;