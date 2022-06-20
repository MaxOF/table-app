import React, {ChangeEvent, KeyboardEvent, SelectHTMLAttributes, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {
    createField,
    DispatchThunkTable,
    fetchTable,
    setColumnValue, setConditionValue, setFields,
    setSearchValue,
    sortValuesAC
} from "./tableReducer";
import classes from './Table.module.css'

import {Modal} from "../utils/Modal/Modal";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../app/store";
import {Paginator} from "./paginator/Paginator";
import {Fields} from "./Fields/Fields";

export type FilterColType = 'Название' | 'Количество' | 'Расстояние'
export type FilterValuesType = 'Равно' | 'Содержит' | 'Больше' | 'Меньше'

export const Table = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkTable>>()
    const {fields, totalFields, pageCount, pageNumber, sortValues, columnValue, conditionValue} = useAppSelector(state => state.table)


    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

    const [search, setSearch] = useState<string>('')
    const [column, setColumn] = useState<string>('Название')
    const [condition, setCondition] = useState<string>('Равно')

    const conditionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCondition(e.currentTarget.value)
    }
    const columnHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setColumn(e.currentTarget.value)
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }
    const filteredFields = fields.filter(field => {
        if(column === 'Название' && condition === 'Равно') {
            return field.name.toLowerCase().includes(search.toLowerCase())
        }
        if(column === 'Количество' && condition === 'Равно') {
            return field.amount === +search.replace(/\D/g, '')
        }
        if(column === 'Расстояние' && condition === 'Равно') {
            return field.distance === +search.replace(/\D/g, '')
        }
        if(column === 'Количество' && condition === 'Больше') {
            return field.amount > +search.replace(/\D/g, '')
        }
        if(column === 'Расстояние' && condition === 'Больше') {
            return field.distance > +search.replace(/\D/g, '')
        }
        if(column === 'Количество' && condition === 'Меньше') {
            return field.amount < +search.replace(/\D/g, '')
        }
        if(column === 'Расстояние' && condition === 'Меньше') {
            return field.distance < +search.replace(/\D/g, '')
        }
    })


    const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(createField({name, amount: 2, distance: 3}))
            setModalActive(false)
        }
    }
    useEffect(() => {
        dispatch(fetchTable())
    }, [pageNumber, sortValues, columnValue, conditionValue])

    const createFieldHandler = () => {
        dispatch(createField({name, amount: 2, distance: 3}))
        setModalActive(false)
    }

    // for sort

    const sortAmountDown = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.amount > b.amount ? 1 : -1)
        dispatch(setFields(temp))
    }
    const sortAmountUp = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.amount > b.amount ? -1 : 1)
        dispatch(setFields(temp))
    }

    const sortNameDown = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
        dispatch(setFields(temp))
    }

    const sortNameUp = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.name > b.name ? -1 : 1)
        dispatch(setFields(temp))
    }

    const sortDistanceDown = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.distance > b.distance ? 1 : -1)
        dispatch(setFields(temp))
    }

    const sortDistanceUp = () => {
        const temp = JSON.parse(JSON.stringify(fields))
        temp.sort((a: any, b: any) => a.distance > b.distance ? -1 : 1)
        dispatch(setFields(temp))
    }

    return (
        <div className={classes.flexBlockCards}>
            <div className={classes.blockCards}>

                {/*Modal window for adding field*/}

                <div className={classes.boxSearchButton}>
                    <button
                        onClick={() => setModalActive(true)}
                        className={classes.btnHandlerAdd}
                    >
                        Добавить новое поле
                    </button>
                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <div className={classes.modalTitle}>Добавить новое поле</div>
                    <div className={classes.modalBox}>
                        <input
                            value={name}
                            onKeyPress={onKeyPressModalHandler}
                            onChange={onChangeModalHandler}
                            className={classes.modalInput}
                            placeholder={'Enter your new pack name...'}
                            autoFocus
                        />
                        <button className={classes.modalButton} onClick={createFieldHandler}>Сохранить</button>
                    </div>
                </Modal>

                {/*Form for filter table*/}

                <form>
                    <input
                        value={search}
                        onChange={inputHandler}
                    />
                    <select onChange={columnHandler} value={column}>
                        <option value="Название">Название</option>
                        <option value="Количество">Количество</option>
                        <option value="Расстояние">Расстояние</option>
                    </select>
                    <select onChange={conditionHandler} value={condition}>
                        <option value="Равно">Равно</option>
                        <option value="Содержит">Содержит</option>
                        <option value="Больше">Больше</option>
                        <option value="Меньше">Меньше</option>
                    </select>
                </form>


                <div className={classes.boxCardsPack}>
                    <div className={classes.blockNameCards}>
                    <span>Дата
                        <span className={classes.boxArrow}>

                    </span>
                    </span>
                        <span>Название
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortNameDown}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortNameUp}>
                        </i>
                    </span>
                        <span>Количество
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortAmountDown}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortAmountUp}>
                        </i>
                    </span>
                    </span>
                        <span>Расстояние
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortDistanceUp}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortDistanceDown}>
                        </i>
                        </span>
                    </span>
                    </div>
                    {
                        filteredFields.map(f => {
                            return (
                                <Fields
                                    key={f.id}
                                    id={f.id}
                                    date={new Date(f.createdAt).toLocaleDateString()}
                                    name={f.name.toLowerCase()}
                                    amount={f.amount}
                                    distance={f.distance}
                                />
                            )
                        })
                    }
                </div>
                <Paginator
                    cardPacksTotalCount={totalFields}
                    pageCount={pageCount}
                    page={pageNumber}
                />
            </div>
        </div>
    );
};

