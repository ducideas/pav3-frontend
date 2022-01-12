import React from 'react';
import { RouteComponentProps, Switch, Route } from "react-router-dom"
import Patient from '../../../model/Patient';
import DemographicAddEdit from './DemographicAddEdit/DemographicAddEdit'

export interface StateFromProps{
}
export interface DispatchFromProps{

}
export type OwnProps=RouteComponentProps<{patientId: string}>;

export type Props = StateFromProps & DispatchFromProps & OwnProps;



class DemographicRoute extends React.Component<Props,{}> {
    render() {
        return (
            <Switch>
                <Route exact={true} path={`/patients/addedit/:patientId?`} component={DemographicAddEdit} />
            </Switch>
        );
    }
}

export default DemographicRoute;
