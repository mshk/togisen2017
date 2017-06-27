import { combineReducers } from 'redux'
import {
  REQUEST_CANDIDATES, 
  RECEIVE_CANDIDATES
} from '../constants'

import debugLogger from 'debug'
let debug = debugLogger('app:reducers:candidates')

function candidates(state = {
  isFetching: false,
  items: [],
  isDefault: true
}, action) {
  debug("caction called:", action);
  switch (action.type) {
    case REQUEST_CANDIDATES:
      debug("reducer: " + REQUEST_CANDIDATES);

      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_CANDIDATES:
      debug(RECEIVE_CANDIDATES);
      debug("action.candidates: ", action.items);

      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default candidates
