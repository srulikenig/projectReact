import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Menu() {
  const [value, setValue] = React.useState(0);
  const menuItems = ['Info', 'Todos', 'Posts', 'Albums', 'Logout']

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const nav = useNavigate()
  useEffect(() => {
    nav('info')
    nav(menuItems[value])
    console.log(value);
  }, [value])

  return (
    <React.Fragment>

      <Box sx={{ width: '100%', bgcolor: 'skyblue' }}>
        <Tabs value={value} onChange={handleChange} >
          {menuItems.map((item, idx) =>
            <Tab label={item} key={idx} />
          )}
        </Tabs>
      </Box>
      <div style={{padding: '20px 40px 0 '}}>
      <Outlet />
      </div>
    </React.Fragment>
  );
}
