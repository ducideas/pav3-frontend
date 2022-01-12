import Patient from "../model/Patient";


export function getPatientName({ FirstName, LastName }: Patient) {
    return `${FirstName} ${LastName}`;
}
