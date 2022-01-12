import React from "react";
import ListPatient from "../PatientList/ListPatient";
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import DemographicDetails from "./Demographic/DemographicDetails";
import DemographicAddEdit from "./Demographic/DemographicAddEdit";
import DemographicDelete from "./Demographic/DemographicDelete";



export type Props = RouteComponentProps<any>;
const PatientListRoute=(props:Props):JSX.Element =>{
    window.document.title='Patient List';
    return(
        <main>
            <Switch>
                <Route exact={true} path="/patients" render={()=><Redirect to="patients/list"/>}/>
                <Route exact={true} path="/patients/list" component={ListPatient} />
                <Route exact={true} path="/patients/details/:patientId" component={DemographicDetails}/>

                <Route exact={true} path="/patients/create" component={DemographicAddEdit} />
                <Route exact={true} path ="/patients/edit/:patientId?" component={DemographicAddEdit}/>
                <Route exact={true} path="/patients/delete/:patientId?" component={DemographicDelete}/>
            </Switch>
        </main>
    )
}
export default PatientListRoute;
