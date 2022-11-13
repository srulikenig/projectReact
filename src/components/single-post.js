import { Badge, Chip, Stack, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';

function SinglePost() {
    const [post, setPost] = useState("")
    const [comm, setComm] = useState(false)
    const [commens, setCommens] = useState()
    const { postId } = useParams()
    console.log(postId);
    useEffect(() => {
        setComm(false)
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setPost(data))

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then((response) => response.json())
            .then((data) => setCommens(data))


    }, [postId])

    // console.log(commens.length);
    return (
        <React.Fragment>
            <div style={{ padding: '0 6px 0 ', textAlign: 'justify' }}>{post.body}</div>
            <Badge badgeContent={5} color="secondary" style={{ margin: '15px 0' }}>
                <Button
                    variant={comm ? "outlined" : 'contained'}
                    onClick={() => setComm(!comm)}>
                    {comm ? 'Hide comments' : 'Show comments'}</Button>
            </Badge>



            {comm && commens.map((item, idx) =>
                <div style={{ padding: '10px 20px 0 ', textAlign: 'justify' }}>
                    <Divider textAlign="left">
                        <Chip label={item.name} />
                    </Divider>
                    {item.body}
                    <br />
                    <br />
                </div>)}
        </React.Fragment>
    );
}

export default SinglePost;