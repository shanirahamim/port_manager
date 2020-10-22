import { combineReducers } from 'redux';
import get_vessels_reducer from './vessels/get_vessels.reducer';
import vessels_reducer from './vessels/vessels.reducer';

const rootReducer = combineReducers({	
    //accounts
    vessels: vessels_reducer,
    get_vessels: get_vessels_reducer
});


export default rootReducer;
