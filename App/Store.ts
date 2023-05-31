import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { combineReducers } from "redux"
import game from "~/Store/Game"
import settings from "~/Store/Settings"

const RootReducer = combineReducers({
  game,
  settings,
})

export const store = configureStore({
  reducer: RootReducer,
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
