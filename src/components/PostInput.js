import React from 'react'
import db from "../utils/firebase"
import { Button } from "react-bootstrap"
export const PostInput = ({ post }) => {
    const [title, setTitle] = React.useState(post.title)
    const onUpdate = () => {
        db.firestore().collection("posts").doc(post.id).set({ ...post, title })
    }

    const onDelete = () => {
        db.firestore().collection("posts").doc(post.id).delete()
    }
    return (
        <>
            <input value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <Button onClick={onUpdate}>Update</Button>
            <Button onClick={onDelete}>Delete</Button>
        </>
    );
};