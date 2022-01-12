import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Patient from '../../../../model/Patient';
import { formatDateFromServerToUI } from '../../../../utils/formater';

export interface StateFromProps{
    patient: Patient
}
export interface DispatchFromProps{
    getPatientById: (patientId: string) => void
}
export type OwnProps = RouteComponentProps<{patientId: string}>;

export type Props = StateFromProps & DispatchFromProps & OwnProps;
type State={

}
class DemographicDetails extends Component<Props,State> {
    constructor(props: Props){
        window.document.title = 'Patient Details';
        super(props);
    }
    componentDidMount(){
        const {patientId} = this.props.match.params;
        if (patientId){
            this.props.getPatientById(patientId);
        }
    }
    render() {
        const {patient} = this.props;

        return (
            <section className="custom-form">
                <h1 className="custom-form-title">Patient Details</h1>
            <div className="container ">
                <div className="row">
                    <dl>
                        <dt>
                            First Name
                        </dt>

                        <dd>
                            {patient.FirstName}
                        </dd>

                        <dt>
                            Last Name
                        </dt>

                        <dd>
                            {patient.LastName}
                        </dd>

                        <dt>
                            DOB
                        </dt>

                        <dd>
                            {formatDateFromServerToUI(patient.DOB)}
                        </dd>

                        <dt>
                            Gender
                        </dt>

                        <dd>
                            {patient.Gender}
                        </dd>

                        <dt>
                            Email
                        </dt>
                            
                        <dd>
                            {patient.Email}
                        </dd>

                        <dt>
                            Phone Number
                        </dt>

                        <dd>
                            {patient.PhoneNumber}
                        </dd>

                        <dt>
                            Address
                        </dt>

                        <dd>
                            {patient.Address}
                        </dd>

                        <dt>
                            City
                        </dt>
                            
                        <dd>
                            {patient.City}
                        </dd>
                        
                    </dl>

                    <div className="col-lg-6 text-center">
                        <Link
                    id="btnBackToList"
                    to={"/patients"}
                    className="btn btn-secondary custom-btn"
                    >
                    Back to list
                    </Link>
                    </div>
                    <div className="col-lg-6 text-center">
                    <Link id="btEdit" to={`/patients/edit/${this.props.match.params.patientId}`} className="btn btn-primary custom-btn">
                             Edit
                    </Link>
                    </div>
                </div>
            </div>


        </section>
        );
    }
}

export default DemographicDetails;