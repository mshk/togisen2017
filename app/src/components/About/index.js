import React, { Component } from 'react';
import classnames from 'classnames';

export default class About extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <h1>このサイトについて</h1>

        <p>
          2017年7月2日に行われる東京都議会議員選挙の候補者のプロフィールです。<br />
          ※このサイトは準備中です。正確でない内容が含まれる可能性があります。
        </p>
        <ul>
          <li>連絡先: <a href="https://twitter.com/mshk" target="_blank">@mshk</a></li>
          <li>ソースコード: <a href="https://github.com/mshk/togisen2017" target="_blank">GitHub</a></li>
        </ul>
      </div>
    );
  }
}