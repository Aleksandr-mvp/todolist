import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css'
import {FilterValuesType} from '../../App';
import {TasksMap} from "../TasksMap/TasksMap";



export type TaskType = {
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
    changeCheckBoxStatus: (tID: string, value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const onChangeCheckbox = (tID: string, value: boolean) => {
        props.changeCheckBoxStatus(tID, value)
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? styles.error : ''}
            />
            <button onClick={addTask}>+</button>
            { error && <div className={styles.errorMessage}>Title is required!</div> }
        </div>
        <TasksMap tasks={props.tasks}
                  onChangeCheckbox={onChangeCheckbox}
                  onClickHandler={onClickHandler}/>
        <div>
            <button className={props.filter === 'all' ? styles.activeFilter: ''}
                    onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? styles.activeFilter: ''}
                    onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? styles.activeFilter: ''}
                    onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
