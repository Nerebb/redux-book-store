import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import favoritesSlice from "./favoriteSlice";

const store = configureStore({
  reducer: combineReducers({
    booksReducer: bookSlice.reducer,
    favoriteReducer: favoritesSlice.reducer,
  }),
});

export default store;
