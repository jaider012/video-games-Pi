import { createStore,  applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer } from "../reducers/reducer";

import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose ;
// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const reducers = combineReducers({
//   auth: reducer,
// });

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
