import React from 'react';
import classes from './Fields.module.css'

export type PropsType = {
    id: number
    date: string
    name: string
    amount: number
    distance: number
}

export const Fields = ({   id,
                           date,
                           name,
                           amount,
                           distance,
                       }: PropsType) => {
    return (
        <div className={classes.container}>
            <div className={classes.date}>{date}</div>
            <div className={classes.name}>{name}</div>
            <div className={classes.amount}>{amount}</div>
            <div className={classes.distance}>{distance}</div>
        </div>
    );
};
