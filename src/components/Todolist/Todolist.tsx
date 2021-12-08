import React from "react";

type propsType = {
    title: string
    task:Array<inArray>
}

type inArray = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(task => <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span></li> )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}