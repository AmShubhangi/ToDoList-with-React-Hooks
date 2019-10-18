import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
import _ from 'lodash';


function CompleteListComponent(props) {
    console.log()
    return (<Container >
        <h1>Your Complted Task</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Id</TableCell>
                    <TableCell align="right">Task Name&nbsp;</TableCell>
                    <TableCell align="right">Start At</TableCell>
                    <TableCell align="right">End At &nbsp;</TableCell>
                    <TableCell align="right">Total Days</TableCell>
                    <TableCell align="right">Total &amp; Duration</TableCell>
                </TableRow>
            </TableHead>
            {
                props.completedArray.map((item, index) => {
                    return <TableBody key={index}>
                        <TableRow >
                            <TableCell align="right">{item.id}</TableCell>
                            <TableCell align="right">
                                {item.itemName}
                            </TableCell>
                            <TableCell align="right">
                                {item.date}
                            </TableCell>
                            <TableCell align="right">
                                {item.completeDate}
                            </TableCell>
                            <TableCell align="right">
                                {item.daysToComplete + ' Day'}
                            </TableCell>
                            <TableCell align="right">
                                {item.timeTook}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                })
            }
        </Table>
    </Container>)
}

export default CompleteListComponent;