import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientListRoute from './components/PatientList';
import {Route,BrowserRouter as Router, Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';


function App():JSX.Element {
  return (
    <div>
      <Layout>
      <Router>
      <Route path="/">
          <Redirect to="/patients"></Redirect>
      </Route>
        <Route path="/patients" component={PatientListRoute}/>
      </Router>
      </Layout>
    </div>
  );
}

export default App;
