import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';







export default function SpanningTable() {
    let user;
    let nav = useNavigate()
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'))
    } else {
        nav('/login')

    }
    const objects = ['address', 'company']
    const keys = Object.keys(user).filter(a => !(objects.indexOf(a) >= 0))

    const addresDetails = Object.keys(user.address).filter(a => a != 'geo')
    const companyDetails = Object.keys(user.company).filter(a => a != 'geo')
    return (
        <TableContainer component={Paper} style={{width:'60%', margin:' 0 auto', border:'1px solid lightblue', borderRadius:'20px'}} >
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">

                <TableBody >
                    {keys.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell><Typography variant="h7" fontSize={'1.5rem'} component="h2">{row}</Typography>
                            </TableCell>
                            <TableCell colSpan={2} align="center">
                                <Typography variant="h5" fontSize={'1rem'} component="h2">{user[row]}</Typography></TableCell>
                        </TableRow>
                    ))}

                    <TableCell rowSpan={addresDetails.length + 1} >
                        <Typography variant="h7" fontSize={'1.9rem'} component="h2">Address</Typography>
                    </TableCell>
                    {addresDetails.map((item, idx) =>
                        <TableRow key={idx}>
                            <TableCell colSpan={1}>
                                <Typography variant="h7" fontSize={'1.5rem'} component="h2">{item}</Typography>
                            </TableCell>
                            <TableCell align="center">{user.address[item]}</TableCell>
                        </TableRow>
                    )}
                    <TableCell rowSpan={companyDetails.length + 1} >
                        <Typography variant="h7" fontSize={'1.9rem'} component="h2">Company</Typography>
                    </TableCell>
                    {companyDetails.map((item, idx) =>
                        <TableRow key={idx}>
                            <TableCell colSpan={1}>
                                <Typography variant="h7" fontSize={'1.5rem'} component="h2">{item}</Typography>
                            </TableCell>
                            <TableCell align="center">{user.company[item]}</TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </TableContainer>
    );
}