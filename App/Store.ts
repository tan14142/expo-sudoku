import { combineReducers } from "redux"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import game from "~/Store/Game"
import settings from "~/Store/Settings"

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
}

const rootReducer = combineReducers({
  game,
  settings,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
})

export const persistor = persistStore(store)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
