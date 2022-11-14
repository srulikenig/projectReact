import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Pagination } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Albums() {
    const [albums, setAlbums] = useState()
    const [showPhotos, setShowPhotos] = useState(false)
    const [albumNum, setAlbumNum] = useState(0)
    const [photosNum, setPhotosNum] = useState(0)
    const [photos, setPhotos] = useState()
    //get the albums

    let user
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'))
    }
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
            .then((response) => response.json())
            .then((data) => setAlbums(data))
    }, [])
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumNum}/photos`)
            .then((response) => response.json())
            .then((data) => setPhotos(data))
        setShowPhotos(true)
    }, [albumNum])
    console.log(photosNum);
    return (
        <div >
            <Grid container spacing={1} columns={10}>

                <Grid  xs={showPhotos && 8}>
                <div style={{ margin: showPhotos ? '0 0 0 0' : '0', display: 'block' }}>
                    {albums && albums.map((item, idx) =>
                        <Card sx={{ maxWidth: 245 }} style={{ border: ' 1px solid blue', margin: 10, float: 'left' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                margin='10% '
                                image="https://images.pexels.com/photos/1226721/pexels-photo-1226721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" height={20} width={250}>
                                    {item.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => { setAlbumNum(item.id); setShowPhotos(!showPhotos) }} >{(albumNum == item.id && showPhotos) ? 'hide' : 'Show'}</Button>
                            </CardActions>
                        </Card>)}
                </div>
            </Grid>
            <Grid xs={showPhotos ? 2 : 0}>
                {showPhotos && <div >
                    <button style={{ display: showPhotos ? 'block' : 'none', border: '0' }} onClick={() => setShowPhotos(false)}>
                        <HighlightOffIcon color="secondary" />
                    </button>
                    {photos && photos.slice(photosNum, photosNum + 10).map((item, idx) =>
                        <img key={idx} src={item.url} width={'100px'} />)}
                    {<Pagination count={5} style={showPhotos ? { display: '' }:{ display: '' }} color="primary" onClick={(e) => { setPhotosNum((e.target.innerText - 1) * 10); }} />}
                </div>}
            </Grid>
        </Grid>



        </div >
    );
}

