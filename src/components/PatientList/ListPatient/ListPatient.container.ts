import RootState from "../../../modules/rootState";
import ListPatient, {StateFromProps,DispatchFromProps,OwnProps} from "../ListPatient/ListPatient";
import * as patientData from '../../../modules/patient';
import { connect} from 'react-redux';
import {Dispatch} from 'redux'

const mapStateToProps =(state:RootState, props: OwnProps) : StateFromProps=>({
    //data
    patients: patientData.selectors.getListPatients(state),
    loading: patientData.selectors.getLoading(state),
    saving:patientData.selectors.getSaving(state),
    saved:patientData.selectors.getSaved(state),
});

const mapDispatchToProps = (dispatch: Dispatch):DispatchFromProps=>({
    //data
    getAllPatients: ():void=> {dispatch(patientData.actions.getAllPatients());},
    searchPatientsByFields: (firstName: string, lastName: string, dob: string):void => {dispatch(patientData.actions.searchPatientsByFields());},
});

export default connect<StateFromProps, DispatchFromProps, OwnProps,RootState>(mapStateToProps, mapDispatchToProps)(ListPatient);
