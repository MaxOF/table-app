import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createField, DispatchThunkTable, fetchTable, sortValuesAC} from "./tableReducer";
import classes from './Table.module.css'

import {Modal} from "../utils/Modal/Modal";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../app/store";
import {Paginator} from "./paginator/Paginator";
import {Fields} from "./Fields/Fields";

export const Table = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkTable>>()
    const {fields, totalFields, pageCount, pageNumber, sortValues} = useAppSelector(state => state.table)

    const [value, setValue] = useState([0, 30]);

    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

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
    }, [pageNumber, sortValues])

    const createFieldHandler = () => {
        dispatch(createField({name, amount: 2, distance: 3}))
        setModalActive(false)
    }

    // for sort

    const sortAmountDown = () => {
        dispatch(sortValuesAC('1amount'))
    }
    const sortAmountUp = () => {
        dispatch(sortValuesAC('0amount'))
    }

    const sortNameDown = () => {
        dispatch(sortValuesAC('1name'))
    }

    const sortNameUp = () => {
        dispatch(sortValuesAC('0name'))
    }

    const sortDistanceDown = () => {
        dispatch(sortValuesAC('0distance'))
    }

    const sortDistanceUp = () => {
        dispatch(sortValuesAC('1distance'))
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
                {/*<Modal active={modalActive} setActive={setModalActive}>*/}
                {/*    <div className={classes.modalTitle}>Добавить новое поле</div>*/}
                {/*    <div className={classes.modalBox}>*/}
                {/*        <input*/}
                {/*            value={name}*/}
                {/*            onKeyPress={onKeyPressModalHandler}*/}
                {/*            onChange={onChangeModalHandler}*/}
                {/*            className={classes.modalInput}*/}
                {/*            placeholder={'Enter your new pack name...'}*/}
                {/*            autoFocus*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className={classes.modalBox}>*/}
                {/*        <input*/}
                {/*            value={name}*/}
                {/*            onKeyPress={onKeyPressModalHandler}*/}
                {/*            onChange={onChangeModalHandler}*/}
                {/*            className={classes.modalInput}*/}
                {/*            placeholder={'Enter your new pack name...'}*/}
                {/*            autoFocus*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <button className={classes.modalButton} onClick={createFieldHandler}>Сохранить</button>*/}
                {/*        <button className={classes.modalButton} onClick={createFieldHandler}>Сохранить</button>*/}
                {/*    </div>*/}
                {/*</Modal>*/}

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
                        <span>Расстояние</span>
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortDistanceUp}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortDistanceDown}>
                        </i>
                    </span>
                    </div>
                    {
                        fields.map(f => {
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
                    value={value}
                />
            </div>
        </div>
    );
};

