import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import moment, { now } from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
import _ from 'lodash';


function TodoListComponent(props) {
    const [buttonText, setButtonText] = useState('Start');
    const [theArray, setTheArray] = useState([]);
    const [itemBulk, setItemBulk] = useState({ id: '', itemName: '', cDate: new Date() });
    const [completedArray, setCompletedArray] = useState([]);

    function onStartClick(id, index) {
        setButtonText('Started');
    }

    function onDeleteTask(name, index) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you want to delete this " + name + '?')) {
            const newArray = [...theArray];
            newArray.splice(index, 1);
            setTheArray(newArray);
        }
    }

    function onCompletedItems(id, name, date, index) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Is Completed " + name + ' Task ?')) {
            const newArray = [...theArray];
            newArray.splice(index, 1);
            setTheArray(newArray);

            var ccDate = moment(new Date(Date.now())).format("DD/MM/YYYY, hh:mm:ss");
            var timeTaken = moment.utc(moment(ccDate, "DD/MM/YYYY, hh:mm:ss").diff(moment(date, "DD/MM/YYYY, hh:mm:ss"))).format("HH:mm:ss");

            var newcompletedArray = {
                ...itemBulk, id: id, itemName: name, date: date, completeDate: moment(new Date(Date.now())).format("DD/MM/YYYY, hh:mm:ss"),
                timeTook: timeTaken
            }
            completedArray.push(newcompletedArray);
            setItemBulk(newcompletedArray);
        }
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="right">Id</TableCell>
                    <TableCell align="right">Status&nbsp;</TableCell>
                    <TableCell align="right">Task Name&nbsp;</TableCell>
                    <TableCell align="right">Start Date &amp; Time&nbsp;</TableCell>
                    <TableCell align="right">Delete</TableCell>
                </TableRow>
            </TableHead>
            {
                props.theArray.map((item, index) => {
                    return <TableBody key={index}>
                        <TableRow >
                            <TableCell align="right">{item.id}</TableCell>
                            <TableCell align="right">
                                <Button className={buttonText === 'Started' ? 'primary' : 'default'} onClick={() => onStartClick(item.id, index)}>{buttonText}</Button>
                                <Button color="default" onClick={() => onCompletedItems(item.id, item.itemName, item.cDate, index)}>Complete ?</Button>
                            </TableCell>
                            <TableCell align="right">
                                {item.itemName}
                            </TableCell>
                            <TableCell align="right">

                                {buttonText === 'Started' ? theArray[index].cDate : ''}
                            </TableCell>
                            <TableCell align="right">
                                <Button className="danger" onClick={() => onDeleteTask(item.itemName, index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                })
            }
        </Table>
    )
}

export default TodoListComponent;