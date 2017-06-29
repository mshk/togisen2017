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

class Data extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCandidatesIfNeeded())
  }

  heatMapColorforValue(value) {
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 70%)";
  }

  render() {
    const { className, ...props } = this.props;

    // Twitter統計
    const areaMapTwitter = []

    let rows = area.map((row) => {
      let rowResult = row.map((col) => {
        let areaData = props.candidates.filter((area) => { return area.area == col })
        let percentage = 0
        if (areaData && areaData.length > 0) {
          let twitterUsers = areaData[0].candidates.filter((candidate) => { return candidate.twitter_url })
          percentage = twitterUsers.length / areaData[0].candidates.length
        }
        let color = this.heatMapColorforValue(percentage)
        percentage = Math.ceil(percentage * 100)
        let percentageStr = percentage == '0' ? '' : '(' + percentage + '%)'
        return (<td style={{ border: '1px solid black', backgroundColor: color, textAlign: 'center' }}>{col}<br/>{percentageStr}</td>)
      })
      return (<tr>{rowResult}</tr>)
    })

    areaMapTwitter.push(<table>{rows}</table>)

    // Facebook統計
    const areaMapFacebook = []    

    rows = area.map((row) => {
      let rowResult = row.map((col) => {
        let areaData = props.candidates.filter((area) => { return area.area == col })
        let percentage = 0
        if (areaData && areaData.length > 0) {
          let twitterUsers = areaData[0].candidates.filter((candidate) => { return candidate.facebook_url })
          percentage = twitterUsers.length / areaData[0].candidates.length
        }
        let color = this.heatMapColorforValue(percentage)
        percentage = Math.ceil(percentage * 100)
        let percentageStr = percentage == '0' ? '' : '(' + percentage + '%)'
        return (<td style={{ border: '1px solid black', backgroundColor: color, textAlign: 'center' }}>{col}<br/>{percentageStr}</td>)
      })
      return (<tr>{rowResult}</tr>)
    })

    areaMapFacebook.push(<table>{rows}</table>)


    // Facebook統計
    const areaMapTwitterFacebook = []    

    rows = area.map((row) => {
      let rowResult = row.map((col) => {
        let areaData = props.candidates.filter((area) => { return area.area == col })
        let percentage = 0
        if (areaData && areaData.length > 0) {
          let twitterUsers = areaData[0].candidates.filter((candidate) => { return candidate.facebook_url && candidate.twitter_url })
          percentage = twitterUsers.length / areaData[0].candidates.length
        }
        let color = this.heatMapColorforValue(percentage)
        percentage = Math.ceil(percentage * 100)
        let percentageStr = percentage == '0' ? '' : '(' + percentage + '%)'
        return (<td style={{ border: '1px solid black', backgroundColor: color, textAlign: 'center' }}>{col}<br/>{percentageStr}</td>)
      })
      return (<tr>{rowResult}</tr>)
    })

    areaMapTwitterFacebook.push(<table>{rows}</table>)

    return (
      <div className={classnames('Data', className)} {...props}>
        <h2>都議選2017: 候補者のSNS利用状況</h2>
        <h3>このサイトについて</h3>
          <p>
            2017年7月2日に行われる東京都議会議員選挙の候補者のSNSプロフィールです。<br />
            <ul>
              <li>候補者の情報は<a href="http://www.h29togisen.metro.tokyo.jp/election/list.html">東京都選挙管理委員会の立候補者一覧</a>を元にしています。</li>              
              <li>上記一覧に記載の候補者ホームページを機械的に巡回し、リンクされたSNSの情報を追加しています。</li>              
              <li>このサイトは準備中です。正確でない内容が含まれる可能性があります。</li>              
            </ul>              
              </p>
          <ul>
            <li>連絡先: <a href="https://twitter.com/mshk" target="_blank">@mshk</a></li>
            <li>ソースコード: <a href="https://github.com/mshk/togisen2017" target="_blank">GitHub</a></li>
          </ul>

        <h3>地域別: Twitter利用割合</h3>
          {areaMapTwitter}

        <h3>地域別: Facebook利用割合</h3>
          {areaMapFacebook}
        
        <h3>地域別: TwitterとFacebook両方の利用割合</h3>
          {areaMapTwitterFacebook}
        
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

export default withRouter(connect(mapStateToProps)(Data))