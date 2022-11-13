import React from 'react';

function Home() {
    let user
    if (localStorage.getItem('user')) {

        user = JSON.parse(localStorage.getItem('user'))
    }
    // console.log(user);
    return (
        <div>
            {user.name}
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" >Info</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Todos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Posts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
        </div>
    );
}

export default Home;