import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

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
    addTask: (NewTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    const addTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(title);
            setTitle('');
        }
    }



    const changeFilterHandler = (valueFilter: FilterValuesType) => {
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler = (tID:string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>

            <Button name={'+'} callback={() => addTaskHandler()} />
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button name={'x'} callback={() => removeTaskHandler(t.id)} />
                </li>)
            }
        </ul>
        <div>
            <Button name={'all'} callback={() => changeFilterHandler('all')}/>
            <Button name={'active'} callback={() => changeFilterHandler('active')}/>
            <Button name={'completed'} callback={() => changeFilterHandler('completed')}/>
        </div>
    </div>
}
