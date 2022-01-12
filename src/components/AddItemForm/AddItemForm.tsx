import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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

    const errorStyle = {
        color: "red",
    }
    const errorMessage = error
        ? <div style={errorStyle}>Title is required!</div>
        : <div>Enter item title</div>


    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTask}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}

