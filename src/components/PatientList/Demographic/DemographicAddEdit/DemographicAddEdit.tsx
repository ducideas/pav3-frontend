import React from "react";
import Patient from "../../../../model/Patient";
import { RouteComponentProps, Link } from "react-router-dom";
import PersonalInfo from "./SubDetails/PersonalInfo";
import { checkErrorForm, validators } from "../../../../utils/patientValidators";
import validationRules from "./validationRules";
import { formatDateFromServer, formatPhoneNumber, parseDateToSendToServer } from "../../../../utils/formater";




interface Dictionary<T> {
  [Key: string]: T;
}

export interface StateFromProps {
  patient: Patient;
  loadingPatient: boolean;
  savingPatient: boolean;
  savedPatient: boolean;
}

export interface DispatchFromProps {
  savePatient: (patient: Patient) => void;
  getPatientById: (patientId: string) => void;
}

type State = {
  patient: Patient;
  isAddNew: boolean;
  hasError: boolean;
  errors: Dictionary<string[]>;
  showFlashMessage:boolean
};

export type OwnProps = RouteComponentProps<{ patientId: string }>;

export type Props = StateFromProps & DispatchFromProps & OwnProps;

class DemographicAddEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    window.document.title = 'Patient Demographic';
    this.state = this.getInitialState();
  }

  getInitialState = (): State => {
    const { match } = this.props;
    return {
      patient: this.initPatient(),
      isAddNew: match.params.patientId ? false : true,
      hasError: checkErrorForm(validationRules,this.initPatient()),
      errors: {
        ['FirstName']:new Array<string>(),
        ['LastName']: new Array<string>(),
        ['DOB']: new Array<string>(),
        ['Gender']: new Array<string>(),
        ['Email']: new Array<string>(),
        ['PhoneNumber']: new Array<string>(),
        ['Address']: new Array<string>(),
        ['City']: new Array<string>(),
      },
      showFlashMessage:false,
    };
  };
  initPatient = (): Patient => {
    const { match, patient } = this.props;
    if (match.params.patientId) {
      return {
        ...patient,
        DOB: formatDateFromServer(patient.DOB)
      };
    } else {
      return {
        ...patient,
      };
    }
  };
  componentDidMount(): void {
    const {patientId} = this.props.match.params;
        if (patientId){
            this.props.getPatientById(patientId);
        }
  }
  // static getDerivedStateFromProps(nextProps:Props, prevState:State){
  //   if(nextProps.savedPatient!==prevState.showFlashMessage){
  //     return {
  //       ...prevState,
  //       showFlashMessage:nextProps.savePatient
  //     }
  //  }
  //   return null;
  // }
  
  componentDidUpdate(prevProps:Props,prevState:State) {
   if(prevProps.savedPatient===false && this.props.savedPatient===true){
     this.props.history.push('/patients');
     this.setState({
       ...prevState,
       showFlashMessage:true
     })
   }
  }


  handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    this.setState((prevState: State) => {
      let newPatient: Patient = {
        ...prevState.patient,
        [e.target.name]: e.target.value, // Key Patient oject equals name in event.target.name
      };
      if (e.target.name==='PhoneNumber'){
        newPatient = {
          ...newPatient,
          PhoneNumber: formatPhoneNumber(e.target.value)
        }
      }
      return {
        ...prevState,
        patient: newPatient,
        hasError: checkErrorForm(validationRules,newPatient),
      };
    });
  };
  handleBlur =(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, rules: Object):void=>{
    if(rules){
      let errorArr: string[] = new Array<string>();
      let result : Dictionary<string[]> = this.state.errors;
      Object.keys(rules).forEach(rule=>{
        const error = validators(rule,(rules as any)[rule],e.target.value,e.target.name);
        if(error!==''){
          errorArr.push(error);
        }
        result[e.target.name] = errorArr;
      });
      this.setState((prevState:State)=>({
        ...prevState,
        errors:result,
      }))
    }
  }
    handleSave =()=>{
    const {loadingPatient,savingPatient, match} = this.props;
    const {hasError} = this.state;
    if(hasError)
    {
    this.setState((prevState: State)=>{
        return {
            ...prevState
        }
    })
    }
    if(!loadingPatient && !savingPatient && !hasError){
        var modifyPatient: Patient ={
            ...this.state.patient,
            DOB: parseDateToSendToServer(this.state.patient.DOB)
        }
        this.props.savePatient(modifyPatient);
    }
  }

  render() {
    const { patient, showFlashMessage,errors,hasError } = this.state;
    const {savingPatient}=this.props;
    
    return (
      <section className="custom-form">
        <div className="custom-form-title">Patient Demographic</div>
        <ul className="text-danger">{
          Object.keys(errors).map(key=>{
            return errors[key].map(error=>{
              if (error!==''){
                return(<li key={error}>{error}</li>)
              } else{
                return undefined
              }
            })
          })
        }</ul>
        
        <div className="form row">
          <PersonalInfo patient={patient} onChange={this.handleChange} onBlur={this.handleBlur} />
          
          <div className="col-lg-6 text-center">
            <br></br>
            <Link
              id="btnBackToList"
              to={"/patients"}
              className="btn btn-secondary custom-btn"
            >
              Back to list
            </Link>
          </div>
          <div className="col-lg-6 text-center">
            <br></br>
            <button className="btn btn-primary custom-btn" id="btnCreate" onClick={this.handleSave} disabled={savingPatient||hasError}>
              Save
            </button>
          </div>
          {/* { this.state.showMessage &&  
        <div>
            <FlashMessage duration={5000}>
                <strong>I will disappear in 5 seconds!</strong>
            </FlashMessage>
        </div>
          } */}
        </div>
      </section>
    );
  }
}

export default DemographicAddEdit;
