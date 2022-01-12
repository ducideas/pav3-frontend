import RootState from "../../../../modules/rootState";
import { connect} from 'react-redux';
import { OwnProps, StateFromProps,DispatchFromProps } from "../../../PatientList/Demographic/DemographicAddEdit/DemographicAddEdit";
import * as patientData from '../../../../modules/patient'
import DemographicAddEdit from '../../../PatientList/Demographic/DemographicAddEdit/DemographicAddEdit'
import Patient from "../../../../model/Patient";
import { Dispatch } from "redux";


const mapStateToProps=(state: RootState, props: OwnProps):StateFromProps=>({
    patient: patientData.selectors.getPatientById(state,props.match.params.patientId),
    loadingPatient: patientData.selectors.getLoading(state),
    savingPatient: patientData.selectors.getSaving(state),
    savedPatient: patientData.selectors.getSaved(state)

})
const mapDispatchToProps=(dispatch: Dispatch):DispatchFromProps=>({
    savePatient:(patient: Patient) : void => {dispatch(patientData.actions.savePatient(patient));},
    getPatientById: (patientId: string): void => {dispatch(patientData.actions.getPatientById(patientId));},
    

})

export default connect<StateFromProps, DispatchFromProps, OwnProps,RootState>(mapStateToProps, mapDispatchToProps)(DemographicAddEdit);
