import {$host} from "./index";
import {FieldType} from "../features/tableReducer";


export const addValues = async (values: ValuesType) => {
    const {data} = await $host.post<FieldType>('api/table', values)
    return data
}

export const fetchValues = async (payload: GetTableParamsType) => {
    const {data} = await $host.get<ResFetchValuesType>('api/table', {params: payload})
    return data
}

export type ValuesType = {
    name: string
    amount: number
    distance: number
}
export type GetTableParamsType = {
    page?: number
    totalFields?: number
    pageCount?: number
    sortValues?: string
}
export type ResFetchValuesType = {
    count: number
    rows: FieldType[]
}