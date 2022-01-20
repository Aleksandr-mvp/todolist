import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    const spanStyle = {
        cursor: "pointer",
    }

    return (
        editMode
            ? <TextField
                onBlur={offEditMode}
                autoFocus={true}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressOffEditMode}
            />
            : <span style={spanStyle} onDoubleClick={onEditMode}>{props.title}</span>
    )
}

