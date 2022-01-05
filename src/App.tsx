import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists,setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "JS/Beer", isDone: false},
        ]
    })

    const addTask = (title: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = [{id: v1(), title, isDone: false },...tasks[todoListId]]
        setTasks(copyTasks)
    }

    const removeTask = (id: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = tasks[todoListId].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = tasks[todoListId].map(t => t.id === id ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))

    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const getTasksForRender = (filter: FilterValuesType,tasks: Array<TaskType>): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => !t.isDone)
            case "active":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListsComp = todoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            {todoListsComp}
        </div>
    )
}

export default App;


