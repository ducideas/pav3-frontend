import { types, Action, State, ById } from ".";
import Patient, { OpenPatient } from '../../model/Patient';
import {getPatientName} from '../../utils/patient';

const initialState :State ={
    byId:{},
    loading:false,
    saving:false,
    saved:false,
    errorMessage:'',
}
export default function(state:State=initialState, action:Action):State{
    let findIndex=-1;
    let newByID: ById = {};
    switch (action.type){
        case types.GET_ALL_PATIENTS_ASYNC:
            return{
                ...state,
                loading:true
            };
        case types.GET_ALL_PATIENTS_SUCCEEDED:
            return{
                ...state,
                byId:storeById(action.patients),
                loading:false
            };
        case types.GET_ALL_PATIENTS_FAILED:
            return{
                ...state,
                loading:false
            };
        case types.SEARCH_PATIENTS_BY_FIELDS_ASYNC:
            return{
                ...state,
                loading:true
            };
        case types.SEARCH_PATIENTS_BY_FIELDS_SUCCEEDED:
            return{
                ...state,
                byId:storeById(action.patients),
                loading:false
            };
        case types.SEARCH_PATIENTS_BY_FIELDS_FAILED:
            return{
                ...state,
                loading:false
            };
        case types.SAVE_PATIENT_ASYNC:
            return{
                ...state,
                saving:true,
                saved:false,
            };
        case types.SAVE_PATIENT_SUCCEEDED:
            return{
                ...state,
                byId: {
                    ...state.byId,
                    [action.patient.Id]: action.patient
                },
                saving: false,
                saved: true
            };
        case types.SAVE_PATIENT_FAILED:
            return{
                ...state,
                saving:false,
                saved:false
            };
        case types.GET_PATIENT_BY_ID_ASYNC:
            return{
                ...state,
                loading: true
            };
        case types.GET_PATIENT_BY_ID_SUCCEEDED:
            let newPatient = {...action.patient}
            return{
                ...state,
                byId: {
                    ...state.byId,
                    [action.patient.Id]: newPatient
                },
                loading: false,
            };
        case types.GET_PATIENT_BY_ID_ASYNC:
            return{
                ...state,
                loading: false
            }
        case types.DELETE_PATIENT_ASYNC:
            return{
                ...state,
                saving: true,
                saved: false
            }
        case types.DELETE_PATIENT_SUCCEEDED:
            newByID = {...state.byId};
            delete newByID[action.patientId];
            return{
                ...state,
                byId: newByID,
                saving: false,
                saved: true
            }
        case types.DELETE_PATIENT_SUCCEEDED:
        return{
                ...state,
                saving: false,
                saved: false
        }
        default:
            return state
    }
}
function storeById(arr: Array<Patient>): ById {
    let result: ById = {};

    if (arr && arr.length > 0) {
        arr.forEach(item => result[item.Id] = item);
    }

    return result;
}