import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const sortOption = ['title', 'id', 'completed', 'random']

function Todos() {
    //mui--
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sortBy, setSortBy] = useState('')
    const [up, setUp] = useState(false)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setSortBy(e);
        setUp(!up)
        setAnchorEl(null);
        console.log(sortBy);
    };
    //mui--

    const [todos, setTodos] = useState([])
    let user
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'))
    }
    const filter = () => {
        const newArr = [...todos]
        return newArr.filter(todo => todo.userId == user.id)
    }
    const sort = arr => {
        if (sortBy == 'random') {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr
        }
        const newArr = [...arr]
        newArr.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return up ? 1 : -1
            } else if (a[sortBy] < b[sortBy]) {
                return up ? -1 : 1
            }
            return 0
        })
        return newArr
    }
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`)
            .then((response) => response.json())
            .then((data) => setTodos(data))
    }, [])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            {/* //--mui */}
            <Button
            style={{margin: '25px'}}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
                endIcon={<FilterListIcon />}
            >sort by
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {sortOption.map(item =>
                    <MenuItem onClick={() => handleClose(item)}>{item}</MenuItem>
                )}

            </Menu>
            <table border={1}>
                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>completed</th>
                </tr>

                {sort(filter()).map((item, idx) =>
                    <tr className='todo'>{Object.values(item).map((cell, idx) => {
                        return (
                            idx > 0 && idx < 3 && <td>{cell}</td> ||
                            idx > 2 && <td><Checkbox {...label} checked={cell} color="success" /></td>
                        )
                    })}
                    </tr>)}
            </table>
        </div>
    );
}

export default Todos;