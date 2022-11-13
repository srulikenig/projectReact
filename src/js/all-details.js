import React, { useState } from 'react';


export const posts = '';
fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.json())
    .then((data) => posts = (data))



function AllDetails() {
    const [users, setUsers] = useState('')
    const [todos, setTodos] = useState('')
    // const [users, setUsers] = useState('')
    // const [users, setUsers] = useState('')
    // const [users, setUsers] = useState('')



    return (<div></div>);
}

export default AllDetails;