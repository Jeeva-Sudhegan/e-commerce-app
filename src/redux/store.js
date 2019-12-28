import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import rootReducer from "@redux/root-reducer.js";
import { persistStore } from "redux-persist"

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store)

export default store;