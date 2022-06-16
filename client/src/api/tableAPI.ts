import {$host} from "./index";


export const addValues = async (values: ValuesType) => {
    const {data} = await $host.post('api/table', values)
    return data
}

export const fetchValues = async (payload: GetTableParamsType) => {
    const {data} = await $host.get('api/table', {params: payload})
    return data
}

export type ValuesType = {
    name: string
    amount: number
    distance: number
}
export type GetTableParamsType = {
    page: number
    totalFields: number
    pageCount: number
}