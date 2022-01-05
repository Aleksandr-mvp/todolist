import React, {useState, KeyboardEvent, ChangeEvent,  MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    todoListID: string
    addTask: (title: string, todoListId: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask:(id: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.map((t: TaskType) => {

        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement> ) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)

    const removeTodoList = () => props.removeTodoList(props.todoListID)



    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }
    const errorStyle = {
        color: "red",
    }

    const errorMessage = error
        ? <div style={errorStyle}>Title is required!</div>
        : <div>Enter task title</div>

    return(
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                { tasksList }
            </ul>
            <div>
                <button
                    className={getBtnClass("all")} //"active btn btn-todolist"
                    onClick={onClickSetAllFilter}
                >All</button>
                <button
                    className={getBtnClass("active")}
                    onClick={onClickSetActiveFilter}
                >Active</button>
                <button
                    className={getBtnClass("completed")}
                    onClick={onClickSetCompletedFilter}
                >Completed</button>
            </div>
        </div>
    )
}

export default TodoList;