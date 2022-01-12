import { getPatientById } from '../../api/patient';
import Patient, { OpenPatientsSpace } from '../../model/Patient'
import RootState from '../rootState'

export class Action{
    type: string;
    patients: Array<Patient>;
    patient: Patient;
    message: string;
    patientId: string;
    patientIds: Array<Patient>;
    patientName: string;
    patientFirstName: string;
    patientLastName: string;
    patientDOB: string;
}
export interface ById{
    [id:string]: Patient;
}
export interface State{
    byId: ById;
    loading: boolean; //for get method
    saving: boolean; //for post method
    saved: boolean; // for post method
    errorMessage: string;
}
const baseAction=new Action();

export const types={
    GET_ALL_PATIENTS_ASYNC: 'GET_ALL_PATIENTS_ASYNC',
    GET_ALL_PATIENTS_SUCCEEDED: 'GET_ALL_PATIENTS_SUCCEEDED',
    GET_ALL_PATIENTS_FAILED: 'GET_ALL_PATIENTS_FAILED',

    SAVE_PATIENT_ASYNC: 'SAVE_PATIENT_ASYNC',
    SAVE_PATIENT_SUCCEEDED: 'SAVE_PATIENT_SUCCEEDED',
    SAVE_PATIENT_FAILED: 'SAVE_PATIENT_FAILED',

    GET_PATIENT_BY_ID_ASYNC: 'GET_PATIENT_BY_ID_ASYNC',
    GET_PATIENT_BY_ID_SUCCEEDED: 'GET_PATIENT_BY_ID_SUCCEEDED',
    GET_PATIENT_BY_ID_FAILED: 'GET_PATIENT_BY_ID_FAILED',

    DELETE_PATIENT_ASYNC: 'DELETE_PATIENT_ASYNC',
    DELETE_PATIENT_SUCCEEDED: 'DELETE_PATIENTS_SUCCEEDED',
    DELETE_PATIENT_FAILED: 'DELETE_PATIENTS_FAILED',

    SEARCH_PATIENTS_BY_FIELDS_ASYNC: 'SEARCH_PATIENTS_BY_FIELDS_ASYNC',
    SEARCH_PATIENTS_BY_FIELDS_SUCCEEDED: 'SEARCH_PATIENTS_BY_FIELDS_SUCCEEDED',
    SEARCH_PATIENTS_BY_FIELDS_FAILED: 'SEARCH_PATIENTS_BY_FIELDS_FAILED'
}

export const actions={
    // get all patients
    getAllPatients: ():Action => ({
        ...baseAction,
        type: types.GET_ALL_PATIENTS_ASYNC
    }),
    getAllPatientsSucceeded: (patients: Array<Patient>):Action =>({
        ...baseAction,
        type: types.GET_ALL_PATIENTS_SUCCEEDED,
        patients
    }),
    getAllPatientsFailed:():Action=>({
        ...baseAction,
        type: types.GET_ALL_PATIENTS_FAILED,  
    }),
    //search patients
    searchPatientsByFields: (): Action => ({
        ...baseAction,
        type: types.SEARCH_PATIENTS_BY_FIELDS_ASYNC,
    }),
    searchPatientsByFieldsSucceeded: (patients: Array<Patient>): Action => ({
        ...baseAction,
        type: types.SEARCH_PATIENTS_BY_FIELDS_SUCCEEDED,
        patients
    }),
    searchPatientsByFieldsFailed: (): Action => ({
        ...baseAction,
        type: types.SEARCH_PATIENTS_BY_FIELDS_FAILED,
    }),
    //save patient
    savePatient: (patient: Patient):Action =>({
        ...baseAction,
        type: types.SAVE_PATIENT_ASYNC,
        patient
    }),
    savePatientSucceeded: (patient: Patient):Action =>({
        ...baseAction,
        type: types.SAVE_PATIENT_SUCCEEDED,
        patient
    }),
    savePatientFailed: ():Action =>({
        ...baseAction,
        type: types.SAVE_PATIENT_FAILED
    }),
    //get patient by id
    getPatientById: (patientId: string): Action=> ({
        ...baseAction,
        type: types.GET_PATIENT_BY_ID_ASYNC,
        patientId
    }),
    getPatientByIdSucceeded: (patient: Patient): Action =>({
        ...baseAction,
        type: types.GET_PATIENT_BY_ID_SUCCEEDED,
        patient
    }),
    getPatientByIdFailed: ():Action =>({
        ...baseAction,
        type: types.GET_PATIENT_BY_ID_FAILED
    }),
    deletePatient: (patientId: string): Action => ({
        ...baseAction,
        type: types.DELETE_PATIENT_ASYNC,
        patientId
    }),
    deletePatientSucceeded: (patientId: string): Action => ({
        ...baseAction,
        type: types.DELETE_PATIENT_SUCCEEDED,
        patientId
    }),
    deletePatientFailed: (): Action => ({
        ...baseAction,
        type: types.DELETE_PATIENT_FAILED
    }),
}

export const selectors={
    getState: (rootState:RootState):State => rootState.patient,
    getListPatients(rootState: RootState):Array<Patient>{
        const {byId}=this.getState(rootState);
        return Object.keys(byId).map(id=>byId[id]);
    },
    searchPatientsByFields(rootState: RootState):Array<Patient>{
        const {byId} = this.getState(rootState)
        return Object.keys(byId).map(id=>byId[id]);
    },
    getLoading(rootState:RootState):boolean{
        const {loading} = this.getState(rootState);
        return loading;
    },
    getSaving(rootState: RootState): boolean {
        const { saving } = this.getState(rootState);
        return saving;
    },

    getSaved(rootState: RootState): boolean {
        const { saved } = this.getState(rootState);
        return saved;
    },
    getPatientById(rootState: RootState, id: string){
        const {byId} = this.getState(rootState);
        return byId[id]? byId[id] as Patient : new Patient();
    },
    getErrorMessage(rootState: RootState): string{
        const {errorMessage} = this.getState(rootState);
        return errorMessage;
    }
}