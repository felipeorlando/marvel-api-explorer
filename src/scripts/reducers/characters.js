import { FETCHING, FETCHED } from '../actions/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
function characters(state = [], action) {

  switch (action.type) {
    case FETCHED:
      return [...action.data.data.data.results];
  }
  return state;
}

export default characters;
