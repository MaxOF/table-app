import {AxiosError, AxiosResponse} from "axios";
import {ThunkAction} from "redux-thunk";

import {setAppError, SetAppErrorType} from "../app/appReducer";
import {AppRootStateType, RootReducerType} from "../app/store";
import {addValues, fetchValues, ValuesType} from "../api/tableAPI";
import {Dispatch} from "redux";


//types >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type FieldType = {
    id: number
    name: string
    amount: number
    distance: number
    createdAt: string
    updatedAt: string
}

export type InitialStateType = {
    sortValues: string
    fields: FieldType[]
    pageNumber: number
    totalFields: number
    pageCount: number
}

//initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const initialState = {
    sortValues: '',
    fields: [],
    pageNumber: 1,
    totalFields: 0,
    pageCount: 10
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
        case 'TABLE/SET-FIELDS':
            return {
                ...state, fields: action.fields
            }
        case 'TABLE/SET-CURRENT-PAGE':
            return {
                ...state, pageNumber: action.pageNumber
            }
        case 'TABLE/SET-TOTAL-COUNT':
            return {
                ...state, totalFields: action.totalFields
            }

        default:
            return state
    }
}

//types for actions>>>>>>>>>>>>>
type ActionsType = SortValuesType | CreateFieldType | SetFieldsType | SetCurrentPageType | SetTotalCountType
export type SortValuesType = ReturnType<typeof sortValues>
export type CreateFieldType = ReturnType<typeof createFieldAC>
export type SetFieldsType = ReturnType<typeof setFields>
export type SetCurrentPageType = ReturnType<typeof setCurrentPage>
export type SetTotalCountType = ReturnType<typeof setTotalCount>

//actions>>>>>>>>>>>>>
export const sortValues = (sortValues: string) => ({type: 'TABLE/SORT-VALUES', sortValues} as const)
export const createFieldAC = (field: FieldType) => ({type: 'TABLE/CREATE-FIELD', field} as const)
export const setFields = (fields: FieldType[]) => ({type: 'TABLE/SET-FIELDS', fields} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'TABLE/SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalCount = (totalFields: number) => ({type: 'TABLE/SET-TOTAL-COUNT', totalFields} as const)

//thunk types>>>>>>>>>>>>>

export type DispatchThunkTable = ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkTable>

//thunks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const createField = (values: ValuesType): ThunkType => (dispatch) => {
    return addValues(values)
        .then((res) => {
            dispatch(createFieldAC(res))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong create Field 😠'))
        })
}
export const fetchTable = (): ThunkType => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState().table
    const payload = {
        page: state.pageNumber || 1,
        totalFields: state.totalFields || 0,
        pageCount: state.pageCount || 10
    }

    return fetchValues(payload)
        .then((res) => {
            dispatch(setFields(res.rows))
            dispatch(setTotalCount(res.count))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong create Field 😠'))
        })
}