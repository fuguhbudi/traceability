import {all} from "redux-saga/effects";
import {genericSagas} from "./genericSagas";

const sagas = [
    ...genericSagas
];

export default function* rootSaga() {
    yield all(sagas);
}