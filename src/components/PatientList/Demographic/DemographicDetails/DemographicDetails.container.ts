import RootState from "../../../../modules/rootState";
import DemographicDetails, { StateFromProps,OwnProps, DispatchFromProps } from "./DemographicDetails";
import * as patientData from '../../../../modules/patient'
import { Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


const mapStateToProps = (state: RootState, props:OwnProps ):StateFromProps =>({
    patient: patientData.selectors.getPatientById(state, props.match.params.patientId)
})

const mapDispatchToProps=(dispatch: Dispatch,props:OwnProps): DispatchFromProps=>({
    getPatientById: (patientId: string): void => {dispatch(patientData.actions.getPatientById(patientId))}
})

export default withRouter(connect<StateFromProps, DispatchFromProps,OwnProps,RootState>(mapStateToProps, mapDispatchToProps)(DemographicDetails));