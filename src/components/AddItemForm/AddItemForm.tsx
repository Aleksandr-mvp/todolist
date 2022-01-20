import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField, IconButton} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <TextField
                variant={'outlined'}
                size={'small'}
                label={'Enter item title'}
                helperText={error && 'Title is required!'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
                error={error}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}

