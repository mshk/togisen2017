import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCandidatesIfNeeded } from '../../actions'

import Area from './area.js'
import { withRouter } from 'react-router-dom'
import Paper from 'material-ui/Paper';

import headerBannerImage from '../../assets/images/senkyo_keijiban_people.png'


import debuglogger from 'debug';
let debug = debuglogger('app:components:Candidates');

const paperStyle = {
  marginTop: 0,
  marginBottom: 10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'inline-block'
}

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

    const candidates = props.candidates.map((area) => {
      return (
        <Area area={area.area} candidates={area.candidates} />
      );
    });

    return (
      <div>
        <Paper style={paperStyle} zDepth={0} >
          <div style={{ textAlign: 'center' }}>
            <img src={headerBannerImage} style={{ width: '100%', maxWidth: '500' }} /><br />
            <span style={{ fontSize: '0.5em' }}>素材: <a href="http://www.irasutoya.com/2016/07/blog-post_586.html">いらすとや</a></span>
          </div>
          <h3>候補者SNSプロフィール</h3>
          <p>
            2017年7月2日に行われる東京都議会議員選挙の候補者のSNSプロフィールです。<br />
            <ul>
              <li>候補者の情報は<a href="http://www.h29togisen.metro.tokyo.jp/election/list.html">東京都選挙管理委員会の立候補者一覧</a>を元にしています。</li>
              <li>上記一覧に記載の候補者ホームページを機械的に巡回し、リンクされたSNSの情報を追加しています。</li>
            </ul>
          </p>         

        </Paper>
        {candidates}
      </div>
    );
  }
}

function mapStateToProps(state) {
  debug("mapStateToProps(): state = ", state)

  if (state.candidates.isFetching === true) {
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

export default withRouter(connect(mapStateToProps)(Candidates))