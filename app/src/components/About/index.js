import React, { Component } from 'react';
import classnames from 'classnames';

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
  }
}


export default class About extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props} style={styles.container} >
        <h3>このサイトについて</h3>
        <p>
          2017年7月2日に行われる東京都議会議員選挙の候補者のSNSプロフィールです。<br />
          <ul>
            <li>候補者の情報は<a href="http://www.h29togisen.metro.tokyo.jp/election/list.html">東京都選挙管理委員会の立候補者一覧</a>を元にしています。</li>
            <li>上記一覧に記載の候補者ホームページを機械的に巡回し、リンクされたSNSの情報を追加しています。</li>
          </ul>
        </p>
        <ul>
          <li>連絡先: <a href="https://twitter.com/mshk">@mshk</a></li>
          <li>ソースコード: <a href="https://github.com/mshk/togisen2017">GitHub</a></li>
        </ul>
      </div>
    );
  }
}
