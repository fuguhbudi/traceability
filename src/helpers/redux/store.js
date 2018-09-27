import {createStore, applyMiddleware} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import {createWhitelistFilter} from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: "root",
    storage: storage,
    transforms: [
        // createWhitelistFilter("activeApp")
    ]
};
const configureStore = () => {
    const store = createStore(
        // persistReducer(persistConfig, rootReducer),
        rootReducer,
        applyMiddleware(
            thunk,
            sagaMiddleware
        )
    );

    sagaMiddleware.run(rootSaga);
    persistStore(store);
    return store;
};

const store = configureStore();
export default store;