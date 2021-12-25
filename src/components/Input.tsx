import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    title: string
    setTitle: (title: string) => void
    addTask: (title: string) => void
}

export const Input = ({title, addTask, setTitle, ...props}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(title)
            setTitle('')
        }
    }

    return (
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}/>
    )
}
