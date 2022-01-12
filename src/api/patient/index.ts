import Patient from '../../model/Patient';
import {fetchApi} from './baseApi'

export function getAllPatients(){
    return new Promise((resolve, reject)=>{
        fetchApi('api/patients','GET',undefined).then((patients)=>{
            resolve(patients);
        }).catch(()=>{
            reject(new Error('Can\'t get all patients'));
        })
    })
}
export function searchPatientsByFields(firstName:string, lastName:string, dob:string){
    const additionalRoute= `FirstName=${firstName}&LastName=${lastName}&DOB=${dob}`;
    return new Promise((resolve, reject)=>{
        fetchApi('api/patients/search?'+additionalRoute, 'GET',undefined).then((patients)=>{
            resolve(patients);
        }).catch(()=>{
            reject (new Error('Can\'t search patients'));
        })
    })
}

export function savePatient(patientRequest: Patient){
    const patient={...patientRequest}
    const additionalRoute = patient.Id? patient.Id:'';
    const optionMethod = patient.Id? 'PUT':'POST'
    const {Id,...patientWithoutId}=patient;
    const optionBody = patient.Id? patient:patientWithoutId;
    return new Promise((resolve, reject)=>{
        fetchApi('api/patients/'+additionalRoute,optionMethod,optionBody).then((result)=>{
            if(result.message ===1){
                console.log('error then');
                reject(new Error(result.message));
            }
            else{
                resolve(result)
            }
        }).catch((e)=>{
            reject(new Error('Can not save patient!'))
        })
    })
}

export function getPatientById(patientId: string){
    return new Promise((resolve,reject)=>{
        fetchApi('api/patients/' + patientId,'GET',undefined).then((patient)=>{
            resolve(patient);
        }).catch(()=>{
            reject(new Error('Can not get patient'));
        });
    });
}

export function deletePatient(patientId: string){
    return new Promise((resolve, reject)=>{
        fetchApi('api/patients/' + patientId,'DELETE',undefined).then((result)=>{
            resolve(result);
        }).catch(()=>{
            reject(new Error('Can not delete patient'));
        });
    })
}
