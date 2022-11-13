import React, { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Albums from './components/albums';
import Home from './components/home';
import Info from './components/info';
import SpanningTable from './components/infoTable';



import Login from './components/login';
import Menu from './components/menu';
import Posts from './components/posts';
import SinglePost from './components/single-post';
// import Checkboxes from './components/menu';
import Todos from './components/todos';
import './css/table.css'

function App() {
  const [user, setUser] = useState()

  
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Menu /> */}
        {/* <Route path='/home' element={<Home />}/> */}
        <Routes>
         
        <Route index element={<Login updateUser={(user) => setUser(user)} />}/>
          <Route path='/home' element={<Menu />}>
            <Route path='todos' element={<Todos id={user} />} />
            {/* <Route path='info' element={<Info />} /> */}
            <Route path='info' element={<SpanningTable />} />
            <Route path='logout' element={<Login />} />
            <Route path='albums' element={<Albums />} />
            <Route path='posts' element={<Posts />} >
              <Route path=':postId' element={<SinglePost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
