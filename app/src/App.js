import React, { Component } from 'react'
import logo from './logo.svg'
//import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Candidates from './components/Candidates'

const store = configureStore()

const paperStyle = {
  marginTop: 10,
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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            <AppBar
              title="都議選2017: 候補者SNSプロフィール（α版）"
            />
            <Paper style={paperStyle} zDepth={0} >
              <div style={{textAlign: 'center'}}>
                <img src="images/senkyo_keijiban_people.png" style={{ width: '100%', maxWidth: '500' }} /><br/>
                <span style={{fontSize: '0.5em'}}>素材: <a href="http://www.irasutoya.com/2016/07/blog-post_586.html">いらすとや</a></span>
              </div>
              <p>
              2017年7月2日に行われる東京都議会議員選挙の候補者のプロフィールです。<br/>
              ※このサイトは準備中です。正確でない内容が含まれる可能性があります。
              </p>
              <ul>
                <li>連絡先: <a href="https://twitter.com/mshk" target="_blank">@mshk</a></li>
                <li>ソースコード: <a href="https://github.com/mshk/togisen2017" target="_blank">GitHub</a></li>
              </ul>
            </Paper>
            <Candidates />          
          </div>
        </Provider>        
      </MuiThemeProvider>        
    );
  }
}

export default App;
