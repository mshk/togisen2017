import React, { Component } from 'react'

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// react router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Candidates from './components/Candidates';
import Data from './components/Data';
import About from './components/About';
import NotFound from './components/NotFound';

// redux
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

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
              title="都議選2017情報（α版）"
              showMenuIconButton={true}
              onLeftIconButtonTouchTap={this.handleToggle}
              style={{ margin: 0 }}
            />
            <Router {...props}>
              <div>
                <Switch>
                  <Route exact path="/togisen2017" component={Candidates} />
                  <Route path="/togisen2017/data" component={Data} />                  
                  <Route path="/togisen2017/about" component={About} />
                  <Route component={NotFound} />
                </Switch>
                <Drawer
                  docked={false}
                  width={200}
                  open={this.state.open}
                  onRequestChange={(open) => this.setState({ open })}
                >
                  <AppBar
                    title=""
                    showMenuIconButton={false}
                    style={{ margin: 0 }}
                  />
                  <MenuItem onTouchTap={this.handleClose}><Link to="/togisen2017">ホーム</Link></MenuItem>
                  <MenuItem onTouchTap={this.handleClose}><Link to="/togisen2017/data">データ記事</Link></MenuItem>                  
                  <MenuItem onTouchTap={this.handleClose}><Link to="/togisen2017/about">このサイトについて</Link></MenuItem>
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
