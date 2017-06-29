import { 
  REQUEST_CANDIDATES,
  RECEIVE_CANDIDATES,
} from '../constants' 

import axios from 'axios'

import debuglogger from 'debug'

let debug = debuglogger('app:actions')

debug("debug initialized")

function requestCandidates() {
  return {
    type: REQUEST_CANDIDATES
  }
}

function receiveCandidates(data) {
  debug("receiveCandidates()", data)

  return {
    type: RECEIVE_CANDIDATES,
    items: data,
    receivedAt: Date.now()
  }
}

function fetchCandidates() {
  console.log("fetchCandidates()")  

  return dispatch => {
    dispatch(requestCandidates())

    axios.get('data/togisen2017-candidates.json')
      .then((response) => {
        debug("fetched:", response)
        dispatch(receiveCandidates(response.data.data))
      })
      .catch((error) => {
        console.error('data fetch error: ', error)
      })
  }
}

function shouldFetchCandidates(state) {
  const candidates = state.candidates
  if (!candidates) {
    return true
  } else if (candidates.isFetching) {
    return false
  } else {
    return true;
  }
}

export function fetchCandidatesIfNeeded() {
  return (dispatch, getState) => {
    console.log("fetchCandidatesIfNeeded(): state = ", getState())
    if (shouldFetchCandidates(getState())) {
      return dispatch(fetchCandidates())
    }
  }
}

