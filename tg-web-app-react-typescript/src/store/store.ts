import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

const newRootReducer = require('./rootReducer').default
store.replaceReducer(newRootReducer)

export type AppThunk = ThunkAction<void, RootState, null, Action<any>>

export default store
