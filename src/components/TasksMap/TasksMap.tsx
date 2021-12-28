import React from 'react';
import styles from './TasksMap.module.css'
import {TaskType} from "../Todolist/Todolist";

type PropsType = {
    tasks: Array<TaskType>
    onChangeCheckbox: (tID: string, value: boolean) => void
    onClickHandler: (tID: string) => void
}

export const TasksMap = ({tasks, onChangeCheckbox, onClickHandler, ...props}: PropsType) => {
    return (
        <ul>
            {
                tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? styles.isDone : ''}>
                        <input type="checkbox" checked={t.isDone}
                               onChange={(event) => onChangeCheckbox(t.id, event.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={(event) => onClickHandler(t.id) }>x</button>
                    </li>
                })
            }
        </ul>
    )
}

