import {AxiosError, AxiosResponse} from "axios";
import {ThunkAction} from "redux-thunk";

import {setAppError, SetAppErrorType} from "../app/appReducer";
import {AppRootStateType} from "../app/store";
import {addValues, fetchValues, ValuesType} from "../api/tableAPI";


//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type InitialStateType = {
    sortValues: string
    fields: ValuesType[]
}

//initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const initialState = {
    sortValues: '',
    fields: []
}

//reducer>>>>>>>>>>>>>
export const tableReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'TABLE/SORT-VALUES':
            return {...state, sortValues: action.sortValues}
        case 'TABLE/CREATE-FIELD':
            return {
                ...state, fields: [...state.fields, action.field]

            }
        default:
            return state
    }
}

//types for actions>>>>>>>>>>>>>
type ActionsType = SortValuesType | CreateFieldType
export type SortValuesType = ReturnType<typeof sortValues>
export type CreateFieldType = ReturnType<typeof createFieldAC>

//actions>>>>>>>>>>>>>
export const sortValues = (sortValues: string) => ({type: 'TABLE/SORT-VALUES', sortValues} as const)
export const createFieldAC = (field: ValuesType) => ({type: 'TABLE/CREATE-FIELD', field} as const)

//thunk types>>>>>>>>>>>>>

export type DispatchThunkTable= ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkTable>

//thunks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const createField = (values: ValuesType): ThunkType => (dispatch) => {
    return addValues(values)
        .then((res: AxiosResponse) => {
            console.log(res.data)
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong create Field 😠'))
        })
}
export const fetchTable = (): ThunkType => (dispatch) => {
    return fetchValues()
        .then((res: AxiosResponse) => {
            console.log(res.data)
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong create Field 😠'))
        })
}