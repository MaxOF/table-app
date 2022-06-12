import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./appReducer";
import {tableReducer} from "../features/tableReducer";

const rootReducer = combineReducers({
    app: appReducer,
    table: tableReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//types for store>>>>>>>>>>>>>
export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type RootState = ReturnType<typeof store.getState>
type AppDispatchType = typeof store.dispatch

//types for selector and dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector