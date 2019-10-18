import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CompleteItemList from './CompleteItemList';

function TodoContainer() {
    const [Item, setItem] = useState(''); //This state for  store Item and set it value.
    const [ItemList, setItemList] = useState([]); //This state for store listof items and set it values.
    
    let timetake = '';

    const [Time, setTime] = useState();//This is for single time.
    const [TimeList, setTimeList] = useState([]);//This is for the arry of time.
    const [CompleteItemlist, setCompleteItemlist] = useState([]);
    const [CompleteDateList, setCompleteDateList] = useState([]);//When click on complete button it store current time and date difference.

    const [TotalTimeList, setTotalTimeList] = useState([]);//Store difference of time.
    var moment = require('moment');

    moment().format();

    function addTodoItem() {

        ItemList.push(Item);  //push Item in ItemList Array
        setItemList(ItemList);//set the value of of ItemList.
        setItem('');
    }

    function DeleteTodoItem(index) {
        const TodoItemList = [...ItemList];//Store itemlist in one variable todoitemlist.
        TodoItemList.splice(index, 1);//delete item of particular index and number of item one from itemlist.
        setItemList(TodoItemList);//set the itemlist.
        const deleteItem = [...TimeList];
        deleteItem.splice(index, 1);
        setTimeList(deleteItem);///delete that index time and date with that item.
    }

    function CurrentTimeOfStart(index) {
        const today = new Date();//get new date and time
        const time = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today);//Format current date and time.
        TimeList.push(TimeList[index]);//push index first which index i want to push in array first
        setTimeList(TimeList);
        setTime(TimeList[index] = time);//I set the value of time at the index which i push.
        console.log(TimeList[index]);
    }

    function CompletedItems(index, item) {
        CompleteItemlist.push(item);//add item in array  of completeItemlist.
        setCompleteItemlist(CompleteItemlist);
        const TodoItemList = [...ItemList];//same as delete function
        TodoItemList.splice(index, 1);
        setItemList(TodoItemList);
        const today = new Date();//get new date and time
        const time2 = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today);//Format current date and time.
        CompleteDateList.splice(index, 0, time2);//create one array when user click on complete button current date and time is store in array.
        setCompleteDateList(CompleteDateList);
        if (ItemList.length === 1) {//When the Itemlist.length has value 1 the the array of Itemlist array is null
            setTimeList([]);
        }
        const deleteItem = [...TimeList];
        deleteItem.splice(index, 1);
        setTimeList(deleteItem);//delete that index time and date with that item.


        const Startdate = TimeList[index];
        const Enddate = CompleteDateList[index];
        var sdate = moment(Startdate);
        var Stime = sdate.utc().format('HH:mm:ss');

        var Edate = moment(Enddate);
        var Etime = Edate.utc().format('HH:mm:ss');

        var start = moment.duration(Stime, "HH:mm:ss");
        var end = moment.duration(Etime, "HH:mm:ss");
        var diff = end.subtract(start);
        // const datediff = diff.hours() + ' ' + 'Hours' + " " + diff.minutes() + ' ' + 'Mins' + ' ' + diff.seconds() + ' ' + 'Sec';// return hours
        if (diff.hours() > 0) {
            timetake = diff.hours() + ' ' + 'Hours';
        }
        if (diff.minutes() > 0) {
            timetake = diff.minutes() + ' ' + 'Minutes';
        }
        if (diff.seconds() > 0) {
            timetake = diff.seconds() + ' ' + 'Seconds';
        }
        if (diff.minutes() > 0 && diff.seconds() > 0) {
            timetake = diff.minutes() + ' ' + 'Minutes ' + diff.seconds() + ' ' + 'Seconds';
        }
        if (diff.hours() > 0 && diff.minutes() > 0 && diff.seconds() > 0) {
            timetake = diff.hours() + ' ' + 'Hours' + diff.minutes() + ' ' + 'Minutes ' + diff.seconds() + ' ' + 'Seconds';
        }
        TotalTimeList.push(timetake);
        setTotalTimeList(TotalTimeList);
        console.log(TotalTimeList);
    }


    return (
        <div>
            <Container >
                <h1>Please Add your Todo Items</h1>

                <Grid alignContent="center">

                    <Grid item>
                        <TextField
                            id="textfield"
                            label="Enter Todo"
                            placeholder="Todo"
                            margin="normal"
                            value={Item}
                            onChange={(event) => setItem(event.target.value)} />
                    </Grid>

                    <Grid item>
                        <br></br>
                        <Button variant="contained" color="primary" onClick={addTodoItem}>
                            Add
                       </Button>
                    </Grid>

                </Grid>

                {/* //This part is for display data in table format. */}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Items</TableCell>
                            <TableCell align="right">Status&nbsp;</TableCell>
                            <TableCell align="right">Time&nbsp;</TableCell>
                            <TableCell align="right">Delete&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    {

                        ItemList.map((item, index) => {
                            return <TableBody key={index}>
                                <TableRow >
                                    <TableCell align="right">{item}</TableCell>
                                    <TableCell align="right">
                                        <Button color="primary" onClick={() => CurrentTimeOfStart(index)}
                                            className={TimeList[index] ? 'greenColor' : 'normalColor'}>{TimeList[index] ? 'started' : 'start'} </Button>
                                        <Button color="primary" onClick={() => CompletedItems(index, item)}>Completed</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        {TimeList[index]}
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteIcon onClick={() => DeleteTodoItem(index)} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        })
                    }
                </Table>
                <CompleteItemList CompleteItemArray={CompleteItemlist} startdate={TimeList} completedatelist={CompleteDateList} Totaltime={TotalTimeList} />
            </Container>
        </div>
    )
}

export default TodoContainer;