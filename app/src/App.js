import React, { Component } from 'react'

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

// react router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Candidates from './components/Candidates'
import Data from './components/Data'
import About from './components/About'
import NotFound from './components/NotFound'
import Divider from 'material-ui/Divider'
import FontAwesome from 'react-fontawesome'

// redux
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

const isMobile = window.matchMedia("only screen and (max-width: 760px)")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const { ...props } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div style={{ margin: 0 }}>
            <AppBar
              title="都議選2017情報"
              showMenuIconButton={true}
              onLeftIconButtonTouchTap={this.handleToggle}
              style={{ margin: 0 }}
            />
            <Router 
              basename={'/togisen2017'}
              {...props}
            >
              <div>
                <Switch>
                  <Route exact path="/" component={Candidates} />
                  <Route path="/data" component={Data} />                  
                  <Route path="/about" component={About} />
                  <Route component={NotFound} />
                </Switch>

                <Drawer
                  docked={false}
                  width={ isMobile.matches ? '80%' : '30%'}
                  open={this.state.open}
                  onRequestChange={(open) => this.setState({ open })}
                >
                  <AppBar
                    title=""
                    showMenuIconButton={false}
                    style={{ margin: 0 }}
                  />
                  <MenuItem onTouchTap={this.handleClose}>
                    <Link to="/">ホーム</Link>
                    <MenuItem onTouchTap={this.handleClose}><Link to="/">候補者SNSプロフィール</Link></MenuItem>
                  </MenuItem>
                  <Divider />
                  <MenuItem onTouchTap={this.handleClose}><Link to="/data">データ記事</Link>
                    <MenuItem onTouchTap={this.handleClose}><Link to="/data#twitter">Twitte利用状況</Link></MenuItem>             
                    <MenuItem onTouchTap={this.handleClose}><Link to="/data#facebook">Facebook利用状況</Link></MenuItem>                                      
                    <MenuItem onTouchTap={this.handleClose}><Link to="/data#twitter-facebook">Twitter + Facebook両方の利用状況</Link></MenuItem>                    
                  </MenuItem>                         
                  <Divider />
                  <MenuItem onTouchTap={this.handleClose}>
                  <Link to="/about">このサイトについて</Link>
                    <MenuItem>
                    <a href="https://github.com/mshk/togisen2017"><FontAwesome name="github" /> ソースコード</a> 
                  </MenuItem>                  
                  <MenuItem>                    
                    <a href="https://twitter.com/mshk"><FontAwesome name="twitter" /> Twitter</a>                    
                  </MenuItem>
                  </MenuItem>                  
                  <Divider />                                    
                </Drawer>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }

  handleClose = () => this.setState({ open: false });
  handleToggle = () => this.setState({ open: !this.state.open });
}

export default App;
