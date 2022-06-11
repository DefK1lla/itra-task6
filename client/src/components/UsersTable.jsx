import React from "react";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function UsersTable({ users }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
                <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Fullname</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="right">{user.id}</TableCell>
                            <TableCell align="right">{user.firstName} {user.middleName} {user.lastName} </TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right">{user.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTable;