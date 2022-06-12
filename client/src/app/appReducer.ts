//type for initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export type InitialStateType = {
    error: string | null
}
//initial state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const initialState: InitialStateType = {
    error: null
}
//reducer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

//types for actions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export type ActionsType = SetAppErrorType
export type SetAppErrorType = ReturnType<typeof setAppError>