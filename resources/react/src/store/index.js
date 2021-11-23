import { modules } from "./modules";
import { configureStore } from "@reduxjs/toolkit";
import _ from "lodash";

let reducers = {};

_.each(modules, ({ reducer: moduleReducer }, moduleName) => {
    _.set(reducers, moduleName, moduleReducer);
});

let store = configureStore({
    devTools: true,
    reducer: reducers,
});

export { store };
export * from "./hooks";
export * from "./modules/module-names";
