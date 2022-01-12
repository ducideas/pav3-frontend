import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';
import watchPatientData from './patient/saga';

export default function* rootSaga(): SagaIterator{
    yield all([
        call(watchPatientData),
    ])
}