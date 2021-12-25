import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
//import s from './InputButton.module.css';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    }

    return <div>
        <h3>{props.title}</h3>

        <Input title={title} setTitle={setTitle} addTask={props.addTask}/>
        <Button name={'+'} callback={() => addTaskHandler()} />
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => props.removeTask(t.id)
                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickHandler}>x</button>
                </li>
            })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
