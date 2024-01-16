import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import animeSlice from "./animeSlice";

const store = configureStore({
    reducer: {'users': animeSlice,'userAccount': userSlice}
})

export default store