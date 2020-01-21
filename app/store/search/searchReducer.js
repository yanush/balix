import userService from '../../demoDB/Users/userService';
import { actions } from './searchActions';

const allUsers = userService.getAllUsers();

const INITIAL_STATE = {
  searchResult: []
};

export default searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.HANDLE_SEARCH:
      let searchResult = [];
      if(action.searchWord != '') {
        searchResult = allUsers.filter((user) => 
          user.userName.toLowerCase().includes(action.searchWord.toLowerCase()) || 
          (user.keywords.join()).toLowerCase().includes(action.searchWord.toLowerCase())
        )
      }
      return {
        ...state,
        wordSearch: action.searchWord,
        searchResult: searchResult
      }
    default:
      return state
  }
};

