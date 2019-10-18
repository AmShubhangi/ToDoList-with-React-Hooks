import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment, { now } from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
import _ from 'lodash';
import CompleteListComponent from './compltedArray';
import AddToDoComponent from './postTodo'

function TodoContainer() {
    const [count, setCount] = useState(1);
    const [item, setItem] = useState('');
    const [time, setTime] = useState([]);
    const [itemBulk, setItemBulk] = useState({ id: '', itemName: '', cDate: new Date() });
    const [theArray, setTheArray] = useState([]);
    const [completedArray, setCompletedArray] = useState([]);

    function addToDoItems() {
        setCount(count + 1);
        var obj = { ...itemBulk, id: count, itemName: item, cDate: '' }
        setItemBulk(obj);
        setItem('');
        theArray.push(obj);
    }

    function onStartClick(id, index) {
        setTime(theArray[index].cDate = moment(new Date(Date.now())).format("DD/MM/YYYY, hh:mm:ss"));
    }

    function onDeleteTask(name, index) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you want to delete this " + name + '?')) {
            const newArray = [...theArray];
            newArray.splice(index, 1);
            setTheArray(newArray);
        }
    }

    function onCompletedItems(id, name, startDate, index) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Is Completed " + name + ' Task ?')) {
            const newArray = [...theArray];
            newArray.splice(index, 1);
            setTheArray(newArray);

            var endDateTime = moment(new Date(Date.now())).format("DD/MM/YYYY, hh:mm:ss");
            var timeTaken = moment.utc(moment(endDateTime, "DD/MM/YYYY, hh:mm:ss").diff(moment(startDate, "DD/MM/YYYY, hh:mm:ss"))).format("HH:mm:ss");

            var daysToComplete = moment.utc(moment(endDateTime, 'DD/MM/YYYY')).diff((moment(startDate, 'DD/MM/YYYY')), 'days');

            var newcompletedArray = {
                ...itemBulk, id: id, itemName: name, date: startDate, completeDate: endDateTime,
                timeTook: timeTaken, daysToComplete: daysToComplete
            }
            completedArray.push(newcompletedArray);
            setItemBulk(newcompletedArray);
            console.log(completedArray);
        }
    }

    return (
        <div>
            <Container >
                <h1>Add your Todo Items</h1>
                <Grid >
                    <Grid item>
                        <TextField
                            id="textfield"
                            label="Enter Todo"
                            placeholder="Todo"
                            margin="normal"
                            value={item}
                            onChange={(event) => setItem(event.target.value)} />
                    </Grid>
                    <Grid item>
                        <br></br>
                        <Button variant="contained" color="primary" onClick={() => addToDoItems()}>
                            Add
                       </Button>
                    </Grid>
                </Grid>
            </Container>
            <h1>Your Todo List</h1>
            {theArray.length > 0 ?
                <Container>
                    <Table>
                        <AddToDoComponent />
                        {
                            theArray.map((item, index) => {
                                return <TableBody key={index}>
                                    <TableRow >
                                        <TableCell align="right">{item.id}</TableCell>
                                        <TableCell align="right">
                                            <Button className={theArray[index].cDate ? 'primary' : 'startClass'} onClick={() => onStartClick(item.id, index, theArray[index].cDate)}>{theArray[index].cDate ? 'Started' : 'Start'}</Button>
                                            <Button className={theArray[index].cDate ? 'CompletedClass' : 'doNotDisplay'} onClick={() => onCompletedItems(item.id, item.itemName, item.cDate, index)}>
                                                {theArray[index].cDate ? 'Complete ?' : ''}</Button>

                                        </TableCell>
                                        <TableCell align="right">
                                            {item.itemName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {theArray[index].cDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button className="danger" onClick={() => onDeleteTask(item.itemName, index)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            })
                        }
                    </Table>
                </Container>
                : 'Not For Now,Please Add few!'}
            <br />
            <br />
            <br />
            <br />
            {completedArray.length > 0 ?
                <CompleteListComponent completedArray={completedArray} /> : ''}
        </div>
    )
}

export default TodoContainer;