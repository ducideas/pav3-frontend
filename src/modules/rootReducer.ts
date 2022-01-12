import { connectRouter } from 'connected-react-router';
import {combineReducers} from 'redux';
import { history } from '../utils/history';
import patient from './patient/reducer';

const rootReducer = combineReducers({
    patient:patient,
})
export default rootReducer;