import {combineReducers} from 'redux';
import authReducer, {AuthParams} from './auth.reducer';

export interface StateParams {
  auth: AuthParams;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
