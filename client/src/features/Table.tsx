import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {createField, fetchTable, sortValues} from "./tableReducer";
import classes from './Table.module.css'
import {fetchValues} from "../api/tableAPI";

export const Table = () => {


    const dispatch = useDispatch()

    const [value, setValue] = useState([0, 30]);


    const [modalActive, setModalActive] = useState<boolean>(false);
    const [name, setName] = useState<string>('')

    // useEffect(() => {
    //     dispatch(fetchPackCardsTC())
    // }, [pageCount, page, currentPackName, myCards, maxCardsCount, minCardsCount, sortPacks])


    // const addPack = useCallback((name: string) => {
    //     if (name.trim() !== '') {
    //         dispatch(createField({name, amount: 0, distance: 0}))
    //         setName('')
    //         setModalActive(false)
    //     }
    // }, [dispatch])
    //
    // const onChangeModalHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setName(e.currentTarget.value)
    // }
    // const onKeyPressModalHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') addPack(name)
    // }
    useEffect(() => {
        dispatch(fetchTable())
    }, [])


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
                <div className={classes.boxSearchButton}>
                    <button
                        onClick={() => setModalActive(true)}
                        className={classes.btnHandlerAdd}
                    >
                        Add new pack
                    </button>
                </div>
                {/*<Modal active={modalActive} setActive={setModalActive}>*/}
                {/*    <div className={classes.modalTitle}>Add new pack</div>*/}
                {/*    <div className={classes.modalBox}>*/}
                {/*        <input*/}
                {/*            value={name}*/}
                {/*            onKeyPress={onKeyPressModalHandler}*/}
                {/*            onChange={onChangeModalHandler}*/}
                {/*            className={classes.modalInput}*/}
                {/*            placeholder={'Enter your new pack name...'}*/}
                {/*            autoFocus*/}
                {/*        />*/}
                {/*        <button className={classes.modalButton} onClick={() => addPack(name)}>save</button>*/}
                {/*    </div>*/}
                {/*</Modal>*/}
                <div className={classes.boxCardsPack}>
                    <div className={classes.blockNameCards}>
                    <span>Name
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackNameMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackNameMaxCards}>
                        </i>
                    </span>
                    </span>
                        <span>Cards Count
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={sortPacksMinCardsHandler}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={sortPacksMaxCardsHandler}>
                        </i>
                    </span>
                    </span>
                        <span>Updated
                        <span className={classes.boxArrow}>
                        <i className={`${classes.arrow} ${classes.arrowUp}`}
                           onClick={SortPackUpdatedMinCards}>
                        </i>
                        <i className={`${classes.arrow} ${classes.arrowDown}`}
                           onClick={SortPackUpdatedMaxCards}>
                        </i>
                    </span>
                    </span>
                        <span>Actions</span>
                    </div>


                </div>

            </div>
        </div>
    );
};

