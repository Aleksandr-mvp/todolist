import React from 'react';

type propsType = {
    name: string
    callback: () => void
}

export const Button = ({name, ...props}: propsType) => {
    const onClickHandler = () => {
        props.callback()
    }

    return (
            <button onClick={onClickHandler}>{name}</button>

    )
}

