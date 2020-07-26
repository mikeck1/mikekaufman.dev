import React from 'react';
import Header from "../components/header";
import { Jumbotron, Image, Form, Button, Toast } from "react-bootstrap";
import 'firebase/firestore';
import db from '../utils/firebase';
import { PostInput } from '../components/PostInput';
import RichTextEditor from 'react-rte';

function Admin() {
    const [posts, setPosts] = React.useState([])

    const [post, setPost] = React.useState()
    const [localPost, _updateLocalPost] = React.useState(0)


    const [editorValue, setEditorValue] =
        React.useState(RichTextEditor.createValueFromString(localPost.body, 'html'));

    const handleChange = value => {
        setEditorValue(value);
        setPost(value.toString("html"));
        console.log(value._cache.html)
        updateLocalPost({ ...localPost, body: value._cache.html })
    };

    const updateLocalPost = u => {
        _updateLocalPost(u)
        console.log(u)
    }

    if (localPost === null) {
        if (post !== null)
            updateLocalPost(post)

    }

    React.useEffect(() => {
        const fetchData = async () => {
            const dbb = db.firestore()
            const data = await dbb.collection("posts").get()
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        fetchData()
    }, [])

    const onCreate = () => {
        const dbb = db.firestore()
        console.log(localPost)
        dbb.collection('posts').add({ title: localPost.title, image: localPost.image, body: localPost.body })
    }

    return (
        <>
            <Header />
            <Jumbotron>
                <Button style={{ marginBottom: "40px" }} onClick={() => db.auth().signOut()}>Sign out</Button>
                <Form onSubmit={onCreate}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="title" placeholder="Enter title" value={localPost.title} onChange={e => updateLocalPost({ ...localPost, title: e.target.value })} />
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
                        <Form.Control type="title" placeholder="Enter image URL" value={localPost.image} onChange={e => updateLocalPost({ ...localPost, image: e.target.value })} />
                        <Form.Text className="text-muted">
                            This takes an http:// ... .png, .jpg, etc.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="save" onClick={onCreate}>
                        Submit
                    </Button>
                </Form>
                {/* <input /> */}
                {posts.map(post => (
                    <div style={{ marginTop: "50px" }}>
                        <Image src={post.image} fluid rounded /><br></br>
                        {post.id}<br></br>
                        {post.title}

                        {/* <li key={post.title}>{post.title}</li>
                    {post.body} */}
                        <Toast
                            dangerouslySetInnerHTML={{
                                __html: "<div>" + post.body + "</div>"
                            }}></Toast>
                        <PostInput post={post} />
                    </div>
                ))}
            </Jumbotron>

        </>
    );
}
export default Admin;