# 概要

東京都選挙管理委員が公開している、2017年の都議会議員選挙への立候補者のリストをクロールし、JSON/CSV形式のデータを出力します。

同時にリストに記載の各候補者のウェブサイトをクロールし、SNSアカウントへのリンクを収集して候補者の情報に関連づけします。

# 元データ

http://www.h29togisen.metro.tokyo.jp/election/list.html

# 使い方

## クローラー

### JSON
$ jake default['json'] 

### CSV
$ jake default['csv'] 

## ウェブアプリ

$ cd app

$ npm start

# 既知の問題

- ホームページ取得処理にまだ問題があり、SNS情報を取得できない場合があります。エラーが発生したデータはerror列にtrueとマークしてます。この場合は、手作業でデータの修正をする必要があります。

# 利用したツール

- Node.js
- [cheerio-httpcli](https://github.com/ktty1220/cheerio-httpcli)
- [Material UI](http://www.material-ui.com/#/)
- React.js
- Redux
- Create React App

# 免責

- このツールを使って作成したデータの内容にツールの作者は責任を持ちません。
- データを利用する場合は、必ず自分の責任でチェックを行って下さい。

# 管理者

Twitter: @mshk
