import menuReducer from './sideMenu/menuReducer';
import { combineReducers } from 'redux';
import userReducer from './userLogin/userReducer';
import searchReducer from './search/searchReducer';
import cashButtonsReducer from './cashButtons/cashButtonsReducer';

export default combineReducers({
    userLogin: userReducer,
    sideMenu: menuReducer,
    search: searchReducer,
    cashButtons: cashButtonsReducer
});