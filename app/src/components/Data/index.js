import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCandidatesIfNeeded } from '../../actions'
import debuglogger from 'debug';
let debug = debuglogger('app:components:Data');

const area = [
  [null, '立川市', '北多摩第一', '北多摩第四', '練馬区', '板橋区', '北区', null, null, null],
  ['青梅市', '昭島市', '小平市', '西東京市', '中野区', '豊島区', '文京区', '荒川区', '足立区', null],
  ['西多摩', '北多摩第二', '小金井市', '武蔵野市', '杉並区', '新宿区', '千代田区', '台東区', '墨田区', '葛飾区'],
  ['八王子市', '日野市', '府中市', '三鷹市', '世田谷区', '渋谷区', '港区', '中央区', '江東区', '江戸川区'],
  [null, '町田市', '南多摩', '北多摩第三', null, '目黒区', '品川区', null, null, null],
  [null, null, null, null, null, null, '大田区', null, null, null],
  ['島部', null, null, null, null, null, null, null, null, null],
]

const styles = {
  container: {
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableWrapper: {
      overflowX: 'scroll'
  }
}

class Data extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCandidatesIfNeeded())
    this.setState({
      hello: "world"
    })
  }

  heatMapColorforValue(value) {
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 70%)";
  }

  getRowsOfAreaGraph(condition) {
    return area.map((row, rowIdx) => {
      let rowResult = row.map((col, colIdx) => {
        let areaData = this.props.candidates.filter((area) => { return area.area === col })
        let percentage = 0
        if (areaData && areaData.length > 0) {
          let twitterUsers = areaData[0].candidates.filter(condition)
          percentage = twitterUsers.length / areaData[0].candidates.length
        }
        let color = this.heatMapColorforValue(percentage)
        if (!col)
          color = "white"
        percentage = Math.ceil(percentage * 100)
        let percentageStr = percentage === 0 ? '' : '' + percentage + '%'
        return (<td style={{ border: '1px solid #eee', backgroundColor: color, textAlign: 'center' }} key={colIdx}>{col}<br />{percentageStr}</td>)
      })
      return (<tr key={rowIdx}>{rowResult}</tr>)
    })
  }

  render() {
    const { className } = this.props

    debug("render(): this.state = ", this.state)

    // Twitter統計
    let rows = this.getRowsOfAreaGraph((candidate) => {
       return candidate.twitter_url 
    })
    const areaMapTwitter = (<div style={styles.tableWrapper}><table width={800}><tbody>{rows}</tbody></table></div>)

    // Facebook統計
    rows = this.getRowsOfAreaGraph((candidate) => {
       return candidate.facebook_url 
    })
    const areaMapFacebook = (<div style={styles.tableWrapper}><table width={800}><tbody>{rows}</tbody></table></div>)


    // Facebook統計
    rows = this.getRowsOfAreaGraph((candidate) => {
       return candidate.facebook_url && candidate.twitter_url
    })  
    const areaMapTwitterFacebook = (<div style={styles.tableWrapper}><table width={800}><tbody>{rows}</tbody></table></div>)

    return (
      <div className={classnames('Data', className)} style={styles.container}>
        <h2>都議選2017: 候補者のSNS利用状況</h2>
        <p>
          2017年7月2日に行われる東京都議会議員選挙の候補者のSNSプロフィールを元に集計しました。
          </p>
        <ul>
          <li>候補者の情報は<a href="http://www.h29togisen.metro.tokyo.jp/election/list.html">東京都選挙管理委員会の立候補者一覧</a>を元にしています。</li>
          <li>上記一覧に記載の候補者ホームページを機械的に巡回し、リンクされたSNSの情報を追加しています。</li>
          <li>このサイトは準備中です。正確でない内容が含まれる可能性があります。</li>
        </ul>
        <br/> 

        <h3 id="twitter">地域別: Twitter利用割合</h3>
        {areaMapTwitter}
        <br/>         

        <h3 id="facebook">地域別: Facebook利用割合</h3>
        {areaMapFacebook}
        <br/> 

        <h3 id="twitter-facebook">地域別: TwitterとFacebook両方の利用割合</h3>
        {areaMapTwitterFacebook}
      </div>
    );
  }
}

function mapStateToProps(state) {
  debug("mapStateToProps(): state = ", state)

  if (state.candidates.isFetching === true) {
    debug("isFetching: false") 
    return {
      isFetching: true,
      candidates: []
    }
  }
  else {
    debug("isFetching: false", this.state) 
    return {
      isFetching: false,
      candidates: state.candidates.items
    }
  }
}

export default withRouter(connect(mapStateToProps)(Data))