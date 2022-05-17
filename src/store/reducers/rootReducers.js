// import PostsReducer from './PostsReducer';
import {combineReducers} from 'redux';
import { AuthReducer } from './AuthReducer';
import contactReducers from './ContactsReducer';

const rootReducers = combineReducers({
	auth:AuthReducer, 
	contacts:contactReducers,
	// post:PostsReducer
})

export default rootReducers;