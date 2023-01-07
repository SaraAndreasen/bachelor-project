import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../../src/store/reducers';


export default createStore(appReducer, applyMiddleware(thunk));