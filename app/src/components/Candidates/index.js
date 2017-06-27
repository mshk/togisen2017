import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { fetchCandidatesIfNeeded } from '../../actions';

import Area from './area.js'

import debuglogger from 'debug';
let debug = debuglogger('app:components:Candidates');

class Candidates extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCandidatesIfNeeded())
  }

  componentDidUpdate() {
    //this.fetchPages();
  }

  handleRefreshClick(e) {
    console.log("handleRefreshClick()")
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(fetchCandidatesIfNeeded())
  }

  render() {
    const { className, ...props } = this.props;

    const candidates = this.props.candidates.map((area) => {
      return (
        <Area area={area.area} candidates={area.candidates} />
      );
    });

    {
      return (
        <div>
          {candidates}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  debug("mapStateToProps(): state = ", state)

  if (state.candidates.isFetching == true) {
    return {
      isFetching: true,
      candidates: []
    }
  }
  else {
    return {
      isFetching: false,
      candidates: state.candidates.items
    }
  }
}

export default connect(mapStateToProps)(Candidates)