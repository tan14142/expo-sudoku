import { combineReducers } from "redux"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MigrationManifest, createMigrate, persistReducer, persistStore } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import game from "~/Store/Game"
import settings from "~/Store/Settings"
import * as rootState from "~/Store/initialState"

function migrate(a: any, b: any) {
  Object.keys(a).forEach(key => {
    if (key in b) {
      if (typeof a[key] === typeof b[key]) {
        if (typeof a[key] === "object") {
          migrate(a[key], b[key])
        }
      } else {
        a[key] = b[key]
      }
    } else {
      a[key] = undefined
    }
  })

  return a
}

const migrations: MigrationManifest = {
  1: persistState => {
    if (!persistState) return rootState as RootState
    return migrate(persistState, rootState)
  },
}

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
  migrate: createMigrate(migrations),
  version: 1,
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
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
