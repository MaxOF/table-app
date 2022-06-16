import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createField, DispatchThunkTable, fetchTable, sortValues} from "./tableReducer";
import classes from './Table.module.css'

import {Modal} from "../utils/Modal/Modal";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType, useAppSelector} from "../app/store";
import {Paginator} from "./paginator/Paginator";
import {Fields} from "./Fields/Fields";

export const Table = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, DispatchThunkTable>>()
    const {fields, totalFields, pageCount, pageNumber} = useAppSelector(state => state.table)

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
    }, [fields])

    const createFieldHandler = () => {
        dispatch(createField({name, amount: 2, distance: 3}))
        setModalActive(false)
    }

    // for sort

    const sortPacksMinCardsHandler = () => {
        dispatch(sortValues('1amount'))
    }
    const sortPacksMaxCardsHandler = () => {
        dispatch(sortValues('0amount'))
    }

    const SortPackNameMinCards = () => {
        dispatch(sortValues('1name'))
    }

    const SortPackNameMaxCards = () => {
        dispatch(sortValues('0name'))
    }

    const SortPackUpdatedMinCards = () => {
        dispatch(sortValues('0distance'))
    }

    const SortPackUpdatedMaxCards = () => {
        dispatch(sortValues('1distance'))
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

                <div className={classes.boxCardsPack}>
                    <div className={classes.blockNameCards}>
                    <span>Дата
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackNameMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackNameMaxCards}>
                        </i>
                    </span>
                    </span>
                        <span>Название
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortPacksMinCardsHandler}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortPacksMaxCardsHandler}>
                        </i>
                    </span>
                    </span>
                        <span>Количество
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackUpdatedMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackUpdatedMaxCards}>
                        </i>
                    </span>
                    </span>
                        <span>Расстояние</span>
                    </div>
                    {
                        fields.map(f => {
                            return (
                                <Fields
                                    key={f.id}
                                    id={f.id}
                                    date={new Date(f.createdAt).toLocaleDateString()}
                                    name={f.name}
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

