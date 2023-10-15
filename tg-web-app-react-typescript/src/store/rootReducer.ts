import { combineReducers } from '@reduxjs/toolkit'
import langReducer from './lang/langSlice'

const rootReducer = combineReducers({
  lang: langReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
