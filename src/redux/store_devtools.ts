import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter/counterSlice'
import DevTools from "../container/Devtools"


const store = configureStore({
    reducer: {
        counter: counterSlice,
    },
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(DevTools.instrument())
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

