import React from "react";
import Patient from "../../../../../model/Patient";
import { Link } from "react-router-dom";
import validationRules from "../validationRules";
import PhoneInput from 'react-phone-number-input';

export interface Props {
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>, rules:Object) => void;
  patient: Patient;
  
}
type State = {};
class PersonalInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { onChange,onBlur, patient } = this.props;
    return (
      <React.Fragment>

        <div className="box-title" style={{color:'blue'}}>
            Personal Information
        </div>
        
        <div className="col-lg-6">
          <label htmlFor="firstname">First Name</label>
          <input
            className="form-control"
            type="text"
            name="FirstName"
            id="firstName"
            value={patient.FirstName}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.FirstName)}
          />
          
        </div>
        <div className="col-lg-6">
          <label htmlFor="lastname">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="LastName"
            id="lastName"
            value={patient.LastName}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.LastName)}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="dob">DOB</label>
          <input
            className="form-control"
            type="date"
            name="DOB"
            id="dob"
            value={patient.DOB}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.DOB)}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="gender"></label>
            Gender
            <select
              className="form-select"
              name="Gender"
              id="gender"
              onChange={onChange}
              onBlur={(e)=>onBlur(e,validationRules.Gender)}
              defaultValue={patient.Gender}
              
            >
              <option value=''>Select a gender</option>
              <option value='M' >Male</option>
              <option value='F' >Female</option>
              <option value='U' >Unknown</option>
            </select>
        </div>
        <div className="col-lg-6">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            name="Email"
            id="email"
            type="text"
            value={patient.Email}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.Email)}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            className="form-control"
            type="text"
            name="PhoneNumber"
            id="phoneNumber"
            value={patient.PhoneNumber}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.PhoneNumber)}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="address">Address</label>
          <input
            className="form-control"
            type="text"
            name="Address"
            id="address"
            value={patient.Address}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.Address)}
          />
        </div>
        <div className="col-lg-6">
          <label htmlFor="city">City</label>
          <input
            className="form-control"
            type="text"
            name="City"
            id="city"
            value={patient.City}
            onChange={onChange}
            onBlur={(e)=>onBlur(e,validationRules.City)}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default PersonalInfo;
