import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./user/UserReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    user: user,
  }),
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
