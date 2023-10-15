import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface groupState {
    currentLanguage: string
}

const initialState: groupState = {
    currentLanguage: 'en',
}

const lang = createSlice({
    name: 'lang',
    initialState,
    reducers: {
      changeLanguageSuccess(state, action:PayloadAction<string>) {
        state.currentLanguage = action.payload
      }
    }
})

export const {
    changeLanguageSuccess
} = lang.actions

export default lang.reducer
