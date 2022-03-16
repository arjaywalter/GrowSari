import {combineReducers} from 'redux';

import base from './baseSlice'; // Slice template
import product from './productSlice';

const rootReducer = combineReducers({
  product
});

export default rootReducer;
