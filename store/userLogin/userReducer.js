import userService from '../../demoDB/Users/userService';
import { actions } from './userActions';

const INITIAL_STATE = {
  ...userService.getUserById(3)
};

export default userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LOGIN: 
      if(!action.user) {
        return {
          authError: 'Fields are empty'
        }
      }
      let user = userService.getUserByUserName(action.user.username);
      if(user) {
        if(user.password == action.user.password) {
          return user;
        }        
        return {
          authError: 'Password wrong!'
        };
      }
      return {
        authError: 'Email not exist!'
      }
      break;
    case actions.LOGOUT:
      return {}
    default:
      return state
  }
};

