import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ListItem, Checkbox, IconButton, Typography, List, ButtonGroup, Button} from "@mui/material";


type TodoListPropsType = {
    title: string
    todoListID: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }

        return (
            <ListItem
                key={t.id} disableGutters divider style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <div style={{fontWeight: 'bold'}}>
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        checked={t.isDone}
                        onChange={changeStatus}
                        style={{marginRight: '15px'}}
                    />
                    {t.isDone
                        ? <span className={"is-done"}>{t.title}</span>
                        : <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    }
                </div>
                <IconButton onClick={removeTask}>
                    <HighlightOffIcon/>
                </IconButton>
            </ListItem>
        )
    })

    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const addTask = (newTitleTask: string) => {
        props.addTask(newTitleTask, props.todoListID)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <Typography
                variant={'h5'}
                align={'center'}
                style={{fontWeight: 'bold'}}
            >
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} size={'small'}>
                    <HighlightOffIcon/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <ul>
                <List>
                    {tasksList}
                </List>
            </ul>
            <div>
                <ButtonGroup
                    variant={'outlined'}
                    size={'small'}
                    fullWidth
                >
                    <Button
                        color={props.filter === 'all' ? "secondary" : "primary"}
                        onClick={onClickSetAllFilter}
                    >All</Button>
                    <Button
                        color={props.filter === 'active' ? "secondary" : "primary"}
                        onClick={onClickSetActiveFilter}
                    >Active</Button>
                    <Button
                        color={props.filter === 'completed' ? "secondary" : "primary"}
                        onClick={onClickSetCompletedFilter}
                    >Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

