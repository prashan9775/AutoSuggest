import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import allReducers from "./reducers";
import React from "react";

const Store = createStore(
    allReducers,
    applyMiddleware(logger, require('redux-immutable-state-invariant').default()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
