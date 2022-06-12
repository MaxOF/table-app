import {$host} from "./index";


export const addValues = async (values: ValuesType) => {
    const {data} = await $host.post('api/table', values)
    return data
}

export const fetchValues = async (page = 1, limit= 5) => {
    const {data} = await $host.get('api/table', {params: {
            page, limit
        }})
    return data
}

export type ValuesType = {
    name: string
    amount: number
    distance: number
}