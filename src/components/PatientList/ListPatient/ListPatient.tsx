import React from "react";
import Patient from "../../../model/Patient";
import { RouteComponentProps,Link } from 'react-router-dom';
import { formatDateFromServer, formatDateFromServerToUI, parseDateToSendToServer } from "../../../utils/formater";
import Pagination from "../../Pagination/Pagination";


export interface StateFromProps{
    patients: Array<Patient>;
    loading: boolean;
    saving: boolean;
    saved: boolean;
}
export interface DispatchFromProps{
    getAllPatients: ()=>void,
    searchPatientsByFields: (firstname: string, lastName: string, dob: string)=>void,
}

type State={
    filter: {
      firstName: string;
      lastName: string;
      dob: string;
    },
    page: number;
    numberOfItemPerPage: number;
    sumItem: number;
}
export type OwnProps = RouteComponentProps<{ }>;
export type Props = StateFromProps & DispatchFromProps & OwnProps;

class ListPatient extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
        window.document.title='Patient List';
        this.state= this.getInitialState();
    }
    getInitialState = ():State =>{
        return{
            filter: {
              firstName: '',
              lastName: '',
              dob: '',
            },
            page: 1,
            numberOfItemPerPage:10,
            sumItem:0,
        }
    }
    componentDidMount():void{
        this.props.getAllPatients();
    }
    handleFilter = (e:React.ChangeEvent<HTMLInputElement>)=>{
      
      this.setState((prevState:State)=>{
        return {
          ...prevState,
          filter: {
            ...prevState.filter,
            [e.target.name]: e.target.value,
          },
          page:1
        }
      });
    }
    clearFilter = ()=>{
      this.setState({
        filter: {
          firstName:'',
          lastName: '',
          dob: ''
        }
      })
    }
    switchPage = (page: number) => {
      this.setState({page: page});
  }
  filterPatient = () : {element:Array<Patient>, totalItems:number} =>{
      const {patients,loading} = this.props;
      const {filter,page,numberOfItemPerPage} = this.state;
      let newPatients= [...patients];
      if (loading){
        return { element: newPatients, totalItems:0};
      }
      else{
        newPatients = patients.filter(patient=>{
        if(filter.firstName=='' && filter.lastName==''&& filter.dob==''){
          return patient
        } else if (patient.FirstName.toLowerCase().includes(filter.firstName.toLowerCase()) && patient.LastName.toLowerCase().includes(filter.lastName.toLowerCase()) && formatDateFromServer(patient.DOB).includes(filter.dob)){
          return patient
        }
      });
    }
    let startIndex= (page -1)*numberOfItemPerPage;
    let endIndex = startIndex+ numberOfItemPerPage;
    return {element: newPatients.slice(startIndex,endIndex), totalItems:newPatients.length};
  }
    render(): JSX.Element{
        const {patients} = this.props;
        const {filter, page,numberOfItemPerPage,sumItem} = this.state;
        const {element:filteredData,totalItems} = this.filterPatient();
        
        return(
            <main className="content">
      <div className="card-header container">
      <Link id='btnAddPatient' to={'/patients/create'} className="btn btn-primary">
          Add New Patient
      </Link>
      </div>
      <div className="card-header container">
      <nav className="navbar navbar-light">
      <div className="row">
      <div className="col-lg-3">
      <label htmlFor="firstName">First Name</label>
      <input className="form-control" type='text' name='firstName' value={filter.firstName} onChange={this.handleFilter} />
      </div>
      <div className="col-lg-3">
      <label htmlFor="lastName">Last Name</label>
        <input className="form-control" type='text' name='lastName' value={filter.lastName} onChange={this.handleFilter} />
      </div>
      <div className="col-lg-3">
      <label htmlFor="dob">DOB</label>
       <input className="form-control" type='date' name='dob' value={filter.dob} onChange={this.handleFilter}/>
      </div>
      <div className="col-lg-3">
      <br></br>
      <button className="btn btn-primary" onClick={this.clearFilter} disabled={this.state.filter.firstName=='' && this.state.filter.lastName=='' && this.state.filter.dob==''}>
        <i className="fas fa-eraser"></i>Clear search
      </button>
      </div>
      </div>
      </nav>
      </div>
      <div className="card-header container">
      <table className="table table-primary table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        {filteredData.length>0 && filteredData.map((patient:Patient,index)=>(
            <tbody  key={index+'tbody'}>
          <tr key={index+'tr'}>
            <td key={index+'firstname'}>{patient.FirstName}</td>
            <td key={index+'lastname'}>{patient.LastName}</td>
            <td key={index+'dob'}>{formatDateFromServerToUI(patient.DOB)}</td>
            <td key={index+'gender'}>{patient.Gender}</td>
            <td key={index+'email'}>{patient.Email}</td>
            <td key={index+'phonenumber'}>{patient.PhoneNumber}</td>
            <td key={index+'address'}>{patient.Address}</td>
            <td key={index+'city'}>{patient.City}</td>
            <td><Link id="btDetails" to={`/patients/details/${patient.Id}`}>Details</Link></td>
            <td key={index+'edit'}><Link id="btEdit" to={`/patients/edit/${patient.Id}`}>Edit</Link></td>
            <td key={index+'delete'}><Link id="btDelete" to={`/patients/delete/${patient.Id}`}>Delete</Link></td>
          </tr>
        </tbody>
        ))}
      </table>
      </div>
      <div className="card-footer container">
          <Pagination
           page={page}
           numberOfItem={totalItems}
           numberOfItemPerPage={numberOfItemPerPage}
           length={10}
           onChange={this.switchPage}
          />
       </div>
            </main>
        );
    }
}

export default ListPatient;