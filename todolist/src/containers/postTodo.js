import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
import _ from 'lodash';

function AddToDoComponent() {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Status&nbsp;</TableCell>
                <TableCell align="right">Task Name&nbsp;</TableCell>
                <TableCell align="right">Start Date &amp; Time&nbsp;</TableCell>
                <TableCell align="right">Delete</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default AddToDoComponent;