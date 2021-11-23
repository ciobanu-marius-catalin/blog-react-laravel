import * as reducers from "./reducers";
import * as selectors from "./selectors";
import { createSlice } from "@reduxjs/toolkit";

let name = "user";
const USER_MODULE = name;

const initialState = {
    user: null,
};


const { actions, reducer } = createSlice({
    name,
    initialState,
    reducers,
});

let module = {
    name,
    reducer,
    actions,
    selectors,
};

export { module, USER_MODULE };
