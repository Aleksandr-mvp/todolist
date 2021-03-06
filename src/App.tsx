import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Menu} from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
    Grid, Paper, AppBar, IconButton, Button, Typography, Container, Toolbar,
    createTheme, useTheme, ThemeProvider, CssBaseline, ButtonGroup
} from "@mui/material";


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

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    //theme:
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);


    //BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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
            {id: v1(), title: "Beer", isDone: false},
        ]
    })

    const addTask = (title: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [{id: v1(), title, isDone: false}, ...tasks[todoListID]]
        setTasks(copyTasks)
    }

    const removeTask = (id: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === id ? {...t, isDone} : t)
        setTasks(copyTasks)
    }

    const changeTaskTitle = (id: string, title: string, todoListID: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === id ? {...t, title} : t)
        setTasks(copyTasks)
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))

    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }

    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        setTodoLists([...todoLists, {id: newTodoListID, title: title, filter: 'all'}])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
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
            <Grid item key={tl.id}>
                <Paper elevation={6}
                       style={{padding: '15px'}}
                >
                    <TodoList
                        todoListID={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ml: 1, justifySelf: "flex-start"}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <ButtonGroup>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                        <Button color="inherit" variant={"outlined"}
                                sx={{ml: 1, justifySelf: "flex-end"}}>Login</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container justifyContent={'center'} style={{padding: '15px'}}>
                    <Grid item>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justifyContent={'center'}>
                    {todoListsComp}
                </Grid>
            </Container>
        </div>
    )
}


export default function ToggleColorMode() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme({
            palette: {
                mode,
            },
        }),
        [mode],
    )
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}


