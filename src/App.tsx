import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";

const App = () => {

    const task1=[
        {id:1,title:'HTML&CSS',isDone:true},
        {id:2,title:'JS',isDone:false},
        {id:3,title:'React',isDone:true},
    ]

    const task2=[
        {id:1,title:'HTML&CSS222222',isDone:true},
        {id:2,title:'JS22222222222',isDone:false},
        {id:3,title:'React22222222',isDone:true},
    ]


    return (
        <div className="App">
            <Todolist title={'list1'} task={task1}/>
            <Todolist title={'list2'} task={task2}/>
        </div>
    )
}

export default App;
