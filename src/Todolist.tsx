import React, {useState} from 'react';
import {filterType, TaskType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}



export function Todolist(props: PropsType) {
    const [filterValue, setFilterValue] = useState<filterType>('All')

    let isDoneTrue = props.tasks

    if (filterValue === 'Active') {
        isDoneTrue = props.tasks.filter(f => f.isDone)
    }
    if (filterValue === 'Completed') {
        isDoneTrue = props.tasks.filter(f => !f.isDone)
    }

    const filteredTasks = (value: filterType) => {
        setFilterValue(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {isDoneTrue.map((task: TaskType) => <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>
            )}
        </ul>
        <div>
            <button onClick={() => filteredTasks('All')}>All</button>
            <button onClick={() => filteredTasks('Active')}>Active</button>
            <button onClick={() => filteredTasks('Completed')}>Completed</button>
        </div>
    </div>
}
