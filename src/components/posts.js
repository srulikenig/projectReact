// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { posts } from '../js/all-details';

const style = {
    width: '100%',
    height:'120%',
    bgcolor: 'lightskyblue',
};
let user
if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'))
}
export default function Posts() {
    const [posts, setPosts] = useState()
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
    }, [])

    const nav = useNavigate()
    const clickMessage = id => {
        nav(`${id}`)
        console.log(id);
    }
    return (
        <Grid container spacing={0} columns={9} style={{ ...style}}>
            <Grid xs={3} sx={style} style={{height:'100%', ...style}} height={'100%'}>
                <List  component="nav" aria-label="mailbox folders">
                    {posts && posts.map((item, idx) => <>
                        <ListItem button onClick={()=>clickMessage(item.id)}>
                            <ListItemText primary={item.title} />
                        </ListItem>
                        <Divider />
                    </>)}
                </List>
            </Grid>
            <Grid xs={6} style={{ backgroundColor: 'lightblue', padding: '2%'}}>
                <Outlet/>
            </Grid>
        </Grid>
    );
}
