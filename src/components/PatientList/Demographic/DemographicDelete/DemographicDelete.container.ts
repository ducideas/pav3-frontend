import RootState from "../../../../modules/rootState";

import * as patientData from '../../../../modules/patient'
import { Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DemographicDelete, { OwnProps,StateFromProps, DispatchFromProps} from "./DemographicDelete";

const mapStateToProps = (state: RootState, props:OwnProps ):StateFromProps =>({
    patient: patientData.selectors.getPatientById(state, props.match.params.patientId),
    loading: patientData.selectors.getLoading(state),
    saving: patientData.selectors.getSaving(state),
    saved: patientData.selectors.getSaved(state),
})

const mapDispatchToProps=(dispatch: Dispatch,props:OwnProps): DispatchFromProps=>({
    getPatientById: (patientId: string): void => {dispatch(patientData.actions.getPatientById(patientId))},
    deletePatient: (patientId: string) => {dispatch(patientData.actions.deletePatient(patientId));},
    
})

export default withRouter(connect<StateFromProps, DispatchFromProps,OwnProps,RootState>(mapStateToProps, mapDispatchToProps)(DemographicDelete));