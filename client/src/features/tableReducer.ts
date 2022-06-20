import {AxiosError, AxiosResponse} from "axios";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

import {setAppError, SetAppErrorType} from "../app/appReducer";
import {AppRootStateType} from "../app/store";
import {addValues, fetchValues, ResFetchValuesType, ValuesType} from "../api/tableAPI";



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
    fields: FieldType[]
    pageNumber: number
    totalFields: number
    pageCount: number
    success: boolean
}

//initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const initialState = {
    fields: [],
    pageNumber: 1,
    totalFields: 0,
    pageCount: 10,
    success: false
}

//reducer>>>>>>>>>>>>>
export const tableReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
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
        case 'TABLE/ADD-FIELD':
            return {
                ...state, success: action.success
            }
        default:
            return state
    }
}

//types for actions>>>>>>>>>>>>>
type ActionsType =  CreateFieldType | SetFieldsType | SetCurrentPageType
    | SetTotalCountType | AddFieldType
export type CreateFieldType = ReturnType<typeof createFieldAC>
export type SetFieldsType = ReturnType<typeof setFields>
export type SetCurrentPageType = ReturnType<typeof setCurrentPage>
export type SetTotalCountType = ReturnType<typeof setTotalCount>
export type AddFieldType = ReturnType<typeof addField>


//actions>>>>>>>>>>>>>
export const createFieldAC = (field: FieldType) => ({type: 'TABLE/CREATE-FIELD', field} as const)
export const setFields = (fields: FieldType[]) => ({type: 'TABLE/SET-FIELDS', fields} as const)
export const setCurrentPage = (pageNumber: number) => ({type: 'TABLE/SET-CURRENT-PAGE', pageNumber} as const)
export const setTotalCount = (totalFields: number) => ({type: 'TABLE/SET-TOTAL-COUNT', totalFields} as const)
export const addField = (success: boolean) => ({type: 'TABLE/ADD-FIELD', success} as const)


//thunk types>>>>>>>>>>>>>

export type DispatchThunkTable = ActionsType | SetAppErrorType
type ThunkType = ThunkAction<Promise<void>, AppRootStateType, unknown, DispatchThunkTable>

//thunks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const createField = (values: ValuesType): ThunkType => (dispatch) => {
    return addValues(values)
        .then((res: FieldType) => {
            dispatch(createFieldAC(res))
            dispatch(addField(true))
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
        .then((res: ResFetchValuesType) => {
            dispatch(setFields(res.rows))
            dispatch(setTotalCount(res.count))
        })
        .catch((e: AxiosError) => {
            dispatch(setAppError('Wrong create Field 😠'))
        })
}