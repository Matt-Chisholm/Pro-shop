import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/exampleReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
