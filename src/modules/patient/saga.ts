import {types, actions, Action} from '.'
import { SagaIterator} from 'redux-saga';
import { delay,put, takeLatest, call, select } from 'redux-saga/effects';
import * as patientApi from '../../api/patient';
import Patient, { DeletePatientsResponse } from '../../model/Patient';
import moment from 'moment';



export let expiredTime = moment();

export const setExpiredTime = (time: moment.Moment): void => {
    expiredTime = time;
};

export default function* watchPatientData():SagaIterator{
    yield takeLatest(types.GET_ALL_PATIENTS_ASYNC,getAllPatients);
    yield takeLatest(types.SAVE_PATIENT_ASYNC,savePatient);
    yield takeLatest(types.GET_PATIENT_BY_ID_ASYNC,getPatientById);
    yield takeLatest(types.DELETE_PATIENT_ASYNC,deletePatient);
    yield takeLatest(types.SEARCH_PATIENTS_BY_FIELDS_ASYNC,searchPatientsByFields)

    // For loading and saving store into local storage
}

export function* getAllPatients(){
    const currentTime=moment();

    try{
        const patients: Array<Patient> = yield call(patientApi.getAllPatients);
        yield put(actions.getAllPatientsSucceeded(patients));
        
        setExpiredTime(currentTime.add(1,'hours'));
        
    } catch(e){
        yield put (actions.getAllPatientsFailed());
    }
}

export function* searchPatientsByFields(action: Action){
    const currentTime=moment();
    try{
        const patients: Array<Patient> = yield call(patientApi.searchPatientsByFields,
            action.patientFirstName,
            action.patientLastName,
            action.patientDOB);
        yield put (actions.searchPatientsByFieldsSucceeded(patients));
        setExpiredTime(currentTime.add(1,'hours'));
    } catch(e){
        yield put (actions.searchPatientsByFieldsFailed());
    }
}
export function* savePatient(action: Action){
    try{
        const patient: Patient = yield call(patientApi.savePatient,action.patient);
        console.log(patient);
        if (patient!=null && typeof patient!=='undefined' && patient.Id){
            yield put(actions.savePatientSucceeded(patient));
        } else{
            yield put(actions.savePatientFailed());
        }
    }catch(e){
        console.log('error', e);
        yield put(actions.savePatientFailed());
    }
}

export function* getPatientById(action: Action): SagaIterator{
    try{
        const patient: Patient = yield call(patientApi.getPatientById, action.patientId);
        yield put(actions.getPatientByIdSucceeded(patient));
    } catch(e){
        yield put(actions.getPatientByIdFailed());
    }
}

export function* deletePatient(action: Action): SagaIterator{
    try{
        const response: string = yield call(patientApi.deletePatient, action.patientId);
        if (response){
            yield put (actions.deletePatientSucceeded(response));
        } else {
            yield put (actions.deletePatientFailed());
        }
    } catch (e){
        console.log('error', e);
        yield put(actions.deletePatientFailed());
    }
}


