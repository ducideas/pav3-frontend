export default class  Patient{
    public Id: string = '';
    public FirstName: string='';
    public LastName: string='';
    public DOB: string='';
    public Gender: string='';
    public Email: string='';
    public PhoneNumber: string='';
    public Address: string='';
    public City: string=''
}

export interface OpenPatient{
    id: string;
    name: string;
}

export interface OpenPatientsSpace{
    openPatients: Array<OpenPatient>;
    activePatient: string;
}
export interface DeletePatientsResponse {
    patientId: string;
}
